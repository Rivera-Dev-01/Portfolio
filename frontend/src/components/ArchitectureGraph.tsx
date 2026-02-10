'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { architectureData, ArchitectureNode as NodeData } from '@/data/architecture-data';
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
            case 'system':
                return { size: 0.6, color: '#ffffff', emissive: '#666666' };
            case 'project':
                return { size: 0.4, color: '#e4e4e7', emissive: '#444444' };
            case 'technology':
                return { size: 0.25, color: '#a1a1aa', emissive: '#333333' };
            default:
                return { size: 0.3, color: '#71717a', emissive: '#222222' };
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
                    emissive={isActive ? '#ffffff' : style.emissive}
                    emissiveIntensity={isActive ? 0.5 : 0.2}
                    roughness={0.3}
                    metalness={0.7}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Label */}
            {(isActive || node.type === 'system' || node.type === 'project') && (
                <Html distanceFactor={10} position={[0, style.size + 0.3, 0]}>
                    <div className="pointer-events-none select-none">
                        <div className={`
              px-2 py-1 rounded-md backdrop-blur-md border
              ${isActive ? 'bg-white/20 border-white/40 text-white' : 'bg-black/40 border-white/10 text-zinc-400'}
              text-xs font-mono whitespace-nowrap transition-all duration-200
            `}>
                            {node.label}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

// Connection line component
function Connection({ start, end, strength }: {
    start: [number, number, number];
    end: [number, number, number];
    strength: number;
}) {
    const points = useMemo(() => [
        new Vector3(...start),
        new Vector3(...end),
    ], [start, end]);

    return (
        <Line
            points={points}
            color="#52525b"
            lineWidth={strength * 2}
            transparent
            opacity={strength * 0.3}
        />
    );
}

// Main 3D Scene
function Scene({ onNodeClick, hoveredNodeId, onNodeHover }: {
    onNodeClick: (node: NodeData) => void;
    hoveredNodeId: string | null;
    onNodeHover: (nodeId: string | null) => void;
}) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Render connections */}
            {architectureData.edges.map((edge, idx) => {
                const sourceNode = architectureData.nodes.find(n => n.id === edge.source);
                const targetNode = architectureData.nodes.find(n => n.id === edge.target);

                if (!sourceNode || !targetNode) return null;

                return (
                    <Connection
                        key={`edge-${idx}`}
                        start={sourceNode.position}
                        end={targetNode.position}
                        strength={edge.strength}
                    />
                );
            })}

            {/* Render nodes */}
            {architectureData.nodes.map((node) => (
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
                minDistance={8}
                maxDistance={20}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
}

// Detail modal component
function NodeDetailModal({ node, onClose }: { node: NodeData; onClose: () => void }) {
    // Find connected nodes
    const connections = useMemo(() => {
        const edges = architectureData.edges.filter(
            e => e.source === node.id || e.target === node.id
        );

        return edges.map(edge => {
            const connectedId = edge.source === node.id ? edge.target : edge.source;
            const connectedNode = architectureData.nodes.find(n => n.id === connectedId);
            return { node: connectedNode, strength: edge.strength };
        }).filter(c => c.node);
    }, [node]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                className="glass-panel p-6 rounded-2xl border border-white/10 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-xs font-mono text-zinc-500 uppercase mb-1">{node.type}</div>
                        <h3 className="text-2xl font-bold text-white">{node.label}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                <p className="text-zinc-400 mb-6">{node.description}</p>

                {node.technologies && node.technologies.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm font-mono text-zinc-500 uppercase mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {node.technologies.map(tech => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-md text-xs font-mono border border-white/10 bg-white/5 text-zinc-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {connections.length > 0 && (
                    <div>
                        <h4 className="text-sm font-mono text-zinc-500 uppercase mb-3">
                            Connections ({connections.length})
                        </h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {connections.map(({ node: connectedNode, strength }) => (
                                <div
                                    key={connectedNode!.id}
                                    className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5"
                                >
                                    <div>
                                        <div className="text-sm text-white">{connectedNode!.label}</div>
                                        <div className="text-xs text-zinc-500">{connectedNode!.type}</div>
                                    </div>
                                    <div className="text-xs font-mono text-zinc-400">
                                        {Math.round(strength * 100)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// Main component
export default function ArchitectureGraph() {
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    return (
        <div className="relative w-full h-full">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <Scene
                    onNodeClick={setSelectedNode}
                    hoveredNodeId={hoveredNodeId}
                    onNodeHover={setHoveredNodeId}
                />
            </Canvas>

            {/* Instructions overlay */}
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="glass-panel p-4 rounded-xl border border-white/10 max-w-md">
                    <p className="text-xs font-mono text-zinc-400">
                        <span className="text-white">Drag</span> to rotate • <span className="text-white">Scroll</span> to zoom • <span className="text-white">Click</span> nodes for details
                    </p>
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
