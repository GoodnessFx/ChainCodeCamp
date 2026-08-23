// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FlawedAccessControl {
    address public owner;
    mapping(address => uint256) public balances;

    constructor(address _owner) {
        owner = _owner;
    }

    // VULN 1: missing access-control modifier
    function setOwner(address _owner) external {
        owner = _owner;
    }

    // VULN 2: tx.origin-based check — bypassable by a malicious contract
    function transferOwnership(address _owner) external {
        require(tx.origin == owner, "only owner");
        owner = _owner;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function sweep() external {
        require(msg.sender == owner, "only owner");
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        require(ok, "send failed");
    }
}