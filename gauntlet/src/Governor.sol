// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {GovToken} from "./GovToken.sol";

contract Governor {
    GovToken public immutable token;
    uint256 public constant QUORUM = 1000e18;

    struct Proposal {
        address proposer;
        bool executed;
        uint256 forVotes;
    }
    mapping(bytes32 => Proposal) public proposals;
    mapping(bytes32 => mapping(address => bool)) public hasVoted;

    constructor(address _token) {
        token = GovToken(_token);
    }

    function propose(bytes32 id) external {
        require(proposals[id].proposer == address(0), "exists");
        proposals[id].proposer = msg.sender;
    }

    // VULN: live balanceOf — flash-loanable, no snapshot
    function vote(bytes32 id, bool support) external {
        require(proposals[id].proposer != address(0), "no proposal");
        require(!hasVoted[id][msg.sender], "voted");
        hasVoted[id][msg.sender] = true;
        uint256 power = token.balanceOf(msg.sender);
        if (support) proposals[id].forVotes += power;
    }

    function execute(bytes32 id) external {
        Proposal storage p = proposals[id];
        require(p.proposer != address(0) && !p.executed, "bad");
        require(p.forVotes >= QUORUM, "quorum not met");
        p.executed = true;
        (bool ok, ) = p.proposer.call{value: address(this).balance}("");
        require(ok, "send failed");
    }

    receive() external payable {}
}