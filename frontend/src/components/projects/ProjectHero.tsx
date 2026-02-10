'use client';

import Image from 'next/image';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { ProjectStat, ProjectLinks } from '@/types/project';

interface ProjectHeroProps {
    title: string;
    tagline: string;
    description: string;
    heroImage: string;
    links: ProjectLinks;
}

export function ProjectHero({
    title,
    tagline,
    description,
    heroImage,
    links,
}: ProjectHeroProps) {
    return (
        <section className="relative w-full">
            {/* Hero Image Section */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                {/* Placeholder gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-8 pb-12 max-w-7xl mx-auto">
                    <div className="glass-panel p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light mb-6">
                            {tagline}
                        </p>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-6">
                            {description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {links.github && (
                                <a
                                    href={links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white font-mono text-sm"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>GitHub</span>
                                </a>
                            )}
                            {links.demo && (
                                <a
                                    href={links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white font-mono text-sm"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Live Demo</span>
                                </a>
                            )}
                            {links.docs && (
                                <a
                                    href={links.docs}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white font-mono text-sm"
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Documentation</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
