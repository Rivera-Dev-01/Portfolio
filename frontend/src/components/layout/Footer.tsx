/**
 * Footer Component
 * Site footer with social links and copyright.
 */
import Link from 'next/link';

const socialLinks = [
    { name: 'GitHub', href: '#', icon: 'github' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    {/* Copyright */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © {currentYear} Your Name. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                aria-label={link.name}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
