// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ReentrancyVault} from "../ReentrancyVault.sol";

contract ReentrancyAttack {
    ReentrancyVault public vault;

    constructor(address _vault) {
        vault = ReentrancyVault(_vault);
    }

    // TODO: implement your exploit to drain the vault
    // Hint: use reentrancy via fallback/receive
    function attack() external payable {
        revert("Not implemented");
    }

    receive() external payable {}
}