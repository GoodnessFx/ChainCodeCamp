---
[contributors-shield]: https://img.shields.io/github/contributors/GoodnessFx/ChainCodeCamp.svg?style=for-the-badge
[contributors-url]: https://github.com/GoodnessFx/ChainCodeCamp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GoodnessFx/ChainCodeCamp.svg?style=for-the-badge
[forks-url]: https://github.com/GoodnessFx/ChainCodeCamp/network/members
[stars-shield]: https://img.shields.io/github/stars/GoodnessFx/ChainCodeCamp.svg?style=for-the-badge
[stars-url]: https://github.com/GoodnessFx/ChainCodeCamp/stargazers
[issues-shield]: https://img.shields.io/github/issues/GoodnessFx/ChainCodeCamp.svg?style=for-the-badge
[issues-url]: https://github.com/GoodnessFx/ChainCodeCamp/issues
[license-shield]: https://img.shields.io/github/license/GoodnessFx/ChainCodeCamp.svg?style=for-the-badge
[license-url]: https://github.com/GoodnessFx/ChainCodeCamp/blob/main/LICENSE

<h1 align="center">ChainCodeCamp — Smart Contract Security & Auditing</h1>

<p align="center"><strong>Free, structured smart contract security education for African and self-taught developers who can't afford $2k–$5k bootcamps. EVM internals → Solidity → Assembly → Real audits → Paid findings.</strong></p>

<div align="center">

[![Stargazers][stars-shield]][stars-url]
[![Forks][forks-shield]][forks-url]
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<p align="center">
    <br />
    <a href="https://chaincodecamp.dev/curriculum/evm-fundamentals">
        <img src="https://img.shields.io/badge/▶%20START%20THE%20COURSE-ff4d00?style=for-the-badge&logoColor=white" alt="Start the Course"/>
    </a>
    &nbsp;
    <a href="https://chaincodecamp.dev/curriculum">
        <img src="https://img.shields.io/badge/📚%20VIEW%20CURRICULUM-1a1a1a?style=for-the-badge&logoColor=white" alt="View Curriculum"/>
    </a>
    <br /><br />
</p>

</div>

> ⚠️ All vulnerable contracts in this repo are for educational purposes only. Do not deploy them to mainnet. Use at your own risk.

