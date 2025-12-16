export type IntentPrimitive = 'I0' | 'I1' | 'I2' | 'I3' | 'I4' | 'I5'
export type ControlPrimitive = 'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5'
export type StatePrimitive = 'S0' | 'S1' | 'S2'
export type OutputPrimitive = 'O0' | 'O1' | 'O2' | 'O3' | 'O4'
export type ErrorPrimitive = 'E0' | 'E1' | 'E2' | 'E3' | 'E4'
export type MetaPrimitive = 'SΣ' | 'IΣ'

export type Primitive = 
  | IntentPrimitive 
  | ControlPrimitive 
  | StatePrimitive 
  | OutputPrimitive
  | ErrorPrimitive
  | MetaPrimitive

export interface SigmaIRBlock {
  header: {
    intent?: IntentPrimitive
    control: ControlPrimitive[]
    state: StatePrimitive[]
    output?: OutputPrimitive
    error?: ErrorPrimitive
    meta?: MetaPrimitive
  }
  payload: string[]
  modifiers: {
    emphasis: string[]
    hardConstraints: string[]
    softConstraints: string[]
    namespaces: string[]
  }
}

export interface ErrorBlock {
  type: ErrorPrimitive
  reason: string[]
  context?: string[]
  requires?: string[]
  conflicts?: string[]
  blockedBy?: string[]
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export interface TranslationResult {
  success: boolean
  output: string
  block?: SigmaIRBlock | ErrorBlock
  errors?: string[]
}
