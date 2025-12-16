import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Example {
  title: string
  input: string
  expected: string
  isError?: boolean
  category: 'block' | 'frame'
}

const examples: Example[] = [
  {
    title: 'Design Language Spec',
    input: 'Design a language specification for token compression with optimal encoding',
    expected: '[[I2 O4|compression,encoding,language,optimal,specification,token|@optimal]]',
    category: 'block'
  },
  {
    title: 'Execute Code Generation',
    input: 'Create code for a parser with no questions',
    expected: '[[I1 C2 O1|code,parser|_]]',
    category: 'block'
  },
  {
    title: 'Analyze with State Preservation',
    input: 'Analyze the grammar and preserve state',
    expected: '[[I3 S1 O0|analyze,grammar,preserve,state|_]]',
    category: 'block'
  },
  {
    title: 'Multi-Block Frame',
    input: 'Design a compression protocol\nAnalyze token efficiency\nPreserve state between operations',
    expected: '=== Σ-FRAME ===\n[[I2 O4|compression,protocol|_]]\n[[I3 O0|efficiency,token|_]]\n[[I1 S1 O3|operations,state|_]]\n=== /Σ-FRAME ===',
    category: 'frame'
  },
  {
    title: 'Ambiguous Intent Error',
    input: 'Something with stuff and things',
    expected: '[[E0|context:no-clear-action,reason:ambiguous-intent,requires:intent-specification|!error]]',
    isError: true,
    category: 'block'
  },
  {
    title: 'Missing Output Error',
    input: 'Execute a function',
    expected: '[[E1|context:no-output-type-specified,reason:missing-output,requires:output-format|!error]]',
    isError: true,
    category: 'block'
  },
]

interface ExamplesPanelProps {
  onSelectExample: (input: string) => void
}

export function ExamplesPanel({ onSelectExample }: ExamplesPanelProps) {
  return (
    <Card className="p-6 bg-card/50">
      <h3 className="text-lg font-semibold mb-4">Examples</h3>
      
      <div className="space-y-4">
        {examples.map((example, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium">{example.title}</h4>
                  <Badge variant={example.category === 'frame' ? 'default' : 'outline'} className="text-xs">
                    {example.category}
                  </Badge>
                  {example.isError && (
                    <span className="text-xs text-destructive">(Error)</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2 whitespace-pre-wrap">
                  {example.input}
                </p>
                <pre className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto">
                  {example.expected}
                </pre>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSelectExample(example.input)}
              >
                Try
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
