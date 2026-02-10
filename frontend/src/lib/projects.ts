/**
 * Project Data Access Utilities
 * Functions for retrieving project data
 */

import { Project } from '@/types/project';
import { mockProjects } from '@/data/projects/mock-projects';

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
    return mockProjects;
}

/**
 * Get a project by its slug
 */
export function getProjectBySlug(slug: string): Project | null {
    const project = mockProjects.find(p => p.slug === slug);
    return project || null;
}

/**
 * Get all project slugs (for static generation)
 */
export function getProjectSlugs(): string[] {
    return mockProjects.map(p => p.slug);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: Project['category']): Project[] {
    return mockProjects.filter(p => p.category === category);
}

/**
 * Get featured projects (for homepage)
 */
export function getFeaturedProjects(limit?: number): Project[] {
    const projects = mockProjects.filter(p => p.timeline.status === 'completed' || p.timeline.status === 'maintained');
    return limit ? projects.slice(0, limit) : projects;
}
