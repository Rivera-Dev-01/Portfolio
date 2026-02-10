'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, Terminal, Folder, ChevronRight, ExternalLink, Brain, Server, Globe } from 'lucide-react';

interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    category: 'backend' | 'ai' | 'fullstack';
    tech: string[];
    codePreview?: string;
}

interface ProjectTabsProps {
    projects: Project[];
}

export function ProjectTabs({ projects }: ProjectTabsProps) {
    const [activeTab, setActiveTab] = useState(0);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'ai':
                return 'text-orange-400 border-orange-500/50';
            case 'backend':
                return 'text-green-400 border-green-500/50';
            case 'fullstack':
                return 'text-red-400 border-red-500/50';
            default:
                return 'text-zinc-400 border-zinc-500/50';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'ai':
                return <Brain className="w-4 h-4" />;
            case 'backend':
                return <Server className="w-4 h-4" />;
            case 'fullstack':
                return <Globe className="w-4 h-4" />;
            default:
                return <Folder className="w-4 h-4" />;
        }
    };

    return (
        <div className="w-full">
            {/* Terminal Window Header */}
            <div className="glass-panel rounded-t-2xl border border-white/10 border-b-0 bg-black/60 backdrop-blur-xl">
                {/* Window Controls */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                        <Terminal className="w-3 h-3" />
                        <span>projects.workspace</span>
                    </div>
                    <div className="w-16" /> {/* Spacer for balance */}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 px-2 pt-2 overflow-x-auto">
                    {projects.map((project, idx) => (
                        <button
                            key={project.slug}
                            onClick={() => setActiveTab(idx)}
                            className={`
                                relative flex items-center gap-2 px-4 py-2 rounded-t-lg font-mono text-sm transition-all duration-200
                                ${activeTab === idx
                                    ? 'bg-black/80 text-white border-t border-x border-white/10'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                                }
                            `}
                        >
                            <span className={getCategoryColor(project.category)}>{getCategoryIcon(project.category)}</span>
                            <span className="whitespace-nowrap">{project.title.toLowerCase()}.md</span>
                            {activeTab === idx && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Terminal Content */}
            <div className="glass-panel rounded-b-2xl border border-white/10 border-t-0 bg-black/80 backdrop-blur-xl min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="p-6"
                    >
                        {/* File Tree Sidebar + Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left: File Tree */}
                            <div className="lg:col-span-3 space-y-2">
                                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-4">
                                    <Folder className="w-4 h-4" />
                                    <span>PROJECT STRUCTURE</span>
                                </div>
                                <div className="space-y-1 font-mono text-xs">
                                    <div className="flex items-center gap-2 text-zinc-400 pl-2 py-1 rounded hover:bg-white/5 hover:text-white transition-all cursor-pointer group">
                                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                        <FileCode className="w-3 h-3 text-green-400" />
                                        <span>README.md</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 pl-2 py-1 rounded hover:bg-white/5 hover:text-white transition-all cursor-pointer group">
                                        <ChevronRight className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                                        <Folder className="w-3 h-3 text-orange-400" />
                                        <span>src/</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 pl-6 py-1 rounded hover:bg-white/5 hover:text-white transition-all cursor-pointer group">
                                        <FileCode className="w-3 h-3 text-green-400" />
                                        <span>main.{projects[activeTab].category === 'backend' ? 'py' : 'py'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 pl-6 py-1 rounded hover:bg-white/5 hover:text-white transition-all cursor-pointer group">
                                        <FileCode className="w-3 h-3 text-green-400" />
                                        <span>config.{projects[activeTab].category === 'backend' ? '.json' : 'json'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 pl-2 py-1 rounded hover:bg-white/5 hover:text-white transition-all cursor-pointer group">
                                        <ChevronRight className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                                        <Folder className="w-3 h-3 text-orange-400" />
                                        <span>tests/</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 pl-2 py-1 rounded hover:bg-white/5 hover:text-white transition-all cursor-pointer group">
                                        <FileCode className="w-3 h-3 text-green-400" />
                                        <span>Dockerfile</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="lg:col-span-9 space-y-6">
                                {/* Header */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-3xl font-bold text-white">
                                            {projects[activeTab].title}
                                        </h3>
                                        <span className={`px-2 py-1 rounded text-xs font-mono border ${getCategoryColor(projects[activeTab].category)}`}>
                                            {projects[activeTab].category.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-lg text-zinc-400 font-light">
                                        {projects[activeTab].tagline}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                        <span className="text-green-400">&gt;</span>
                                        <span>cat README.md</span>
                                    </div>
                                    <p className="text-zinc-300 leading-relaxed pl-4 border-l-2 border-zinc-700">
                                        {projects[activeTab].description}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                        <span className="text-orange-400">&gt;</span>
                                        <span>ls dependencies/</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pl-4">
                                        {projects[activeTab].tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 rounded-md text-xs font-mono border border-white/10 bg-white/5 text-zinc-300 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Code Preview */}
                                {projects[activeTab].codePreview && (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                            <span className="text-red-400">&gt;</span>
                                            <span>head -n 10 src/main.py</span>
                                        </div>
                                        <div className="bg-black/60 rounded-lg border border-white/5 p-4 font-mono text-xs text-zinc-400 overflow-x-auto hover:border-white/10 transition-colors">
                                            <pre>{projects[activeTab].codePreview}</pre>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 pt-4">
                                    <Link
                                        href={`/projects/${projects[activeTab].slug}`}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-black font-mono text-sm font-bold hover:bg-green-400 transition-colors group"
                                    >
                                        <span>View Full Project</span>
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </Link>
                                    <button className="px-6 py-3 rounded-lg border border-white/20 text-white font-mono text-sm hover:bg-white/5 hover:border-green-500/50 transition-colors">
                                        <span className="text-zinc-400">&gt;</span> git clone
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
