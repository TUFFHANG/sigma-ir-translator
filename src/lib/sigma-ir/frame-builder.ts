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
