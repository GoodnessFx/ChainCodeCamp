// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {OverflowToken} from "../OverflowToken.sol";

contract OverflowAttack {
    OverflowToken public token;

    constructor(address _token) {
        token = OverflowToken(_token);
    }

    // TODO: call batchTransfer with crafted args to overflow amount to 0
    // and mint tokens to two addresses
    // Hint: value = 2**255, recipients = [attacker, attacker]
    function exploit() external {
        revert("Not implemented");
    }
}