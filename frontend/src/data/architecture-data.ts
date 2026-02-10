// Architecture data model for the interactive visualization

export interface ArchitectureNode {
    id: string;
    type: 'project' | 'technology' | 'system';
    label: string;
    description: string;
    position: [number, number, number]; // x, y, z coordinates
    technologies?: string[]; // For projects
    color?: string; // Optional custom color
}

export interface ArchitectureEdge {
    source: string; // Node ID
    target: string; // Node ID
    strength: number; // 0-1, affects visual weight
}

export interface ArchitectureData {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
}

// Define the architecture graph data
export const architectureData: ArchitectureData = {
    nodes: [
        // SYSTEMS (Core categories)
        {
            id: 'backend',
            type: 'system',
            label: 'Backend',
            description: 'Server-side architecture and APIs',
            position: [-4, 2, 0],
        },
        {
            id: 'ai-ml',
            type: 'system',
            label: 'AI/ML',
            description: 'Machine learning and AI systems',
            position: [0, 2, 0],
        },
        {
            id: 'frontend',
            type: 'system',
            label: 'Frontend',
            description: 'Client-side interfaces',
            position: [4, 2, 0],
        },
        {
            id: 'devops',
            type: 'system',
            label: 'DevOps',
            description: 'Infrastructure and deployment',
            position: [0, -2, 0],
        },

        // PROJECTS
        {
            id: 'rivera-acad-swap',
            type: 'project',
            label: 'Rivera Acad Swap',
            description: 'University marketplace platform',
            position: [-2, 0, 2],
            technologies: ['react', 'typescript', 'fastapi', 'postgres'],
        },
        {
            id: 'hydra',
            type: 'project',
            label: 'HYDRA',
            description: 'AI flood control transparency system',
            position: [0, 0, 2],
            technologies: ['react', 'fastapi', 'openai', 'postgres'],
        },
        {
            id: 'rule-vii',
            type: 'project',
            label: 'Rule VII SaaS',
            description: 'AI architectural compliance mentor',
            position: [2, 0, 2],
            technologies: ['nextjs', 'typescript', 'fastapi', 'langchain', 'postgres'],
        },

        // TECHNOLOGIES
        // Backend
        {
            id: 'fastapi',
            type: 'technology',
            label: 'FastAPI',
            description: 'Modern Python web framework',
            position: [-5, 0, -1],
        },
        {
            id: 'go',
            type: 'technology',
            label: 'Go',
            description: 'High-performance language',
            position: [-4, -1, -1],
        },
        {
            id: 'postgres',
            type: 'technology',
            label: 'PostgreSQL',
            description: 'Relational database',
            position: [-3, 0, -1],
        },
        {
            id: 'redis',
            type: 'technology',
            label: 'Redis',
            description: 'In-memory data store',
            position: [-3, -1, -1],
        },

        // AI/ML
        {
            id: 'langchain',
            type: 'technology',
            label: 'LangChain',
            description: 'LLM framework',
            position: [-1, 1, -1],
        },
        {
            id: 'openai',
            type: 'technology',
            label: 'OpenAI',
            description: 'GPT models',
            position: [0, 1, -1],
        },
        {
            id: 'ollama',
            type: 'technology',
            label: 'Ollama',
            description: 'Local LLM inference',
            position: [1, 1, -1],
        },
        {
            id: 'qdrant',
            type: 'technology',
            label: 'Qdrant',
            description: 'Vector database',
            position: [0, 0, -1],
        },

        // Frontend
        {
            id: 'react',
            type: 'technology',
            label: 'React',
            description: 'UI library',
            position: [3, 0, -1],
        },
        {
            id: 'nextjs',
            type: 'technology',
            label: 'Next.js',
            description: 'React framework',
            position: [4, 0, -1],
        },
        {
            id: 'typescript',
            type: 'technology',
            label: 'TypeScript',
            description: 'Typed JavaScript',
            position: [5, 0, -1],
        },

        // DevOps
        {
            id: 'docker',
            type: 'technology',
            label: 'Docker',
            description: 'Containerization',
            position: [-1, -3, -1],
        },
        {
            id: 'kubernetes',
            type: 'technology',
            label: 'Kubernetes',
            description: 'Container orchestration',
            position: [0, -3, -1],
        },
        {
            id: 'grpc',
            type: 'technology',
            label: 'gRPC',
            description: 'RPC framework',
            position: [1, -3, -1],
        },
    ],

    edges: [
        // System connections
        { source: 'backend', target: 'ai-ml', strength: 0.8 },
        { source: 'ai-ml', target: 'frontend', strength: 0.6 },
        { source: 'backend', target: 'devops', strength: 0.9 },
        { source: 'frontend', target: 'devops', strength: 0.7 },

        // Rivera Acad Swap connections
        { source: 'rivera-acad-swap', target: 'backend', strength: 1 },
        { source: 'rivera-acad-swap', target: 'frontend', strength: 1 },
        { source: 'rivera-acad-swap', target: 'react', strength: 0.9 },
        { source: 'rivera-acad-swap', target: 'typescript', strength: 0.9 },
        { source: 'rivera-acad-swap', target: 'fastapi', strength: 0.9 },
        { source: 'rivera-acad-swap', target: 'postgres', strength: 0.8 },

        // HYDRA connections
        { source: 'hydra', target: 'backend', strength: 1 },
        { source: 'hydra', target: 'ai-ml', strength: 1 },
        { source: 'hydra', target: 'frontend', strength: 1 },
        { source: 'hydra', target: 'react', strength: 0.9 },
        { source: 'hydra', target: 'fastapi', strength: 0.9 },
        { source: 'hydra', target: 'openai', strength: 0.9 },
        { source: 'hydra', target: 'postgres', strength: 0.8 },

        // Rule VII connections
        { source: 'rule-vii', target: 'backend', strength: 1 },
        { source: 'rule-vii', target: 'ai-ml', strength: 1 },
        { source: 'rule-vii', target: 'frontend', strength: 1 },
        { source: 'rule-vii', target: 'nextjs', strength: 0.9 },
        { source: 'rule-vii', target: 'typescript', strength: 0.9 },
        { source: 'rule-vii', target: 'fastapi', strength: 0.9 },
        { source: 'rule-vii', target: 'langchain', strength: 0.9 },
        { source: 'rule-vii', target: 'postgres', strength: 0.8 },

        // Technology to system connections
        { source: 'fastapi', target: 'backend', strength: 0.7 },
        { source: 'go', target: 'backend', strength: 0.7 },
        { source: 'postgres', target: 'backend', strength: 0.6 },
        { source: 'redis', target: 'backend', strength: 0.6 },
        { source: 'langchain', target: 'ai-ml', strength: 0.7 },
        { source: 'openai', target: 'ai-ml', strength: 0.7 },
        { source: 'ollama', target: 'ai-ml', strength: 0.7 },
        { source: 'qdrant', target: 'ai-ml', strength: 0.6 },
        { source: 'react', target: 'frontend', strength: 0.7 },
        { source: 'nextjs', target: 'frontend', strength: 0.7 },
        { source: 'typescript', target: 'frontend', strength: 0.6 },
        { source: 'docker', target: 'devops', strength: 0.7 },
        { source: 'kubernetes', target: 'devops', strength: 0.7 },
        { source: 'grpc', target: 'devops', strength: 0.6 },
    ],
};
