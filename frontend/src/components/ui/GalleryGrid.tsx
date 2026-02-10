import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import galleryData from '@/data/gallery.json';

interface GalleryGridProps {
    limit?: number;
}

export function GalleryGrid({ limit }: GalleryGridProps) {
    const displayedEvents = limit ? galleryData.slice(0, limit) : galleryData;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayedEvents.map((event, i) => (
                <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-green-500/50 transition-all duration-300"
                >
                    {/* Actual image */}
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Green glow effect on hover */}
                    <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors duration-300" />

                    <div className="absolute bottom-0 left-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-medium text-sm group-hover:text-green-400 transition-colors">{event.title}</p>
                        <p className="text-zinc-400 text-xs font-mono">{event.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
