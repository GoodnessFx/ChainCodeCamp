// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MockERC20} from "./MockERC20.sol";

contract SimplePool {
    MockERC20 public immutable token;
    uint256 public reserveToken; // token-wei (18 decimals)
    uint256 public reserveEth;   // wei

    constructor(address _token, uint256 _reserveToken, uint256 _reserveEth) {
        token = MockERC20(_token);
        reserveToken = _reserveToken;
        reserveEth = _reserveEth;
    }

    // Attacker sells tokens for ETH — VULN: state updated AFTER external call
    function swapTokenToEth(uint256 amount) external returns (uint256 ethOut) {
        require(amount > 0, "amount");
        token.transferFrom(msg.sender, address(this), amount);
        uint256 k = reserveToken * reserveEth;
        uint256 rt = reserveToken + amount;
        ethOut = reserveEth - k / rt;
        // Reentrancy hook: ETH sent BEFORE state update
        (bool ok, ) = msg.sender.call{value: ethOut}("");
        require(ok, "swap send failed");
        reserveToken = rt;
        reserveEth -= ethOut;
    }

    // Attacker buys tokens with ETH
    function swapEthToToken() external payable returns (uint256 tokenOut) {
        require(msg.value > 0, "value");
        uint256 k = reserveToken * reserveEth;
        uint256 re = reserveEth + msg.value;
        uint256 rt = k / re;
        tokenOut = reserveToken - rt;
        token.transfer(msg.sender, tokenOut);
        reserveToken = rt;
        reserveEth = re;
    }

    function price() external view returns (uint256) {
        // ETH wei per token-wei
        return reserveEth * 1e18 / reserveToken;
    }
}