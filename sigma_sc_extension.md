# Σ-SC Extension — Cognitive Level Recording

## Purpose
This extension defines how Σ-LAW records cognitive allocation
decisions using existing SΣ checkpoint machinery.

No new block types are introduced.

---

## Reserved Payload Key

SΣ MAY include the following optional key:

- `cog-level:`

Allowed values:
- `L0`
- `L1`
- `L2`
- `L3`

---

## Semantics

When a State Checkpoint includes `cog-level:`:

1. The value represents the *active cognitive allocation*
2. It applies until superseded by a later SΣ
3. It is authoritative for downstream reasoning

---

## Example (Raw)

[[SΣ | decided:grammar-complete,cog-level:L2 | !checkpoint]]


## Example (Normalized)

[[SΣ|cog-level:L2,decided:grammar-complete|!checkpoint]]


---

## Interaction with Σ-LAW

- Σ-LAW MUST emit an updated `cog-level` when allocation changes
- If no `cog-level` exists, Σ-LAW assumes L0
- Manual overrides require a new SΣ

---

## Compliance

This extension:
- does not alter Σ-SC grammar
- does not affect normalization rules
- preserves backward compatibility

Tools unaware of this extension may safely ignore `cog-level`.


