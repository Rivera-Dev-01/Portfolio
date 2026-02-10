'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ApiEndpoint } from '@/types/project';

interface APIDocumentationProps {
    baseUrl: string;
    endpoints: ApiEndpoint[];
}

function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const methodColors: Record<string, string> = {
        GET: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        POST: 'bg-green-500/10 text-green-400 border-green-500/20',
        PUT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
        PATCH: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };

    return (
        <div className="glass-panel rounded-xl border border-white/5 bg-white/5 overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span
                        className={`px-3 py-1 rounded-md text-xs font-mono font-bold border ${methodColors[endpoint.method] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                            }`}
                    >
                        {endpoint.method}
                    </span>
                    <code className="text-sm font-mono text-white">{endpoint.path}</code>
                </div>
                {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-zinc-400" />
                )}
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-6 pb-6 space-y-6 border-t border-white/10">
                    {/* Description */}
                    <div className="pt-6">
                        <p className="text-zinc-400">{endpoint.description}</p>
                    </div>

                    {/* Parameters */}
                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                        <div>
                            <h5 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                                Parameters
                            </h5>
                            <div className="space-y-3">
                                {endpoint.parameters.map((param, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-4 p-3 rounded-lg bg-black/20 border border-white/5"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <code className="text-sm font-mono text-white">{param.name}</code>
                                                <span className="text-xs font-mono text-zinc-500">{param.type}</span>
                                                {param.required && (
                                                    <span className="px-1.5 py-0.5 rounded text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                                                        required
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-zinc-400">{param.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Request Example */}
                    {endpoint.requestExample && (
                        <div>
                            <h5 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                                Request Example
                            </h5>
                            <pre className="p-4 rounded-lg bg-black/40 border border-white/10 overflow-x-auto">
                                <code className="text-sm font-mono text-zinc-300">
                                    {endpoint.requestExample}
                                </code>
                            </pre>
                        </div>
                    )}

                    {/* Response Example */}
                    {endpoint.responseExample && (
                        <div>
                            <h5 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                                Response Example
                            </h5>
                            <pre className="p-4 rounded-lg bg-black/40 border border-white/10 overflow-x-auto">
                                <code className="text-sm font-mono text-zinc-300">
                                    {endpoint.responseExample}
                                </code>
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function APIDocumentation({ baseUrl, endpoints }: APIDocumentationProps) {
    return (
        <div className="space-y-6">
            {/* Base URL */}
            <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-zinc-500 uppercase tracking-wider">
                        Base URL:
                    </span>
                    <code className="text-sm font-mono text-white">{baseUrl}</code>
                </div>
            </div>

            {/* Endpoints */}
            <div className="space-y-4">
                {endpoints.map((endpoint, idx) => (
                    <EndpointCard key={idx} endpoint={endpoint} />
                ))}
            </div>
        </div>
    );
}
