/**
 * ChatInterface Component
 * Clean and modern chat UI for interacting with the AI chatbot.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import Image from 'next/image';

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

    const handleSuggestedQuestion = (question: string) => {
        sendMessage(question);
    };

    return (
        <div className="flex h-full flex-col bg-white dark:bg-gray-950">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
                <Image
                    src="/Profile-Photo.jpg"
                    alt="Miggy"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Chat with Miggy</h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Online</span>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-5">
                {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <Image
                            src="/Profile-Photo.jpg"
                            alt="Miggy"
                            width={80}
                            height={80}
                            className="rounded-full mb-4 w-20 h-20 object-cover"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Hi! I'm Miggy 👋
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                            Ask me anything about my projects, experience, or tech stack
                        </p>
                        
                        <div className="space-y-2 w-full max-w-xs">
                            <button
                                onClick={() => handleSuggestedQuestion("Tell me about your projects")}
                                className="w-full px-4 py-2.5 text-sm text-left bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                            >
                                Tell me about your projects
                            </button>
                            <button
                                onClick={() => handleSuggestedQuestion("What technologies do you know?")}
                                className="w-full px-4 py-2.5 text-sm text-left bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                            >
                                What technologies do you know?
                            </button>
                            <button
                                onClick={() => handleSuggestedQuestion("Tell me about Hack the Flood")}
                                className="w-full px-4 py-2.5 text-sm text-left bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                            >
                                Tell me about Hack the Flood
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <Image
                                        src="/Profile-Photo.jpg"
                                        alt="Miggy"
                                        width={32}
                                        height={32}
                                        className="rounded-full flex-shrink-0 w-8 h-8 object-cover"
                                    />
                                )}
                                
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                                        message.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                </div>

                                {message.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                        You
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <Image
                                    src="/Profile-Photo.jpg"
                                    alt="Miggy"
                                    width={32}
                                    height={32}
                                    className="rounded-full flex-shrink-0 w-8 h-8 object-cover"
                                />
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
                <div className="px-5 py-3 bg-red-50 dark:bg-red-950/30 border-t border-red-200 dark:border-red-900 flex-shrink-0">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 flex-shrink-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
