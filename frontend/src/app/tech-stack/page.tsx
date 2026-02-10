import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TechStackPage() {
    return (
        <main className="min-h-screen py-24 px-4 md:px-8 max-w-4xl mx-auto">
            <div className="mb-12">
                <Link href="/#stack" className="font-mono text-sm text-zinc-400 hover:text-white transition-colors mb-6 inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Tech Stack
                </Link>
                <h1 className="text-4xl font-bold tracking-tight mb-4">TECH STACK</h1>
                <p className="text-xl text-muted-foreground">
                    A detailed breakdown of the tools and technologies I use to build scalable systems.
                </p>
            </div>

            <div className="space-y-16">

                {/* Backend Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b border-border pb-2">BACKEND ENGINEERING</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">Python (FastAPI)</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                My go-to for high-performance AI services. Leveraging asyncio for concurrent inference handling and Pydantic for robust data validation.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">PostgreSQL + Supabase</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                The source of truth. Using pgvector for semantic search and RAG pipelines. Supabase provides auth and real-time capabilities out of the box.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">Redis</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Used for caching hot data, LLM response streaming buffers, and Celery task queues for background processing.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">Docker</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Containerization ensures consistency from dev to prod. Multi-stage builds for optimized image sizes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* AI Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b border-border pb-2">ARTIFICIAL INTELLIGENCE</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">Groq</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Inference engine for lightning-fast LLM responses. Critical for maintaining chat latency under 200ms.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">Llama-3 (Unsloth)</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Fine-tuning Llama-3 8B on custom datasets using Unsloth for memory efficiency (4-bit quantization).
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">LangChain</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Orchestration layer for RAG flows, tool calling, and structured output parsing.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Frontend Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b border-border pb-2">FRONTEND</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">Next.js (App Router)</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                React framework for server-side rendering and static generation.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-mono text-lg font-semibold text-primary">Tailwind CSS</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Monochrome, utility-first styling for a clean, technical aesthetic.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
