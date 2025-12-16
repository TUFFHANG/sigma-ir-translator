# Σ-IR Translator

A production-ready web application that translates plain English into valid, normalized **Σ-IR** (Sigma Intermediate Representation) blocks.

## Purpose

Σ-IR is a stenographic, morpheme-based compression protocol for human↔LLM cognition. This translator acts as a deterministic compiler that:

- Parses natural language input
- Maps intent to Σ-IR primitives (I*, C*, S*, O*)
- Validates against grammar rules
- Normalizes to canonical Σ-NF format
- **Never emits invalid Σ-IR**
- Emits explicit error blocks (E*) when translation is impossible or ambiguous

## Features

✅ **Grammar Enforcement** — All output is validated against SIGMA_IR_GRAMMAR.ebnf  
✅ **Canonical Normalization** — Implements full Σ-NF v1 specification  
✅ **Error Signaling** — Explicit E* error blocks for ambiguity or missing information  
✅ **Idempotent Output** — Normalized output is byte-stable  
✅ **Zero Hallucination** — Never guesses missing information  

## Architecture

```
src/
├── lib/sigma-ir/
│   ├── types.ts          # Type definitions
│   ├── primitives.ts     # Primitive detection logic
│   ├── validator.ts      # Grammar validation
│   ├── normalizer.ts     # Σ-NF normalization
│   └── translator.ts     # English → Σ-IR translation
├── components/
│   ├── TranslatorPanel.tsx    # Main translation UI
│   ├── GrammarReference.tsx   # Collapsible reference
│   └── ExamplesPanel.tsx      # Example inputs
└── App.tsx
```

## How It Works

### Translation Pipeline

1. **Input Parsing** — Extract intent, control, state, and output indicators
2. **Primitive Mapping** — Match keywords to Σ-IR primitives
3. **Payload Extraction** — Extract domain-specific noun clusters
4. **Modifier Detection** — Identify emphasis, constraints, namespaces
5. **Validation** — Enforce grammar rules
6. **Normalization** — Apply Σ-NF ordering and deduplication
7. **Output** — Emit valid Σ-IR or canonical error block

### Error Handling

If translation fails, the system emits a canonical E* error block:

- **E0** — Ambiguity (multiple valid interpretations)
- **E1** — Missing input (insufficient information)
- **E2** — Contradiction (conflicting constraints)
- **E3** — Invalid state (validation failure)
- **E4** — Unsupported (outside grammar scope)

## Examples

### Valid Translation

**Input:**  
`Design a language specification for token compression with optimal encoding`

**Output:**  
`[[I2 O4|compression,encoding,language,optimal,specification,token|@optimal]]`

### Error Block

**Input:**  
`Something with stuff and things`

**Output:**  
`[[E0|context:no-clear-action,reason:ambiguous-intent,requires:intent-specification|!error]]`

## Σ-NF Normalization Rules

The translator enforces:

1. **Header Ordering:** I* → C* → S* → O*
2. **Payload Sorting:** Lexicographic ascending
3. **Modifier Precedence:** ! → @ → ? → #
4. **Deduplication:** Removes exact duplicates
5. **Whitespace:** No spaces around delimiters, single space between tokens
6. **Empty Sentinels:** `_` for empty payload or modifiers

## Usage

### Run Locally

The application is pre-configured and ready to run:

```bash
# Already installed and configured
# Just refresh the preview window to see changes
```

### Translation Shortcuts

- Type English description in left panel
- Click "Translate" or press `⌘/Ctrl + Enter`
- Copy normalized Σ-IR output
- Try example inputs to learn patterns

## Validation Guarantees

- ✅ Every output parses under SIGMA_IR_GRAMMAR.ebnf
- ✅ Normalization is idempotent (re-normalizing yields same output)
- ✅ No invalid Σ-IR can be produced
- ✅ Errors are explicit and structured

## Technical Stack

- **Frontend:** React + TypeScript
- **Validation:** Custom grammar engine
- **Normalization:** Σ-NF v1 implementation
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS

## License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
