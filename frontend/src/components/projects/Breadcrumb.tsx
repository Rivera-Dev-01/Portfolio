'use client';

import { useRouter } from 'next/navigation';
import { Home, FolderOpen } from 'lucide-react';

interface BreadcrumbProps {
    projectTitle: string;
}

export function Breadcrumb({ projectTitle }: BreadcrumbProps) {
    const router = useRouter();

    const projectSlug = projectTitle.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {/* Terminal-style Breadcrumb */}
            <div className="glass-panel rounded-lg border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden font-mono text-sm">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs text-zinc-500 ml-2">terminal — portfolio</span>
                    </div>
                    <span className="text-xs text-zinc-600 hidden md:block">Press Ctrl+C to exit</span>
                </div>

                {/* Terminal Content - Simplified */}
                <div className="px-4 py-3 flex items-center gap-2 text-sm">
                    <span className="text-green-400">miggy@portfolio</span>
                    <span className="text-zinc-500">:</span>
                    <span className="text-blue-400">~/projects/{projectSlug}</span>
                    <span className="text-zinc-500">$</span>
                    <span className="text-zinc-600">cat README.md</span>
                </div>

                {/* Navigation Buttons - More Obvious */}
                <div className="px-4 py-2 border-t border-white/10 bg-white/5 flex items-center gap-3">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors text-zinc-300 hover:text-white text-xs"
                    >
                        <Home className="w-3 h-3" />
                        <span>Home</span>
                    </button>
                    <button
                        onClick={() => router.push('/#work')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors text-zinc-300 hover:text-white text-xs"
                    >
                        <FolderOpen className="w-3 h-3" />
                        <span>All Projects</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
