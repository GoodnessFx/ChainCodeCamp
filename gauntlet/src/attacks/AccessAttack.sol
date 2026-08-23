// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FlawedAccessControl} from "../FlawedAccessControl.sol";

contract AccessAttack {
    FlawedAccessControl public target;

    constructor(address _target) {
        target = FlawedAccessControl(_target);
    }

    // TODO: become owner and drain the contract
    // Hint: setOwner has no access control; transferOwnership uses tx.origin
    function pwn() external {
        revert("Not implemented");
    }

    receive() external payable {}
}