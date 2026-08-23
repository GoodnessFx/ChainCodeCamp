// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OracleLender} from "../OracleLender.sol";
import {SimplePool} from "../SimplePool.sol";
import {MockERC20} from "../MockERC20.sol";

contract CrossReentrancyAttack {
    OracleLender public lender;
    SimplePool public pool;
    MockERC20 public token;
    uint256 public reentered;

    constructor(address _lender, address _pool, address _token) {
        lender = OracleLender(_lender);
        pool = SimplePool(_pool);
        token = MockERC20(_token);
    }

    // TODO: deposit token collateral, then swap large amount of tokens in pool
    // Pool callback sends ETH to you — reenter OracleLender.borrow() twice
    // before debt is recorded
    function pwn() external {
        revert("Not implemented");
    }

    receive() external payable {
        // Pool callback (first) → borrow once
        // Vault callback (second) → borrow again
        if (reentered < 2) {
            reentered++;
            lender.borrow(25 ether);
        }
    }
}