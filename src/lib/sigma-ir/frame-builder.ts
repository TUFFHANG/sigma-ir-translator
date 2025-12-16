export interface BlockOrderPreview {
  originalIndex: number
  sortedIndex: number
  block: string
  moved: boolean
  isDuplicate: boolean
}

export function previewFrameOrder(blocks: string[]): BlockOrderPreview[] {
  if (blocks.length === 0) {
    return []
  }

  const trimmedBlocks = blocks.map(block => block.trim()).filter(block => block.length > 0)
  
  const blocksWithOriginalIndex = trimmedBlocks.map((block, index) => ({
    block,
    originalIndex: index
  }))

  const sorted = [...blocksWithOriginalIndex].sort((a, b) => 
    a.block.localeCompare(b.block)
  )

  const seen = new Set<string>()
  
  return sorted.map((item, sortedIndex) => {
    const isDuplicate = seen.has(item.block)
    seen.add(item.block)
    
    return {
      originalIndex: item.originalIndex,
      sortedIndex,
      block: item.block,
      moved: item.originalIndex !== sortedIndex,
      isDuplicate
    }
  })
}

export function buildFrame(blocks: string[]): string {
  if (blocks.length === 0) {
    return ''
  }

  const normalizedBlocks = blocks
    .map(block => block.trim())
    .filter(block => block.length > 0)
    .sort()
    .filter((block, index, arr) => index === 0 || block !== arr[index - 1])

  const frameLines = [
    '=== Σ-FRAME ===',
    ...normalizedBlocks,
    '=== /Σ-FRAME ==='
  ]

  return frameLines.join('\n')
}
