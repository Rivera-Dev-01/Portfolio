/**
 * Shared TypeScript Types
 */

// ============ CHAT ============

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface Conversation {
    id: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

// ============ PROJECTS ============

export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription?: string;
    category: string;
    techStack: string[];
    featured: boolean;
    imageUrl?: string;
    demoUrl?: string;
    githubUrl?: string;
    createdAt: Date;
    updatedAt?: Date;
}

export type ProjectCategory =
    | 'web'
    | 'mobile'
    | 'ai'
    | 'backend'
    | 'fullstack'
    | 'other';

// ============ BLOG ============

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    publishedAt: Date;
    coverImage?: string;
    readingTime?: number;
}

// ============ UI ============

export interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: React.ReactNode;
}
