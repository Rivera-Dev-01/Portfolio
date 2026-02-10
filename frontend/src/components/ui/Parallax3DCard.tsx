'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface Parallax3DCardProps {
    children: React.ReactNode;
    className?: string;
    tiltIntensity?: number; // Max rotation in degrees (default: 5)
    perspective?: number; // Perspective value in pixels (default: 1000)
    enableShine?: boolean; // Show animated shine overlay (default: true)
    scale?: number; // Scale on hover (default: 1.02)
}

export function Parallax3DCard({
    children,
    className = '',
    tiltIntensity = 5,
    perspective = 1000,
    enableShine = true,
    scale = 1.02,
}: Parallax3DCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Spring animations for smooth, natural motion
    const springConfig = { stiffness: 150, damping: 15 };
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);
    const cardScale = useSpring(1, springConfig);
    const shineX = useSpring(50, springConfig);
    const shineY = useSpring(50, springConfig);

    // Transform springs to CSS values
    const transform = useTransform(
        [rotateX, rotateY, cardScale],
        ([x, y, s]) => `perspective(${perspective}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
    );

    const shineBackground = useTransform(
        [shineX, shineY],
        ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate mouse position relative to card center (-1 to 1)
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);

        // Calculate rotation (inverted for natural tilt effect)
        const rotX = -mouseY * tiltIntensity;
        const rotY = mouseX * tiltIntensity;

        // Update spring values
        rotateX.set(rotX);
        rotateY.set(rotY);
        cardScale.set(scale);

        // Update shine position (0-100%)
        shineX.set((mouseX + 1) * 50);
        shineY.set((mouseY + 1) * 50);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset to neutral position
        rotateX.set(0);
        rotateY.set(0);
        cardScale.set(1);
        shineX.set(50);
        shineY.set(50);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative ${className}`}
            style={{
                transform,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main content with depth layers */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                {children}
            </div>

            {/* Animated shine overlay */}
            {enableShine && isHovered && (
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    style={{
                        background: shineBackground,
                        transform: 'translateZ(1px)',
                    }}
                />
            )}
        </motion.div>
    );
}

// Utility component for creating depth layers inside the card
interface DepthLayerProps {
    children: React.ReactNode;
    depth?: number; // Depth in pixels (default: 0)
    className?: string;
}

export function DepthLayer({ children, depth = 0, className = '' }: DepthLayerProps) {
    return (
        <div
            className={className}
            style={{
                transform: `translateZ(${depth}px)`,
                transformStyle: 'preserve-3d',
            }}
        >
            {children}
        </div>
    );
}
