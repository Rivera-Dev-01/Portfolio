'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeSnippetProps {
    title: string;
    description: string;
    language: string;
    code: string;
    showLineNumbers?: boolean;
}

export function CodeSnippet({
    title,
    description,
    language,
    code,
    showLineNumbers = false,
}: CodeSnippetProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    const lines = code.split('\n');

    return (
        <div className="glass-panel rounded-xl border border-white/5 bg-white/5 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
                        <p className="text-sm text-zinc-400">{description}</p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-black/20 hover:bg-black/40 transition-colors text-zinc-300 hover:text-white text-sm font-mono"
                        aria-label="Copy code"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Block */}
            <div className="relative">
                {/* Language Label */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 border border-white/10">
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                        {language}
                    </span>
                </div>

                {/* Code Content */}
                <div className="overflow-x-auto">
                    <pre className="p-6 text-sm font-mono leading-relaxed">
                        <code className="text-zinc-300">
                            {showLineNumbers ? (
                                <table className="w-full border-collapse">
                                    <tbody>
                                        {lines.map((line, idx) => (
                                            <tr key={idx}>
                                                <td className="pr-4 text-right text-zinc-600 select-none w-12">
                                                    {idx + 1}
                                                </td>
                                                <td className="text-zinc-300">
                                                    {line || '\n'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                code
                            )}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
