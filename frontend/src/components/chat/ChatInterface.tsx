/**
 * ChatInterface Component
 * Main chat UI for interacting with the AI chatbot.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function ChatInterface() {
    const { messages, isLoading, error, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const message = input;
        setInput('');
        await sendMessage(message);
    };

    return (
        <div className="flex h-[600px] flex-col rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            {/* Chat Header */}
            <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
                <h2 className="font-semibold text-gray-900 dark:text-white">Chat with me</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ask me anything about my work and experience
                </p>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-gray-500">
                        <p>Start a conversation...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex',
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                )}
                            >
                                <div
                                    className={cn(
                                        'max-w-[80%] rounded-lg px-4 py-2',
                                        message.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                                    )}
                                >
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                                    <div className="flex items-center gap-1">
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 dark:border-gray-800">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        disabled={isLoading}
                    />
                    <Button type="submit" isLoading={isLoading} disabled={!input.trim()}>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}
