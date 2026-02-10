'use client';

import * as React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { cn } from '@/lib/utils';

export function FloatingChat() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="w-[350px] sm:w-[400px] h-[500px] glass-panel rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 border border-white/10">
                    <div className="h-full flex flex-col bg-black/40 backdrop-blur-xl">
                        <div className="p-3 border-b border-white/5 flex justify-between items-center bg-black/40">
                            <span className="text-sm font-semibold pl-2">Portfolio Assistant</span>
                            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white text-xs uppercase tracking-wider">Close</button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <ChatInterface />
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-white/10 hover:scale-105",
                    isOpen ? "bg-zinc-800 text-white rotate-90" : "bg-white text-black hover:bg-zinc-200"
                )}
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
            </button>
        </div>
    );
}
