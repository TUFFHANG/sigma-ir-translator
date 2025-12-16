import { SigmaIRBlock, ErrorBlock } from './types'

export function normalizeSigmaBlock(block: SigmaIRBlock): string {
  const header = normalizeHeader(block)
  const payload = normalizePayload(block.payload)
  const modifiers = normalizeModifiers(block.modifiers)
  
  return `[[${header}|${payload}|${modifiers}]]`
}

function normalizeHeader(block: SigmaIRBlock): string {
  const parts: string[] = []
  
  if (block.header.meta) {
    return block.header.meta
  }
  
  if (block.header.error) {
    return block.header.error
  }
  
  if (block.header.intent) {
    parts.push(block.header.intent)
  }
  
  const sortedControl = [...block.header.control].sort((a, b) => {
    const numA = parseInt(a.slice(1))
    const numB = parseInt(b.slice(1))
    return numA - numB
  })
  parts.push(...sortedControl)
  
  const sortedState = [...block.header.state].sort((a, b) => {
    const numA = parseInt(a.slice(1))
    const numB = parseInt(b.slice(1))
    return numA - numB
  })
  parts.push(...sortedState)
  
  if (block.header.output) {
    parts.push(block.header.output)
  }
  
  return parts.filter((v, i, a) => a.indexOf(v) === i).join(' ')
}

function normalizePayload(payload: string[]): string {
  if (payload.length === 0) return '_'
  
  const cleaned = payload
    .map(term => term.trim())
    .filter(term => term.length > 0)
  
  const unique = [...new Set(cleaned)]
  
  const sorted = unique.sort((a, b) => a.localeCompare(b))
  
  return sorted.join(',')
}

function normalizeModifiers(modifiers: {
  emphasis: string[]
  hardConstraints: string[]
  softConstraints: string[]
  namespaces: string[]
}): string {
  const allModifiers: string[] = []
  
  const sortAndPrefix = (items: string[], prefix: string) => {
    return items
      .map(item => `${prefix}${item}`)
      .sort((a, b) => a.localeCompare(b))
  }
  
  allModifiers.push(...sortAndPrefix(modifiers.hardConstraints, '!'))
  allModifiers.push(...sortAndPrefix(modifiers.emphasis, '@'))
  allModifiers.push(...sortAndPrefix(modifiers.softConstraints, '?'))
  allModifiers.push(...sortAndPrefix(modifiers.namespaces, '#'))
  
  const unique = [...new Set(allModifiers)]
  
  return unique.length > 0 ? unique.join(' ') : '_'
}

export function normalizeErrorBlock(error: ErrorBlock): string {
  const header = error.type
  
  const payloadParts: string[] = []
  
  const addPayloadSection = (key: string, values?: string[]) => {
    if (values && values.length > 0) {
      const sorted = [...values].sort((a, b) => a.localeCompare(b))
      const unique = [...new Set(sorted)]
      payloadParts.push(`${key}:${unique.join(',')}`)
    }
  }
  
  addPayloadSection('blocked-by', error.blockedBy)
  addPayloadSection('conflicts', error.conflicts)
  addPayloadSection('context', error.context)
  addPayloadSection('reason', error.reason)
  addPayloadSection('requires', error.requires)
  
  const payload = payloadParts.length > 0 ? payloadParts.join(',') : '_'
  
  return `[[${header}|${payload}|!error]]`
}

export function normalizeFrame(blocks: string[]): string {
  const normalized = blocks.map(block => block.trim()).filter(b => b.length > 0)
  const sorted = [...new Set(normalized)].sort((a, b) => a.localeCompare(b))
  
  return `=== Σ-FRAME ===\n${sorted.join('\n')}\n=== /Σ-FRAME ===`
}
