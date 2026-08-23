// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "../src/MockERC20.sol";
import {SimplePool} from "../src/SimplePool.sol";
import {OracleLender} from "../src/OracleLender.sol";
import {CrossReentrancyAttack} from "../src/attacks/CrossReentrancyAttack.sol";

contract CrossReentrancyTest is Test {
    MockERC20 token;
    SimplePool pool;
    OracleLender lender;
    CrossReentrancyAttack attack;

    function setUp() public {
        token = new MockERC20();
        // Pool: 1,000,000 tokens, 100 ETH
        uint256 poolTokens = 1_000_000e18;
        uint256 poolEth = 100 ether;
        token.mint(address(this), poolTokens + 1_500_000e18); // extra for attacker
        pool = new SimplePool(address(token), poolTokens, poolEth);
        token.transfer(address(pool), poolTokens);
        vm.deal(address(pool), poolEth);
        
        lender = new OracleLender(address(token), address(pool));
        // Seed lender with 50 ETH (2 borrows of 25)
        vm.deal(address(lender), 50 ether);
        
        attack = new CrossReentrancyAttack(address(lender), address(pool), address(token));
        // Fund attacker with 1,500,000 tokens (500k for collateral + 1M for swap)
        token.mint(address(attack), 1_500_000e18);
    }

    function test_cross_contract_reentrancy() public {
        attack.pwn();
        
        // Lender should be drained (50 ETH)
        assertEq(address(lender).balance, 0, "Lender not drained");
        // Attacker should profit
        assertGt(address(attack).balance, 0, "No profit");
        // Protocol should be underwater: debt > collateral value
        uint256 debt = lender.debt(address(attack));
        uint256 collValue = lender.collateralValue(address(attack));
        assertLt(collValue, debt, "Not underwater");
    }
}