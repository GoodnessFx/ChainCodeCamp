// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MockERC20} from "./MockERC20.sol";

contract GovToken is MockERC20 {
    constructor() {
        name = "GovToken";
        symbol = "GOV";
    }
}