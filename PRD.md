# Planning Guide

A deterministic compiler that translates plain English into valid, normalized Σ-IR blocks with complete grammar enforcement and error signaling.

**Experience Qualities**:
1. **Precise**: Every output is grammatically valid and normalized - no ambiguity, no guessing
2. **Transparent**: Errors are explicit and structured, showing exactly what's missing or ambiguous
3. **Deterministic**: Same input always produces identical normalized output

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-purpose translation tool with grammar validation, normalization, and error handling - more than a micro tool but not requiring complex state management or multiple views.

## Essential Features

### English to Σ-IR Translation
- **Functionality**: Parse natural language and map to Σ-IR primitives deterministically
- **Purpose**: Enable users to generate valid Σ-IR without memorizing the complete grammar
- **Trigger**: User enters English text and clicks Translate
- **Progression**: Text input → Parser analysis → Primitive extraction → Grammar validation → Normalization → Output display
- **Success criteria**: Output is always valid Σ-NF or a canonical E* error block

### Σ-FRAME Builder
- **Functionality**: Combine multiple Σ-IR blocks into a normalized frame structure with search, filtering, and sort preview
- **Purpose**: Enable users to build complex multi-block compositions with proper Σ-FRAME-NF formatting while understanding how blocks will be reordered
- **Trigger**: User adds blocks one at a time, searches/filters as needed, previews sorting, then clicks Build Σ-FRAME
- **Progression**: Add blocks → Search/filter blocks → Preview sort order (optional) → See which blocks move and duplicates → Build frame → Blocks sorted lexicographically → Duplicates removed → Frame output display
- **Success criteria**: Frame conforms to Σ-FRAME-NF specification with proper delimiters and block ordering; search and filtering work accurately; preview accurately shows final order before building

### Block Search and Filtering
- **Functionality**: Search blocks by input text or output content, filter by block type (success/error)
- **Purpose**: Enable users to manage and navigate large collections of blocks efficiently
- **Trigger**: User enters search query or toggles filter options
- **Progression**: Enter search text → Results filter in real-time → Apply type filters → See filtered count → Clear filters to restore full view
- **Success criteria**: Search matches both input and output text; filters combine correctly; clear visual feedback on active filters; easy reset

### Grammar Validation Engine
- **Functionality**: Enforce SIGMA_IR_GRAMMAR.ebnf rules on all generated blocks
- **Purpose**: Prevent invalid Σ-IR from ever being emitted
- **Trigger**: Runs automatically during translation
- **Progression**: Generated block → Grammar check → Pass/reject decision
- **Success criteria**: No invalid blocks can pass through the system

### Normalization Module
- **Functionality**: Apply Σ-NF rules (sorting, deduplication, ordering, whitespace)
- **Purpose**: Ensure output is byte-stable and canonically formatted
- **Trigger**: Runs automatically after validation
- **Progression**: Valid block → Sort headers → Sort payload → Sort modifiers → Remove duplicates → Normalize whitespace
- **Success criteria**: Normalized output equals re-normalized output (idempotent)

### Error Block Generation
- **Functionality**: Emit canonical E* blocks for ambiguity or missing information
- **Purpose**: Make failures explicit and structured rather than guessing
- **Trigger**: Parser detects ambiguity or insufficient information
- **Progression**: Ambiguous input → Classify error type → Generate E* block → Normalize
- **Success criteria**: Users see exactly what's missing or ambiguous

### Copy to Clipboard
- **Functionality**: One-click copy of generated Σ-IR
- **Purpose**: Seamless workflow for using generated blocks
- **Trigger**: User clicks copy button
- **Progression**: Click → Copy output → Visual confirmation
- **Success criteria**: Σ-IR is copied accurately with all formatting

## Edge Case Handling

