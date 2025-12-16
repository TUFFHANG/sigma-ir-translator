import { describe, it, expect } from 'vitest'
import { buildFrame } from '../frame-builder'

describe('Frame Builder', () => {
  it('should build a valid frame from multiple blocks', () => {
    const blocks = [
      '[[I2 O4|compression,protocol|_]]',
      '[[I3 O0|efficiency,token|_]]',
      '[[I1 S1 O3|operations,state|_]]'
    ]
    
    const frame = buildFrame(blocks)
    
    expect(frame).toContain('=== Σ-FRAME ===')
    expect(frame).toContain('=== /Σ-FRAME ===')
    expect(frame).toContain('[[I2 O4|compression,protocol|_]]')
    expect(frame).toContain('[[I3 O0|efficiency,token|_]]')
    expect(frame).toContain('[[I1 S1 O3|operations,state|_]]')
  })

  it('should return empty string for empty block array', () => {
    const frame = buildFrame([])
    expect(frame).toBe('')
  })

  it('should sort blocks lexicographically', () => {
    const blocks = [
      '[[I3 O0|zebra|_]]',
      '[[I1 O1|alpha|_]]',
      '[[I2 O2|beta|_]]'
    ]
    
    const frame = buildFrame(blocks)
    const lines = frame.split('\n')
    
    expect(lines[1]).toBe('[[I1 O1|alpha|_]]')
    expect(lines[2]).toBe('[[I2 O2|beta|_]]')
    expect(lines[3]).toBe('[[I3 O0|zebra|_]]')
  })

  it('should deduplicate identical blocks', () => {
    const blocks = [
      '[[I1 O1|alpha|_]]',
      '[[I1 O1|alpha|_]]',
      '[[I2 O2|beta|_]]'
    ]
    
    const frame = buildFrame(blocks)
    const lines = frame.split('\n').filter(line => line.includes('[['))
    
    expect(lines.length).toBe(2)
    expect(lines[0]).toBe('[[I1 O1|alpha|_]]')
    expect(lines[1]).toBe('[[I2 O2|beta|_]]')
  })

  it('should trim whitespace from blocks', () => {
    const blocks = [
      '  [[I1 O1|alpha|_]]  ',
      '[[I2 O2|beta|_]]'
    ]
    
    const frame = buildFrame(blocks)
    
    expect(frame).not.toContain('  [[')
    expect(frame).toContain('[[I1 O1|alpha|_]]')
  })

  it('should filter out empty blocks', () => {
    const blocks = [
      '[[I1 O1|alpha|_]]',
      '',
      '   ',
      '[[I2 O2|beta|_]]'
    ]
    
    const frame = buildFrame(blocks)
    const lines = frame.split('\n').filter(line => line.includes('[['))
    
    expect(lines.length).toBe(2)
  })

  it('should handle single block', () => {
    const blocks = ['[[I1 O1|test|_]]']
    
    const frame = buildFrame(blocks)
    
    expect(frame).toBe('=== Σ-FRAME ===\n[[I1 O1|test|_]]\n=== /Σ-FRAME ===')
  })

  it('should maintain frame structure with error blocks', () => {
    const blocks = [
      '[[E0|reason:test|!error]]',
      '[[I1 O1|valid|_]]'
    ]
    
    const frame = buildFrame(blocks)
    
    expect(frame).toContain('=== Σ-FRAME ===')
    expect(frame).toContain('=== /Σ-FRAME ===')
    expect(frame).toContain('[[E0|reason:test|!error]]')
    expect(frame).toContain('[[I1 O1|valid|_]]')
  })

  it('should handle state checkpoint blocks', () => {
    const blocks = [
      '[[SΣ|decided:test|!checkpoint]]',
      '[[I1 O1|action|_]]'
    ]
    
    const frame = buildFrame(blocks)
    
    expect(frame).toContain('[[SΣ|decided:test|!checkpoint]]')
    expect(frame).toContain('[[I1 O1|action|_]]')
  })

  it('should properly format multiline output', () => {
    const blocks = [
      '[[I1 O1|alpha|_]]',
      '[[I2 O2|beta|_]]'
    ]
    
    const frame = buildFrame(blocks)
    const lines = frame.split('\n')
    
    expect(lines[0]).toBe('=== Σ-FRAME ===')
    expect(lines[lines.length - 1]).toBe('=== /Σ-FRAME ===')
    expect(lines.length).toBe(4)
  })
})
