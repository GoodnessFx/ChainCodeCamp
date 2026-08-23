// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MockERC20} from "./MockERC20.sol";
import {IFlashBorrower} from "./IFlashBorrower.sol";

contract TokenFlashProvider {
    MockERC20 public immutable token;

    constructor(address _token) {
        token = MockERC20(_token);
    }

    function flashLoan(uint256 amount) external {
        require(amount <= token.balanceOf(address(this)), "TFLP: insufficient liquidity");
        uint256 before = token.balanceOf(address(this));
        token.transfer(msg.sender, amount);
        IFlashBorrower(msg.sender).execute();
        require(token.balanceOf(address(this)) >= before, "TFLP: loan not repaid");
    }
}