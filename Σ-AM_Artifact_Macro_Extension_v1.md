# Σ-AM — Artifact Macro Extension (v1)

## Status
**Non-breaking extension specification**  
Compatible with **Σ-IR v1.0** and **Σ-NF v1**

Σ-AM defines an explicit, deterministic mechanism for emitting
**protocol-level structural artifacts** during Σ-IR execution.

---

## 1. Purpose

Σ-AM introduces **opt-in artifact emission** to support:

- auditability
- benchmarking
- observability
- workflow continuity
- protocol receipts

Artifacts are:
- externally observable
- deterministic in structure
- protocol-scoped
- non-semantic

Artifacts are **not reasoning traces**.

---

## 2. Non-Goals (Normative)

Σ-AM does NOT:

- expose chain-of-thought
- reveal internal reasoning
- expose latent activations
- imply correctness or confidence
- guarantee textual determinism
- persist state across sessions

Artifacts record **what occurred**, not **why**.

---

## 3. Syntax

Artifact macros are declared using a reserved namespace modifier
in the Modifiers (M) field of a Σ-IR block.

### Reserved Form

#artifact:<type>


Artifact macros MAY appear alongside other modifiers.

### Example
[[I2 C0 S1 O4 | system-design | #artifact:receipt]]


---

## 4. Default Policy (Critical)

### Artifact Emission Default

> **No artifacts are enabled by default.**

An artifact MUST NOT be emitted unless:
1. A valid `#artifact:<type>` modifier is explicitly present, and
2. The modifier survives Σ-NF normalization.

Absence of `#artifact:*` implies:
- no receipts
- no metrics
- no placeholders
- no audit logs

Silence is the default state.

---

## 5. Normalization (Σ-NF Compatibility)

Artifact macros normalize under existing Σ-NF rules:

- treated as namespace modifiers (`#`)
- sorted lexicographically with other `#` modifiers
- duplicates removed
- byte-stable

Unknown artifact types are invalid.

---

## 6. Artifact Classes (Closed Set — v1)

Σ-AM v1 defines the following artifact types.
Unrecognized types MUST be rejected.

---

### 6.1 `#artifact:receipt` — Protocol Receipt

#### Purpose
Emit a **protocol receipt** summarizing execution facts.

#### Receipt MAY record:
- active I*, C*, S*, O* primitives
- active IΣ scope (if any)
- active Σ-LAW cognitive level
- error state (if any)
- checkpoint emission status

#### Receipt MUST NOT include:
- reasoning text
- explanations
- probabilities
- confidence claims

#### Canonical Receipt Schema

‹RECEIPT:v1;
I=I*;
C=C*;
S=S*;
O=O*;
cog=L*;
E=none|E*;
SΣ=none|emitted›



Field order is fixed and deterministic.

---

### 6.2 `#artifact:metrics` — Quantitative Metrics

#### Purpose
Emit non-semantic quantitative measurements.

#### Allowed Metrics
- tokens-in
- tokens-out
- blocks-processed
- errors-count
- checkpoints-count
- retries-count

#### Example

‹METRICS:tokens-in=312;tokens-out=198;blocks=1;errors=0›


Metrics are observational only.

---

### 6.3 `#artifact:decision-surface` — Decision Outcome Record

#### Purpose
Record **decision outcomes**, not reasoning.

Used primarily with Σ-LAW.

#### Example

‹DECISION:cog-level=L2;cause=ρirr+εhigh›


---

### 6.4 `#artifact:placeholder` — Deferred Resolution Slot

#### Purpose
Emit a formal structural placeholder for deferred work.

Examples:
- missing inputs
- unresolved references
- future commitments

#### Example

‹PLACEHOLDER:resolve-output-format›


Placeholders are explicit and intentional.

---

## 7. Emission Rules (Normative)

1. Artifacts are emitted **only when explicitly requested**
2. Artifacts are **additive** and never modify semantics
3. Artifact emission MUST be deterministic given:
   - normalized Σ-IR
   - active SΣ
   - active IΣ
   - active Σ-LAW state
4. If artifact emission violates constraints:
   - emit `E3` (invalid-state)

---

## 8. Interaction with Σ-LAW

- Σ-LAW MAY populate artifact fields
- Σ-LAW MUST NOT autonomously emit artifacts
- Cognitive escalation is recorded **only if artifacts are enabled**

---

## 9. Interaction with SΣ (State Checkpoints)

- Artifacts do NOT persist state
- Artifacts MAY reference checkpoint emission
- Persistent state remains exclusive to SΣ

Receipts ≠ Saves.

---

## 10. Determinism Guarantees

Given identical:
- normalized Σ-IR
- active SΣ
- active IΣ
- active Σ-LAW constraints

Σ-AM MUST emit:
- identical artifact schemas
- identical field sets
- identical ordering

Measured values may differ only if the underlying measurement differs.

---

## 11. Compliance

A compliant Σ-AM implementation:

- rejects unknown artifact types
- emits no artifacts by default
- preserves Σ-NF invariants
- never leaks reasoning

---

## 12. Minimal Example

[[I3 C0 S1 O2 | benchmark-eval | #artifact:receipt #artifact:metrics]]


Possible output:

‹RECEIPT:v1;I=I3;C=C0;S=S1;O=O2;cog=L1;E=none;SΣ=none›
‹METRICS:tokens-in=512;tokens-out=301;blocks=1;errors=0›


---

## 13. Versioning

This is **Σ-AM v1**.

Breaking changes require a new version identifier (e.g. `#am2`).

---

## End of Specification

