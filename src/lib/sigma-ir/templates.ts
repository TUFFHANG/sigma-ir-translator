export interface SigmaIRTemplate {
  id: string
  name: string
  category: string
  description: string
  input: string
  output: string
  useCase: string
}

export const templateCategories = [
  'Design & Synthesis',
  'Execution & Implementation',
  'Analysis & Explanation',
  'State Management',
  'Error Handling',
  'Meta & Control'
] as const

export type TemplateCategory = typeof templateCategories[number]

export const sigmaIRTemplates: SigmaIRTemplate[] = [
  {
    id: 'design-spec',
    name: 'Design Specification',
    category: 'Design & Synthesis',
    description: 'Create a detailed specification or design document',
    input: 'Design a language specification for token compression with optimal encoding',
    output: '[[I2 C0 C2 O2|language-spec,optimal-encoding,token-compression|_]]',
    useCase: 'When you need to create specifications, design documents, or architectural plans'
  },
  {
    id: 'design-system',
    name: 'System Design',
    category: 'Design & Synthesis',
    description: 'Architect a complete system with multiple components',
    input: 'Design a distributed caching system with automatic failover',
    output: '[[I2 C0 C2 O2|automatic-failover,caching-system,distributed|_]]',
    useCase: 'For complex system architecture and component design'
  },
  {
    id: 'design-optimal',
    name: 'Optimal Design',
    category: 'Design & Synthesis',
    description: 'Design with optimization constraints',
    input: 'Design a database schema optimized for read performance',
    output: '[[I2 C0 C2 O2|database-schema,read-performance|@optimal]]',
    useCase: 'When optimization is a critical requirement'
  },
  {
    id: 'execute-implementation',
    name: 'Execute Implementation',
    category: 'Execution & Implementation',
    description: 'Implement code or configuration',
    input: 'Implement a rate limiting middleware with token bucket algorithm',
    output: '[[I1 C0 C2 O1|middleware,rate-limiting,token-bucket|_]]',
    useCase: 'For direct code implementation tasks'
  },
  {
    id: 'execute-config',
    name: 'Generate Configuration',
    category: 'Execution & Implementation',
    description: 'Create configuration files or settings',
    input: 'Generate nginx configuration for reverse proxy with SSL termination',
    output: '[[I1 C0 C2 O3|nginx,reverse-proxy,ssl-termination|_]]',
    useCase: 'When you need configuration files or settings'
  },
  {
    id: 'execute-strict',
    name: 'Execute with Constraints',
    category: 'Execution & Implementation',
    description: 'Implementation with hard constraints',
    input: 'Implement authentication system with zero external dependencies',
    output: '[[I1 C0 C2 O1|authentication-system,zero-dependencies|!no-external-deps]]',
    useCase: 'When specific constraints must be enforced'
  },
  {
    id: 'analyze-codebase',
    name: 'Analyze Codebase',
    category: 'Analysis & Explanation',
    description: 'Analyze existing code or systems',
    input: 'Analyze the authentication flow for security vulnerabilities',
    output: '[[I3 C0 C2 O0|authentication-flow,security-vulnerabilities|_]]',
    useCase: 'For code review, security audits, or system analysis'
  },
  {
    id: 'explain-concept',
    name: 'Explain Concept',
    category: 'Analysis & Explanation',
    description: 'Explain technical concepts or patterns',
    input: 'Explain the actor model and its concurrency guarantees',
    output: '[[I0 C0 C2 O0|actor-model,concurrency-guarantees|_]]',
    useCase: 'When you need explanations or documentation'
  },
  {
    id: 'analyze-performance',
    name: 'Performance Analysis',
    category: 'Analysis & Explanation',
    description: 'Analyze performance characteristics',
    input: 'Analyze database query performance and identify bottlenecks',
    output: '[[I3 C0 C2 O0|bottlenecks,database-query,performance|_]]',
    useCase: 'For performance profiling and optimization planning'
  },
  {
    id: 'compress-context',
    name: 'Compress Context',
    category: 'Design & Synthesis',
    description: 'Create compressed representations',
    input: 'Compress the API documentation into a reference guide',
    output: '[[I4 C0 C2 O2|api-documentation,reference-guide|@minimal]]',
    useCase: 'When you need to condense information'
  },
  {
    id: 'expand-spec',
    name: 'Expand Specification',
    category: 'Analysis & Explanation',
    description: 'Expand compressed information into full form',
    input: 'Expand the API spec into detailed implementation guide',
    output: '[[I5 C0 C2 O2|api-spec,detailed-guide,implementation|_]]',
    useCase: 'When you need to expand abbreviated content'
  },
  {
    id: 'state-checkpoint',
    name: 'State Checkpoint',
    category: 'State Management',
    description: 'Create a state checkpoint to preserve decisions',
    input: 'Checkpoint: decided on microservices architecture, assumed eventual consistency, locked on Kubernetes',
    output: '[[SΣ|assumed:eventual-consistency,decided:microservices-architecture,locked:kubernetes|!checkpoint]]',
    useCase: 'To preserve project state and decisions across sessions'
  },
  {
    id: 'state-complex',
    name: 'Complex State Checkpoint',
    category: 'State Management',
    description: 'Checkpoint with multiple state categories',
    input: 'Checkpoint: decided on REST API and PostgreSQL, assumed high read load, locked on JSON format, deferred caching strategy',
    output: '[[SΣ|assumed:high-read-load,decided:postgresql,decided:rest-api,deferred:caching-strategy,locked:json-format|!checkpoint]]',
    useCase: 'For comprehensive state management with multiple decision types'
  },
  {
    id: 'error-ambiguity',
    name: 'Signal Ambiguity',
    category: 'Error Handling',
    description: 'Emit error when input is ambiguous',
    input: 'Create a system for data storage',
    output: '[[E0|context:data-storage-system,reason:ambiguous-scope,requires:storage-type|!error]]',
    useCase: 'Automatically generated when translator detects ambiguous input'
  },
  {
    id: 'error-missing',
    name: 'Missing Input',
    category: 'Error Handling',
    description: 'Signal missing required information',
    input: 'Implement the optimization',
    output: '[[E1|reason:missing-target,requires:optimization-target|!error]]',
    useCase: 'Automatically generated when critical information is missing'
  },
  {
    id: 'error-contradiction',
    name: 'Signal Contradiction',
    category: 'Error Handling',
    description: 'Emit error for conflicting constraints',
    input: 'Design with minimal dependencies but use all modern frameworks',
    output: '[[E2|conflicts:minimal-dependencies,modern-frameworks,reason:conflicting-constraints|!error]]',
    useCase: 'When input contains contradictory requirements'
  },
  {
    id: 'thinking-subset-strict',
    name: 'Strict Thinking Mode',
    category: 'Meta & Control',
    description: 'Enforce strict Σ-IR-only internal reasoning',
    input: 'Use only Σ-IR primitives for internal reasoning with checkpoint-based memory',
    output: '[[IΣ|expansion:bounded,memory:checkpoint-only,mode:latent,resolution:deterministic,scope:Σ-core-only|!enforced]]',
    useCase: 'When you want maximum compression and structure in reasoning'
  },
  {
    id: 'thinking-subset-flexible',
    name: 'Flexible Thinking Mode',
    category: 'Meta & Control',
    description: 'Allow hybrid reasoning with domain extensions',
    input: 'Use hybrid reasoning with domain namespaces and frame awareness',
    output: '[[IΣ|expansion:free,memory:frame-aware,mode:hybrid,scope:Σ+domain|!enforced]]',
    useCase: 'When you need more flexible internal reasoning'
  },
  {
    id: 'closed-artifact',
    name: 'Closed Artifact',
    category: 'Meta & Control',
    description: 'Request artifact-only output with no questions',
    input: 'Generate React component for user profile with no questions',
    output: '[[I1 C0 C2 C5 O1|react-component,user-profile|_]]',
    useCase: 'When you want direct output without follow-up questions'
  },
  {
    id: 'exploratory',
    name: 'Exploratory Analysis',
    category: 'Meta & Control',
    description: 'Request exploratory output with options',
    input: 'Explore different approaches to rate limiting with tradeoffs',
    output: '[[I3 C1 O0|rate-limiting,tradeoffs|_]]',
    useCase: 'When you want to explore multiple solutions'
  }
]

export function getTemplatesByCategory(category: TemplateCategory): SigmaIRTemplate[] {
  return sigmaIRTemplates.filter(t => t.category === category)
}

export function searchTemplates(query: string): SigmaIRTemplate[] {
  const lowerQuery = query.toLowerCase()
  return sigmaIRTemplates.filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.input.toLowerCase().includes(lowerQuery) ||
    t.output.toLowerCase().includes(lowerQuery) ||
    t.useCase.toLowerCase().includes(lowerQuery)
  )
}

export function getTemplateById(id: string): SigmaIRTemplate | undefined {
  return sigmaIRTemplates.find(t => t.id === id)
}
