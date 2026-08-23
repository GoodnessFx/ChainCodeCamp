// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {ReentrancyVault} from "../src/ReentrancyVault.sol";
import {ReentrancyAttack} from "../src/attacks/ReentrancyAttack.sol";

contract ReentrancyVaultTest is Test {
    ReentrancyVault vault;
    ReentrancyAttack attack;

    function setUp() public {
        vault = new ReentrancyVault();
        // Seed vault with 10 ETH
        vm.deal(address(vault), 10 ether);
        // Deploy attack with 1 ETH to seed its balance
        attack = new ReentrancyAttack(address(vault));
        vm.deal(address(attack), 1 ether);
    }

    function test_drain_the_vault() public {
        // Attack contract should drain all 10 ETH from vault
        attack.attack();
        assertEq(address(vault).balance, 0, "Vault not drained");
        // Attacker should end up with > 1 ETH (profit)
        assertGt(address(attack).balance, 1 ether, "No profit");
    }
}