// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MockERC20} from "./MockERC20.sol";

contract InflationVault {
    MockERC20 public immutable token;
    mapping(address => uint256) public shares;
    uint256 public totalShares;

    constructor(address _token) {
        token = MockERC20(_token);
    }

    // VULN: first depositor gets all shares; direct transfers inflate price
    function deposit(uint256 amount) external returns (uint256 sharesOut) {
        require(amount > 0, "amount");
        token.transferFrom(msg.sender, address(this), amount);
        if (totalShares == 0) {
            sharesOut = amount;
        } else {
            sharesOut = amount * totalShares / token.balanceOf(address(this));
        }
        shares[msg.sender] += sharesOut;
        totalShares += sharesOut;
    }

    function redeem(uint256 sharesIn) external returns (uint256 out) {
        require(shares[msg.sender] >= sharesIn, "no shares");
        out = sharesIn * token.balanceOf(address(this)) / totalShares;
        shares[msg.sender] -= sharesIn;
        totalShares -= sharesIn;
        token.transfer(msg.sender, out);
    }
}