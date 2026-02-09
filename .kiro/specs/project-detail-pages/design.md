# Project Detail Pages - Design Document

## Overview

This feature extends the portfolio by adding comprehensive project detail pages that showcase technical depth and implementation details. Each project will have a dedicated page accessible via clickable cards on the homepage, featuring architecture diagrams, code examples, API documentation, and performance metrics. The design maintains the technical minimalist aesthetic while providing rich, documentation-style content that demonstrates backend and AI engineering expertise.

## Architecture

### Page Structure

```
/projects/[slug]
├── Hero Section (Project Title + Overview)
├── Quick Stats Bar (Metrics at a glance)
├── Architecture Section (System Design Diagrams)
├── Technical Deep Dive
│   ├── Implementation Details
│   ├── Code Examples
│   └── API Documentation (for backend projects)
├── Tech Stack Breakdown
├── Performance & Achievements
└── External Links (GitHub, Demo, Docs)
```

### Routing

- **Dynamic Routes**: Use Next.js App Router dynamic segments `/projects/[slug]`
- **Static Generation**: Pre-render project pages at build time using `generateStaticParams`
- **Metadata**: Generate SEO-friendly metadata for each project page

### Data Flow

```
Notion Database (Projects)
    ↓
Notion API Client
    ↓
Project Data Fetching (Server-side)
    ↓
Project Detail Page Component
    ↓
├── Hero Component
├── Architecture Diagram Component
├── Code Snippet Component
├── API Explorer Component
└── Metrics Display Component
```

## Components and Interfaces

### 1. Project Data Structure

```typescript
interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  category: 'backend' | 'ai' | 'fullstack';
  
  // Quick stats
  stats: {
    label: string;
    value: string;
    icon?: string;
  }[];
  
  // Architecture
  architecture: {
    diagram: string; // Path to diagram image or Mermaid code
    description: string;
    components: {
      name: string;
      description: string;
      tech: string[];
    }[];
  };
  
  // Technical details
  technicalDetails: {
    overview: string;
    challenges: string[];
    solutions: string[];
  };
  
  // Code examples
  codeExamples: {
    title: string;
    description: string;
    language: string;
    code: string;
  }[];
  
  // API documentation (optional, for backend projects)
  apiDocs?: {
    baseUrl: string;
    endpoints: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      path: string;
      description: string;
      parameters?: {
        name: string;
        type: string;
        required: boolean;
        description: string;
      }[];
      requestExample?: string;
      responseExample?: string;
    }[];
  };
  
  // Tech stack
  techStack: {
    category: string;
    technologies: {
      name: string;
      purpose: string;
    }[];
  }[];
  
  // Performance metrics
  performance: {
    metric: string;
    value: string;
    description: string;
  }[];
  
  // External links
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  
  // Timeline
  timeline: {
    started: string;
    completed?: string;
    status: 'completed' | 'in-progress' | 'maintained';
  };
}
```

### 2. Page Components

#### ProjectDetailPage Component
```typescript
// app/projects/[slug]/page.tsx
interface ProjectDetailPageProps {
  params: { slug: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps);
export async function generateStaticParams(): Promise<{ slug: string }[]>;
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata>;
```

#### ProjectHero Component
```typescript
interface ProjectHeroProps {
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  stats: Project['stats'];
  links: Project['links'];
}

export function ProjectHero(props: ProjectHeroProps): JSX.Element;
```

#### ArchitectureDiagram Component
```typescript
interface ArchitectureDiagramProps {
  diagram: string; // Image path or Mermaid code
  description: string;
  components: Project['architecture']['components'];
}

export function ArchitectureDiagram(props: ArchitectureDiagramProps): JSX.Element;
```

#### CodeSnippet Component
```typescript
interface CodeSnippetProps {
  title: string;
  description: string;
  language: string;
  code: string;
  showLineNumbers?: boolean;
}

export function CodeSnippet(props: CodeSnippetProps): JSX.Element;
```

#### APIDocumentation Component
```typescript
interface APIDocumentationProps {
  baseUrl: string;
  endpoints: Project['apiDocs']['endpoints'];
}

export function APIDocumentation(props: APIDocumentationProps): JSX.Element;
```

