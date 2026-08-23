// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "../src/MockERC20.sol";
import {SimplePool} from "../src/SimplePool.sol";
import {OracleLender} from "../src/OracleLender.sol";
import {FlashLoanProvider} from "../src/FlashLoanProvider.sol";
import {OracleAttack} from "../src/attacks/OracleAttack.sol";

contract OracleLenderTest is Test {
    MockERC20 token;
    SimplePool pool;
    OracleLender lender;
    FlashLoanProvider flp;
    OracleAttack attack;

    function setUp() public {
        token = new MockERC20();
        // Pool: 1,000,000,000 tokens (1e9 * 1e18), 1000 ETH
        uint256 poolTokens = 1_000_000_000e18;
        uint256 poolEth = 1000 ether;
        token.mint(address(this), poolTokens + 200 ether); // extra for attack
        pool = new SimplePool(address(token), poolTokens, poolEth);
        // Seed pool with tokens
        token.transfer(address(pool), poolTokens);
        vm.deal(address(pool), poolEth);
        
        lender = new OracleLender(address(token), address(pool));
        // Seed lender with 120 ETH to be drained
        vm.deal(address(lender), 120 ether);
        
        flp = new FlashLoanProvider();
        vm.deal(address(flp), 200 ether);
        
        attack = new OracleAttack(address(lender), address(pool), address(flp), address(token));
        // Attack contract needs tokens for swapEthToToken? No, it swaps ETH for tokens
        // It just needs the flash loan from provider
    }

    function test_flash_loan_oracle_manipulation() public {
        // Attack: flash-borrow 200 ETH, swap to inflate price, deposit collateral,
        // borrow 120 ETH, sell tokens back, repay flash loan
        attack.attack();
        
        // Lender should be drained of 120 ETH
        assertEq(address(lender).balance, 0, "Lender not drained");
        // Attacker should profit (> 0 net ETH after flash loan repayment)
        assertGt(address(attack).balance, 0, "No profit");
    }
}