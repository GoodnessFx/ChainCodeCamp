// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

contract OverflowToken {
    mapping(address => uint256) public balanceOf;
    uint256 public totalSupply;

    constructor() {
        balanceOf[msg.sender] = 1_000_000e18;
        totalSupply = 1_000_000e18;
    }

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(balanceOf[msg.sender] >= value, "!bal");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        return true;
    }

    // VULNERABLE: classic batchOverflow (BEC CVE-2018-10299)
    function batchTransfer(address[] calldata recipients, uint256 value) external returns (bool) {
        uint256 amount = uint256(recipients.length) * value; // overflows to 0 when value = 2**255 and length = 2
        require(value > 0 && balanceOf[msg.sender] >= amount, "!bal");
        balanceOf[msg.sender] -= amount;
        for (uint256 i = 0; i < recipients.length; i++) {
            balanceOf[recipients[i]] += value;
        }
        return true;
    }
}