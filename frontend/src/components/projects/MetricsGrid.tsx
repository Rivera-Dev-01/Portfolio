'use client';

import { PerformanceMetric } from '@/types/project';
import { Zap, Target, TrendingUp, Activity } from 'lucide-react';

interface MetricsGridProps {
    metrics: PerformanceMetric[];
}

const iconMap: Record<string, React.ReactNode> = {
    latency: <Zap className="w-6 h-6" />,
    accuracy: <Target className="w-6 h-6" />,
    throughput: <TrendingUp className="w-6 h-6" />,
    default: <Activity className="w-6 h-6" />,
};

function getIcon(metric: string): React.ReactNode {
    const key = metric.toLowerCase();
    if (key.includes('latency') || key.includes('time')) return iconMap.latency;
    if (key.includes('accuracy') || key.includes('precision')) return iconMap.accuracy;
    if (key.includes('throughput') || key.includes('rate')) return iconMap.throughput;
    return iconMap.default;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
                <div
                    key={idx}
                    className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                            {getIcon(metric.metric)}
                        </div>
                    </div>

                    {/* Value */}
                    <div className="mb-2">
                        <div className="text-3xl font-bold text-white group-hover:text-zinc-100 transition-colors">
                            {metric.value}
                        </div>
                    </div>

                    {/* Metric Name */}
                    <div className="mb-3">
                        <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                            {metric.metric}
                        </h4>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        {metric.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
