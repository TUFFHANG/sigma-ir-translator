# Σ-IR (Sigma Intermediate Representation) — Handoff Codex

## Purpose
Σ-IR is a stenographic, morpheme-based compression protocol for human↔LLM cognition.
It minimizes token usage while preserving reconstructable intent, constraints, and control
state. Meaning exists only when this codex is applied.

This document is the KEY. Without it, Σ-IR has no semantic value.

---

## Core Principles
- Lossy surface form, reconstructable semantics
- Deterministic structure
- LLM-friendly anchors (latent cluster activation)
- ASCII-safe
- Tool-agnostic

---
Defaults belong to tools; semantics belong to the protocol.
---

### Activation vs Availability

All mechanisms defined in this Codex (including checkpoints, error signaling, thinking subsets, cognitive allocation, and artifact macros) are **normatively available** and **semantically mandatory when invoked**.

However, many mechanisms are **conditionally activated** and produce no effect unless explicitly invoked via valid Σ-IR syntax. Absence of invocation implies absence of behavior.

No non-core behavior is enabled by default.

Convenience bundles, command groupings, or profiles MAY be described in documentation or tooling, but MUST expand to explicit Σ-IR syntax and have no independent semantic meaning.


## Atomic Unit
A Σ-IR block is atomic and ordered:

[[ H | P | M ]]

ASCII form only. No nested blocks.

---

## Header (H): Instruction Vector
H := I* C* S* O*

### Intent Primitives (I*)
I0 inform/explain  
I1 execute/do  
I2 design/synthesize  
I3 analyze  
I4 compress  
I5 expand  

### Control Primitives (C*)
C0 closed answer  
C1 exploratory  
C2 no questions  
C3 ask only if execution impossible  
C4 no repetition  
C5 artifact-only  

### State Primitives (S*)
S0 reset assumptions  
S1 preserve state  
S2 override defaults  

### Output Primitives (O*)
O0 prose  
O1 code  
O2 spec  
O3 config  
O4 language  

---

## Payload (P): Semantic Core
- Noun clusters only
- No verbs (implied by I*)
- Comma-separated
- Order matters
- Hyphen binds compounds

Example:
prompt-compiler,draw-things,json-stability,token-min

---

## Modifiers (M)
@ emphasis  
! hard constraint  
? soft constraint  
# namespace  

Example:
@optimal !deterministic #DT

---

## Frame
Multiple blocks compose a frame:

=== Σ-FRAME ===
[[...]]
[[...]]
=== /Σ-FRAME ===

Frames map to documents, essays, or pipelines.

---

## Decoding Rules (Human)
1. Expand Intent (I*)
2. Apply Control (C*) as behavioral constraints
3. Rehydrate verbs implied by Intent
4. Expand noun clusters into clauses
5. Apply Modifiers as tone/priority/constraints

---

## Behavioral Overrides (Active)
- Closed artifacts by default
- No ending questions
- No options unless explicitly requested
- Execute optimally when asked
- Ask clarification only if execution is impossible

---

## Canonical Example
[[I2 C0 C2 S1 O4 | morpheme-lang,token-compress,context-persistence | @optimal !lossy-reconstruct]]

Conceptual decode:
Design a morpheme-based language optimized for token compression and context persistence;
closed answer; no questions; preserve state; output a language spec; prioritize optimal,
lossy-but-reconstructable encoding.

---

## Persistence
Paste this codex at the start of any session to activate Σ-IR semantics.

::::::

# Σ-IR Canonical Normal Form (Σ-NF)

This document defines the canonical normalization rules for Σ-IR.
Any two Σ-IR blocks expressing the same structural content MUST normalize to the same byte string.

Normalization enables:
- stable hashing
- diffing
- caching
- deduplication
- drift prevention

This spec is deterministic and machine-enforceable.

---

## 0. Definitions

