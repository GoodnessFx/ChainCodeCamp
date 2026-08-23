// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {FlawedAccessControl} from "../src/FlawedAccessControl.sol";
import {AccessAttack} from "../src/attacks/AccessAttack.sol";

contract FlawedAccessControlTest is Test {
    FlawedAccessControl target;
    AccessAttack attack;
    address ownerEOA = makeAddr("owner");

    function setUp() public {
        // Owner is an EOA
        target = new FlawedAccessControl(ownerEOA);
        vm.deal(address(target), 10 ether);
        attack = new AccessAttack(address(target));
    }

    function test_become_owner_and_drain() public {
        // Call pwn from ownerEOA (simulates owner calling malicious contract)
        vm.prank(ownerEOA);
        attack.pwn();
        // Attack should become owner and drain the 10 ETH
        assertEq(target.owner(), address(attack), "Attack not owner");
        assertEq(address(target).balance, 0, "Not drained");
    }
}