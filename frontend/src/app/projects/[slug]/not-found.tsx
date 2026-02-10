import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="flex flex-col min-h-screen bg-background items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-white mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
                    <p className="text-zinc-400 text-lg">
                        The project you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/#work"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white font-mono"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>View All Projects</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white text-black hover:bg-zinc-200 transition-colors font-mono font-bold"
                    >
                        <Home className="w-4 h-4" />
                        <span>Go Home</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
