# Σ-INTENT — Cognitive Intent Modifiers

## Purpose
Σ-INTENT defines a minimal, declarative interface by which Σ-IR
can express tolerance, risk, and sensitivity without commanding
cognitive behavior.

Σ-INTENT modifiers are:
- non-imperative
- non-procedural
- non-executing

They declare constraints only.

---

## Syntax

Σ-INTENT is encoded using **reserved modifiers** in the Modifiers (M) field.

Prefix:
- `^` — cognitive intent declaration

These modifiers MAY appear alongside existing modifiers (`! @ ? #`).

---

## Allowed Modifiers (Closed Set)

### Depth Tolerance
- `^Δ0` — shallow only
- `^Δ1` — moderate allowed
- `^Δ2` — deep permitted

### Error Cost
- `^εlow`
- `^εmed`
- `^εhigh`

### Reversibility
- `^ρrev`
- `^ρirr`

### Framing Sensitivity
- `^φstable`
- `^φunstable`

Unrecognized `^` modifiers are invalid.

---

## Semantics

- Σ-INTENT does NOT request escalation
- Σ-INTENT does NOT guarantee escalation
- Σ-INTENT only bounds Σ-LAW decisions

Σ-LAW may escalate ONLY within declared tolerance.

---

## Normalization

Σ-INTENT modifiers normalize under existing Σ-NF rules:
- treated as standard modifiers
- sorted lexicographically within modifier ordering
- duplicates removed

---

## Example

Raw:
[[I3 O2|system-design|^Δ1 ^εhigh ^ρirr ^φunstable]]


Normalized:

[[I3 O2|system-design|^Δ1 ^εhigh ^ρirr ^φunstable]]


---

## Non-Goals

Σ-INTENT is NOT:
- a reasoning language
- a control language
- a replacement for IΣ
- a substitute for Σ-LAW

It is a declaration surface only.

