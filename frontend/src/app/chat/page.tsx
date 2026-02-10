/**
 * Chat Page
 * Interactive AI chatbot page.
 */
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Let&apos;s Chat
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    I&apos;m an AI assistant trained to answer questions about my experience and projects.
                </p>
            </div>

            <ChatInterface />
        </main>
    );
}
