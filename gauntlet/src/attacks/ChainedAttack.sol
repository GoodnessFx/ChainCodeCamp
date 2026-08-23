// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ChainedExploitVault} from "../ChainedExploitVault.sol";

contract ChainedAttack {
    ChainedExploitVault public vault;
    uint256 public reentered;

    constructor(address _vault) {
        vault = ChainedExploitVault(_vault);
    }

    // TODO: approve yourself, deposit, withdraw with reentrancy to drain entire vault
    function pwn() external payable {
        revert("Not implemented");
    }

    receive() external payable {
        // Reenter while vault still has ETH
        if (reentered < 10 && address(vault).balance > 0) {
            reentered++;
            vault.withdraw();
        }
    }
}