import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import { Breadcrumb } from '@/components/projects/Breadcrumb';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectContext } from '@/components/projects/ProjectContext';
import { DataPipeline } from '@/components/projects/DataPipeline';
import { CodeSnippet } from '@/components/projects/CodeSnippet';
import { APIDocumentation } from '@/components/projects/APIDocumentation';
import { MetricsGrid } from '@/components/projects/MetricsGrid';
import { TechStackSection } from '@/components/projects/TechStackSection';
import ArchitectureGraph from '@/components/ArchitectureGraph';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.tagline,
            type: 'website',
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="flex flex-col min-h-screen bg-background">
            {/* Breadcrumb Navigation */}
            <div className="w-full px-4 md:px-8 py-6 max-w-7xl mx-auto">
                <Breadcrumb projectTitle={project.title} />
            </div>

            {/* Hero Section */}
            <ProjectHero
                title={project.title}
                tagline={project.tagline}
                description={project.description}
                heroImage={project.heroImage}
                links={project.links}
            />

            {/* Project Context Section */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <h2 className="text-3xl font-bold tracking-tight mb-4 border-l-2 border-white pl-4">
                    PROJECT CONTEXT
                </h2>
                <p className="text-zinc-400 pl-4 mb-8 max-w-3xl">
                    Understanding the motivation, impact, and problem-solving approach behind this project.
                </p>
                <ProjectContext
                    why={project.context.why}
                    who={project.context.who}
                    problem={project.context.problem}
                    solution={project.context.solution}
                />
            </section>

            {/* System Architecture Section */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <h2 className="text-3xl font-bold tracking-tight mb-4 border-l-2 border-white pl-4">
                    SYSTEM ARCHITECTURE
                </h2>
                <p className="text-zinc-400 pl-4 mb-12 max-w-3xl">
                    {project.architecture.description}
                </p>

                {/* Interactive Architecture Graph */}
                <div className="w-full h-[600px] rounded-2xl border border-white/10 bg-black/40 overflow-hidden mb-12">
                    <ArchitectureGraph />
                </div>

                {/* Data Pipeline */}
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-white mb-4 pl-4 border-l-2 border-zinc-700">
                        Data Pipeline
                    </h3>
                    <p className="text-zinc-400 pl-4 mb-8">
                        Visual representation of how data flows through the system from ingestion to output.
                    </p>
                    <DataPipeline
                        steps={[
                            {
                                title: 'Data Ingestion',
                                description: 'Raw data is collected from various sources and validated for processing.',
                                icon: 'database',
                            },
                            {
                                title: 'Processing',
                                description: 'Data is transformed, cleaned, and enriched using custom algorithms.',
                                icon: 'cpu',
                            },
                            {
                                title: 'Storage',
                                description: 'Processed data is stored in optimized databases for quick retrieval.',
                                icon: 'cloud',
                            },
                            {
                                title: 'Output',
                                description: 'Results are delivered through APIs or real-time streams to end users.',
                                icon: 'zap',
                            },
                        ]}
                    />
                </div>

                {/* Components Breakdown */}
                <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 pl-4 border-l-2 border-zinc-700">
                        Components
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.architecture.components.map((component, idx) => (
                            <div
                                key={idx}
                                className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <h4 className="text-lg font-bold text-white mb-2">
                                    {component.name}
                                </h4>
                                <p className="text-zinc-400 text-sm mb-4">
                                    {component.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {component.tech.map((tech, techIdx) => (
                                        <span
                                            key={techIdx}
                                            className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/10 bg-black/20 text-zinc-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <h2 className="text-3xl font-bold tracking-tight mb-8 border-l-2 border-white pl-4">
                    TECHNICAL DEEP DIVE
                </h2>

                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">Overview</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                        {project.technicalDetails.overview}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">Challenges</h4>
                            <ul className="space-y-2">
                                {project.technicalDetails.challenges.map((challenge, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-zinc-400">
                                        <span className="text-zinc-600 mt-1">•</span>
                                        <span>{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">Solutions</h4>
                            <ul className="space-y-2">
                                {project.technicalDetails.solutions.map((solution, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-zinc-400">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>{solution}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Code Examples */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white">Code Examples</h3>
                    {project.codeExamples.map((example, idx) => (
                        <CodeSnippet
                            key={idx}
                            title={example.title}
                            description={example.description}
                            language={example.language}
                            code={example.code}
                        />
                    ))}
                </div>
            </section>

            {/* API Documentation (if available) */}
            {project.apiDocs && (
                <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                    <h2 className="text-3xl font-bold tracking-tight mb-8 border-l-2 border-white pl-4">
                        API DOCUMENTATION
                    </h2>
                    <APIDocumentation
                        baseUrl={project.apiDocs.baseUrl}
                        endpoints={project.apiDocs.endpoints}
                    />
                </section>
            )}

            {/* Tech Stack */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <h2 className="text-3xl font-bold tracking-tight mb-8 border-l-2 border-white pl-4">
                    TECH STACK
                </h2>
                <TechStackSection techStack={project.techStack} />
            </section>

            {/* Performance & Achievements */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full mb-20">
                <h2 className="text-3xl font-bold tracking-tight mb-8 border-l-2 border-white pl-4">
                    PERFORMANCE & ACHIEVEMENTS
                </h2>
                <MetricsGrid metrics={project.performance} />
            </section>
        </main>
    );
}
