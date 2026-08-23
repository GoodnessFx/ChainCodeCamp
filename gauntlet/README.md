# Exploit Gauntlet

A hands-on Foundry practice arena for the **Exploit Gauntlet** module. Nine vulnerable contracts from every era of DeFi — exploit them, don't just read about them.

## Setup

```bash
forge install foundry-rs/forge-std
forge build
forge test
```

Every test currently fails. The attack contracts in `src/attacks/` (`revert("Not implemented")`) are your stubs — implement the exploit, and the test passes.

> All fuzz/property/invariant checks are disabled on purpose: you are fighting a bounded, single-shot exploit, not a fuzzer.

## The Rules

- **Compromise the target** — nothing else.
- **Do not modify** `src/` targets, `test/`, or `foundry.toml`. (Changing the target to pass is not an exploit.)
- The attack stub defines your expected interface. Write your exploit in `src/attacks/`.
- `solutions/` holds the reference exploits — **do not peek** until you are stuck. Looking is not learning.

## Target Map

### Beginner
| # | Challenge | Vulnerability | Seed State |
|---|-----------|---------------|------------|
| 1 | `ReentrancyVault` | Classic reentrancy (unchecked external call + state update after) | 10 ETH |
| 2 | `FlawedAccessControl` | Missing access control on `setOwner` (constructor only controls the deployer) | 10 ETH |
| 3 | `OverflowToken` | Pre-0.8 integer overflow in `batchTransfer` (pinned `0.7.6`) | 1,000 tokens, holder stuck |

### Intermediate
| # | Challenge | Vulnerability | Seed State |
|---|-----------|---------------|------------|
| 4 | `SimplePool` | No reentrancy guard: ETH sent **before** state update | 1,000,000 tokens / 100 ETH |
| 5 | `OracleLender` | Oracle reads live pool reserves → flash-loanable price manipulation | 120 ETH / pool liquidity |
| 6 | `ProxyTakeover` | Upgradeable proxy: `setImplementation`+`initialize` walk to a private `execute` slot | 10 ETH |
| 7 | `InflationVault` | First-depositor share-inflation (balance-of-based mint) | 1,000 tokens victim / 1,000+1 attacker |

### Advanced
| # | Challenge | Vulnerability | Seed State |
|---|-----------|---------------|------------|
| 8 | `ChainedExploitVault` | Chain them: unauthorized reject-chain then state-before-call reentrancy in `withdraw` | 9 ETH victim / 1 ETH attacker |
| 9 | `Governor` + `GovToken` | Single-transaction governance raid: flash-borrow votes, propose, pass, drain | 100 ETH treasury / 1,000 tokens flashable |

**Bonus / Capstone:** `CrossReentrancyAttack` (in `solutions/`) hits `SimplePool` *and* `OracleLender` in one transaction — the pool's ETH callback reenters the lender before either contract updates state. Attack both in a single `pwn()`.

## Workflow

1. `forge test --match-contract <Challenge>` — read the failing test to learn the on-chain end state.
2. Read the target contract in `src/`, then your stub's interface in `src/attacks/`.
3. Implement the exploit using the exact contract you designed above.
4. `forge test --match-contract <Challenge>` again — green means the target is compromised.

## Design Notes

Everything is `MFV-minimal` (Minimal-Footprint Vulnerability): the bugs are the *only* global constraints you must overcome; normal operations behave correctly. E.g. `SimplePool` handles the happy path, holds honest reserves, and only fails when you attack its ETH-before-state-update cash flow. This mirrors how you'll triage real code: find the one flawed property, not a stack of misfeatures.

## Directory

```
src/              vulnerable targets (DO NOT MODIFY)
src/attacks/      your exploit stubs (implement here)
test/             forge-std tests, each asserting the compromised end-state (DO NOT MODIFY)
solutions/        reference exploits (peek only when stuck)
foundry.toml      per-pragma compilation (0.7.6 + 0.8.x co-exist)
```