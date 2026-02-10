/**
 * Blog Page
 * Displays blog posts in a list layout.
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

// Placeholder posts - will be fetched from API
const posts = [
    {
        id: '1',
        title: 'Getting Started with FastAPI',
        slug: 'getting-started-fastapi',
        excerpt: 'Learn how to build high-performance APIs with Python FastAPI framework.',
        tags: ['Python', 'FastAPI', 'Backend'],
        publishedAt: '2024-01-15',
    },
    {
        id: '2',
        title: 'Fine-tuning LLMs with Unsloth',
        slug: 'finetuning-llms-unsloth',
        excerpt: 'A practical guide to fine-tuning open-source LLMs efficiently.',
        tags: ['AI', 'LLM', 'Machine Learning'],
        publishedAt: '2024-01-10',
    },
];

export default function BlogPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Blog
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Thoughts, tutorials, and insights
                </p>
            </div>

            <div className="space-y-6">
                {posts.map((post) => (
                    <Card key={post.id} className="cursor-pointer hover:border-blue-500">
                        <CardHeader>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                            <CardTitle className="text-2xl">{post.title}</CardTitle>
                            <CardDescription className="text-base">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
