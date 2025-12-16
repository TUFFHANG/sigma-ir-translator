import { describe, it, expect } from 'vitest'
import { translateToSigmaIR } from '../translator'

describe('translateToSigmaIR', () => {
  it('should translate basic design request', () => {
    const result = translateToSigmaIR('Design a language specification')
    
    expect(result.success).toBe(true)
    expect(result.output).toContain('I2')
    expect(result.output).toContain('O4')
  })

  it('should detect multiple control primitives', () => {
    const result = translateToSigmaIR('Create code with no questions and no repetition')
    
    expect(result.success).toBe(true)
    expect(result.output).toContain('C2')
    expect(result.output).toContain('C4')
  })

  it('should emit E0 for ambiguous intent', () => {
    const result = translateToSigmaIR('Something with stuff')
    
    expect(result.success).toBe(false)
    expect(result.output).toContain('E0')
    expect(result.output).toContain('!error')
  })

  it('should emit E1 for missing output', () => {
    const result = translateToSigmaIR('Execute a function')
    
    expect(result.success).toBe(false)
    expect(result.output).toContain('E1')
    expect(result.output).toContain('missing-output')
  })

  it('should emit E1 for empty input', () => {
    const result = translateToSigmaIR('')
    
    expect(result.success).toBe(false)
    expect(result.output).toContain('E1')
    expect(result.output).toContain('empty-input')
  })

  it('should extract modifiers from emphasis words', () => {
    const result = translateToSigmaIR('Design optimal language spec')
    
    expect(result.success).toBe(true)
    expect(result.output).toContain('@optimal')
  })

  it('should produce normalized output', () => {
    const result = translateToSigmaIR('Analyze the code and preserve state')
    
    expect(result.success).toBe(true)
    expect(result.output).toMatch(/^\[\[I\d+.*O\d+\|.*\|.*\]\]$/)
  })

  it('should handle multiple intents as ambiguity', () => {
    const result = translateToSigmaIR('Analyze and execute and design the code')
    
    expect(result.success).toBe(false)
    expect(result.output).toContain('E0')
    expect(result.output).toContain('multiple-intents')
  })
})
