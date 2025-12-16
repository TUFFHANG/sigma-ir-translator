import { describe, it, expect } from 'vitest'
import { normalizeSigmaBlock, normalizeErrorBlock } from '../normalizer'
import { SigmaIRBlock, ErrorBlock } from '../types'

describe('normalizeSigmaBlock', () => {
  it('should normalize header ordering (I C S O)', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I2',
        control: ['C2', 'C0'],
        state: ['S1'],
        output: 'O4',
      },
      payload: ['test'],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = normalizeSigmaBlock(block)
    expect(result).toBe('[[I2 C0 C2 S1 O4|test|_]]')
  })

  it('should sort payload lexicographically', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I1',
        control: [],
        state: [],
        output: 'O1',
      },
      payload: ['zebra', 'apple', 'banana'],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = normalizeSigmaBlock(block)
    expect(result).toBe('[[I1 O1|apple,banana,zebra|_]]')
  })

  it('should deduplicate payload terms', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I1',
        control: [],
        state: [],
        output: 'O1',
      },
      payload: ['test', 'test', 'unique'],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = normalizeSigmaBlock(block)
    expect(result).toBe('[[I1 O1|test,unique|_]]')
  })

  it('should sort modifiers by prefix precedence (! @ ? #)', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I1',
        control: [],
        state: [],
        output: 'O1',
      },
      payload: ['test'],
      modifiers: {
        emphasis: ['optimal'],
        hardConstraints: ['stable'],
        softConstraints: ['preferred'],
        namespaces: ['audio'],
      },
    }

    const result = normalizeSigmaBlock(block)
    expect(result).toBe('[[I1 O1|test|!stable @optimal ?preferred #audio]]')
  })

  it('should use _ for empty payload', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I1',
        control: [],
        state: [],
        output: 'O3',
      },
      payload: [],
      modifiers: {
        emphasis: [],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const result = normalizeSigmaBlock(block)
    expect(result).toBe('[[I1 O3|_|_]]')
  })
})

describe('normalizeErrorBlock', () => {
  it('should normalize error blocks with sorted payload keys', () => {
    const error: ErrorBlock = {
      type: 'E0',
      reason: ['ambiguous-intent'],
      context: ['no-clear-action'],
      requires: ['intent-specification'],
    }

    const result = normalizeErrorBlock(error)
    expect(result).toBe('[[E0|context:no-clear-action,reason:ambiguous-intent,requires:intent-specification|!error]]')
  })

  it('should handle minimal error blocks', () => {
    const error: ErrorBlock = {
      type: 'E1',
      reason: ['missing-input'],
    }

    const result = normalizeErrorBlock(error)
    expect(result).toBe('[[E1|reason:missing-input|!error]]')
  })
})

describe('idempotency', () => {
  it('should produce identical output when normalized twice', () => {
    const block: SigmaIRBlock = {
      header: {
        intent: 'I2',
        control: ['C0'],
        state: ['S1'],
        output: 'O4',
      },
      payload: ['test', 'data'],
      modifiers: {
        emphasis: ['optimal'],
        hardConstraints: [],
        softConstraints: [],
        namespaces: [],
      },
    }

    const first = normalizeSigmaBlock(block)
    const second = normalizeSigmaBlock(block)
    
    expect(first).toBe(second)
  })
})
