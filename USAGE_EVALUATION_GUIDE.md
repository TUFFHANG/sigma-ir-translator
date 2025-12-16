
Σ-IR Usage & Evaluation Guide (v1)

Non-Normative Companion to the Σ-IR Handoff Codex

0. Status & Scope

This document is non-normative.

It does not define Σ-IR syntax or semantics

It does not override the Σ-IR codex

It explains how Σ-IR is intended to be used, evaluated, and benchmarked

The authoritative specification is the Σ-IR Handoff Codex v1.0.

This guide exists to prevent:

misuse

overclaims

invalid benchmarks

incorrect mental models

1. What Σ-IR Is (and Is Not)
Σ-IR IS

a control-plane intermediate representation

a deterministic instruction and state protocol

a compression mechanism for intent, constraints, and control

a way to make LLM interaction explicit, stable, and resumable

Σ-IR IS NOT

a new natural language

a reasoning algorithm

a memory system

a way to modify LLM internals

a guarantee of correctness or intelligence gains

Key clarification
Σ-IR structures what is supplied to the model and how reasoning is scaffolded.
It does not change how the model internally reasons.

2. Correct Mental Model

The correct abstraction is:

Layer    Role
LLM    stochastic text generator
Σ-IR    control & intent representation
Σ-NF    canonicalization & determinism
Σ-SC    explicit state persistence
Σ-EC    structural error signaling
Σ-LAW    cognitive allocation policy

Σ-IR should be thought of like:

LLVM IR vs C

bytecode vs source

protocol vs chat transcript

It is infrastructure, not content.

3. Implicit Continuation (Critical)
Definition

Within a single chat session:

Absence of a new Σ-IR block implies continuation under the active intent, state, and constraints.

This is by design.

Consequences

“Proceed” does not require a new block

New blocks are required only to:

change intent

change constraints

emit state

signal error

alter output mode

Common mistake (invalid benchmarking)

❌ Appending a “continue” block every turn
❌ Treating Σ-IR as chat text
❌ Charging Σ-IR per-turn continuation cost

This collapses Σ-IR into English and invalidates benchmarks.

4. State Checkpoints (SΣ)
What SΣ Is

An SΣ block is an explicit save file.

It captures:

decided: facts

assumed: working assumptions

locked: invariants

optional cognitive metadata (e.g. cog-level:)

What SΣ Is Not

not conversational memory

not automatic

not a log

not required every turn

When to Create an SΣ (Eligibility, Not Enforcement)

A checkpoint is eligible when any of the following hold:

a decision becomes irreversible

restating context would cost more than a checkpoint

future work depends on current assumptions

the work is likely to exceed one chat window

a phase boundary is crossed (design → implementation)

Checkpoint creation is always explicit and opt-in.

5. Error Signaling (Σ-EC)

Σ-EC exists to prevent:

hallucinated confidence

silent failure

conversational hedging

An error block is:

declarative

authoritative

halting

Benchmarks and workflows must treat E* blocks as terminal until resolved.

6. Thinking Subsets & Cognitive Allocation
IΣ (Thinking Subset)

IΣ constrains scaffolding, not intelligence.

It controls:

representation space

expansion allowance

memory reference rules

It does not:

limit capability

guarantee depth

force correctness

Σ-LAW + Σ-INTENT

Σ-LAW governs how much cognition is permitted, not how to reason.

Σ-INTENT declares:

depth tolerance

error cost

reversibility

framing sensitivity

This enables:

conservative defaults

explicit escalation

deterministic failure when constraints conflict

7. Benchmarking Σ-IR Correctly
What Σ-IR Benchmarks Measure

Σ-IR benchmarks measure:

control overhead

context restatement cost

amortization across turns

state survivability

They do not measure:

reasoning accuracy

task success rates

intelligence improvements

Correct Benchmark Model
Aspect    English    Σ-IR
Initial plan    explicit    explicit
Continuation    repeated text    implicit
Constraint reuse    linear cost    zero marginal cost
Long workflows    drift-prone    stable
Codex Cost Accounting

Codex upload is a one-time bootstrap cost

It must not be charged per turn

This is equivalent to not charging a compiler spec per function call

8. Research & ARC-Style Tasks

Σ-IR is appropriate for ARC-style evaluation only for:

measuring prompt overhead

measuring retry cost

measuring context growth

measuring drift across iterations

Valid claim:

Σ-IR reduces control and context overhead while solving ARC-style tasks.

Invalid claim:

Σ-IR improves abstract reasoning ability.

9. Failure Modes & Misuse

Σ-IR can fail if:

used during early ideation where structure is premature

checkpoints are created automatically

Σ-LAW is treated as an oracle

users assume memory across chats

benchmarks conflate protocol cost with intelligence

These are usage errors, not design flaws.

10. Versioning & Stability

Σ-IR v1.0 is stable

Grammar and normalization are frozen

Extensions are versioned

This guide may evolve independently

11. One-Sentence Summary

Σ-IR does not make models smarter; it makes human-LLM interaction more explicit, stable, and economical by treating intent, state, and control as first-class artifacts.

End of Guide
