// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MockERC20} from "./MockERC20.sol";
import {SimplePool} from "./SimplePool.sol";

contract OracleLender {
    MockERC20 public immutable token;
    SimplePool public immutable pool;
    mapping(address => uint256) public collateral;
    mapping(address => uint256) public debt;

    constructor(address _token, address _pool) {
        token = MockERC20(_token);
        pool = SimplePool(_pool);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "amount");
        token.transferFrom(msg.sender, address(this), amount);
        collateral[msg.sender] += amount;
    }

    // Value of collateral in ETH wei = collateral * pool.reserveEth / pool.reserveToken
    function collateralValue(address user) public view returns (uint256) {
        return collateral[user] * pool.reserveEth() / pool.reserveToken();
    }

    function maxBorrow(address user) public view returns (uint256) {
        return collateralValue(user) / 2;
    }

    // VULNERABLE: sends ETH BEFORE recording debt (reentrancy)
    function borrow(uint256 amount) external {
        require(amount <= maxBorrow(msg.sender), "OL: over limit");
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "OL: send failed");
        debt[msg.sender] += amount; // too late
    }
}