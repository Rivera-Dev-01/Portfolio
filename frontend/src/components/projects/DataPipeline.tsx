'use client';

import { ArrowRight, Database, Cpu, Cloud, Zap } from 'lucide-react';

interface PipelineStep {
    title: string;
    description: string;
    icon: 'database' | 'cpu' | 'cloud' | 'zap';
}

interface DataPipelineProps {
    steps: PipelineStep[];
}

const iconMap = {
    database: Database,
    cpu: Cpu,
    cloud: Cloud,
    zap: Zap,
};

export function DataPipeline({ steps }: DataPipelineProps) {
    return (
        <div className="w-full">
            {/* Pipeline Flow */}
            <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 -translate-y-1/2 hidden md:block" />

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
                    {steps.map((step, idx) => {
                        const Icon = iconMap[step.icon];
                        return (
                            <div key={idx} className="relative">
                                {/* Step Card */}
                                <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 group relative z-10">
                                    {/* Step Number */}
                                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/20 flex items-center justify-center text-white font-bold text-sm">
                                        {idx + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-white/20 group-hover:bg-white/10 transition-colors">
                                        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                                    </div>

                                    {/* Content */}
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-100 transition-colors">
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow (desktop only) */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                                        <div className="w-4 h-4 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center">
                                            <ArrowRight className="w-3 h-3 text-zinc-400" />
                                        </div>
                                    </div>
                                )}

                                {/* Arrow (mobile only) */}
                                {idx < steps.length - 1 && (
                                    <div className="md:hidden flex justify-center my-4">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center rotate-90">
                                            <ArrowRight className="w-4 h-4 text-zinc-400" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
