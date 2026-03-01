'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { projectArchitectures, ArchitectureNode as NodeData } from '@/data/project-architectures';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Node component for 3D visualization
function Node({ node, onClick, isHovered, onHover }: {
    node: NodeData;
    onClick: () => void;
    isHovered: boolean;
    onHover: (hovered: boolean) => void;
}) {
    const meshRef = useRef<any>(null);
    const [hovered, setHovered] = useState(false);

    // Gentle floating animation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime + node.position[0]) * 0.1;
        }
    });

    // Determine size and color based on node type
    const getNodeStyle = () => {
        switch (node.type) {
            case 'frontend':
                return { size: 0.5, color: '#60a5fa', emissive: '#3b82f6' }; // Blue
            case 'backend':
                return { size: 0.5, color: '#34d399', emissive: '#10b981' }; // Green
            case 'database':
                return { size: 0.5, color: '#f59e0b', emissive: '#d97706' }; // Orange
            case 'ai':
                return { size: 0.5, color: '#a78bfa', emissive: '#8b5cf6' }; // Purple
            case 'service':
                return { size: 0.35, color: '#fbbf24', emissive: '#f59e0b' }; // Yellow
            case 'external':
                return { size: 0.35, color: '#ec4899', emissive: '#db2777' }; // Pink
            default:
                return { size: 0.3, color: '#71717a', emissive: '#52525b' }; // Gray
        }
    };

    const style = getNodeStyle();
    const isActive = hovered || isHovered;

    return (
        <group position={node.position}>
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    onHover(true);
                }}
                onPointerOut={() => {
                    setHovered(false);
                    onHover(false);
                }}
            >
                <sphereGeometry args={[style.size, 32, 32]} />
                <meshStandardMaterial
                    color={isActive ? '#ffffff' : style.color}
                    emissive={isActive ? style.emissive : style.emissive}
                    emissiveIntensity={isActive ? 0.8 : 0.3}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            {/* Label */}
            {isActive && (
                <Html distanceFactor={10} position={[0, style.size + 0.4, 0]}>
                    <div className="pointer-events-none select-none">
                        <div className="px-3 py-1.5 rounded-lg backdrop-blur-md border bg-black/80 border-white/30 text-white text-xs font-mono whitespace-nowrap shadow-lg">
                            {node.label}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

// Connection line component
function Connection({ start, end, strength, label }: {
    start: [number, number, number];
    end: [number, number, number];
    strength: number;
    label?: string;
}) {
    const points = useMemo(() => [
        new Vector3(...start),
        new Vector3(...end),
    ], [start, end]);

    const midpoint = useMemo(() => {
        return new Vector3(
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
            (start[2] + end[2]) / 2
        );
    }, [start, end]);

    return (
        <>
            <Line
                points={points}
                color="#ffffff"
                lineWidth={strength * 2.5}
                transparent
                opacity={strength * 0.4}
            />
            {label && (
                <Html position={[midpoint.x, midpoint.y, midpoint.z]}>
                    <div className="pointer-events-none select-none">
                        <div className="px-2 py-0.5 rounded bg-black/60 border border-white/20 text-white/70 text-[10px] font-mono whitespace-nowrap">
                            {label}
                        </div>
                    </div>
                </Html>
            )}
        </>
    );
}

// Main 3D Scene
function Scene({ architecture, onNodeClick, hoveredNodeId, onNodeHover }: {
    architecture: typeof projectArchitectures[string];
    onNodeClick: (node: NodeData) => void;
    hoveredNodeId: string | null;
    onNodeHover: (nodeId: string | null) => void;
}) {
    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -10]} intensity={0.6} />
            <pointLight position={[0, 10, -10]} intensity={0.8} color="#60a5fa" />

            {/* Render connections */}
            {architecture.edges.map((edge, idx) => {
                const sourceNode = architecture.nodes.find(n => n.id === edge.source);
                const targetNode = architecture.nodes.find(n => n.id === edge.target);

                if (!sourceNode || !targetNode) return null;

                return (
                    <Connection
                        key={`edge-${idx}`}
                        start={sourceNode.position}
                        end={targetNode.position}
                        strength={edge.strength}
                        label={edge.label}
                    />
                );
            })}

            {/* Render nodes */}
            {architecture.nodes.map((node) => (
                <Node
                    key={node.id}
                    node={node}
                    onClick={() => onNodeClick(node)}
                    isHovered={hoveredNodeId === node.id}
                    onHover={(hovered) => onNodeHover(hovered ? node.id : null)}
                />
            ))}

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={6}
                maxDistance={18}
                autoRotate
                autoRotateSpeed={0.8}
            />
        </>
    );
}

// Detail modal component
function NodeDetailModal({ node, onClose }: { node: NodeData; onClose: () => void }) {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'frontend': return 'text-blue-400';
            case 'backend': return 'text-green-400';
            case 'database': return 'text-orange-400';
            case 'ai': return 'text-purple-400';
            case 'service': return 'text-yellow-400';
            case 'external': return 'text-pink-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                className="bg-zinc-900/95 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className={`text-xs font-mono uppercase mb-1 ${getTypeColor(node.type)}`}>
                            {node.type}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{node.label}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                <p className="text-zinc-300 mb-6 leading-relaxed">{node.description}</p>

                {node.technologies && node.technologies.length > 0 && (
                    <div>
                        <h4 className="text-sm font-mono text-zinc-400 uppercase mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {node.technologies.map(tech => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 rounded-lg text-xs font-mono border border-white/20 bg-white/5 text-zinc-200 hover:bg-white/10 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// Main component
export default function ProjectArchitectureGraph({ projectSlug }: { projectSlug: string }) {
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    const architecture = projectArchitectures[projectSlug];

    if (!architecture) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-zinc-400 font-mono">Architecture diagram not available for this project.</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full min-h-[500px]">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <Scene
                    architecture={architecture}
                    onNodeClick={setSelectedNode}
                    hoveredNodeId={hoveredNodeId}
                    onNodeHover={setHoveredNodeId}
                />
            </Canvas>

            {/* Instructions overlay */}
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-md mx-auto">
                    <p className="text-xs font-mono text-zinc-300 text-center">
                        <span className="text-white font-semibold">Drag</span> to rotate • 
                        <span className="text-white font-semibold"> Scroll</span> to zoom • 
                        <span className="text-white font-semibold"> Click</span> nodes for details
                    </p>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-mono text-zinc-400 uppercase mb-3">Legend</h4>
                <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-zinc-300">Frontend</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <span className="text-zinc-300">Backend</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                        <span className="text-zinc-300">Database</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                        <span className="text-zinc-300">AI/ML</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span className="text-zinc-300">Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                        <span className="text-zinc-300">External</span>
                    </div>
                </div>
            </div>

            {/* Node detail modal */}
            <AnimatePresence>
                {selectedNode && (
                    <NodeDetailModal
                        node={selectedNode}
                        onClose={() => setSelectedNode(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
