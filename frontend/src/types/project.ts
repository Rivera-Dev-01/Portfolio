/**
 * Project Data Types
 * Defines the structure for project detail pages
 */

export type ProjectCategory = 'backend' | 'ai' | 'fullstack';
export type ProjectStatus = 'completed' | 'in-progress' | 'maintained';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ProjectStat {
    label: string;
    value: string;
    icon?: string;
}

export interface ArchitectureComponent {
    name: string;
    description: string;
    tech: string[];
}

export interface Architecture {
    diagram: string; // Path to diagram image or placeholder
    description: string;
    components: ArchitectureComponent[];
}

export interface TechnicalDetails {
    overview: string;
    challenges: string[];
    solutions: string[];
}

export interface CodeExample {
    title: string;
    description: string;
    language: string;
    code: string;
}

export interface ApiParameter {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

export interface ApiEndpoint {
    method: HttpMethod;
    path: string;
    description: string;
    parameters?: ApiParameter[];
    requestExample?: string;
    responseExample?: string;
}

export interface ApiDocumentation {
    baseUrl: string;
    endpoints: ApiEndpoint[];
}

export interface Technology {
    name: string;
    purpose: string;
}

export interface TechStackCategory {
    category: string;
    technologies: Technology[];
}

export interface PerformanceMetric {
    metric: string;
    value: string;
    description: string;
}

export interface ProjectLinks {
    github?: string;
    demo?: string;
    docs?: string;
}

export interface ProjectTimeline {
    started: string;
    completed?: string;
    status: ProjectStatus;
}

export interface ProjectContext {
    why: string;
    who: string;
    problem: string;
    solution: string;
}

export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    heroImage: string;
    category: ProjectCategory;

    context: ProjectContext;
    stats: ProjectStat[];
    architecture: Architecture;
    technicalDetails: TechnicalDetails;
    codeExamples: CodeExample[];
    apiDocs?: ApiDocumentation;
    techStack: TechStackCategory[];
    performance: PerformanceMetric[];
    links: ProjectLinks;
    timeline: ProjectTimeline;
}
