'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function GlassHeader() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const shouldBeScrolled = latest > 50;
        if (isScrolled !== shouldBeScrolled) {
            setIsScrolled(shouldBeScrolled);
        }
    });

    const navItems = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#work' },
        { name: 'Stack', href: '#stack' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out',
                isScrolled ? 'pt-0' : 'pt-4'
            )}
        >
            <nav
                className={cn(
                    'glass-header flex items-center justify-center gap-10 overflow-hidden transition-all duration-500 ease-in-out',
                    isScrolled
                        ? 'w-full rounded-none border-x-0 border-t-0 justify-center px-12 py-4 bg-black/90 backdrop-blur-md shadow-md'
                        : 'w-[680px] max-w-[95%] rounded-full px-12 py-5 border border-white/10 mt-6 shadow-2xl bg-black/60 backdrop-blur-xl'
                )}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="relative group"
                    >
                        <span
                            className="text-base font-medium text-zinc-300 hover:text-white transition-colors block"
                        >
                            {item.name}
                        </span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                    </Link>
                ))}
            </nav>
        </header>
    );
}
