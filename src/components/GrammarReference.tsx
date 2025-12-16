import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function GrammarReference() {
  return (
    <Card className="p-6 bg-card/50">
      <h3 className="text-lg font-semibold mb-4">Σ-IR Grammar Reference</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="intent">
          <AccordionTrigger className="text-sm">
            Intent Primitives <Badge variant="secondary" className="ml-2">I*</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div><span className="font-mono text-accent">I0</span> — inform/explain</div>
              <div><span className="font-mono text-accent">I1</span> — execute/do</div>
              <div><span className="font-mono text-accent">I2</span> — design/synthesize</div>
              <div><span className="font-mono text-accent">I3</span> — analyze</div>
              <div><span className="font-mono text-accent">I4</span> — compress</div>
              <div><span className="font-mono text-accent">I5</span> — expand</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="control">
          <AccordionTrigger className="text-sm">
            Control Primitives <Badge variant="secondary" className="ml-2">C*</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div><span className="font-mono text-accent">C0</span> — closed answer</div>
              <div><span className="font-mono text-accent">C1</span> — exploratory</div>
              <div><span className="font-mono text-accent">C2</span> — no questions</div>
              <div><span className="font-mono text-accent">C3</span> — ask only if impossible</div>
              <div><span className="font-mono text-accent">C4</span> — no repetition</div>
              <div><span className="font-mono text-accent">C5</span> — artifact-only</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="state">
          <AccordionTrigger className="text-sm">
            State Primitives <Badge variant="secondary" className="ml-2">S*</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div><span className="font-mono text-accent">S0</span> — reset assumptions</div>
              <div><span className="font-mono text-accent">S1</span> — preserve state</div>
              <div><span className="font-mono text-accent">S2</span> — override defaults</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="output">
          <AccordionTrigger className="text-sm">
            Output Primitives <Badge variant="secondary" className="ml-2">O*</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div><span className="font-mono text-accent">O0</span> — prose</div>
              <div><span className="font-mono text-accent">O1</span> — code</div>
              <div><span className="font-mono text-accent">O2</span> — spec</div>
              <div><span className="font-mono text-accent">O3</span> — config</div>
              <div><span className="font-mono text-accent">O4</span> — language</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="error">
          <AccordionTrigger className="text-sm">
            Error Primitives <Badge variant="destructive" className="ml-2">E*</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div><span className="font-mono text-destructive">E0</span> — ambiguity</div>
              <div><span className="font-mono text-destructive">E1</span> — missing-input</div>
              <div><span className="font-mono text-destructive">E2</span> — contradiction</div>
              <div><span className="font-mono text-destructive">E3</span> — invalid-state</div>
              <div><span className="font-mono text-destructive">E4</span> — unsupported</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="modifiers">
          <AccordionTrigger className="text-sm">
            Modifiers
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div><span className="font-mono text-accent">@</span> emphasis</div>
              <div><span className="font-mono text-accent">!</span> hard constraint</div>
              <div><span className="font-mono text-accent">?</span> soft constraint</div>
              <div><span className="font-mono text-accent">#</span> namespace</div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold">Canonical Form:</span> [[H|P|M]]
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Header items sorted (I C* S* O), payload terms sorted lexicographically, modifiers sorted by prefix precedence (!@?#)
        </p>
      </div>
    </Card>
  )
}
