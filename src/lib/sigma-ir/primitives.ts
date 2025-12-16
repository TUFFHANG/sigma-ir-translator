import { IntentPrimitive, ControlPrimitive, StatePrimitive, OutputPrimitive } from './types'

export const INTENT_PRIMITIVES: Record<IntentPrimitive, string[]> = {
  I0: ['inform', 'explain', 'describe', 'tell', 'show'],
  I1: ['execute', 'do', 'run', 'perform', 'make', 'create', 'build'],
  I2: ['design', 'synthesize', 'compose', 'architect', 'structure'],
  I3: ['analyze', 'examine', 'inspect', 'review', 'evaluate', 'assess'],
  I4: ['compress', 'minimize', 'reduce', 'condense', 'shrink'],
  I5: ['expand', 'elaborate', 'extend', 'detail', 'unpack'],
}

export const CONTROL_PRIMITIVES: Record<ControlPrimitive, string[]> = {
  C0: ['closed', 'definitive', 'final', 'complete'],
  C1: ['exploratory', 'open', 'investigate', 'brainstorm'],
  C2: ['no questions', 'dont ask', 'no queries'],
  C3: ['ask only if impossible', 'clarify if needed', 'ask if stuck'],
  C4: ['no repetition', 'dont repeat', 'no duplicate'],
  C5: ['artifact-only', 'output only', 'no explanation'],
}

export const STATE_PRIMITIVES: Record<StatePrimitive, string[]> = {
  S0: ['reset', 'start fresh', 'clear assumptions'],
  S1: ['preserve', 'keep state', 'maintain context'],
  S2: ['override', 'force', 'ignore defaults'],
}

export const OUTPUT_PRIMITIVES: Record<OutputPrimitive, string[]> = {
  O0: ['prose', 'text', 'paragraph', 'essay', 'writing'],
  O1: ['code', 'program', 'script', 'implementation'],
  O2: ['spec', 'specification', 'requirements', 'definition'],
  O3: ['config', 'configuration', 'settings', 'parameters'],
  O4: ['language', 'grammar', 'syntax', 'format'],
}

export function detectIntent(text: string): IntentPrimitive[] {
  const lower = text.toLowerCase()
  const matches: IntentPrimitive[] = []
  
  for (const [primitive, keywords] of Object.entries(INTENT_PRIMITIVES)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      matches.push(primitive as IntentPrimitive)
    }
  }
  
  return matches
}

export function detectControl(text: string): ControlPrimitive[] {
  const lower = text.toLowerCase()
  const matches: ControlPrimitive[] = []
  
  for (const [primitive, keywords] of Object.entries(CONTROL_PRIMITIVES)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      matches.push(primitive as ControlPrimitive)
    }
  }
  
  return matches
}

export function detectState(text: string): StatePrimitive[] {
  const lower = text.toLowerCase()
  const matches: StatePrimitive[] = []
  
  for (const [primitive, keywords] of Object.entries(STATE_PRIMITIVES)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      matches.push(primitive as StatePrimitive)
    }
  }
  
  return matches
}

export function detectOutput(text: string): OutputPrimitive[] {
  const lower = text.toLowerCase()
  const matches: OutputPrimitive[] = []
  
  for (const [primitive, keywords] of Object.entries(OUTPUT_PRIMITIVES)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      matches.push(primitive as OutputPrimitive)
    }
  }
  
  return matches
}
