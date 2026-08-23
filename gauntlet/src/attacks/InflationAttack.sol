// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {InflationVault} from "../InflationVault.sol";
import {MockERC20} from "../MockERC20.sol";

contract InflationAttack {
    InflationVault public vault;
    MockERC20 public token;

    constructor(address _vault, address _token) {
        vault = InflationVault(_vault);
        token = MockERC20(_token);
    }

    // TODO: deposit 1 wei, donate to inflate share price,
    // then redeem inflated shares after victim deposits
    function pwn() external {
        revert("Not implemented");
    }

    function take() external {
        revert("Not implemented");
    }

    receive() external payable {}
}