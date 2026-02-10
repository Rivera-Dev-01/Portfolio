'use client';

import { ArchitectureComponent } from '@/types/project';

interface ArchitectureDiagramProps {
    diagram: string;
    description: string;
    components: ArchitectureComponent[];
}

export function ArchitectureDiagram({
    diagram,
    description,
    components,
}: ArchitectureDiagramProps) {
    return (
        <div className="space-y-8">
            {/* Diagram Display */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5">
                {/* Placeholder diagram area */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-zinc-900 to-black rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full" style={{
                            backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    {/* Placeholder content */}
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                            <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        <p className="font-mono text-sm text-zinc-600 tracking-widest">
                            [ARCHITECTURE DIAGRAM]
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed mt-6">
                    {description}
                </p>
            </div>

            {/* Component Breakdown */}
            <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {components.map((component, idx) => (
                        <div
                            key={idx}
                            className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <h4 className="text-lg font-bold text-white mb-2">
                                {component.name}
                            </h4>
                            <p className="text-zinc-400 text-sm mb-4">
                                {component.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {component.tech.map((tech, techIdx) => (
                                    <span
                                        key={techIdx}
                                        className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/10 bg-black/20 text-zinc-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
