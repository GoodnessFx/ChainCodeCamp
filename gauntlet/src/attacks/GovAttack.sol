// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Governor} from "../Governor.sol";
import {GovToken} from "../GovToken.sol";
import {TokenFlashProvider} from "../TokenFlashProvider.sol";
import {IFlashBorrower} from "../IFlashBorrower.sol";

contract GovAttack {
    Governor public gov;
    GovToken public token;
    TokenFlashProvider public provider;
    bytes32 public constant PROPOSAL_ID = keccak256("pwn");

    constructor(address _gov, address _token, address _provider) {
        gov = Governor(_gov);
        token = GovToken(_token);
        provider = TokenFlashProvider(_provider);
    }

    // TODO: flash-borrow GOV tokens, propose + vote + execute to drain treasury
    function attack() external {
        revert("Not implemented");
    }

    function execute() external {
        // Called by TokenFlashProvider with borrowed tokens
        revert("Not implemented");
    }
}