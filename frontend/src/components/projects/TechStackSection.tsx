'use client';

import { TechStackCategory } from '@/types/project';
import { Code, Database, Cloud, Cpu, LayoutGrid, Terminal } from 'lucide-react';

interface TechStackSectionProps {
    techStack: TechStackCategory[];
}

const categoryIcons: Record<string, React.ReactNode> = {
    frontend: <LayoutGrid className="w-5 h-5" />,
    backend: <Terminal className="w-5 h-5" />,
    database: <Database className="w-5 h-5" />,
    'ai/ml': <Cpu className="w-5 h-5" />,
    devops: <Cloud className="w-5 h-5" />,
    default: <Code className="w-5 h-5" />,
};

function getCategoryIcon(category: string): React.ReactNode {
    const key = category.toLowerCase();
    return categoryIcons[key] || categoryIcons.default;
}

export function TechStackSection({ techStack }: TechStackSectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((stack, idx) => (
                <div
                    key={idx}
                    className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5"
                >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400">
                            {getCategoryIcon(stack.category)}
                        </div>
                        <h3 className="text-xl font-bold text-white">{stack.category}</h3>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-4">
                        {stack.technologies.map((tech, techIdx) => (
                            <div key={techIdx} className="group">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 group-hover:bg-white transition-colors" />
                                    <div className="flex-1">
                                        <h4 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors mb-1">
                                            {tech.name}
                                        </h4>
                                        <p className="text-sm text-zinc-500 leading-relaxed">
                                            {tech.purpose}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
