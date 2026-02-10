'use client';

import { Lightbulb, Users, AlertCircle, Target } from 'lucide-react';

interface ProjectContextProps {
    why: string;
    who: string;
    problem: string;
    solution: string;
}

export function ProjectContext({ why, who, problem, solution }: ProjectContextProps) {
    const sections = [
        {
            icon: Lightbulb,
            title: 'Why I Built This',
            content: why,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
        },
        {
            icon: Users,
            title: 'Who Benefits',
            content: who,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
        },
        {
            icon: AlertCircle,
            title: 'The Problem',
            content: problem,
            color: 'text-red-400',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
        },
        {
            icon: Target,
            title: 'The Solution',
            content: solution,
            color: 'text-green-400',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, idx) => {
                const Icon = section.icon;
                return (
                    <div
                        key={idx}
                        className={`glass-panel p-6 rounded-xl border ${section.borderColor} ${section.bgColor} hover:bg-opacity-20 transition-all duration-300 group`}
                    >
                        {/* Icon and Title */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${section.bgColor} border ${section.borderColor}`}>
                                <Icon className={`w-5 h-5 ${section.color}`} />
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-zinc-100 transition-colors">
                                {section.title}
                            </h3>
                        </div>

                        {/* Content */}
                        <p className="text-zinc-400 leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
