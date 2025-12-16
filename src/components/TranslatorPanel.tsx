import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Copy, Check, Warning } from '@phosphor-icons/react'
import { translateToSigmaIR } from '@/lib/sigma-ir'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export function TranslatorPanel() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isError, setIsError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  const handleTranslate = () => {
    if (!input.trim()) {
      toast.error('Input required')
      return
    }

    setIsTranslating(true)
    
    setTimeout(() => {
      const result = translateToSigmaIR(input)
      setOutput(result.output)
      setIsError(!result.success)
      setIsTranslating(false)
      
      if (result.success) {
        toast.success('Translation complete')
      } else {
        toast.error('Error block emitted')
      }
    }, 200)
  }

  const handleCopy = async () => {
    if (!output) return
    
    await navigator.clipboard.writeText(output)
    setCopied(true)
    toast.success('Copied to clipboard')
    
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setIsError(false)
    setCopied(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Input</h2>
            <p className="text-sm text-muted-foreground">Plain English description</p>
          </div>
          {input && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
        </div>
        
        <Textarea
          id="english-input"
          placeholder="Example: Create a language specification for token compression with optimal encoding"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[300px] font-sans resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              handleTranslate()
            }
          }}
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={handleTranslate}
            disabled={isTranslating || !input.trim()}
            className="flex-1"
          >
            {isTranslating ? (
              'Translating...'
            ) : (
              <>
                Translate <ArrowRight className="ml-2" />
              </>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded border">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-muted rounded border">Enter</kbd> to translate
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Output</h2>
            <p className="text-sm text-muted-foreground">Normalized Σ-IR</p>
          </div>
          {output && (
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
          {output ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isError ? (
                <Alert variant="destructive" className="border-2">
                  <Warning className="h-5 w-5" />
                  <AlertDescription className="font-mono text-sm whitespace-pre-wrap break-all mt-2">
                    {output}
                  </AlertDescription>
                </Alert>
              ) : (
                <Card className="p-4 bg-slate-950 border-accent/50 border-2">
                  <pre className="font-mono text-sm text-accent whitespace-pre-wrap break-all">
                    {output}
                  </pre>
                </Card>
              )}
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant={isError ? "destructive" : "secondary"}>
                  {isError ? 'Error Block' : 'Valid Σ-NF'}
                </Badge>
                <Badge variant="outline">
                  {output.length} bytes
                </Badge>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[300px] border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm"
            >
              Awaiting translation
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