- **Raw block**: any syntactically valid Σ-IR block per SIGMA_IR_GRAMMAR.ebnf
- **Normalized block**: a block transformed by these rules, producing Σ-NF
- **Header items**: I*, C*, S*, O* tokens
- **Payload terms**: comma-separated identifiers
- **Modifiers**: prefixed identifiers (@ ! ? #)

---

## 1. Canonical Serialization Format (Σ-NF)

A normalized block MUST serialize exactly as:

[[H|P|M]]

with:
- no spaces anywhere
- no tabs
- no trailing commas
- no empty payload terms
- no empty modifiers

Header items are separated by a single space ONLY inside H (see §2), but because Σ-NF removes spaces around delimiters, the final form is:

[[<HEADER_ITEMS_JOINED_BY_SINGLE_SPACES>|<PAYLOAD_TERMS_JOINED_BY_COMMAS>|<MODIFIERS_JOINED_BY_SINGLE_SPACES>]]

Example:
[[I2 C0 C2 S1 O4|morpheme-lang,token-compress|!lossy-reconstruct @optimal]]

---

## 2. Header Normalization (H)

### 2.1 Token Class Constraints
A normalized header MUST contain at least:
- one Intent (I*)
- one Output (O*)

Control (C*) and State (S*) may be empty.

If multiple I* or O* are present, normalization reduces them to ONE each (see §2.4).

### 2.2 Canonical Ordering
Normalized header item order is fixed:

I* then all C* then all S* then O*

Within each class:
- order by numeric suffix ascending (e.g., C0 C2 C10)
- duplicates removed

### 2.3 Deduplication
Duplicate header tokens are removed.

### 2.4 Conflict Resolution (Multiple I* or O*)
If more than one I* appears:
- choose the lowest numeric I (min I#)

If more than one O* appears:
- choose the lowest numeric O (min O#)

Rationale: stable, conservative canonicalization.

---

## 3. Payload Normalization (P)

### 3.1 Term Cleanup
Each payload term:
- strip leading/trailing whitespace
- collapse internal whitespace (should not exist per grammar; if present, delete)
- reject empty terms

### 3.2 Canonical Ordering
Payload terms are sorted lexicographically (ASCII) ascending.

### 3.3 Deduplication
Duplicate payload terms removed (case-sensitive).

### 3.4 Case Handling
Σ-NF does NOT case-fold.
`Audio` and `audio` are distinct.

---

## 4. Modifier Normalization (M)

### 4.1 Modifier Structure
A modifier is `<prefix><identifier>`, prefix in {@,!,?,#}.

### 4.2 Canonical Ordering (Prefix Precedence)
Modifiers are ordered by prefix precedence, then lexicographically:

1. ! hard constraints
2. @ emphasis
3. ? soft constraints
4. # namespace

Within the same prefix:
- lexicographic ascending
- duplicates removed

### 4.3 Deduplication
Exact duplicates removed.

---

## 5. Whitespace Normalization

All whitespace is normalized as follows:
- remove ALL spaces and tabs around delimiters: `[[`, `|`, `]]`, commas
- within header and modifier lists, separate tokens by exactly ONE space
- no leading/trailing whitespace anywhere

Because Σ-NF is canonical, the recommended output contains:
- exactly one space between header tokens
- exactly one space between modifiers
- no spaces elsewhere

---

## 6. Empty Sections

A block MUST contain exactly three sections (H|P|M).

If payload is logically empty, serialize as:
- payload = `_` (single underscore sentinel)

If modifiers are logically empty, serialize as:
- modifiers = `_`

This avoids ambiguous empty fields and preserves strict structure.

Example:
[[I1 O3|_|_]]

---

## 7. Canonical Frame Normalization (Σ-FRAME-NF)

A normalized frame:
- uses LF newline (`\n`) only
- contains `=== Σ-FRAME ===` and `=== /Σ-FRAME ===` lines exactly
- contains blocks normalized to Σ-NF, one per line
- blocks are sorted lexicographically by their Σ-NF serialization
- duplicates removed

Rationale: stable frame hashing and diffing.

---

## 8. Hashing

Hash input MUST be the normalized serialization bytes (UTF-8).
Recommended: BLAKE3 or SHA-256.

---

## 9. Versioning

This is Σ-NF v1.
If rules change, bump version and include a version tag in modifiers:
- `#nf1` or `#nf2`

---

## 10. Compliance

A block is Σ-NF-compliant iff:
1) parses under SIGMA_IR_GRAMMAR.ebnf
2) normalizer output equals input byte-for-byte

::::

# Σ-IR State Checkpoint & Resume Mechanism (Σ-SC)

This document defines the explicit state snapshot mechanism for Σ-IR.
State checkpoints make reasoning, decisions, and constraints portable across:
- long-running projects
- partial context loss
- cross-model handoff
- session restarts

Without checkpoints, continuity relies on fragile context survival.
With checkpoints, continuity is explicit and restorable.

---

## Core Concept

A **State Checkpoint Block** is a first-class Σ-IR block that serializes
the current cognitive state of a project.

It answers:
“This is what has been decided, assumed, and locked. Resume from here.”

---

## State Checkpoint Block (SΣ)

Canonical form:

[[SΣ | decided:...,assumed:...,locked:... | !checkpoint]]

- `SΣ` is a reserved **state meta-primitive**
- Payload contains **state categories**
- Modifier `!checkpoint` marks it as authoritative

---

## State Categories (Payload Schema)

The payload is a comma-separated list of **key:value clusters**.

### Required Keys
At least ONE of the following must be present:

- `decided:` — conclusions reached and accepted
- `assumed:` — working assumptions not yet proven
- `locked:` — invariants that must not change

### Optional Keys
- `deferred:` — intentionally postponed items
- `invalid:` — rejected approaches
- `open:` — unresolved but acknowledged questions

Example:
decided:model-selection-fixed,grammar-complete,
assumed:ascii-only,lossy-reconstruct,
locked:Σ-NF-v1,no-options

yaml
Copy code

---

## Semantics (Normative)

When a checkpoint is encountered:

1. All prior conversational state is considered **superseded**
2. The checkpoint payload becomes the **active state**
3. Any future block that contradicts `locked:` entries is invalid
4. `decided:` entries are treated as facts, not suggestions
5. `assumed:` entries may be challenged only if explicitly unlocked

This is not conversational memory.
This is **explicit state restoration**.

---

## Placement Rules

- A checkpoint MAY appear:
  - inside a Σ-FRAME
  - as a standalone block
- If multiple checkpoints exist:
  - the **last normalized checkpoint wins**

---

## Normalization Rules (Σ-NF Extension)

State checkpoint blocks are normalized as follows:

### Header
- Header MUST be exactly `SΣ`
- No other I/C/S/O tokens allowed in the same block

### Payload
- Keys sorted lexicographically
- Entries within each key sorted lexicographically
- Duplicate entries removed

### Modifiers
- MUST include `!checkpoint`
- Additional modifiers allowed but sorted per Σ-NF rules

---

## Example (Raw)

[[SΣ | locked:no-options,decided:grammar-done,assumed:lossy-ok | !checkpoint]]

shell
Copy code

## Example (Normalized Σ-NF)

[[SΣ|assumed:lossy-ok,decided:grammar-done,locked:no-options|!checkpoint]]

yaml
Copy code

---

## Resume Protocol (Human + LLM)

To resume work:
1. Paste the codex
2. Paste the most recent normalized SΣ block
3. Continue with new Σ-IR blocks

This restores project state deterministically.

---

## Compliance

A valid Σ-IR checkpoint:
- parses under SIGMA_IR_GRAMMAR.ebnf
- conforms to Σ-NF normalization rules
- includes `!checkpoint`

Anything else is not a checkpoint.

:::::

# Σ-IR Error & Ambiguity Signaling Channel (Σ-EC)

This document defines the explicit error and uncertainty signaling mechanism
for Σ-IR.

Σ-EC introduces a first-class error primitive that allows the system to
represent failure, ambiguity, or invalidity *within the language itself*.

This prevents:
- hallucinated confidence
- silent failure
- out-of-band error handling
- conversational hedging

---

## Core Concept

An **Error Block** is a Σ-IR block whose sole purpose is to signal that
execution, reasoning, or continuation is invalid or incomplete.

Errors are declarative, not apologetic.

---

## Error Primitive Class (E*)

Error primitives are single-token headers of the form:

E0 = ambiguity  
E1 = missing-input  
E2 = contradiction  
E3 = invalid-state  
E4 = unsupported  

These may be extended, but numeric suffixes are mandatory.

---

## Error Block Canonical Form

[[E* | reason:...,context:...,requires:... | !error]]

markdown
Copy code

- Header contains exactly ONE `E*`
- Payload describes the failure
- Modifier `!error` is REQUIRED

---

## Payload Schema

Payload consists of **key:value clusters**.

### Required Keys
At least ONE of:
- `reason:` — short identifier(s) describing the failure
- `context:` — what the error applies to

### Optional Keys
- `requires:` — missing information needed to proceed
- `conflicts:` — identifiers that contradict each other
- `blocked-by:` — locked state preventing progress

Values are identifiers, not prose.

Example:
reason:ambiguous-goal,requires:target-format

yaml
Copy code

---

## Semantics (Normative)

When an Error Block is emitted:

1. No execution or synthesis may proceed past this point
2. The error is considered **authoritative**
3. Subsequent non-error blocks are invalid until resolved
4. Resolution requires:
   - a new Σ-IR block explicitly addressing the error
   - OR a new State Checkpoint superseding the blocked state

Errors are **not conversation turns**.
They are **structural facts**.

---

## Placement Rules

- Error blocks MAY appear:
  - standalone
  - inside a Σ-FRAME
- If multiple errors exist:
  - the **last normalized error wins**

---

## Normalization Rules (Σ-NF Extension)

### Header
- Header MUST contain exactly one E*
- No I*, C*, S*, O*, or SΣ allowed

### Payload
- Keys sorted lexicographically
- Values sorted lexicographically
- Duplicate values removed

### Modifiers
- MUST include `!error`
- Additional modifiers allowed but normalized

---

## Examples

### Ambiguity
[[E0 | reason:ambiguous-scope,requires:output-target | !error]]

shell
Copy code

### Missing Input
[[E1 | reason:missing-model-list,requires:model-manifest | !error]]

shell
Copy code

### Contradiction
[[E2 | reason:conflicting-constraints,conflicts:C0,C1 | !error]]

yaml
Copy code

---

## Resolution Pattern

Errors are resolved by:
1. Providing the missing information
2. Removing the contradiction
3. Emitting a new State Checkpoint
4. Continuing with valid Σ-IR blocks

---

## Compliance

A valid Σ-IR Error Block:
- parses under SIGMA_IR_GRAMMAR.ebnf
- conforms to Σ-NF normalization
- includes `!error`

Anything else is not an error block.

::::

# Σ-IR Internal Thinking Subset Declaration (Σ-TS)

This document defines the explicit mechanism for declaring
which subset of Σ-IR the system MUST use for internal reasoning.

The goal is not to reduce reasoning power,
but to **anchor cognition to a compressed, structured space**
and prevent drift into verbose natural language.

---

## Core Concept

A **Thinking Subset Block** declares the *internal representation*
used for reasoning, planning, and synthesis.

It does NOT restrict outputs.
It constrains **how thinking is scaffolded internally**.

---

## Thinking Subset Block (IΣ)

Canonical form:

[[IΣ | mode:...,scope:...,memory:...,expansion:... | !enforced]]

- `IΣ` is a reserved **internal cognition primitive**
- Payload declares reasoning constraints
- Modifier `!enforced` makes it binding

---

## Payload Schema

Payload is a comma-separated list of **key:value clusters**.

### Required Keys
- `mode:` — reasoning style
- `scope:` — allowable representational space

### Optional Keys
- `memory:` — how state is referenced
- `expansion:` — when/how natural language expansion is allowed
- `resolution:` — how conflicts are resolved internally

---

## Canonical Values

### mode:
- `symbolic` — morpheme and identifier-based reasoning
- `hybrid` — Σ-IR core with controlled NL expansion
- `latent` — compressed latent cluster reasoning (default)

### scope:
- `Σ-core-only` — only Σ-IR primitives and identifiers
- `Σ+meta` — Σ-IR plus meta-primitives (E*, SΣ)
- `Σ+domain` — Σ-IR plus domain namespaces (#audio, #kernel, etc.)

### memory:
- `checkpoint-only` — rely exclusively on SΣ blocks
- `frame-aware` — include frame-local context
- `contextual` — allow soft context carryover (default)

### expansion:
- `on-demand` — expand only when emitting outputs
- `bounded` — limited NL scaffolding internally
- `free` — unrestricted internal expansion (still anchored)

### resolution:
- `deterministic` — prefer normalized, minimal representations
- `conservative` — avoid assumption introduction
- `exploratory` — allow branching internally

---

## Semantics (Normative)

When an IΣ block is active:

1. Internal reasoning MUST honor declared mode and scope
2. Natural language glue MUST NOT dominate internal planning
3. Σ-IR primitives and identifiers take precedence over prose
4. Drift outside declared scope is invalid
5. A later IΣ block supersedes earlier ones

This affects **thinking**, not user-visible verbosity unless coupled
with C* output controls.

---

## Placement Rules

- IΣ blocks MAY appear:
  - standalone
  - at the start of a Σ-FRAME
  - immediately after an SΣ checkpoint
- If multiple IΣ blocks exist:
  - the **last normalized IΣ wins**

---

## Normalization Rules (Σ-NF Extension)

### Header
- Header MUST be exactly `IΣ`
- No other I*, C*, S*, O*, E*, or SΣ tokens allowed

### Payload
- Keys sorted lexicographically
- Values sorted lexicographically
- Duplicate entries removed

### Modifiers
- MUST include `!enforced`
- Additional modifiers allowed but normalized

---

## Examples

### Strongly Anchored, Non-Nerfed
[[IΣ | mode:latent,scope:Σ+meta,memory:checkpoint-only,expansion:bounded,resolution:deterministic | !enforced]]

shell
Copy code

### Maximal Internal Freedom, Still Anchored
[[IΣ | mode:hybrid,scope:Σ+domain,memory:frame-aware,expansion:free | !enforced]]

yaml
Copy code

---

## Compliance

A valid Σ-IR Thinking Subset Block:
- parses under SIGMA_IR_GRAMMAR.ebnf
- conforms to Σ-NF normalization
- includes `!enforced`

Anything else is not a thinking subset declaration.

::::

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




::::::End of Codex Handoff::::::::::