- **Empty input**: Display validation message, do not attempt translation
- **Multiple interpretations**: Emit E0 (ambiguity) with requires: field listing possible intents
- **Missing required primitives**: Emit E1 (missing-input) specifying what's needed
- **Contradictory constraints**: Emit E2 (contradiction) identifying conflicts
- **Unsupported request**: Emit E4 (unsupported) with reason
- **Malformed input**: Attempt best-effort primitive extraction, emit error if insufficient
- **Empty frame**: Require at least one block before building frame
- **Duplicate blocks in frame**: Automatically deduplicate during frame normalization; preview shows which blocks are duplicates
- **Block reordering preview**: Show visual indication of blocks that will move positions and which are duplicates before frame is built
- **Lexicographic sorting**: Preview displays original vs. sorted positions with clear visual indicators
- **Empty search results**: Display "no blocks match" message with clear filter reset option
- **All blocks filtered out**: Show count of hidden blocks and provide easy filter clear action
- **Search while filtered**: Combine search and type filters correctly, showing accurate counts

## Design Direction

The design should evoke precision, technical authority, and computational clarity - like a compiler interface or formal language tool. Visual elements should feel structured, monospaced, and deterministic with clear visual distinction between input (mutable) and output (immutable/canonical).

## Color Selection

A technical, high-contrast color scheme that emphasizes clarity and correctness:

- **Primary Color**: Deep Indigo `oklch(0.35 0.15 270)` - Communicates computational authority and precision
- **Secondary Colors**: Steel Blue `oklch(0.50 0.10 240)` for supporting UI elements, Cool Gray `oklch(0.25 0.02 260)` for panels
- **Accent Color**: Cyan `oklch(0.75 0.15 200)` - Highlights validation success and copy actions
- **Foreground/Background Pairings**:
  - Background (Dark Slate #1a1d29 / oklch(0.15 0.03 260)): Light Gray text (oklch(0.92 0.01 260)) - Ratio 13.2:1 ✓
  - Primary (Deep Indigo): White text (oklch(0.99 0 0)) - Ratio 8.5:1 ✓
  - Accent (Cyan): Dark background (oklch(0.15 0.03 260)) - Ratio 14.1:1 ✓
  - Error panels (oklch(0.25 0.08 25)): White text - Ratio 11.2:1 ✓

## Font Selection

Typefaces should emphasize technical precision with monospace for code/output and a clean sans-serif for UI elements.

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold/32px/tight letter-spacing (-0.02em)
  - H2 (Section Headers): Space Grotesk SemiBold/18px/normal
  - Body (Instructions): Inter Regular/14px/1.5 line-height
  - Code/Output: JetBrains Mono Regular/13px/1.6 line-height/monospace
  - Labels: Inter Medium/12px/uppercase/0.05em letter-spacing

## Animations

Animations should reinforce validation states and transitions between input/output modes with technical precision. Use immediate feedback for validation (100-150ms), smooth transitions for output display (200ms), and subtle pulse effects on successful copy (300ms). Avoid decorative motion - every animation serves validation feedback or state communication.

## Component Selection

- **Components**: 
  - Textarea for input with clear focus states
  - Button (primary) for translate action with loading state
  - Card for output display with monospace content
  - Badge for primitive type indicators
  - Alert for error block display (destructive variant)
  - Tooltip for grammar hints
  - Separator for visual section division
- **Customizations**: 
  - Output card styled as read-only terminal/compiler output with dark background
  - Custom syntax highlighting for Σ-IR primitives (I*, C*, S*, O*, E*, SΣ, IΣ)
  - Error alert styled as canonical E* block visualization
- **States**: 
  - Buttons: default (primary), hover (lighter), active (pressed), disabled (muted), loading (spinner)
  - Textarea: default (border-input), focus (ring-accent), error (border-destructive)
  - Output: idle (muted), success (accent border pulse), error (destructive border)
- **Icon Selection**: 
  - ArrowRight for translate action
  - Copy for clipboard operation
  - Check for successful validation
  - Warning for error blocks
  - X for clear operations
  - MagnifyingGlass for search
  - Funnel for filter controls
  - Stack for frame building
  - ArrowsDownUp for sort preview
- **Spacing**: Use 4px base unit - sm=8px, md=16px, lg=24px, xl=32px for consistent rhythm
- **Mobile**: Stack input/output vertically, full-width textarea, fixed translate button at bottom, collapsible grammar reference
