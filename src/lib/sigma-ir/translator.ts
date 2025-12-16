import { SigmaIRBlock, ErrorBlock, TranslationResult } from './types'
import { detectIntent, detectControl, detectState, detectOutput } from './primitives'
import { normalizeSigmaBlock, normalizeErrorBlock } from './normalizer'
import { validateBlock } from './validator'

export function translateToSigmaIR(input: string): TranslationResult {
  if (!input.trim()) {
    return createError('E1', ['empty-input'], undefined, ['text-input'])
  }
  
  const intents = detectIntent(input)
  const controls = detectControl(input)
  const states = detectState(input)
  const outputs = detectOutput(input)
  
  if (intents.length === 0) {
    return createError('E0', ['ambiguous-intent'], ['no-clear-action'], ['intent-specification'])
  }
  
  if (intents.length > 1) {
    return createError('E0', ['multiple-intents'], ['ambiguous-goal'], ['single-intent'])
  }
  
  if (outputs.length === 0) {
    return createError('E1', ['missing-output'], ['no-output-type-specified'], ['output-format'])
  }
  
  if (outputs.length > 1) {
    return createError('E0', ['multiple-outputs'], ['ambiguous-format'], ['single-output-type'])
  }
  
  const payload = extractPayload(input)
  
  if (payload.length === 0) {
    return createError('E1', ['missing-payload'], ['no-semantic-content'], ['domain-terms'])
  }
  
  const modifiers = extractModifiers(input)
  
  const block: SigmaIRBlock = {
    header: {
      intent: intents[0],
      control: [...new Set(controls)],
      state: [...new Set(states)],
      output: outputs[0],
    },
    payload,
    modifiers,
  }
  
  const validation = validateBlock(block)
  
  if (!validation.valid) {
    return createError('E3', ['validation-failed'], validation.errors, ['valid-structure'])
  }
  
  const normalized = normalizeSigmaBlock(block)
  
  return {
    success: true,
    output: normalized,
    block,
  }
}

function extractPayload(input: string): string[] {
  const words = input.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2)
  
  const stopWords = new Set([
    'the', 'and', 'for', 'with', 'this', 'that', 'from', 'into',
    'about', 'create', 'make', 'build', 'design', 'analyze', 'explain',
    'code', 'prose', 'spec', 'config', 'language', 'output', 'format'
  ])
  
  const filtered = words.filter(w => !stopWords.has(w))
  
  const unique = [...new Set(filtered)]
  
  return unique.slice(0, 8)
}

function extractModifiers(input: string): {
  emphasis: string[]
  hardConstraints: string[]
  softConstraints: string[]
  namespaces: string[]
} {
  const lower = input.toLowerCase()
  
  const emphasis: string[] = []
  const hardConstraints: string[] = []
  const softConstraints: string[] = []
  const namespaces: string[] = []
  
  if (lower.includes('optimal') || lower.includes('best')) {
    emphasis.push('optimal')
  }
  
  if (lower.includes('important') || lower.includes('critical') || lower.includes('must')) {
    emphasis.push('critical')
  }
  
  if (lower.includes('deterministic') || lower.includes('consistent')) {
    hardConstraints.push('deterministic')
  }
  
  if (lower.includes('stable') || lower.includes('fixed')) {
    hardConstraints.push('stable')
  }
  
  if (lower.includes('prefer') || lower.includes('ideally')) {
    softConstraints.push('preferred')
  }
  
  return { emphasis, hardConstraints, softConstraints, namespaces }
}

function createError(
  type: 'E0' | 'E1' | 'E2' | 'E3' | 'E4',
  reason: string[],
  context?: string[],
  requires?: string[]
): TranslationResult {
  const errorBlock: ErrorBlock = {
    type,
    reason,
    context,
    requires,
  }
  
  const normalized = normalizeErrorBlock(errorBlock)
  
  return {
    success: false,
    output: normalized,
    block: errorBlock,
    errors: context,
  }
}
