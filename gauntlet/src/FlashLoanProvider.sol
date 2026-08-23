// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IFlashBorrower} from "./IFlashBorrower.sol";

contract FlashLoanProvider {
    uint256 public constant FEE_BPS = 9; // 0.09%
    uint256 public totalLoans;

    event FlashLoan(address indexed borrower, uint256 amount);

    function flashLoan(uint256 amount) external {
        require(amount <= address(this).balance, "FLP: insufficient liquidity");
        uint256 balanceBefore = address(this).balance;
        IFlashBorrower(msg.sender).execute{value: amount}();
        uint256 fee = (amount * FEE_BPS) / 10_000;
        require(address(this).balance >= balanceBefore - amount + amount + fee, "FLP: loan not repaid");
        unchecked { totalLoans++; }
        emit FlashLoan(msg.sender, amount);
    }

    receive() external payable {}
}