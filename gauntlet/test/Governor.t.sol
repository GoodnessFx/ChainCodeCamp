// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {GovToken} from "../src/GovToken.sol";
import {Governor} from "../src/Governor.sol";
import {TokenFlashProvider} from "../src/TokenFlashProvider.sol";
import {GovAttack} from "../src/attacks/GovAttack.sol";

contract GovernorTest is Test {
    GovToken token;
    Governor gov;
    TokenFlashProvider provider;
    GovAttack attack;

    function setUp() public {
        token = new GovToken();
        gov = new Governor(address(token));
        provider = new TokenFlashProvider(address(token));
        
        // Seed provider with 1000e18 GOV for flash loan
        token.mint(address(provider), 1000e18);
        // Seed attacker with 1000e18 GOV (to repay flash loan)
        attack = new GovAttack(address(gov), address(token), address(provider));
        token.mint(address(attack), 1000e18);
        // Seed gov treasury with 100 ETH
        vm.deal(address(gov), 100 ether);
    }

    function test_flash_loan_governance_takeover() public {
        attack.attack();
        
        // Gov treasury should be drained
        assertEq(address(gov).balance, 0, "Gov not drained");
        // Attacker should profit
        assertGt(address(attack).balance, 0, "No profit");
    }
}