import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  MagnifyingGlass, 
  Copy, 
  Check, 
  ArrowSquareOut,
  Lightning
} from '@phosphor-icons/react'
import { 
  sigmaIRTemplates, 
  templateCategories, 
  getTemplatesByCategory,
  searchTemplates,
  type SigmaIRTemplate,
  type TemplateCategory 
} from '@/lib/sigma-ir/templates'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface TemplatesPanelProps {
  onApplyTemplate?: (template: SigmaIRTemplate) => void
}

export function TemplatesPanel({ onApplyTemplate }: TemplatesPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('Design & Synthesis')
  const [selectedTemplate, setSelectedTemplate] = useState<SigmaIRTemplate | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredTemplates = useMemo(() => {
    if (searchQuery.trim()) {
      return searchTemplates(searchQuery)
    }
    return getTemplatesByCategory(selectedCategory)
  }, [searchQuery, selectedCategory])

  const handleCopyOutput = async (template: SigmaIRTemplate) => {
    await navigator.clipboard.writeText(template.output)
    setCopiedId(template.id)
    toast.success('Template copied')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCopyInput = async (template: SigmaIRTemplate) => {
    await navigator.clipboard.writeText(template.input)
    toast.success('Example input copied')
  }

  const handleApplyTemplate = (template: SigmaIRTemplate) => {
    if (onApplyTemplate) {
      onApplyTemplate(template)
      toast.success('Template applied to translator')
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Design & Synthesis': '🎨',
      'Execution & Implementation': '⚡',
      'Analysis & Explanation': '🔍',
      'State Management': '💾',
      'Error Handling': '⚠️',
      'Meta & Control': '⚙️'
    }
    return icons[category] || '📦'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Lightning weight="fill" className="text-accent" />
            Block Templates
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Common Σ-IR patterns ready to use
          </p>
        </div>
        <Badge variant="outline" className="font-mono">
          {filteredTemplates.length} templates
        </Badge>
      </div>

      <div className="relative">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search templates by name, description, or use case..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {!searchQuery && (
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as TemplateCategory)}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {templateCategories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs lg:text-sm">
                <span className="mr-1">{getCategoryIcon(category)}</span>
                <span className="hidden lg:inline">{category.split(' ')[0]}</span>
                <span className="lg:hidden">{category.split(' ')[0].slice(0, 5)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 hover:border-accent/50 transition-colors cursor-pointer h-full flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm">{template.name}</h3>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {getCategoryIcon(template.category)}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {template.description}
                </p>

                <div className="space-y-2 mb-3">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Example Input:</div>
                    <div className="text-xs bg-muted p-2 rounded font-sans line-clamp-2">
                      {template.input}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Output:</div>
                    <div className="text-xs bg-slate-950 text-accent p-2 rounded font-mono break-all line-clamp-2">
                      {template.output}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground italic border-l-2 border-accent/30 pl-2 mb-3">
                  {template.useCase}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <ArrowSquareOut size={14} className="mr-1" />
                  View
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => handleCopyOutput(template)}
                >
                  {copiedId === template.id ? (
                    <>
                      <Check size={14} className="mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No templates match your search</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="mt-2"
          >
            Clear search
          </Button>
        </Card>
      )}

      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{getCategoryIcon(selectedTemplate.category)}</span>
                  {selectedTemplate.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedTemplate.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Category</label>
                    <Badge variant="outline">{selectedTemplate.category}</Badge>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Example Input</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyInput(selectedTemplate)}
                    >
                      <Copy size={14} className="mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Card className="p-3 bg-muted">
                    <p className="text-sm font-sans">{selectedTemplate.input}</p>
                  </Card>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Σ-IR Output (Σ-NF)</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyOutput(selectedTemplate)}
                    >
                      <Copy size={14} className="mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Card className="p-3 bg-slate-950">
                    <pre className="text-sm font-mono text-accent whitespace-pre-wrap break-all">
                      {selectedTemplate.output}
                    </pre>
                  </Card>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Use Case</label>
                  <Card className="p-3 bg-muted/50 border-l-2 border-accent">
                    <p className="text-sm italic text-muted-foreground">
                      {selectedTemplate.useCase}
                    </p>
                  </Card>
                </div>

                {onApplyTemplate && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => {
                        handleApplyTemplate(selectedTemplate)
                        setSelectedTemplate(null)
                      }}
                    >
                      <ArrowSquareOut className="mr-2" />
                      Apply to Translator
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCopyOutput(selectedTemplate)}
                    >
                      <Copy className="mr-2" />
                      Copy Output
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
