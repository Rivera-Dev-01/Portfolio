import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function ProjectsPage() {
    const projects = [
        {
            title: "SCALABLE RAG SYSTEM",
            desc: "High-performance retrieval-augmented generation architecture for enterprise data processing.",
            tags: ['FastAPI', 'Vector DB', 'Docker', 'Python'],
            status: "Production"
        },
        {
            title: "DISTRIBUTED TASK QUEUE",
            desc: "Robust, fault-tolerant background job processing system with real-time monitoring.",
            tags: ['Go', 'Redis', 'Kubernetes', 'gRPC'],
            status: "Beta"
        },
        {
            title: "AI CODE ASSISTANT",
            desc: "VS Code extension powered by fine-tuned models for context-aware code completion.",
            tags: ['TypeScript', 'Llama-3', 'VS Code API'],
            status: "Prototype"
        }
    ];

    return (
        <main className="min-h-screen py-24 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="mb-12">
                <Link href="/" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-4 block">
                    {'<-'} Back to Home
                </Link>
                <h1 className="text-4xl font-bold tracking-tight mb-4">PROJECT ARCHIVE</h1>
                <p className="text-xl text-muted-foreground">
                    A collection of backend systems, AI experiments, and open source contributions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="group border-border/60 bg-card hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-4">
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">{`>_`}</span>
                                    <span className="font-mono text-[10px] uppercase border border-border px-1.5 py-0.5 rounded text-muted-foreground">{project.status}</span>
                                </div>
                            </div>
                            <CardDescription className="text-base">
                                {project.desc}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 flex-wrap">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono px-2 py-1 rounded-full border border-border bg-secondary/50 text-secondary-foreground">
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
