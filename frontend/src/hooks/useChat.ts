/**
 * useChat Hook
 * Custom hook for managing chat state and interactions.
 */
'use client';

import { useState, useCallback } from 'react';
import { sendChatMessage } from '@/lib/api';
import type { ChatMessage } from '@/types';

interface UseChatOptions {
    initialMessages?: ChatMessage[];
    conversationId?: string;
}

interface UseChatReturn {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
    conversationId: string | null;
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
    const [messages, setMessages] = useState<ChatMessage[]>(options.initialMessages || []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(
        options.conversationId || null
    );

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        // Add user message immediately
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            // Build context from recent messages
            const context = messages.slice(-10).map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));

            const response = await sendChatMessage({
                message: content,
                conversation_id: conversationId || undefined,
                context,
            });

            // Update conversation ID if new
            if (!conversationId && response.conversation_id) {
                setConversationId(response.conversation_id);
            }

            // Add assistant response
            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: response.message,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
        } finally {
            setIsLoading(false);
        }
    }, [messages, conversationId]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setConversationId(null);
        setError(null);
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
        conversationId,
    };
}
