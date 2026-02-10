import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GalleryGrid } from '@/components/ui/GalleryGrid';

export default function GalleryPage() {
    return (
        <main className="min-h-screen py-24 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="mb-12">
                <Link href="/#gallery" className="font-mono text-sm text-zinc-400 hover:text-white transition-colors mb-6 inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Gallery
                </Link>
                <h1 className="text-4xl font-bold tracking-tight mb-4 mt-6">GALLERY</h1>
                <p className="text-xl text-muted-foreground">
                    A visual log of hackathons, conferences, and community events I've attended and contributed to.
                </p>
            </div>

            <GalleryGrid />
        </main>
    );
}
