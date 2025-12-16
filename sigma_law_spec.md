# Σ-LAW — Cognitive Allocation Specification (v1)

## Purpose
Σ-LAW is a deterministic cognitive allocation policy that governs
*how much* reasoning an LLM may apply and *at what abstraction level*,
based on declarative intent signals embedded in Σ-IR.

Σ-LAW does NOT:
- encode meaning
- alter Σ-IR payloads
- dictate outputs

Σ-LAW ONLY:
- allocates cognitive depth
- permits or forbids escalation
- records cognitive state

---

## Inputs (Authoritative)

Σ-LAW consumes the following artifacts:

1. Σ-IR blocks (normalized Σ-NF)
2. Σ-INTENT modifiers (see §2)
3. Active IΣ (Thinking Subset) block, if present
4. Active SΣ (State Checkpoint), if present
5. Active error state (E*), if present

If an E* block is active, Σ-LAW MUST halt allocation.

---

## Cognitive Levels

Σ-LAW defines four discrete cognition levels:

- **L0 — Compressed**
  - pattern recall
  - no framing analysis
  - no abstraction shifts

- **L1 — Structured**
  - light abstraction
  - dependency awareness
  - no reframing

- **L2 — Framing**
  - assumption analysis
  - problem re-encoding
  - second-order effects

- **L3 — Meta**
  - objective redefinition
  - competitive misuse detection
  - system-level reasoning

Default level: **L0**

---

## Σ-INTENT Interface (Consumed from Modifiers)

Σ-LAW recognizes the following non-imperative intent modifiers:

### Depth Tolerance
- `^Δ0` — forbid escalation above L0
- `^Δ1` — permit up to L1
- `^Δ2` — permit up to L2+

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

Absence of a modifier implies conservative defaults.

---

## Allocation Rules (Normative)

1. **Hard Caps**
   - If `^Δ0` present → max level = L0
   - If `^Δ1` present → max level = L1
   - If `^Δ2` present → max level = L2+

2. **Irreversibility Escalation**
   - If `^ρirr` present → minimum level = L2

3. **Risk + Framing Escalation**
   - If `^εhigh` AND `^φunstable` → minimum level = L2

4. **Thinking Subset Constraint**
   - If IΣ.scope excludes meta → cap at L1

5. **Locked State Constraint**
   - If SΣ.locked forbids reframing → cap at L1

6. **Conflict Resolution**
   - If minimum level > maximum level → emit E3 (invalid-state)

---

## Escalation Failure

If escalation is required but forbidden by constraints,
Σ-LAW MUST emit:

[[E3|reason:escalation-forbidden,context:cognitive-allocation|!error]]


No reasoning may proceed past this point.

---

## State Emission

When Σ-LAW allocates a level ≠ previous level,
it MUST record the allocation via SΣ (see sigma-sc extension).

---

## Determinism

Given identical:
- Σ-IR blocks
- Σ-INTENT modifiers
- IΣ
- SΣ

Σ-LAW MUST allocate the same cognition level.

---

## Versioning

This is Σ-LAW v1.
Breaking changes require a new version identifier.