#### MetricsGrid Component
```typescript
interface MetricsGridProps {
  metrics: Project['performance'];
}

export function MetricsGrid(props: MetricsGridProps): JSX.Element;
```

### 3. Utility Functions

```typescript
// lib/projects.ts
export function getAllProjects(): Project[];
export function getProjectBySlug(slug: string): Project | null;
export function getProjectSlugs(): string[];
```

## Data Models

### Project Data Storage

Projects will be stored in **Notion** as a database, providing a user-friendly CMS interface for managing project content.

#### Notion Database Structure

**Database Name**: Projects

**Properties**:
- Title (Title) - Project name
- Slug (Text) - URL-friendly identifier
- Tagline (Text) - Short description
- Description (Rich Text) - Full description
- Hero Image (Files & Media) - Project hero image
- Category (Select: backend, ai, fullstack)
- Status (Select: completed, in-progress, maintained)
- GitHub URL (URL)
- Demo URL (URL)
- Docs URL (URL)
- Started Date (Date)
- Completed Date (Date)

**Page Content** (within each project page in Notion):
- Stats section (table or list)
- Architecture description
- Technical details
- Code examples (code blocks)
- API endpoints (if applicable)
- Tech stack (categorized list)
- Performance metrics

#### Notion API Integration

```typescript
// lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getProjects(): Promise<Project[]>;
export async function getProjectBySlug(slug: string): Promise<Project | null>;
```

#### Data Transformation

The Notion API client will fetch raw Notion data and transform it into the `Project` interface:

```typescript
// lib/notion-transformer.ts
export function transformNotionPageToProject(page: NotionPage): Project {
  // Transform Notion page properties and content blocks
  // into Project interface structure
}
```

### Example Notion Page Structure

```
📄 RAG ENGINE (Page in Notion Database)

Properties:
- Slug: rag-engine
- Tagline: Enterprise Knowledge Retrieval System
- Category: ai
- GitHub: https://github.com/...
- Status: completed

Page Content:
## Quick Stats
- Documents Indexed: 100K+
- Avg Query Time: <200ms
- Accuracy: 94%

## Architecture
[Diagram image uploaded to Notion]
The system uses a multi-stage pipeline...

### Components
- Document Ingestion: Processes and chunks documents (Python, LangChain)
- Vector Store: Qdrant for embeddings
...

## Code Examples
### Document Processing
```python
def process_document(doc):
    chunks = chunk_document(doc)
    embeddings = generate_embeddings(chunks)
    return embeddings
