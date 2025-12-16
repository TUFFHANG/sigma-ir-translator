import { SigmaIRBlock, ValidationResult } from './types'

export function validateBlock(block: SigmaIRBlock): ValidationResult {
  const errors: string[] = []
  
  if (block.header.meta) {
    if (block.header.intent || block.header.output || 
        block.header.control.length > 0 || block.header.state.length > 0) {
      errors.push('Meta-primitive blocks (SΣ, IΣ) cannot have other header items')
    }
    return { valid: errors.length === 0, errors }
  }
  
  if (block.header.error) {
    if (block.header.intent || block.header.output || 
        block.header.control.length > 0 || block.header.state.length > 0) {
      errors.push('Error blocks cannot have I*, C*, S*, or O* primitives')
    }
    
    const hasErrorModifier = block.modifiers.hardConstraints.includes('error')
    if (!hasErrorModifier) {
      errors.push('Error blocks must include !error modifier')
    }
    
    return { valid: errors.length === 0, errors }
  }
  
  if (!block.header.intent) {
    errors.push('Block must have at least one Intent primitive (I*)')
  }
  
  if (!block.header.output) {
    errors.push('Block must have at least one Output primitive (O*)')
  }
  
  if (block.payload.length === 0) {
    errors.push('Payload cannot be empty (use _ for empty sentinel)')
  }
  
  const hasInvalidPayload = block.payload.some(term => {
    const trimmed = term.trim()
    return trimmed.length === 0 || /\s/.test(trimmed)
  })
  
  if (hasInvalidPayload) {
    errors.push('Payload terms cannot contain whitespace or be empty')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

export function validateNormalization(original: string, normalized: string): boolean {
  return original === normalized
}
