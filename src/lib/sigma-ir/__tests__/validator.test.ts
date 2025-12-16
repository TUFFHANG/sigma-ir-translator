import { describe, it, expect } from 'vitest'
import { validateBlock } from '../validator'
import { SigmaIRBlock } from '../types'

describe('validateBlock', () => {
  it('should validate blocks with required I* and O*', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I1',
        control: [],
        state: [],
        output: 'O1',
      },
      payload: ['test'],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = validateBlock(block)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should reject blocks without intent', () => {
    const block: SigmaIRBlock = {
      header: {
        control: [],
        state: [],
        output: 'O1',
      },
      payload: ['test'],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = validateBlock(block)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Block must have at least one Intent primitive (I*)')
  })

  it('should reject blocks without output', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I1',
        control: [],
        state: [],
      },
      payload: ['test'],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = validateBlock(block)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Block must have at least one Output primitive (O*)')
  })

  it('should reject error blocks without !error modifier', () => {
    const block: SigmaIRBlock = {
      header: {
        error: 'E0',
        control: [],
        state: [],
      },
      payload: ['reason:test'],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = validateBlock(block)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Error blocks must include !error modifier')
  })

  it('should validate error blocks with !error modifier', () => {
    const block: SigmaIRBlock = {
      header: {
        error: 'E0',
        control: [],
        state: [],
      },
      payload: ['reason:test'],
      modifiers: {
        emphasis: [],
        hardConstraints: ['error'],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = validateBlock(block)
    expect(result.valid).toBe(true)
  })
})