```

## API Documentation
### POST /api/ingest
Ingests a new document...

## Tech Stack
**Backend**: FastAPI, LangChain
**AI/ML**: OpenAI, Qdrant
...

## Performance
- Sub-200ms query latency
- 94% semantic accuracy
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation consistency
*For any* project card clicked on the homepage, navigating to the project detail page should load the correct project data matching the clicked card's slug
**Validates: Requirements 1.1, 1.5**

### Property 2: Breadcrumb navigation
*For any* project detail page, the breadcrumb navigation should always provide a functional link back to the homepage
**Validates: Requirements 1.3**

### Property 3: Visual consistency
*For any* project detail page component, the styling should match the homepage design system (colors, typography, glassmorphism effects)
**Validates: Requirements 1.4**

### Property 4: Code snippet copy functionality
*For any* code snippet displayed, clicking the copy button should copy the exact code content to the clipboard
**Validates: Requirements 3.4**

### Property 5: External link behavior
*For any* external resource link that is available, clicking it should open in a new tab; for unavailable links, the button should be hidden or disabled
**Validates: Requirements 7.2, 7.3, 7.4**

### Property 6: Responsive layout adaptation
*For any* viewport width, the project detail page should render with appropriate layout (single-column for mobile, multi-column for desktop)
**Validates: Requirements 8.1, 8.2**

### Property 7: Image optimization
*For any* image loaded on a project detail page, it should use lazy loading and optimized formats
**Validates: Requirements 8.4**

### Property 8: API documentation completeness
*For any* API endpoint documented, it should include method, path, description, and example request/response
**Validates: Requirements 4.2, 4.3**

### Property 9: Tech stack categorization
*For any* technology listed in the tech stack, it should be grouped under a valid category (Frontend, Backend, Database, DevOps, AI/ML)
**Validates: Requirements 6.2**

### Property 10: Performance metrics display
*For any* performance metric shown, it should include a quantifiable value and descriptive label
**Validates: Requirements 5.2**

## Error Handling

### 404 Handling
- **Invalid Slug**: If a project slug doesn't exist, redirect to 404 page with suggestion to return to homepage
- **Missing Data**: If project data is incomplete, show available sections and log warning

### Image Loading
- **Failed Image Load**: Display placeholder with project icon
- **Slow Loading**: Show skeleton loader during image fetch

### Code Snippet Errors
- **Copy Failure**: Show error toast if clipboard API fails
- **Syntax Highlighting Failure**: Fall back to plain text with monospace font

### External Links
- **Broken Links**: Validate links at build time, disable buttons for invalid URLs
- **Network Errors**: Handle gracefully with user-friendly messages

## Testing Strategy

### Unit Tests

1. **Data Validation Tests**
   - Test that all project data conforms to the `Project` interface
   - Verify required fields are present
   - Validate URL formats for external links

2. **Component Tests**
   - Test ProjectHero renders all props correctly
   - Test CodeSnippet copy functionality
   - Test APIDocumentation endpoint rendering
   - Test MetricsGrid displays metrics correctly

3. **Utility Function Tests**
   - Test `getProjectBySlug` returns correct project
   - Test `getProjectBySlug` returns null for invalid slug
   - Test `getAllProjects` returns all projects
   - Test `getProjectSlugs` returns array of slugs

### Property-Based Tests

Property-based testing will use **fast-check** library for TypeScript/JavaScript. Each test will run a minimum of 100 iterations.

1. **Property Test: Navigation Consistency**
   - Generate random valid project slugs
   - Verify navigation loads correct project data
   - **Feature: project-detail-pages, Property 1: Navigation consistency**

2. **Property Test: Code Copy Functionality**
   - Generate random code strings
   - Verify clipboard contains exact code after copy
   - **Feature: project-detail-pages, Property 4: Code snippet copy functionality**

3. **Property Test: Responsive Layout**
   - Generate random viewport widths
   - Verify layout adapts correctly (single vs multi-column)
   - **Feature: project-detail-pages, Property 6: Responsive layout adaptation**

4. **Property Test: External Link Behavior**
   - Generate projects with various link configurations
   - Verify buttons are shown/hidden correctly
   - Verify links open in new tabs
   - **Feature: project-detail-pages, Property 5: External link behavior**

5. **Property Test: Tech Stack Categorization**
   - Generate random tech stacks
   - Verify all technologies are under valid categories
   - **Feature: project-detail-pages, Property 9: Tech stack categorization**

### Integration Tests

1. **Full Page Rendering**
   - Test complete project detail page renders without errors
   - Verify all sections are present for complete project data
   - Test page with minimal project data

2. **Navigation Flow**
   - Test clicking project card on homepage navigates to detail page
   - Test breadcrumb returns to homepage
   - Test direct URL access works

3. **Performance Tests**
   - Measure page load time (should be < 2s)
   - Verify lazy loading works for images
   - Test scroll performance (60fps)

### Testing Libraries

- **Unit Testing**: Vitest + React Testing Library
- **Property-Based Testing**: fast-check
- **E2E Testing**: Playwright (for navigation and interaction flows)
- **Performance Testing**: Lighthouse CI

## Visual Design Specifications

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Projects > RAG Engine              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │         HERO IMAGE (Full Width)                   │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │  RAG ENGINE                                  │  │ │
│  │  │  Enterprise Knowledge Retrieval System      │  │ │
│  │  │  [GitHub] [Demo] [Docs]                     │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─────────────┬─────────────┬─────────────┐          │
│  │ 100K+ Docs  │ <200ms      │ 94% Accuracy│          │
│  └─────────────┴─────────────┴─────────────┘          │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  ARCHITECTURE                                     │ │
│  │  [Diagram showing system components]              │ │
│  │  Component breakdown...                           │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  TECHNICAL DEEP DIVE                              │ │
│  │  Implementation details...                        │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │  CODE EXAMPLE                               │  │ │
│  │  │  [Copy]                                     │  │ │
│  │  │  ```python                                  │  │ │
│  │  │  def process_document(doc):                 │  │ │
│  │  │      ...                                    │  │ │
│  │  │  ```                                        │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  API DOCUMENTATION                                │ │
│  │  GET /api/search                                  │ │
│  │  POST /api/ingest                                 │ │
│  │  [Request/Response examples]                      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  TECH STACK                                       │ │
│  │  Backend: FastAPI, LangChain                      │ │
│  │  AI/ML: OpenAI, Qdrant                            │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  PERFORMANCE & ACHIEVEMENTS                       │ │
│  │  • Sub-200ms query latency                        │ │
│  │  • 94% semantic accuracy                          │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Color Palette

Maintain consistency with homepage:
- Background: `#000000` (Pure Black)
- Surface: `#09090B` (Off Black)
- Border: `#27272A` (Dark Gray)
- Text Primary: `#FFFFFF` (White)
- Text Secondary: `#A1A1AA` (Gray)
- Accent: `#E4E4E7` (Soft White)
- Code Background: `#18181B` (Darker surface)

