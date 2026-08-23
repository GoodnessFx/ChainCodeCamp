// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProxyTakeover {
    address public implementation;
    address public admin;
    bool public initialized;

    // VULN 1: no access control on upgrade
    function setImplementation(address _impl) external {
        implementation = _impl;
    }

    // VULN 2: unprotected initialize
    function initialize(address _admin) external {
        require(!initialized, "init");
        initialized = true;
        admin = _admin;
    }

    // VULN 3: arbitrary delegatecall
    function execute(bytes calldata data) external payable returns (bytes memory) {
        (bool ok, bytes memory ret) = implementation.delegatecall(data);
        require(ok, "dc failed");
        return ret;
    }

    receive() external payable {}
}