> 📣 **Inspired by** [freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) (curriculum structure, free certification model) and [Cyfrin Updraft](https://github.com/Cyfrin/security-and-auditing-full-course-s23) (security depth, section anatomy, real contract links). ChainCodeCamp lives in the gap between them — freeCodeCamp's accessibility applied to smart contract security, with African context built in and no paywall ever.

---

- [Website](https://chaincodecamp.dev) — Browse the full curriculum, track your progress, claim your certificate
- [Discord](https://discord.gg/chaincodecamp) — Community of auditors, builders, and learners
- [GitHub Discussions](https://github.com/GoodnessFx/ChainCodeCamp/discussions) — Ask questions, share findings
- [Bug Bounty Tracker](https://chaincodecamp.dev/community#bounties) — Live platforms, payout ranges, submission guides

<br/>
<p align="center">
<a href="https://chaincodecamp.dev" target="_blank">
<img src="https://img.shields.io/badge/chaincodecamp.dev-ff4d00?style=for-the-badge" width="300" alt="ChainCodeCamp — Smart Contract Security Education"/>
</a>
</p>
<br/>

---

# Table of Contents

> _Note: If you're coming from freeCodeCamp or Cyfrin Updraft, the structure here will feel familiar. We use "Sections" not "Lessons." The exploit gauntlet replaces multiple choice quizzes. Everything else is deliberate._

<details>
<summary>Table of Contents</summary>
<ol>
<li><a href="#introduction-resources-and-prerequisites">Introduction, Resources, and Prerequisites</a></li>
<li><a href="#curriculum">Curriculum</a></li>
<li><a href="#-section-0-welcome-to-chaincodecamp">Section 0: Welcome</a></li>
<li><a href="#-section-1-evm-fundamentals">Section 1: EVM Fundamentals</a></li>
<li><a href="#-section-2-solidity-mastery">Section 2: Solidity Mastery</a></li>
<li><a href="#-section-3-assembly--yul">Section 3: Assembly & Yul</a></li>
<li><a href="#️-section-4-foundry-mastery">Section 4: Foundry Mastery</a></li>
<li><a href="#-section-5-vulnerability-classes--first-audit">Section 5: Vulnerability Classes & Your First Audit</a></li>
<li><a href="#-section-6-defi-attack-vectors">Section 6: DeFi Attack Vectors</a></li>
<li><a href="#-section-7-static-analysis--tooling">Section 7: Static Analysis & Tooling</a></li>
<li><a href="#-section-8-fuzzing--formal-verification">Section 8: Fuzzing & Formal Verification</a></li>
<li><a href="#-section-9-writing-a-real-audit-report">Section 9: Writing a Real Audit Report</a></li>
<li><a href="#-section-10-bug-bounty--competitive-audits">Section 10: Bug Bounty & Competitive Audits</a></li>
<li><a href="#the-exploit-gauntlet">The Exploit Gauntlet</a></li>
<li><a href="#certifications">Certifications</a></li>
<li><a href="#contributing">Contributing</a></li>
<li><a href="#thank-you">Thank You</a></li>
</ol>
</details>

<details>
<summary>Introduction, Resources, and Prerequisites</summary>
<ol>
<li><a href="#resources-for-this-course">Resources For This Course</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#outcome">Outcome</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-0-welcome-to-chaincodecamp">🤝 Section 0: Welcome to ChainCodeCamp</a></summary>
<ol>
<li><a href="#why-smart-contract-security">Why Smart Contract Security?</a></li>
<li><a href="#who-this-is-for">Who This Is For</a></li>
<li><a href="#how-to-use-this-course">How to Use This Course</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-1-evm-fundamentals">⚙️ Section 1: EVM Fundamentals</a></summary>
<ol>
<li><a href="#what-the-evm-actually-is">What the EVM Actually Is</a></li>
<li><a href="#the-five-data-locations">The Five Data Locations</a></li>
<li><a href="#gas-the-physics-of-the-evm">Gas: The Physics of the EVM</a></li>
<li><a href="#opcodes-that-matter-for-security">Opcodes That Matter for Security</a></li>
<li><a href="#in-the-wild-weth">In the Wild: WETH</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-2-solidity-mastery">📝 Section 2: Solidity Mastery</a></summary>
<ol>
<li><a href="#storage-layout-the-tetris-rule">Storage Layout: The Tetris Rule</a></li>
<li><a href="#mapping-internals">Mapping Internals</a></li>
<li><a href="#custom-errors">Custom Errors</a></li>
<li><a href="#inheritance-c3-linearization">Inheritance: C3 Linearization</a></li>
<li><a href="#the-24kb-contract-size-limit">The 24KB Contract Size Limit</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-3-assembly--yul">🔩 Section 3: Assembly & Yul</a></summary>
<ol>
<li><a href="#why-drop-into-yul">Why Drop Into Yul?</a></li>
<li><a href="#soliditys-memory-layout">Solidity's Memory Layout</a></li>
<li><a href="#bitwise-operations">Bitwise Operations</a></li>
<li><a href="#the-dirty-bits-problem">The Dirty Bits Problem</a></li>
<li><a href="#reading-solady">Reading Solady</a></li>
</ol>
</details>

<details>
<summary><a href="#️-section-4-foundry-mastery">🛠️ Section 4: Foundry Mastery</a></summary>
<ol>
<li><a href="#fuzz-testing">Fuzz Testing</a></li>
<li><a href="#invariant-testing">Invariant Testing</a></li>
<li><a href="#handler-based-invariant-testing">Handler-Based Invariant Testing</a></li>
<li><a href="#the-essential-cheatcodes">The Essential Cheatcodes</a></li>
<li><a href="#fork-testing">Fork Testing</a></li>
<li><a href="#gas-snapshots">Gas Snapshots</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-5-vulnerability-classes--first-audit">🛡️ Section 5: Vulnerability Classes & Your First Audit</a></summary>
<ol>
<li><a href="#1-reentrancy">Reentrancy</a></li>
<li><a href="#2-access-control-failures">Access Control Failures</a></li>
<li><a href="#3-oracle-manipulation">Oracle Manipulation</a></li>
<li><a href="#4-integer-overflow">Integer Overflow</a></li>
<li><a href="#5-flash-loan-attacks">Flash Loan Attacks</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-6-defi-attack-vectors">⚡ Section 6: DeFi Attack Vectors</a></summary>
<ol>
<li><a href="#amm-fundamentals-xy--k">AMM Fundamentals</a></li>
<li><a href="#the-price-oracle-problem">The Price Oracle Problem</a></li>
<li><a href="#liquidation-cascades">Liquidation Cascades</a></li>
<li><a href="#erc-4626-inflation-attack">ERC-4626 Inflation Attack</a></li>
<li><a href="#mev-the-dark-forest">MEV: The Dark Forest</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-7-static-analysis--tooling">🔍 Section 7: Static Analysis & Tooling</a></summary>
<ol>
<li><a href="#slither-real-workflow">Slither: Real Workflow</a></li>
<li><a href="#echidna-property-based-fuzzing">Echidna: Property-Based Fuzzing</a></li>
<li><a href="#mythril-symbolic-execution">Mythril: Symbolic Execution</a></li>
<li><a href="#ci-integration">CI Integration</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-8-fuzzing--formal-verification">🔬 Section 8: Fuzzing & Formal Verification</a></summary>
<ol>
<li><a href="#the-testing-pyramid">The Testing Pyramid</a></li>
<li><a href="#certora-prover-formal-verification">Certora Prover: Formal Verification</a></li>
<li><a href="#when-to-use-each">When to Use Each</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-9-writing-a-real-audit-report">📋 Section 9: Writing a Real Audit Report</a></summary>
<ol>
<li><a href="#anatomy-of-a-finding">Anatomy of a Finding</a></li>
<li><a href="#severity-classification">Severity Classification</a></li>
<li><a href="#the-poc-is-non-negotiable">The PoC Is Non-Negotiable</a></li>
<li><a href="#client-communication">Client Communication</a></li>
</ol>
</details>

<details>
<summary><a href="#-section-10-bug-bounty--competitive-audits">🏆 Section 10: Bug Bounty & Competitive Audits</a></summary>
<ol>
<li><a href="#the-platforms">The Platforms</a></li>
<li><a href="#how-code4rena-works">How Code4rena Works</a></li>
<li><a href="#your-first-90-days-a-practical-path">Your First 90 Days</a></li>
<li><a href="#the-business-side">The Business Side</a></li>
</ol>
</details>

<details>
<summary><a href="#the-exploit-gauntlet">💀 The Exploit Gauntlet</a></summary>
<ol>
<li><a href="#gauntlet-contracts">Gauntlet Contracts</a></li>
<li><a href="#running-the-gauntlet">Running the Gauntlet</a></li>
</ol>
</details>

<details>
<summary>Congratulations</summary>
<ol>
<li><a href="#congratulations">Congratulations</a></li>
<li><a href="#where-do-i-go-now">Where Do I Go Now?</a></li>
</ol>
</details>

<details>
<summary>Thank You</summary>
<ol>
<li><a href="#contributors">Contributors</a></li>
<li><a href="#attribution">Attribution</a></li>
</ol>
</details>

---

# Introduction, Resources, and Prerequisites

> Course link: https://chaincodecamp.dev/curriculum

## Resources For This Course

- [GitHub Discussions](https://github.com/GoodnessFx/ChainCodeCamp/discussions) — Ask questions here first
- [Discord](https://discord.gg/chaincodecamp) — Real-time help and community
- [Solodit](https://solodit.xyz/) — Database of every competitive audit finding ever submitted. Invaluable.
- [Rekt News](https://rekt.news/) — Post-mortems on major DeFi hacks written clearly
- [EVM Codes](https://evm.codes/) — Interactive opcode reference with gas costs
- [SC Exploits Minimized](https://github.com/Cyfrin/sc-exploits-minimized) — Cyfrin's minimal exploit examples

### Security Tools Referenced in This Course
- [Slither](https://github.com/crytic/slither) — Static analysis
- [Echidna](https://github.com/crytic/echidna) — Property-based fuzzing
- [Mythril](https://github.com/ConsenSys/mythril) — Symbolic execution
- [Aderyn](https://github.com/Cyfrin/aderyn) — Rust-based static analysis
- [Certora](https://www.certora.com/) — Formal verification
- [Foundry](https://book.getfoundry.sh/) — Testing, fuzzing, fork tests, deployment

### Newsletters Worth Subscribing To
- [Blockchain Threat Intelligence](https://newsletter.blockthreat.io/) — Weekly security round-up
- [Cyfrin Updraft Newsletter](https://www.cyfrin.io/newsletter) — Research tips and resources
- [rekt.news](https://rekt.news/) — Not a newsletter, but bookmark it

## Prerequisites

You should be comfortable with:
- Blockchain basics (transactions, blocks, wallets)
- Basic Solidity (functions, structs, mappings, events)
- Running a test suite — Hardhat or Foundry

If you need to get up to speed:
- [Cyfrin Updraft Foundation Course](https://updraft.cyfrin.io/) — Covers all prerequisites
- [SpeedRun Ethereum](https://speedrunethereum.com/) — Good for Solidity basics

### Prerequisite Tools

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Foundry](https://getfoundry.sh/)
- [VS Code](https://code.visualstudio.com/)
- [Node.js 18+](https://nodejs.org/)

## Outcome

After completing this course you will be able to:

- Audit real smart contracts and write professional findings with PoCs
- Submit to competitive audit platforms (Code4rena, Sherlock, Cantina)
- Find and report bugs on live bug bounty programs (Immunefi)
- Read and understand production assembly (Solady, Uniswap v3, WETH)
- Use the full security toolchain: Slither, Echidna, Mythril, Certora, Foundry
- Write audit reports that clients pay for

---

# Curriculum

# 🤝 Section 0: Welcome to ChainCodeCamp

*Do not skip this section.*

## Why Smart Contract Security?

- Over $1.7B lost to smart contract exploits since 2016
- [Rekt Leaderboard](https://rekt.news/leaderboard/) — the running total
- Web3 hacks result in irreversible fund loss — not just data theft
- Career opportunities are real and growing:
  - Private auditors earn $150k–$500k+/year
  - Competitive auditors earn $2k–$50k/month at scale
  - Single bug bounty findings pay up to $10M on Immunefi

## Who This Is For

- Self-taught developers who can't afford $2k–$5k bootcamps
- African and Nigerian developers breaking into Web3 security
- Developers who want to go beyond building and start defending
- Anyone who finds the Cyfrin/freeCodeCamp approach compelling but wants more depth on the EVM and assembly layers

## How to Use This Course

- **Follow the repo:** Every section has code you run locally. Don't just read.
- **Do the gauntlet:** The exploit challenges are the real exam. Reading about reentrancy is not the same as exploiting it.
- **Use the Discord:** Ask questions. The community is the biggest resource.
- **Go at your own pace:** A section a week is fine. Rushing produces shallow understanding.
- **Learn the tools, not just the bugs:** Slither, Echidna, and Foundry invariant tests find bugs you'll never catch manually.

🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯

🎯 Exercise: Write down *why* you're here. Be specific. "I want to find a $10k bug by month 6." "I want to audit the protocol my community uses." Write it somewhere you'll see it when things get hard.

🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# ⚙️ Section 1: EVM Fundamentals

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/evm-fundamentals" target="_blank">
<img src="https://img.shields.io/badge/Section%2001-EVM%20Fundamentals-ff4d00?style=for-the-badge" alt="Section 01: EVM Fundamentals"/>
</a>
</p>
<br/>

💻 Live Contract Reference: [`0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) — WETH on Ethereum Mainnet

**Concepts covered:** Stack-based execution, memory vs storage vs calldata, gas mechanics, DELEGATECALL, STATICCALL, transient storage (EIP-1153)

## What the EVM Actually Is
- Stack-based state machine, 256-bit slots, max depth 1024
- Every node re-executes every instruction — that's the constraint everything flows from

## The Five Data Locations

| Location | Persists? | Gas cost | Use for |
|---|---|---|---|
| Stack | No | ~3 | Local vars, function args |
| Memory | No | Quadratic | Temp arrays, ABI encoding |
| Storage | Yes | 2,100–20,000 | State variables |
| Calldata | No (read-only) | Cheapest | `external` function inputs |
| Transient | No | 100 | Reentrancy locks (EIP-1153) |

## Gas: The Physics of the EVM
- `SSTORE` new slot: 20,000 gas
- `SSTORE` update: 2,900 gas
- `SLOAD` cold: 2,100 gas
- `SLOAD` warm: 100 gas

## Opcodes That Matter for Security
- `DELEGATECALL` — runs code in your storage context. Parity multi-sig hack vector.
- `STATICCALL` — read-only call, reverts on any state change
- `TSTORE`/`TLOAD` — transient storage, 100 gas, cleared end of tx

## In the Wild: WETH
- The most-called contract on Ethereum
- `deposit()` compiles to ~15 opcodes
- Read its assembly output — best single exercise for internalizing EVM execution

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

🔧 Exercises:
1. Run `cast run <TX_HASH> --rpc-url $MAINNET_RPC_URL` on a real WETH deposit tx
2. Open [evm.codes](https://evm.codes) and look up the gas cost of every opcode used in `deposit()`
3. Run `forge inspect WETH opcodes` — find the `SSTORE` and `LOG2` instructions

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 📝 Section 2: Solidity Mastery

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/solidity-mastery" target="_blank">
<img src="https://img.shields.io/badge/Section%2002-Solidity%20Mastery-2a4ad0?style=for-the-badge" alt="Section 02: Solidity Mastery"/>
</a>
</p>
<br/>

💻 Live Contract Reference: [`0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8`](https://etherscan.io/address/0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8) — Uniswap v3 USDC/ETH Pool

**Concepts covered:** Storage packing, mapping slot calculation, custom errors, transient storage, C3 linearization, ABI encoding pitfalls, 24KB limit

## Storage Layout: The Tetris Rule
- 32-byte slots, packed right-to-left when types fit sequentially
- One avoided slot = 20,000 gas saved on first write
- Use `forge inspect YourContract storage-layout --pretty` to verify

## The `tx.origin` Trap
```solidity
// ❌ Never use tx.origin for auth — phishing attack vector
require(tx.origin == owner);

// ✅ Always use msg.sender
require(msg.sender == owner);
```

## Custom Errors (0.8.4+)
- String reverts cost ~50 bytes of bytecode per message
- Custom errors encode as 4-byte selectors — use them everywhere

## In the Wild: Uniswap v3
- Packs tick data and position info into single storage slots using bitwise masks
- Reading the source is the best exercise for understanding why layout matters at scale

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

🔧 Exercises:
1. Run `forge inspect YourContract storage-layout --pretty` on any contract you've written
2. Replace three `require("string")` statements with custom errors and measure bytecode size change with `forge build --sizes`
3. Open [Solidity by Example](https://solidity-by-example.org/) and read the Delegatecall page

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 🔩 Section 3: Assembly & Yul

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/assembly-and-yul" target="_blank">
<img src="https://img.shields.io/badge/Section%2003-Assembly%20%26%20Yul-ff4d00?style=for-the-badge" alt="Section 03: Assembly & Yul"/>
</a>
</p>
<br/>

**Concepts covered:** Yul syntax, free memory pointer, bitwise masking, dirty bits, unchecked loops, reading Solady and Uniswap v3 assembly

> ⚠️ This is the section freeCodeCamp and most security courses skip entirely. Assembly vulnerabilities — dirty bits, incorrect memory management, missing type masking — are a real and growing audit finding class.

## Why Drop Into Yul?
- Skip overflow checks in provably safe loops
- Manual memory allocation without zero-initialization overhead
- Custom function dispatchers
- Direct slot access

## Solidity's Memory Layout

| Address | Purpose |
|---|---|
| `0x00–0x3F` | Scratch space for hash operations |
| `0x40–0x5F` | **Free memory pointer** |
| `0x60–0x7F` | Zero slot |
| `0x80+` | Active memory |

## The Dirty Bits Problem
- In Yul, Solidity does NOT automatically clean upper bits when reading small types
- A `uint8` read from storage may have non-zero upper 248 bits
- Conditional branches on unmasked values are a real audit finding class
- Always mask: `and(value, 0xff)` before using in conditionals

## Reading Solady
- [Solady](https://github.com/Vectorized/solady) — gold standard for Yul-optimized contracts
- `ERC20.transfer` saves ~400 gas vs OpenZeppelin using assembly
- Read it line by line — every assembly block is commented

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

🔧 Exercises:
1. Open Chisel (`chisel` in your terminal) and test a Yul bitwise mask live
2. Run `forge inspect MyContract ir-optimized` and read the output
3. Read [Solady's ERC20.sol](https://github.com/Vectorized/solady/blob/main/src/tokens/ERC20.sol) — find every assembly block and explain what it does in a comment

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 🛠️ Section 4: Foundry Mastery

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/foundry-mastery" target="_blank">
<img src="https://img.shields.io/badge/Section%2004-Foundry%20Mastery-2a4ad0?style=for-the-badge" alt="Section 04: Foundry Mastery"/>
</a>
</p>
<br/>

**Concepts covered:** Fuzz tests, invariant tests, handler pattern, cheatcodes, fork testing, gas snapshots, deployment scripts

## Why Foundry Won
- Tests in Solidity — no JavaScript translation layer
- Parallel test execution, Rust-compiled EVM
- 1000 tests: 3 minutes in Hardhat → 12 seconds in Foundry

## Invariant Testing
The Euler Finance $197M hack would have been caught by:
```solidity
function invariant_poolSolvent() public view {
    assertGe(pool.totalAssets(), pool.totalBorrowed());
}
```

## The Essential Cheatcodes
```solidity
vm.prank(alice);                          // next call is from alice
vm.deal(alice, 10 ether);                 // set ETH balance
vm.warp(block.timestamp + 7 days);        // advance time
vm.expectRevert(MyError.selector);        // expect revert
vm.createFork(vm.envString("RPC_URL"));   // fork mainnet
```

## Tooling
- [The Foundry Book](https://book.getfoundry.sh/)
- [Invariant Testing Workshop by horsefacts](https://github.com/horsefacts/weth-invariant-testing)

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

🔧 Exercises:
1. Write a fuzz test for any function that takes `uint256` input — run `forge test --fuzz-runs 10000`
2. Write one invariant property for a contract you've written — run `forge test --match-test invariant`
3. Run `forge snapshot` — add it to your repo and check the diff next time you change something

🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧🔧

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 🛡️ Section 5: Vulnerability Classes & Your First Audit

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/vulnerability-classes" target="_blank">
<img src="https://img.shields.io/badge/Section%2005-Vulnerability%20Classes-ff4d00?style=for-the-badge" alt="Section 05: Vulnerability Classes"/>
</a>
</p>
<br/>

💻 Gauntlet Contract (Reentrancy): [`/gauntlet/src/ReentrancyVault.sol`](./gauntlet/src/ReentrancyVault.sol)

💻 Gauntlet Contract (Access Control): [`/gauntlet/src/FlawedAccessControl.sol`](./gauntlet/src/FlawedAccessControl.sol)

💻 Gauntlet Contract (Oracle): [`/gauntlet/src/OracleLender.sol`](./gauntlet/src/OracleLender.sol)

> 🔴 **Real Hack — The DAO (2016) — $60M lost**
> 
> External call before state update. Attacker re-entered `withdraw()` recursively. Led to the Ethereum/Ethereum Classic split.

**Concepts covered:** CEI pattern, reentrancy, cross-function reentrancy, read-only reentrancy, access control, oracle manipulation, integer overflow, flash loan attacks, governance attacks

## The Security Mindset: Invariants

Before touching any codebase, define what must **always** be true:
- `totalCollateral >= totalDebt`
- `no user can withdraw more than they deposited`
- `owner can only be set once`

If any sequence of calls can break an invariant, the protocol is exploitable.

## Reentrancy: Checks-Effects-Interactions

```solidity
// ❌ Vulnerable — external call before state update
function withdraw() external {
    uint256 bal = balances[msg.sender];
    (bool ok,) = msg.sender.call{value: bal}(""); // attacker re-enters here
    balances[msg.sender] = 0; // too late
}

// ✅ Fixed — CEI pattern
function withdraw() external nonReentrant {
    uint256 bal = balances[msg.sender];
    balances[msg.sender] = 0;    // Effect first
    (bool ok,) = msg.sender.call{value: bal}(""); // Interaction last
    require(ok);
}
```

## Historical Case Studies

| Vulnerability | Protocol | Year | Loss |
|---|---|---|---|
| Reentrancy | The DAO | 2016 | $60M |
| Unprotected initializer | Parity Multi-sig | 2017 | $30M |
| Oracle manipulation | Mango Markets | 2022 | $114M |
| Integer overflow | BEC Token | 2018 | $800M paper loss |
| Flash loan governance | Beanstalk | 2022 | $182M |

🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️

🛡️ Exercises:
1. Run `forge test --match-contract ReentrancyVault -vvv` in `/gauntlet` — make the test pass by implementing the attack
2. Run `forge test --match-contract FlawedAccessControl -vvv` — implement the unprotected initializer exploit
3. Search ["reentrancy" on Solodit](https://solodit.xyz/) — read three real findings and study their PoCs

🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️🛡️

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# ⚡ Section 6: DeFi Attack Vectors

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/defi-attack-vectors" target="_blank">
<img src="https://img.shields.io/badge/Section%2006-DeFi%20Attack%20Vectors-ff4d00?style=for-the-badge" alt="Section 06: DeFi Attack Vectors"/>
</a>
</p>
<br/>

💻 Gauntlet Contract (Oracle): [`/gauntlet/src/OracleLender.sol`](./gauntlet/src/OracleLender.sol)

💻 Gauntlet Contract (Inflation): [`/gauntlet/src/InflationVault.sol`](./gauntlet/src/InflationVault.sol)

💻 Gauntlet Contract (Governance): [`/gauntlet/src/Governor.sol`](./gauntlet/src/Governor.sol)

> 🔴 **Real Hack — Euler Finance (2023) — $197M lost**
>
> Missing health check in `donateToReserves()`. Attacker self-liquidated after artificially inflating their debt. Returned most funds after negotiation.

**Concepts covered:** AMM invariants, spot price oracle manipulation, liquidation cascades, ERC-4626 inflation attack, MEV sandwich attacks, flash loan governance raids

## The Price Oracle Stack

| Source | Manipulation cost | Use for |
|---|---|---|
| Chainlink | Very high (21+ nodes) | Collateral, liquidations |
| Uniswap v3 TWAP | High (sustained capital) | Secondary checks |
| Spot reserve ratio | Zero (one transaction) | **Never use for critical paths** |

## MEV: The Dark Forest
- Every transaction in the public mempool is visible before inclusion
- Sandwich attack: bot buys → your swap executes at worse price → bot sells
- Defence: strict `minAmountOut` slippage, private RPCs (Flashbots Protect)

⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡

⚡ Exercises:
1. Run `forge test --match-contract OracleLender -vvv` — implement the flash loan oracle manipulation attack
2. Run `forge test --match-contract InflationVault -vvv` — implement the first-depositor inflation attack
3. Run `forge test --match-contract Governor -vvv` — implement the flash loan governance raid (hardest one in the gauntlet)

⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡

🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊

**If you've made it to here and can pass all the gauntlet tests up to Section 6, you have real skills.** You could start submitting to CodeHawks First Flights or low-stakes Code4rena contests today. But if you want the full stack — tooling, formal verification, professional reports, and a real path to paid work — keep going.

🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 🔍 Section 7: Static Analysis & Tooling

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/static-analysis-tooling" target="_blank">
<img src="https://img.shields.io/badge/Section%2007-Static%20Analysis%20%26%20Tooling-2a4ad0?style=for-the-badge" alt="Section 07: Static Analysis & Tooling"/>
</a>
</p>
<br/>

**Concepts covered:** Slither triage workflow, Echidna property writing, Mythril symbolic execution, CI integration with GitHub Actions

## The Tooling Stack

| Tool | Type | Best for |
|---|---|---|
| [Slither](https://github.com/crytic/slither) | Static analysis | Quick triage, common patterns |
| [Aderyn](https://github.com/Cyfrin/aderyn) | Static analysis | Rust-based, fast, beginner-friendly |
| [Echidna](https://github.com/crytic/echidna) | Fuzzer | Protocol invariant violations |
| [Mythril](https://github.com/ConsenSys/mythril) | Symbolic execution | Deep logical path analysis |
| [Foundry fuzz](https://book.getfoundry.sh/) | Fuzzer | Function-level input testing |
| [Certora](https://www.certora.com/) | Formal verification | Mathematical proofs |

## Slither: The Starting Point

```bash
pip install slither-analyzer
slither . --exclude-informational
```

**Triage rule:** Read every High and Medium. Verify exploitability manually. Mark false positives with `// slither-disable-next-line detector-name`.

## Echidna Properties

```solidity
// Property: vault solvency — must always hold
function echidna_solvency() public view returns (bool) {
    return address(vault).balance >= vault.totalDeposits();
}
```

When Echidna breaks a property it outputs the minimum reproducing call sequence — your PoC for free.

🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍

🔍 Exercises:
1. Run `slither gauntlet/src/` — it should flag reentrancy in `ReentrancyVault.sol` and unprotected init in `FlawedAccessControl.sol`. Verify both manually.
2. Write one Echidna property for any contract you've written
3. Add a Slither step to a GitHub Actions workflow that fails CI on any medium severity finding

🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 🔬 Section 8: Fuzzing & Formal Verification

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/fuzzing-formal-verification" target="_blank">
<img src="https://img.shields.io/badge/Section%2008-Fuzzing%20%26%20Formal%20Verification-ff4d00?style=for-the-badge" alt="Section 08: Fuzzing & Formal Verification"/>
</a>
</p>
<br/>

**Concepts covered:** The testing pyramid, Foundry handler-based invariant testing, Certora CVL specs, SMT solvers, when formal verification is worth it

## The Testing Pyramid

```
Unit tests      → prove it works for specific inputs you thought of
Fuzz tests      → prove it works for random inputs the machine generates
Invariant tests → prove a property holds across all reachable states
Formal proofs   → prove a property holds for ALL possible inputs, mathematically
```

## Certora: Real-World Use

MakerDAO used Certora to find a rounding error in their DAI savings rate contract that accumulated over millions of calls. No fuzzer caught it — formal verification explored all time orderings.

```bash
pip install certora-cli
certoraRun contracts/Vault.sol --verify Vault:specs/Vault.spec
```

## When Formal Verification Is Worth It

Use it for properties where violation means protocol insolvency or permanent fund loss. Fuzz everything else.

🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬

🔬 Exercises:
1. Write a handler-based Foundry invariant test for any protocol you've studied
2. Try the [Certora tutorial](https://github.com/Certora/Examples) — it's free and runs in under an hour
3. Run `solc --model-checker-engine chc --model-checker-targets "assert,overflow" YourContract.sol` — the built-in SMT checker is free

🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬🔬

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 📋 Section 9: Writing a Real Audit Report

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/writing-audit-reports" target="_blank">
<img src="https://img.shields.io/badge/Section%2009-Writing%20Audit%20Reports-2a4ad0?style=for-the-badge" alt="Section 09: Writing Audit Reports"/>
</a>
</p>
<br/>

**Concepts covered:** Scope definition, severity classification, PoC writing, client communication, professional report structure

## Finding Template

```markdown
### [H-01] Title (ROOT CAUSE + IMPACT)

**Severity:** High

**Summary:**
One paragraph. What is wrong and what is the impact?

**Vulnerability Details:**
Exact file, line number, and explanation of the flaw.

**Impact:**
Quantified. "Complete loss of all ETH in the vault" not "may cause issues."

**Proof of Concept:**
```solidity
// Foundry test that passes and demonstrates the exploit
function testExploit() public { ... }
```
Run: `forge test --match-test testExploit -vvv`

**Recommended Fix:**
Specific code change, not "add validation."
```

## Severity Classification

| Severity | Impact + Likelihood |
|---|---|
| Critical | Complete fund loss, likely to be triggered |
| High | Partial fund loss or broken core function |
| Medium | Minor fund loss or degraded functionality |
| Low | No fund risk, bad UX or edge case |
| Informational | Code quality, best practice, missing NatSpec |
| Gas | Optimisation opportunity |

## Report Templates
- [Cyfrin Audit Report Template](https://github.com/Cyfrin/audit-report-templating) — industry standard
- [Code4rena finding format](https://docs.code4rena.com/roles/wardens/judging-criteria) — required for C4 submissions

📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋

📋 Exercises:
1. Write a complete finding for `ReentrancyVault.sol` using the template above — include a passing Foundry PoC
2. Classify it with severity justification
3. Compare your finding to `/gauntlet/solutions/ReentrancyAttack.sol`

📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 🏆 Section 10: Bug Bounty & Competitive Audits

<br/>
<p align="center">
<a href="https://chaincodecamp.dev/curriculum/bug-bounty-competitive-audits" target="_blank">
<img src="https://img.shields.io/badge/Section%2010-Bug%20Bounty%20%26%20Competitive%20Audits-ff4d00?style=for-the-badge" alt="Section 10: Bug Bounty & Competitive Audits"/>
</a>
</p>
<br/>

**Concepts covered:** Platform comparison, how submissions are judged, what separates winning reports, your first 90 days, the income picture

## The Platforms

| Platform | Model | Best for |
|---|---|---|
| [Code4rena](https://code4rena.com) | Competitive (judged) | Learning, community, first submissions |
| [Sherlock](https://sherlock.xyz) | Competitive (fixed payouts) | Stricter, more predictable income |
| [Cantina](https://cantina.xyz) | Competitive + private | Growing reputation |
| [Immunefi](https://immunefi.com) | Bug bounty (live protocols) | High-value single findings |
| [Codehawks](https://codehawks.cyfrin.io) | Competitive (Cyfrin) | Beginner-friendly, lower competition |

## Your First 90 Days

**Month 1 — Read, don't submit yet:**
- Pick a finished Code4rena contest
- Try to find the High findings *before* reading the report
- Compare what you found vs what was found

**Month 2 — Shadow audit:**
- Find a live contest, audit it seriously, write findings as if submitting
- After it closes, compare against the public report

**Month 3 — Submit:**
- Pick a contest where you're confident in at least 2 findings
- Submit with full PoCs
- Expect your first submissions to be rejected or downgraded — that is normal

## The Income Picture (18–24 months in)
- Competitive audits: $2k–$20k/month
- Private audits: $5k–$50k per engagement (needs 3–5 public wins first)
- Full-time at a firm (Spearbit, Trail of Bits, Cyfrin, OpenZeppelin): $120k–$300k+
- Single Immunefi finding: potentially life-changing

🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆

🏆 Exercises:
1. Sign up for [Code4rena](https://code4rena.com) and [Sherlock](https://sherlock.xyz) today
2. Go to [Solodit](https://solodit.xyz) and read three High findings from recent contests — study their PoCs
3. Find a finished contest, clone the audited repo, try to find the bugs yourself before reading the report
4. [Tweet about completing the ChainCodeCamp curriculum](https://twitter.com/intent/tweet?text=Just%20completed%20the%20ChainCodeCamp%20smart%20contract%20security%20curriculum%20%F0%9F%94%90%0a%0aFree%20education%20for%20African%20%26%20self-taught%20devs%20%E2%80%94%20github.com%2FGoodnessFx%2FChainCodeCamp)

🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# 💀 The Exploit Gauntlet

<br/>
<p align="center">
<a href="./gauntlet" target="_blank">
<img src="https://img.shields.io/badge/Exploit%20Gauntlet-9%20Challenges-ff4d00?style=for-the-badge" alt="The Exploit Gauntlet"/>
</a>
</p>
<br/>

The gauntlet is the exam. 9 deliberately vulnerable contracts. Each one has a failing Foundry test and a stub attack contract. Your job: implement the exploit, make the test pass.

```bash
cd gauntlet
forge install
forge test -vvv
# All tests fail until you implement the attacks
```

## Gauntlet Contracts

| Contract | Vulnerability | Real-world mirror |
|---|---|---|
| [`ReentrancyVault.sol`](./gauntlet/src/ReentrancyVault.sol) | Classic single-function reentrancy | The DAO (2016) |
| [`CrossReentrancyVault.sol`](./gauntlet/src/) | Cross-function reentrancy | Cream Finance (2021) |
| [`FlawedAccessControl.sol`](./gauntlet/src/FlawedAccessControl.sol) | Unprotected initializer | Parity Multi-sig (2017) |
| [`OracleLender.sol`](./gauntlet/src/OracleLender.sol) | Spot price oracle manipulation | Mango Markets (2022) |
| [`OverflowToken.sol`](./gauntlet/src/OverflowToken.sol) | Integer overflow (Solidity 0.7) | BEC Token (2018) |
| [`InflationVault.sol`](./gauntlet/src/InflationVault.sol) | ERC-4626 first-depositor inflation | Multiple vaults (2022–23) |
| [`Governor.sol`](./gauntlet/src/Governor.sol) | Flash loan governance raid | Beanstalk (2022) |
| [`ProxyTakeover.sol`](./gauntlet/src/ProxyTakeover.sol) | Delegatecall storage collision | Audius (2022) |
| [`ChainedExploitVault.sol`](./gauntlet/src/ChainedExploitVault.sol) | Chained: access control + reentrancy | Compound liquidation bug |

## Running the Gauntlet

```bash
# Run all tests (all should fail initially)
cd gauntlet
forge test -vvv

# Run one at a time
forge test --match-contract ReentrancyVault -vvv
forge test --match-contract FlawedAccessControl -vvv
forge test --match-contract OracleLender -vvv
forge test --match-contract OverflowToken -vvv
forge test --match-contract InflationVault -vvv
forge test --match-contract Governor -vvv
forge test --match-contract ProxyTakeover -vvv
forge test --match-contract ChainedExploitVault -vvv
```

Solutions are in [`/gauntlet/solutions/`](./gauntlet/solutions/). Don't look until you've tried.

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# Congratulations

🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊 You completed the course! 🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊

If you've made it through all 10 sections and can pass all 9 gauntlet challenges, you are ready. Not "almost ready." Ready to submit real findings, compete in real contests, and get paid.

## Where Do I Go Now?

**Competitive Audits — start here:**
- [Codehawks First Flights](https://codehawks.cyfrin.io/) — lowest competition, good for first submissions
- [Code4rena](https://code4rena.com/) — largest ecosystem, most learning resources
- [Sherlock](https://sherlock.xyz/) — stricter, more predictable payouts

**Bug Bounties — when you're ready:**
- [Immunefi](https://immunefi.com/) — up to $10M per finding on live protocols

**Keep Learning:**
- [Solodit](https://solodit.xyz/) — every competitive finding ever. Read one a day.
- [rekt.news](https://rekt.news/) — post-mortems on major hacks
- [Patrick Collins YouTube](https://www.youtube.com/@PatrickAlphaC) — best free content on advanced Solidity
- [Owen Thurm YouTube](https://www.youtube.com/@0xOwenThurm) — competitive audit strategies
- [Cyfrin Updraft](https://updraft.cyfrin.io/) — complementary to this curriculum

## Certifications

Free, verifiable certificate on completion of each track at [chaincodecamp.dev/certificate](https://chaincodecamp.dev/certificate).

- No paywall. No signup wall on course content. If there is ever a paid tier it will be for 1-on-1 mentorship only.
- Each certificate has a unique verification ID and a public URL
- Download as PNG or share directly

---

# Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/GoodnessFx/ChainCodeCamp.git
cd ChainCodeCamp

# 2. Install app dependencies
cd app
npm install

# 3. Set up environment (optional — works without Supabase via localStorage)
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Start the dev server
npm run dev
# → http://localhost:3000

# 5. Run the exploit gauntlet
cd ../gauntlet
forge install
forge test -vvv
```

**Supabase setup (optional for progress sync):**
1. Create a free project at [supabase.com](https://supabase.com)
2. Run `app/supabase/schema.sql` in the SQL editor
3. Add project URL + anon key to `.env.local`

---

# Contributing

Every section of this curriculum was improved by someone in the community. If you spot an error, a better example, or a missing case study — open a PR.

Most useful contributions:
- **Fix errors** — wrong opcode costs, outdated Solidity syntax, broken contract links
- **Add case studies** — real hacks with Foundry PoCs, especially African protocol hacks
- **Write new sections** — ZK security, cross-chain bridge attacks, account abstraction vulnerabilities
- **Translate** — Yoruba, Igbo, Swahili, Hausa, French (West Africa)
- **Audit clinic** — submit a contract for community review in Discord. Reviewer gets full credit.

```bash
git checkout -b section/your-contribution
# make changes
git commit -m "section/05: add Cream Finance cross-reentrancy case study"
git push origin section/your-contribution
# open PR
```

All contributors are credited in the section they improve.

---

# Thank You

## Attribution

This curriculum would not exist without studying:

- **[freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp)** — for proving that free, structured, high-quality education at scale is possible. The certification model, the curriculum structure, and the "no paywall on core content" principle are directly adopted here.
- **[Cyfrin Updraft / security-and-auditing-full-course-s23](https://github.com/Cyfrin/security-and-auditing-full-course-s23)** by Patrick Collins and Tincho — for the section anatomy, real deployed contract links, PasswordStore audit pattern, and the "security researcher not auditor" framing. If you haven't taken their course alongside this one, you should.
- **[The Red Guild](https://theredguild.org/)** — for Tincho's approach to manual review methodology
- **[Trail of Bits](https://www.trailofbits.com/)**, **[Spearbit](https://spearbit.com/)**, **[OpenZeppelin](https://openzeppelin.com/)** — for publishing their audit reports publicly and raising the standard for the whole industry

## More Security Resources

- [Solcurity](https://github.com/transmissions11/solcurity) — Checklist for Solidity security
- [Smart Contract Security Field Guide](https://scsfg.io/)
- [Secure Contracts](https://secure-contracts.com/)
- [OpenCoreCH Auditing Heuristics](https://github.com/OpenCoreCH/smart-contract-auditing-heuristics)
- [Crytic Properties](https://github.com/crytic/properties)
- [SC Exploits Minimized](https://github.com/Cyfrin/sc-exploits-minimized)

---

<div align="center">

[![Twitter/X](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/chaincodecamp)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/chaincodecamp)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GoodnessFx/ChainCodeCamp)

<sub>MIT Licensed. Free forever. Built with stubbornness. Dedicated to every self-taught dev who couldn't afford the bootcamp.</sub>

</div>

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>
