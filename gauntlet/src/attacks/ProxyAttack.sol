// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ProxyTakeover} from "../ProxyTakeover.sol";

contract MaliciousLogic {
    function drain() external {
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        require(ok, "send failed");
    }
}

contract ProxyAttack {
    ProxyTakeover public proxy;
    MaliciousLogic public logic;

    constructor(address _proxy) {
        proxy = ProxyTakeover(_proxy);
        logic = new MaliciousLogic();
    }

    // TODO: set implementation to MaliciousLogic, initialize to become admin,
    // delegatecall drain() to steal proxy's ETH
    function pwn() external {
        revert("Not implemented");
    }

    receive() external payable {}
}