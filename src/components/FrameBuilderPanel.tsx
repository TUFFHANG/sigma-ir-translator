import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Trash, 
  Copy, 
  Check, 
  Stack, 
  ArrowUp, 
  ArrowDown,
  FrameCorners,
  Eye,
  ArrowsDownUp
} from '@phosphor-icons/react'
import { translateToSigmaIR } from '@/lib/sigma-ir'
import { buildFrame, previewFrameOrder } from '@/lib/sigma-ir/frame-builder'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface Block {
  id: string
  input: string
  output: string
  isError: boolean
}

export function FrameBuilderPanel() {
  const [blocks, setBlocks] = useKV<Block[]>('frame-builder-blocks', [])
  const [currentInput, setCurrentInput] = useState('')
  const [frameOutput, setFrameOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const blocksList = blocks || []

  const previewData = useMemo(() => {
    if (blocksList.length === 0) return []
    return previewFrameOrder(blocksList.map(b => b.output))
  }, [blocksList])

  const handleAddBlock = () => {
    if (!currentInput.trim()) {
      toast.error('Input required')
      return
    }

    const result = translateToSigmaIR(currentInput)
    
    const newBlock: Block = {
      id: Date.now().toString(),
      input: currentInput,
      output: result.output,
      isError: !result.success
    }

    setBlocks((current) => [...(current || []), newBlock])
    setCurrentInput('')
    
    if (result.success) {
      toast.success('Block added')
    } else {
      toast.warning('Error block added')
    }
  }

  const handleRemoveBlock = (id: string) => {
    setBlocks((current) => (current || []).filter(block => block.id !== id))
    toast.success('Block removed')
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    
    setBlocks((current) => {
      const arr = current || []
      const newBlocks = [...arr]
      const temp = newBlocks[index]
      newBlocks[index] = newBlocks[index - 1]
      newBlocks[index - 1] = temp
      return newBlocks
    })
  }

  const handleMoveDown = (index: number) => {
    setBlocks((current) => {
      const arr = current || []
      if (index === arr.length - 1) return arr
      
      const newBlocks = [...arr]
      const temp = newBlocks[index]
      newBlocks[index] = newBlocks[index + 1]
      newBlocks[index + 1] = temp
      return newBlocks
    })
  }

  const handleBuildFrame = () => {
    if (blocksList.length === 0) {
      toast.error('Add at least one block')
      return
    }

    const blockOutputs = blocksList.map(b => b.output)
    const frame = buildFrame(blockOutputs)
    setFrameOutput(frame)
    toast.success('Frame built')
  }

  const handleCopy = async () => {
    if (!frameOutput) return
    
    await navigator.clipboard.writeText(frameOutput)
    setCopied(true)
    toast.success('Copied to clipboard')
    
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setBlocks([])
    setFrameOutput('')
    toast.success('All blocks cleared')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Stack weight="fill" className="text-accent" />
              Block Builder
            </h2>
            <p className="text-sm text-muted-foreground">Add blocks to combine into a frame</p>
          </div>
          {blocksList.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClear}
            >
              Clear All
            </Button>
          )}
        </div>
        
        <Textarea
          id="frame-input"
          placeholder="Enter English description for a block..."
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="min-h-[120px] font-sans resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              handleAddBlock()
            }
          }}
        />
        
        <Button 
          onClick={handleAddBlock}
          disabled={!currentInput.trim()}
          variant="secondary"
        >
          <Plus className="mr-2" weight="bold" />
          Add Block
        </Button>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {blocksList.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`p-4 ${block.isError ? 'border-destructive/50' : 'border-accent/30'}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col gap-1 pt-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowUp size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === blocksList.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowDown size={14} />
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant={block.isError ? 'destructive' : 'secondary'} className="text-xs">
                          Block {index + 1}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveBlock(block.id)}
                          className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {block.input}
                      </p>
                      
                      <pre className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto">
                        {block.output}
                      </pre>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {blocksList.length > 0 && (
          <div className="pt-2 space-y-3">
            <Button 
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="w-full gap-2"
            >
              {showPreview ? (
                <>
                  <Eye weight="bold" />
                  Hide Sort Preview
                </>
              ) : (
                <>
                  <ArrowsDownUp weight="bold" />
                  Show Sort Preview
                </>
              )}
            </Button>

            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 bg-muted/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <ArrowsDownUp className="text-accent" weight="bold" />
                      <h3 className="text-sm font-semibold">Frame Sort Preview</h3>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Blocks will be sorted lexicographically. Duplicates will be removed.
                    </p>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {previewData.map((item) => (
                        <div
                          key={`${item.originalIndex}-${item.sortedIndex}`}
                          className={`p-3 rounded border ${
                            item.isDuplicate 
                              ? 'bg-destructive/10 border-destructive/30' 
                              : item.moved 
                                ? 'bg-accent/10 border-accent/30' 
                                : 'bg-card border-border/50'
                          }`}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="outline" className="text-[10px] h-5 px-1.5">
                                #{item.originalIndex + 1}
                              </Badge>
                              {item.moved && !item.isDuplicate && (
                                <>
                                  <span className="text-muted-foreground">→</span>
                                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                                    #{item.sortedIndex + 1}
                                  </Badge>
                                </>
                              )}
                            </div>
                            
                            {item.isDuplicate && (
                              <Badge variant="destructive" className="text-[10px] h-5">
                                DUPLICATE - WILL BE REMOVED
                              </Badge>
                            )}
                            
                            {item.moved && !item.isDuplicate && (
                              <Badge variant="secondary" className="text-[10px] h-5">
                                WILL MOVE
                              </Badge>
                            )}
                          </div>
                          
                          <pre className={`text-[10px] font-mono overflow-x-auto ${
                            item.isDuplicate ? 'opacity-50 line-through' : ''
                          }`}>
                            {item.block}
                          </pre>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 text-xs pt-2 border-t border-border/50">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded border border-accent/30 bg-accent/10" />
                        <span className="text-muted-foreground">Will move</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded border border-destructive/30 bg-destructive/10" />
                        <span className="text-muted-foreground">Duplicate (removed)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded border border-border/50 bg-card" />
                        <span className="text-muted-foreground">No change</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              onClick={handleBuildFrame}
              className="w-full"
            >
              <FrameCorners className="mr-2" weight="bold" />
              Build Σ-FRAME ({blocksList.length} block{blocksList.length !== 1 ? 's' : ''})
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded border">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-muted rounded border">Enter</kbd> to add block
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Σ-FRAME Output</h2>
            <p className="text-sm text-muted-foreground">Normalized frame structure</p>
          </div>
          {frameOutput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check weight="bold" /> Copied
                </>
              ) : (
                <>
                  <Copy /> Copy
                </>
              )}
            </Button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {frameOutput ? (
            <motion.div
              key="frame-output"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Card className="p-4 bg-slate-950 border-accent/50 border-2">
                <pre className="font-mono text-sm text-accent whitespace-pre-wrap break-all">
                  {frameOutput}
                </pre>
              </Card>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  Valid Σ-FRAME-NF
                </Badge>
                <Badge variant="outline">
                  {blocksList.length} block{blocksList.length !== 1 ? 's' : ''}
                </Badge>
                <Badge variant="outline">
                  {frameOutput.length} bytes
                </Badge>
              </div>

              <Card className="p-4 bg-muted/30">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Frame Structure:</span> Blocks are sorted lexicographically 
                  by their Σ-NF serialization for stable hashing and diffing. Duplicates are removed.
                </p>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="empty-frame"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[400px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground text-sm gap-4"
            >
              <FrameCorners size={48} className="opacity-50" />
              <div className="text-center">
                <p>No frame built yet</p>
                <p className="text-xs mt-1">Add blocks and click "Build Σ-FRAME"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
