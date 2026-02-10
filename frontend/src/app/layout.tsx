'use client';

import { usePathname } from 'next/navigation';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { GlassHeader } from '@/components/layout/GlassHeader';
import { FloatingChat } from '@/components/chat/FloatingChat';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <title>Portfolio | Backend & AI Engineer</title>
        <meta name="description" content="Portfolio of a Backend & AI Engineer specialized in robust, scalable systems." />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-blue-500/30`}>
        {isHomepage && <GlassHeader />}
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <FloatingChat />
      </body>
    </html>
  );
}
