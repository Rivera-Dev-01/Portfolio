'use client';

import { ReactNode } from 'react';

interface TerminalSectionProps {
    title: string;
    command?: string;
    children: ReactNode;
    variant?: 'default' | 'compact';
}

export function TerminalSection({
    title,
    command,
    children,
    variant = 'default'
}: TerminalSectionProps) {
    return (
        <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-colors">
            {/* Terminal Header - Cleaner */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="text-xs font-mono text-zinc-500">
                    {title}
                </div>
            </div>

            {/* Command Line (optional) - Simplified */}
            {command && (
                <div className="px-4 py-2 bg-black/20 border-b border-white/5">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                        <span className="text-zinc-600">&gt;</span>
                        <span>{command}</span>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className={variant === 'compact' ? 'p-4' : 'p-6'}>
                {children}
            </div>
        </div>
    );
}

interface TerminalPromptProps {
    command: string;
    color?: 'green' | 'orange' | 'red' | 'yellow';
}

export function TerminalPrompt({ command, color = 'green' }: TerminalPromptProps) {
    const colorClasses = {
        green: 'text-green-400',
        orange: 'text-orange-400',
        red: 'text-red-400',
        yellow: 'text-yellow-400',
    };

    return (
        <div className="flex items-center gap-2 font-mono text-xs mb-3 text-zinc-500">
            <span className="text-zinc-600">&gt;</span>
            <span>{command}</span>
        </div>
    );
}
