// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {ProxyTakeover} from "../src/ProxyTakeover.sol";
import {ProxyAttack} from "../src/attacks/ProxyAttack.sol";

contract ProxyTakeoverTest is Test {
    ProxyTakeover proxy;
    ProxyAttack attack;

    function setUp() public {
        proxy = new ProxyTakeover();
        vm.deal(address(proxy), 10 ether);
        attack = new ProxyAttack(address(proxy));
    }

    function test_takeover_and_drain() public {
        attack.pwn();
        // Proxy ETH should be drained to attacker
        assertEq(address(proxy).balance, 0, "Proxy not drained");
        assertEq(proxy.admin(), address(attack), "Attack not admin");
        assertGt(address(attack).balance, 0, "Attacker didn't profit");
    }
}