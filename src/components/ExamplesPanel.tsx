import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Example {
  title: string
  input: string
  expected: string
  isError?: boolean
}

const examples: Example[] = [
  {
    title: 'Design Language Spec',
    input: 'Design a language specification for token compression with optimal encoding',
    expected: '[[I2 O4|compression,encoding,language,optimal,specification,token|@optimal]]',
  },
  {
    title: 'Execute Code Generation',
    input: 'Create code for a parser with no questions',
    expected: '[[I1 C2 O1|code,parser|_]]',
  },
  {
    title: 'Analyze with State Preservation',
    input: 'Analyze the grammar and preserve state',
    expected: '[[I3 S1 O0|analyze,grammar,preserve,state|_]]',
  },
  {
    title: 'Ambiguous Intent Error',
    input: 'Something with stuff and things',
    expected: '[[E0|context:no-clear-action,reason:ambiguous-intent,requires:intent-specification|!error]]',
    isError: true,
  },
  {
    title: 'Missing Output Error',
    input: 'Execute a function',
    expected: '[[E1|context:no-output-type-specified,reason:missing-output,requires:output-format|!error]]',
    isError: true,
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
                  {example.isError && (
                    <span className="text-xs text-destructive">(Error)</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
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
