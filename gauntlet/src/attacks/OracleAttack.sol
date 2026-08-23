// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OracleLender} from "../OracleLender.sol";
import {SimplePool} from "../SimplePool.sol";
import {FlashLoanProvider} from "../FlashLoanProvider.sol";
import {MockERC20} from "../MockERC20.sol";
import {IFlashBorrower} from "../IFlashBorrower.sol";

contract OracleAttack {
    OracleLender public lender;
    SimplePool public pool;
    FlashLoanProvider public flp;
    MockERC20 public token;

    constructor(address _lender, address _pool, address _flp, address _token) {
        lender = OracleLender(_lender);
        pool = SimplePool(_pool);
        flp = FlashLoanProvider(_flp);
        token = MockERC20(_token);
    }

    // TODO: flash-borrow ETH, swap to inflate pool price, deposit as collateral,
    // borrow against inflated value, unwind, repay flash loan
    function attack() external {
        revert("Not implemented");
    }

    function execute() external payable {
        // Called by FlashLoanProvider with borrowed ETH
        revert("Not implemented");
    }

    receive() external payable {}
}