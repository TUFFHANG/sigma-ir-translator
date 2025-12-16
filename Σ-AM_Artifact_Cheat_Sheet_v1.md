# Σ-AM Artifact Cheat Sheet (v1)

This document is a **quick reference** for using Σ-AM artifact macros.
It is non-normative and intended for daily use.

---

## Default Rule

**Nothing is emitted unless you ask for it.**

No artifacts are on by default.

---

## How to Enable Artifacts

Add `#artifact:<type>` to the Modifiers (M) field.

### Example

[[I2 C0 S1 O4 | system-design | #artifact:receipt #artifact:metrics]]


---

## Artifact Types (v1)

| Artifact | Purpose | Safe For Benchmarks |
|--------|--------|---------------------|
| `receipt` | protocol execution summary | ✅ |
| `metrics` | token & count measurements | ✅ |
| `decision-surface` | decision outcomes (Σ-LAW) | ⚠️ |
| `placeholder` | deferred resolution slot | ✅ |

---

## `#artifact:receipt`

**Use when you want:**
- audit trail
- reproducibility
- execution confirmation

**Does NOT include reasoning.**

Example output:
‹RECEIPT:v1;I=I2;C=C0,C2;S=S1;O=O4;cog=L1;E=none;SΣ=emitted›


---

## `#artifact:metrics`

**Use when you want:**
- token counts
- benchmark data
- instrumentation

Example output:

METRICS:tokens-in=312;tokens-out=198;blocks=1;errors=0›


---

## `#artifact:decision-surface`

**Use when you want:**
- record escalation outcomes
- document irreversible decisions

Example:

‹DECISION:cog-level=L2;cause=ρirr+εhigh›


---

## `#artifact:placeholder`

**Use when you want:**
- explicit TODOs
- missing input anchors
- deferred commitments

Example:

‹PLACEHOLDER:provide-model-manifest›


---

## Common Patterns

### Benchmarking

#artifact:receipt #artifact:metrics


### Research / Audit

#artifact:receipt #artifact:decision-surface

### Draft / Planning
#artifact:placeholder


---

## What Artifacts Will Never Do

Artifacts will NEVER:
- show chain-of-thought
- show hidden reasoning
- guarantee correctness
- persist state
- appear unless requested

---

## Mental Model

- **Σ-IR blocks** = instructions
- **SΣ blocks** = save files
- **Artifacts** = logs / receipts
- **Σ-LAW** = allocation policy

Each has a single job.

---
## Common Command Bundles (Optional)

The following are example modifier bundles users may apply explicitly.
They are not defaults and have no special meaning beyond the syntax shown.

Benchmarking:
#artifact:receipt #artifact:metrics

Audit / Research:
#artifact:receipt #artifact:decision-surface

Draft / Planning:
#artifact:placeholder


## End of Cheat Sheet