### Typography

- **Project Title**: 4xl-6xl, bold, tracking-tight
- **Section Headings**: 2xl-3xl, bold, border-left accent
- **Body Text**: base-lg, text-zinc-400
- **Code**: JetBrains Mono, text-sm
- **Labels**: xs-sm, font-mono, uppercase, tracking-wide

### Component Styling

#### Glass Panel (Sections)
```css
.glass-panel {
  background: rgba(9, 9, 11, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  backdrop-filter: blur(12px);
}
```

#### Code Snippet
```css
.code-snippet {
  background: #18181B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  position: relative; /* for copy button */
}
```

#### Stat Card
```css
.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}
```

### Animations

- **Page Transition**: Fade in (300ms ease-out)
- **Section Reveal**: Fade up on scroll (staggered, 200ms delay between sections)
- **Code Copy**: Button scale + checkmark animation (200ms)
- **Hover Effects**: Subtle border glow (300ms ease)

## Implementation Notes

### Syntax Highlighting

Use **Prism.js** or **Shiki** for code syntax highlighting:
- Support for Python, TypeScript, Go, Rust, SQL
- Dark theme matching portfolio aesthetic
- Line numbers optional
- Copy button overlay

### Architecture Diagrams

Options for rendering:
1. **Static Images**: SVG/PNG exported from design tools
2. **Mermaid.js**: Code-based diagrams rendered client-side
3. **React Flow**: Interactive node-based diagrams

Recommendation: Start with static images for simplicity, migrate to Mermaid for maintainability.

### Performance Optimization

- **Image Optimization**: Use Next.js `<Image>` component with WebP format
- **Code Splitting**: Lazy load heavy components (architecture diagrams, API explorer)
- **Static Generation**: Pre-render all project pages at build time
- **Font Optimization**: Use `next/font` for automatic font optimization

### Accessibility

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **ARIA Labels**: Proper labels for buttons and links
- **Alt Text**: Descriptive alt text for all images and diagrams
- **Focus Indicators**: Visible focus states for all interactive elements
- **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)

### SEO

- **Dynamic Metadata**: Generate title, description, OG images per project
- **Structured Data**: Add JSON-LD schema for projects
- **Canonical URLs**: Set canonical URLs for each project page
- **Sitemap**: Include project pages in sitemap.xml

## Future Enhancements

1. **Interactive API Explorer**: Allow users to test API endpoints directly from the page
2. **Live Metrics**: Real-time performance metrics from production systems
3. **Video Demos**: Embedded video walkthroughs of projects
4. **Comments/Feedback**: Allow visitors to leave feedback on projects
5. **Related Projects**: Show related projects at the bottom of each page
6. **Search**: Full-text search across all project documentation
