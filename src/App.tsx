import { useState } from 'react'
import { TranslatorPanel } from '@/components/TranslatorPanel'
import { GrammarReference } from '@/components/GrammarReference'
import { ExamplesPanel } from '@/components/ExamplesPanel'
import { Toaster } from '@/components/ui/sonner'
import { Code } from '@phosphor-icons/react'

function App() {
  const [inputValue, setInputValue] = useState('')

  const handleSelectExample = (exampleInput: string) => {
    setInputValue(exampleInput)
    const textarea = document.getElementById('english-input') as HTMLTextAreaElement
    if (textarea) {
      textarea.value = exampleInput
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
      textarea.focus()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.25_0.08_270),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.20_0.06_200),transparent_50%)] pointer-events-none" />
      
      <div className="relative">
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code size={28} weight="bold" className="text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Σ-IR Translator</h1>
                <p className="text-sm text-muted-foreground">
                  English → Normalized Sigma Intermediate Representation
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <TranslatorPanel key={inputValue} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GrammarReference />
              <ExamplesPanel onSelectExample={handleSelectExample} />
            </div>

            <footer className="pt-8 pb-4 text-center text-xs text-muted-foreground border-t border-border/50">
              <p>Σ-IR Translator — Deterministic morpheme-based compression protocol</p>
              <p className="mt-1">Enforces Σ-NF v1 canonical normalization</p>
            </footer>
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  )
}

export default App