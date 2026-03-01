// Project-specific architecture data
// Each project can have its own unique 3D visualization

export interface ArchitectureNode {
    id: string;
    type: 'frontend' | 'backend' | 'database' | 'service' | 'external' | 'ai';
    label: string;
    description: string;
    position: [number, number, number]; // x, y, z coordinates
    technologies?: string[];
    color?: string;
}

export interface ArchitectureEdge {
    source: string;
    target: string;
    strength: number; // 0-1
    label?: string; // Optional label for the connection
}

export interface ProjectArchitecture {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
}

// Architecture for each project
export const projectArchitectures: Record<string, ProjectArchitecture> = {
    'acad-swap': {
        nodes: [
            // Client Layer
            {
                id: 'react-spa',
                type: 'frontend',
                label: 'React SPA',
                description: 'TypeScript + Vite + TanStack Query',
                position: [0, 4, 0],
                technologies: ['React', 'TypeScript', 'Vite', 'TanStack Query'],
            },

            // Frontend Pages
            {
                id: 'dashboard-page',
                type: 'frontend',
                label: 'Dashboard',
                description: 'Stats, earnings, reputation system',
                position: [-4, 3, 1],
                technologies: ['React', 'Glassmorphism'],
            },
            {
                id: 'marketplace-page',
                type: 'frontend',
                label: 'Marketplace',
                description: 'Browse & list items',
                position: [-2, 3, 1],
                technologies: ['React', 'Tailwind'],
            },
            {
                id: 'request-board',
                type: 'frontend',
                label: 'Request Board',
                description: 'Reddit-style forum with threads',
                position: [0, 3, 1],
                technologies: ['React', 'Threaded UI'],
            },
            {
                id: 'meetup-scheduler',
                type: 'frontend',
                label: 'Meetup Scheduler',
                description: 'Coordinate exchanges with notifications',
                position: [2, 3, 1],
                technologies: ['React', 'Calendar'],
            },
            {
                id: 'offers-messages',
                type: 'frontend',
                label: 'Offers & Messages',
                description: 'Real-time messaging',
                position: [4, 3, 1],
                technologies: ['React', 'WebSocket'],
            },

            // Frontend Hooks & Utils
            {
                id: 'realtime-hooks',
                type: 'frontend',
                label: 'Realtime Hooks',
                description: 'useRealtimeData for live updates',
                position: [-3, 2, 2],
                technologies: ['React Hooks', 'Supabase Realtime'],
            },
            {
                id: 'optimistic-updates',
                type: 'frontend',
                label: 'Optimistic Updates',
                description: 'Instant UI feedback',
                position: [-1, 2, 2],
                technologies: ['TanStack Query', 'React'],
            },
            {
                id: 'router',
                type: 'frontend',
                label: 'React Router',
                description: 'Protected routes & lazy loading',
                position: [1, 2, 2],
                technologies: ['React Router', 'Auth Guards'],
            },

            // API Layer - Flask
            {
                id: 'flask-api',
                type: 'backend',
                label: 'Flask API',
                description: 'REST API with Blueprints',
                position: [0, 0, 0],
                technologies: ['Flask', 'Python', 'CORS'],
            },

            // API Routes (Blueprints)
            {
                id: 'auth-routes',
                type: 'backend',
                label: 'Auth Routes',
                description: '/api/auth/* - Registration, login',
                position: [-5, -0.5, 1],
                technologies: ['Flask Blueprint', 'JWT'],
            },
            {
                id: 'marketplace-routes',
                type: 'backend',
                label: 'Marketplace Routes',
                description: '/api/marketplace/* - Item CRUD',
                position: [-3, -0.5, 1],
                technologies: ['Flask Blueprint'],
            },
            {
                id: 'offer-routes',
                type: 'backend',
                label: 'Offer Routes',
                description: '/api/offer/* - Offer management',
                position: [-1, -0.5, 1],
                technologies: ['Flask Blueprint'],
            },
            {
                id: 'meetup-routes',
                type: 'backend',
                label: 'Meetup Routes',
                description: '/api/meetup/* - Scheduling',
                position: [1, -0.5, 1],
                technologies: ['Flask Blueprint'],
            },
            {
                id: 'friends-routes',
                type: 'backend',
                label: 'Friends Routes',
                description: '/api/friends/* - Social connections',
                position: [3, -0.5, 1],
                technologies: ['Flask Blueprint'],
            },
            {
                id: 'notifications-routes',
                type: 'backend',
                label: 'Notifications Routes',
                description: '/api/notifications/* - Alerts',
                position: [5, -0.5, 1],
                technologies: ['Flask Blueprint'],
            },

            // Service Layer
            {
                id: 'auth-service',
                type: 'backend',
                label: 'Auth Service',
                description: 'University email verification',
                position: [-4, -1.5, 2],
                technologies: ['Python', 'Supabase Auth'],
            },
            {
                id: 'marketplace-service',
                type: 'backend',
                label: 'Marketplace Service',
                description: 'Item listing business logic',
                position: [-2, -1.5, 2],
                technologies: ['Python'],
            },
            {
                id: 'offer-service',
                type: 'backend',
                label: 'Offer Service',
                description: 'Offer processing & status',
                position: [0, -1.5, 2],
                technologies: ['Python'],
            },
            {
                id: 'notification-service',
                type: 'backend',
                label: 'Notification Service',
                description: 'Real-time alerts',
                position: [2, -1.5, 2],
                technologies: ['Python', 'WebSocket'],
            },
            {
                id: 'referral-service',
                type: 'backend',
                label: 'Referral Service',
                description: 'Referral tracking & rewards',
                position: [4, -1.5, 2],
                technologies: ['Python'],
            },

            // Middleware
            {
                id: 'auth-middleware',
                type: 'service',
                label: 'Auth Middleware',
                description: 'JWT validation on protected routes',
                position: [-2, -2.5, 0],
                technologies: ['Flask', 'JWT'],
            },
            {
                id: 'cors-middleware',
                type: 'service',
                label: 'CORS Middleware',
                description: 'Cross-origin configuration',
                position: [0, -2.5, 0],
                technologies: ['Flask-CORS'],
            },

            // Supabase Client
            {
                id: 'supabase-sdk',
                type: 'service',
                label: 'Supabase SDK',
                description: 'Python client for database',
                position: [0, -3.5, 0],
                technologies: ['Supabase Python SDK'],
            },

            // Data Layer - Supabase
            {
                id: 'supabase-postgres',
                type: 'database',
                label: 'Supabase PostgreSQL',
                description: 'Managed database with RLS',
                position: [0, -5, 0],
                technologies: ['PostgreSQL', 'RLS'],
            },

            // Database Tables
            {
                id: 'users-table',
                type: 'database',
                label: 'users',
                description: 'Student profiles with .edu verification',
                position: [-5, -6, 1],
                technologies: ['PostgreSQL', 'Indexed'],
            },
            {
                id: 'items-table',
                type: 'database',
                label: 'marketplace_items',
                description: 'Product listings',
                position: [-3, -6, 1],
                technologies: ['PostgreSQL'],
            },
            {
                id: 'offers-table',
                type: 'database',
                label: 'offers',
                description: 'Purchase offers with status',
                position: [-1, -6, 1],
                technologies: ['PostgreSQL'],
            },
            {
                id: 'messages-table',
                type: 'database',
                label: 'messages',
                description: 'Direct messaging',
                position: [1, -6, 1],
                technologies: ['PostgreSQL'],
            },
            {
                id: 'meetups-table',
                type: 'database',
                label: 'meetups',
                description: 'Scheduled exchanges',
                position: [3, -6, 1],
                technologies: ['PostgreSQL'],
            },
            {
                id: 'notifications-table',
                type: 'database',
                label: 'notifications',
                description: 'Real-time alerts',
                position: [5, -6, 1],
                technologies: ['PostgreSQL'],
            },
            {
                id: 'friendships-table',
                type: 'database',
                label: 'friendships',
                description: 'N:N social connections',
                position: [-4, -7, 1],
                technologies: ['PostgreSQL', 'Junction Table'],
            },
            {
                id: 'referrals-table',
                type: 'database',
                label: 'referrals',
                description: 'Referral tracking',
                position: [-2, -7, 1],
                technologies: ['PostgreSQL'],
            },
            {
                id: 'request-board-table',
                type: 'database',
                label: 'request_board',
                description: 'Community posts',
                position: [0, -7, 1],
                technologies: ['PostgreSQL'],
            },

            // Supabase Services
            {
                id: 'supabase-auth',
                type: 'external',
                label: 'Supabase Auth',
                description: 'JWT-based authentication',
                position: [2, -7, 1],
                technologies: ['JWT', 'Email Verification'],
            },
            {
                id: 'supabase-realtime',
                type: 'external',
                label: 'Supabase Realtime',
                description: 'WebSocket subscriptions',
                position: [4, -7, 1],
                technologies: ['WebSocket', 'Postgres Changes'],
            },
        ],
        edges: [
            // Frontend to Pages
            { source: 'react-spa', target: 'dashboard-page', strength: 0.9 },
            { source: 'react-spa', target: 'marketplace-page', strength: 0.9 },
            { source: 'react-spa', target: 'request-board', strength: 0.9 },
            { source: 'react-spa', target: 'meetup-scheduler', strength: 0.9 },
            { source: 'react-spa', target: 'offers-messages', strength: 0.9 },
            
            // Frontend Hooks
            { source: 'react-spa', target: 'realtime-hooks', strength: 0.9 },
            { source: 'react-spa', target: 'optimistic-updates', strength: 0.9 },
            { source: 'react-spa', target: 'router', strength: 1 },
            
            // Hooks to Pages
            { source: 'realtime-hooks', target: 'offers-messages', strength: 1, label: 'Live Updates' },
            { source: 'realtime-hooks', target: 'dashboard-page', strength: 0.8 },
            { source: 'optimistic-updates', target: 'marketplace-page', strength: 0.9 },
            
            // Frontend to Backend
            { source: 'react-spa', target: 'flask-api', strength: 1, label: 'REST API' },
            { source: 'dashboard-page', target: 'flask-api', strength: 0.8 },
            { source: 'marketplace-page', target: 'flask-api', strength: 0.9 },
            { source: 'request-board', target: 'flask-api', strength: 0.9 },
            { source: 'meetup-scheduler', target: 'flask-api', strength: 0.9 },
            { source: 'offers-messages', target: 'flask-api', strength: 1 },
            
            // Flask to Routes
            { source: 'flask-api', target: 'auth-routes', strength: 0.9 },
            { source: 'flask-api', target: 'marketplace-routes', strength: 0.9 },
            { source: 'flask-api', target: 'offer-routes', strength: 0.9 },
            { source: 'flask-api', target: 'meetup-routes', strength: 0.9 },
            { source: 'flask-api', target: 'friends-routes', strength: 0.8 },
            { source: 'flask-api', target: 'notifications-routes', strength: 0.9 },
            
            // Routes to Services
            { source: 'auth-routes', target: 'auth-service', strength: 1 },
            { source: 'marketplace-routes', target: 'marketplace-service', strength: 1 },
            { source: 'offer-routes', target: 'offer-service', strength: 1 },
            { source: 'meetup-routes', target: 'marketplace-service', strength: 0.8 },
            { source: 'notifications-routes', target: 'notification-service', strength: 1 },
            { source: 'auth-routes', target: 'referral-service', strength: 0.7 },
            
            // Middleware
            { source: 'flask-api', target: 'auth-middleware', strength: 0.9, label: 'JWT Check' },
            { source: 'flask-api', target: 'cors-middleware', strength: 0.8 },
            
            // Services to Supabase SDK
            { source: 'auth-service', target: 'supabase-sdk', strength: 1 },
            { source: 'marketplace-service', target: 'supabase-sdk', strength: 1 },
            { source: 'offer-service', target: 'supabase-sdk', strength: 1 },
            { source: 'notification-service', target: 'supabase-sdk', strength: 1 },
            { source: 'referral-service', target: 'supabase-sdk', strength: 0.9 },
            
            // SDK to Database
            { source: 'supabase-sdk', target: 'supabase-postgres', strength: 1, label: 'SQL Queries' },
            
            // Database to Tables
            { source: 'supabase-postgres', target: 'users-table', strength: 1 },
            { source: 'supabase-postgres', target: 'items-table', strength: 1 },
            { source: 'supabase-postgres', target: 'offers-table', strength: 1 },
            { source: 'supabase-postgres', target: 'messages-table', strength: 1 },
            { source: 'supabase-postgres', target: 'meetups-table', strength: 1 },
            { source: 'supabase-postgres', target: 'notifications-table', strength: 1 },
            { source: 'supabase-postgres', target: 'friendships-table', strength: 0.9 },
            { source: 'supabase-postgres', target: 'referrals-table', strength: 0.8 },
            { source: 'supabase-postgres', target: 'request-board-table', strength: 0.9 },
            
            // Table Relationships
            { source: 'items-table', target: 'users-table', strength: 0.9, label: 'FK: user_id' },
            { source: 'offers-table', target: 'items-table', strength: 1, label: 'FK: item_id' },
            { source: 'offers-table', target: 'users-table', strength: 0.9, label: 'FK: buyer_id' },
            { source: 'messages-table', target: 'offers-table', strength: 1, label: 'FK: offer_id' },
            { source: 'meetups-table', target: 'offers-table', strength: 0.9, label: 'FK: offer_id' },
            { source: 'notifications-table', target: 'users-table', strength: 1, label: 'FK: user_id' },
            { source: 'referrals-table', target: 'users-table', strength: 0.9, label: 'FK: referrer_id' },
            
            // Supabase Services
            { source: 'supabase-postgres', target: 'supabase-auth', strength: 0.9 },
            { source: 'supabase-postgres', target: 'supabase-realtime', strength: 1 },
            { source: 'auth-service', target: 'supabase-auth', strength: 1, label: 'Email Verify' },
            { source: 'realtime-hooks', target: 'supabase-realtime', strength: 1, label: 'Subscribe' },
            { source: 'notification-service', target: 'supabase-realtime', strength: 0.9, label: 'Push' },
        ],
    },

    'hydra': {
        nodes: [
            // Frontend Layer
            {
                id: 'react-app',
                type: 'frontend',
                label: 'React 19 + Vite',
                description: 'Main frontend application',
                position: [0, 3, 0],
                technologies: ['React 19', 'Vite', 'Leaflet', 'Mapbox'],
            },
            {
                id: 'dashboard',
                type: 'frontend',
                label: 'Dashboard',
                description: 'Analytics with charts & top contractors',
                position: [-4, 2, 1],
                technologies: ['React', 'Charts'],
            },
            {
                id: 'investigator-map',
                type: 'frontend',
                label: 'Investigator Map',
                description: 'Interactive Leaflet map with risk markers',
                position: [-2, 2, 1],
                technologies: ['Leaflet', 'Mapbox'],
            },
            {
                id: 'dropbox',
                type: 'frontend',
                label: 'Citizen Dropbox',
                description: 'Anonymous whistleblower submission',
                position: [0, 2, 1],
                technologies: ['React', 'File Upload'],
            },
            {
                id: 'satellite-viewer',
                type: 'frontend',
                label: 'Satellite Evidence',
                description: 'Satellite imagery viewer',
                position: [2, 2, 1],
                technologies: ['React', 'Image Viewer'],
            },
            {
                id: 'admin-panel',
                type: 'frontend',
                label: 'Admin Panel',
                description: 'Report management dashboard',
                position: [4, 2, 1],
                technologies: ['React', 'Auth'],
            },

            // Backend API Layer
            {
                id: 'flask-api',
                type: 'backend',
                label: 'Flask API',
                description: 'Main REST API server',
                position: [0, 0, 0],
                technologies: ['Flask 3.0', 'Python', 'CORS'],
            },
            {
                id: 'projects-api',
                type: 'backend',
                label: 'Projects API',
                description: 'Project CRUD & search endpoints',
                position: [-3, 0, 1],
                technologies: ['Flask', 'SQLite'],
            },
            {
                id: 'reports-api',
                type: 'backend',
                label: 'Reports API',
                description: 'Evidence submission & management',
                position: [-1, 0, 1],
                technologies: ['Flask', 'File Handling'],
            },
            {
                id: 'ai-service',
                type: 'ai',
                label: 'AI Service',
                description: 'Google Gemini integration',
                position: [1, 0, 1],
                technologies: ['Google Gemini', 'Python'],
            },
            {
                id: 'chat-api',
                type: 'backend',
                label: 'Chat API',
                description: 'AI assistant chat endpoint',
                position: [3, 0, 1],
                technologies: ['Flask', 'Gemini'],
            },

            // Data Pipeline Layer
            {
                id: 'pipeline-orchestrator',
                type: 'service',
                label: 'Pipeline Orchestrator',
                description: 'Coordinates 5-stage data pipeline',
                position: [-4, -1.5, 0],
                technologies: ['Python', 'main.py'],
            },
            {
                id: 'scraper',
                type: 'service',
                label: 'Data Scraper',
                description: 'Fetches projects from BetterGov API',
                position: [-5, -2.5, 1],
                technologies: ['Python', 'MeiliSearch API'],
            },
            {
                id: 'validator',
                type: 'service',
                label: 'Validator',
                description: 'Tier 1 rule-based risk scoring',
                position: [-3, -2.5, 1],
                technologies: ['Python', 'Risk Scoring'],
            },
            {
                id: 'geocoder',
                type: 'service',
                label: 'Geocoder',
                description: 'Adds coordinates for mapping',
                position: [-1, -2.5, 1],
                technologies: ['Python', 'Geocoding'],
            },
            {
                id: 'sentinel-fetcher',
                type: 'service',
                label: 'Sentinel Fetcher',
                description: 'Fetches satellite imagery',
                position: [1, -2.5, 1],
                technologies: ['Sentinel Hub API'],
            },

            // AI Analysis Layer
            {
                id: 'senior-analyst',
                type: 'ai',
                label: 'Senior Analyst',
                description: 'Tier 2 AI audit with benchmarks',
                position: [3, -1.5, 0],
                technologies: ['Google Gemini', 'Benchmarks'],
            },
            {
                id: 'evidence-moderator',
                type: 'ai',
                label: 'Evidence Moderator',
                description: 'AI-powered submission filtering',
                position: [5, -1.5, 0],
                technologies: ['Google Gemini', 'Classification'],
            },

            // External APIs
            {
                id: 'bettergov-api',
                type: 'external',
                label: 'BetterGov API',
                description: 'Government project data source',
                position: [-6, -3.5, 0],
                technologies: ['MeiliSearch', 'Open Data'],
            },
            {
                id: 'sentinel-hub',
                type: 'external',
                label: 'Sentinel Hub',
                description: 'Satellite imagery provider',
                position: [0, -3.5, 0],
                technologies: ['Sentinel Hub API'],
            },
            {
                id: 'gemini-api',
                type: 'external',
                label: 'Google Gemini',
                description: 'AI analysis engine',
                position: [4, -3.5, 0],
                technologies: ['Gemini API'],
            },

            // Database Layer
            {
                id: 'sqlite-db',
                type: 'database',
                label: 'SQLite Database',
                description: 'Main project database',
                position: [0, -5, 0],
                technologies: ['SQLite', 'Python'],
            },
            {
                id: 'projects-table',
                type: 'database',
                label: 'Projects Table',
                description: 'All flood control projects',
                position: [-3, -5.5, 1],
                technologies: ['SQLite'],
            },
            {
                id: 'reports-table',
                type: 'database',
                label: 'Reports Table',
                description: 'Citizen evidence & published reports',
                position: [-1, -5.5, 1],
                technologies: ['SQLite', 'BLOB'],
            },
            {
                id: 'ai-cache',
                type: 'database',
                label: 'AI Cache',
                description: 'Cached AI audit results',
                position: [1, -5.5, 1],
                technologies: ['SQLite'],
            },
            {
                id: 'benchmarks',
                type: 'database',
                label: 'Benchmarks',
                description: 'Provincial averages & COA data',
                position: [3, -5.5, 1],
                technologies: ['JSON', 'SQLite'],
            },
        ],
        edges: [
            // Frontend to Backend
            { source: 'react-app', target: 'dashboard', strength: 0.9 },
            { source: 'react-app', target: 'investigator-map', strength: 0.9 },
            { source: 'react-app', target: 'dropbox', strength: 0.8 },
            { source: 'react-app', target: 'satellite-viewer', strength: 0.8 },
            { source: 'react-app', target: 'admin-panel', strength: 0.7 },
            { source: 'react-app', target: 'flask-api', strength: 1, label: 'REST API' },
            
            // Frontend to specific APIs
            { source: 'dashboard', target: 'projects-api', strength: 0.9 },
            { source: 'investigator-map', target: 'projects-api', strength: 0.9 },
            { source: 'dropbox', target: 'reports-api', strength: 1 },
            { source: 'satellite-viewer', target: 'projects-api', strength: 0.8 },
            { source: 'admin-panel', target: 'reports-api', strength: 0.9 },
            { source: 'react-app', target: 'chat-api', strength: 0.8, label: 'AI Chat' },
            
            // Backend API structure
            { source: 'flask-api', target: 'projects-api', strength: 0.9 },
            { source: 'flask-api', target: 'reports-api', strength: 0.9 },
            { source: 'flask-api', target: 'ai-service', strength: 0.9 },
            { source: 'flask-api', target: 'chat-api', strength: 0.8 },
            
            // Data Pipeline Flow
            { source: 'pipeline-orchestrator', target: 'scraper', strength: 1, label: 'Stage 1' },
            { source: 'scraper', target: 'validator', strength: 1, label: 'Stage 2' },
            { source: 'validator', target: 'geocoder', strength: 1, label: 'Stage 3' },
            { source: 'geocoder', target: 'sentinel-fetcher', strength: 0.8, label: 'Stage 4' },
            { source: 'sentinel-fetcher', target: 'sqlite-db', strength: 0.9, label: 'Stage 5' },
            
            // External API connections
            { source: 'scraper', target: 'bettergov-api', strength: 1, label: 'Fetch Projects' },
            { source: 'sentinel-fetcher', target: 'sentinel-hub', strength: 1, label: 'Get Imagery' },
            { source: 'ai-service', target: 'gemini-api', strength: 1, label: 'AI Analysis' },
            { source: 'senior-analyst', target: 'gemini-api', strength: 1 },
            { source: 'evidence-moderator', target: 'gemini-api', strength: 1 },
            
            // AI Analysis connections
            { source: 'ai-service', target: 'senior-analyst', strength: 0.9 },
            { source: 'ai-service', target: 'evidence-moderator', strength: 0.8 },
            { source: 'chat-api', target: 'ai-service', strength: 1 },
            
            // Backend to Database
            { source: 'projects-api', target: 'projects-table', strength: 1 },
            { source: 'reports-api', target: 'reports-table', strength: 1 },
            { source: 'ai-service', target: 'ai-cache', strength: 0.9 },
            { source: 'senior-analyst', target: 'benchmarks', strength: 1, label: 'Compare' },
            { source: 'validator', target: 'benchmarks', strength: 0.8, label: 'COA Data' },
            
            // Database connections
            { source: 'sqlite-db', target: 'projects-table', strength: 0.9 },
            { source: 'sqlite-db', target: 'reports-table', strength: 0.9 },
            { source: 'sqlite-db', target: 'ai-cache', strength: 0.8 },
            { source: 'sqlite-db', target: 'benchmarks', strength: 0.8 },
            
            // Pipeline to Database
            { source: 'pipeline-orchestrator', target: 'sqlite-db', strength: 0.9 },
        ],
    },

    'rule-vii': {
        nodes: [
            // Frontend Layer
            {
                id: 'nextjs-app',
                type: 'frontend',
                label: 'Next.js 14',
                description: 'React frontend with App Router',
                position: [0, 3, 0],
                technologies: ['Next.js 14', 'TypeScript', 'Tailwind', 'shadcn/ui'],
            },
            {
                id: 'chat-interface',
                type: 'frontend',
                label: 'Chat Interface',
                description: 'Real-time streaming chat with AI',
                position: [-3, 2, 1],
                technologies: ['React', 'SSE', 'Streaming'],
            },
            {
                id: 'workspace',
                type: 'frontend',
                label: 'Workspace',
                description: 'Document panel & project management',
                position: [-1, 2, 1],
                technologies: ['React', 'Document Editor'],
            },
            {
                id: 'auth-pages',
                type: 'frontend',
                label: 'Auth Pages',
                description: 'Login, signup, auth callback',
                position: [1, 2, 1],
                technologies: ['Next.js', 'Supabase Auth'],
            },
            {
                id: 'dashboard',
                type: 'frontend',
                label: 'Dashboard',
                description: 'Main workspace with projects',
                position: [3, 2, 1],
                technologies: ['React', 'Project Management'],
            },

            // Backend Layer
            {
                id: 'fastapi-server',
                type: 'backend',
                label: 'FastAPI',
                description: 'Python 3.12 API with rate limiting',
                position: [0, 0, 0],
                technologies: ['FastAPI', 'Python 3.12', 'slowapi'],
            },
            {
                id: 'chat-api',
                type: 'backend',
                label: 'Chat API',
                description: 'Chat endpoints with 20 req/min limit',
                position: [-3, 0, 1],
                technologies: ['FastAPI', 'slowapi', 'JWT'],
            },
            {
                id: 'projects-api',
                type: 'backend',
                label: 'Projects API',
                description: 'Project CRUD & file uploads',
                position: [-1, 0, 1],
                technologies: ['FastAPI', 'File Upload'],
            },
            {
                id: 'auth-api',
                type: 'backend',
                label: 'Auth API',
                description: 'JWT verification & user management',
                position: [1, 0, 1],
                technologies: ['JWT', 'Supabase Auth'],
            },

            // AI/RAG Layer
            {
                id: 'rag-engine',
                type: 'ai',
                label: 'RAG Engine',
                description: 'Vector similarity search with pgvector',
                position: [-2, -1, 0],
                technologies: ['sentence-transformers', 'pgvector'],
            },
            {
                id: 'llm-engine',
                type: 'ai',
                label: 'LLM Engine',
                description: 'Groq integration with streaming',
                position: [0, -1, 0],
                technologies: ['Groq', 'Llama 3.3 70B'],
            },
            {
                id: 'groq-api',
                type: 'external',
                label: 'Groq Cloud',
                description: 'Fast LLM inference',
                position: [2, -1, 0],
                technologies: ['Groq', 'Llama 3.3'],
            },

            // Database Layer
            {
                id: 'supabase-db',
                type: 'database',
                label: 'Supabase',
                description: 'PostgreSQL with pgvector & Auth',
                position: [0, -3, 0],
                technologies: ['PostgreSQL', 'pgvector', 'Supabase Auth'],
            },
            {
                id: 'rag-documents',
                type: 'database',
                label: 'RAG Documents',
                description: 'Building code chunks with embeddings',
                position: [-2, -3, 1],
                technologies: ['pgvector', 'Embeddings'],
            },
            {
                id: 'projects-db',
                type: 'database',
                label: 'Projects DB',
                description: 'Projects, files, conversations, messages',
                position: [2, -3, 1],
                technologies: ['PostgreSQL', 'RLS'],
            },

            // Data Pipeline
            {
                id: 'llamaparse',
                type: 'service',
                label: 'LlamaParse',
                description: 'PDF parsing for building codes',
                position: [-4, -2, 0],
                technologies: ['LlamaParse', 'Google Colab'],
            },
        ],
        edges: [
            // Frontend connections
            { source: 'nextjs-app', target: 'chat-interface', strength: 0.9 },
            { source: 'nextjs-app', target: 'workspace', strength: 0.9 },
            { source: 'nextjs-app', target: 'auth-pages', strength: 0.8 },
            { source: 'nextjs-app', target: 'dashboard', strength: 0.9 },
            { source: 'nextjs-app', target: 'fastapi-server', strength: 1, label: 'REST API' },
            
            // Frontend to Backend
            { source: 'chat-interface', target: 'chat-api', strength: 1, label: 'SSE Stream' },
            { source: 'workspace', target: 'projects-api', strength: 0.9 },
            { source: 'dashboard', target: 'projects-api', strength: 0.9 },
            { source: 'auth-pages', target: 'auth-api', strength: 1, label: 'JWT' },
            
            // Backend internal
            { source: 'fastapi-server', target: 'chat-api', strength: 0.9 },
            { source: 'fastapi-server', target: 'projects-api', strength: 0.9 },
            { source: 'fastapi-server', target: 'auth-api', strength: 0.9 },
            
            // Backend to AI
            { source: 'chat-api', target: 'rag-engine', strength: 1, label: 'Query' },
            { source: 'chat-api', target: 'llm-engine', strength: 1, label: 'Generate' },
            { source: 'llm-engine', target: 'groq-api', strength: 1, label: 'Inference' },
            
            // AI to Database
            { source: 'rag-engine', target: 'rag-documents', strength: 1, label: 'Vector Search' },
            { source: 'rag-engine', target: 'supabase-db', strength: 0.9 },
            
            // Backend to Database
            { source: 'projects-api', target: 'projects-db', strength: 1 },
            { source: 'chat-api', target: 'projects-db', strength: 0.9, label: 'Save History' },
            { source: 'auth-api', target: 'supabase-db', strength: 1, label: 'Auth' },
            
            // Database connections
            { source: 'supabase-db', target: 'rag-documents', strength: 0.8 },
            { source: 'supabase-db', target: 'projects-db', strength: 0.8 },
            
            // Data Pipeline
            { source: 'llamaparse', target: 'rag-documents', strength: 0.8, label: 'Ingest Codes' },
        ],
    },

    'care-cures': {
        nodes: [
            // Client Layer
            {
                id: 'browser-clients',
                type: 'frontend',
                label: 'Browser Clients',
                description: 'Desktop, Mobile, Tablet browsers',
                position: [0, 4, 0],
                technologies: ['Chrome', 'Safari', 'Firefox'],
            },

            // CDN Layer
            {
                id: 'vercel-cdn',
                type: 'external',
                label: 'Vercel CDN',
                description: 'Edge network for global distribution',
                position: [0, 3, 0],
                technologies: ['Vercel Edge', 'CDN'],
            },

            // Application Layer - Main App
            {
                id: 'nextjs-app',
                type: 'frontend',
                label: 'Next.js 15 App',
                description: 'SSR + CSR with App Router',
                position: [0, 2, 0],
                technologies: ['Next.js 15', 'React', 'TypeScript'],
            },

            // Application Layer - Components
            {
                id: 'pages-routes',
                type: 'frontend',
                label: 'Pages & Routes',
                description: 'Home, Diseases, About pages',
                position: [-3, 1, 1],
                technologies: ['Next.js', 'App Router'],
            },
            {
                id: 'ui-components',
                type: 'frontend',
                label: 'UI Components',
                description: 'shadcn/ui component library',
                position: [-1, 1, 1],
                technologies: ['shadcn/ui', 'Tailwind', 'Framer Motion'],
            },
            {
                id: 'language-context',
                type: 'frontend',
                label: 'Language Context',
                description: 'EN/TL state management with localStorage',
                position: [1, 1, 1],
                technologies: ['React Context', 'localStorage'],
            },
            {
                id: 'navbar',
                type: 'frontend',
                label: 'Navbar',
                description: 'Navigation with language toggle',
                position: [3, 1, 1],
                technologies: ['React', 'Lucide Icons'],
            },

            // Page Components
            {
                id: 'home-page',
                type: 'frontend',
                label: 'Home Page',
                description: 'Landing page with featured diseases',
                position: [-4, 0, 2],
                technologies: ['Next.js', 'SSR'],
            },
            {
                id: 'diseases-list',
                type: 'frontend',
                label: 'Diseases List',
                description: 'Browse all 20 diseases with filters',
                position: [-2, 0, 2],
                technologies: ['Next.js', 'Search', 'Filter'],
            },
            {
                id: 'disease-detail',
                type: 'frontend',
                label: 'Disease Detail',
                description: 'Dynamic [slug] routes with translations',
                position: [0, 0, 2],
                technologies: ['Next.js', 'Server Components'],
            },
            {
                id: 'about-page',
                type: 'frontend',
                label: 'About Page',
                description: 'Mission and team information',
                position: [2, 0, 2],
                technologies: ['Next.js', 'Static'],
            },

            // API Client Layer
            {
                id: 'supabase-sdk',
                type: 'service',
                label: 'Supabase SDK',
                description: 'API client for database queries',
                position: [0, -1, 0],
                technologies: ['Supabase JS', 'PostgreSQL Client'],
            },

            // Data Layer - Main Database
            {
                id: 'supabase-postgres',
                type: 'database',
                label: 'Supabase PostgreSQL',
                description: 'Managed PostgreSQL database',
                position: [0, -2.5, 0],
                technologies: ['PostgreSQL', 'Supabase'],
            },

            // Data Layer - Tables
            {
                id: 'diseases-table',
                type: 'database',
                label: 'diseases Table',
                description: 'English disease data (20 diseases)',
                position: [-3, -3.5, 1],
                technologies: ['PostgreSQL', 'Indexed'],
            },
            {
                id: 'translations-table',
                type: 'database',
                label: 'diseases_translation',
                description: 'Tagalog translations with FK',
                position: [-1, -3.5, 1],
                technologies: ['PostgreSQL', 'Foreign Key'],
            },
            {
                id: 'future-tables',
                type: 'database',
                label: 'Future Tables',
                description: 'User accounts, saved diseases',
                position: [1, -3.5, 1],
                technologies: ['PostgreSQL'],
            },

            // Data Ingestion Layer
            {
                id: 'python-parser',
                type: 'service',
                label: 'Python Parser',
                description: 'TXT file ingestion pipeline',
                position: [-4, -5, 0],
                technologies: ['Python', 'Google Colab'],
            },
            {
                id: 'english-ingestion',
                type: 'service',
                label: 'English Ingestion',
                description: 'txt_ingestion_pipeline.py',
                position: [-5, -6, 1],
                technologies: ['Python', 'Supabase Client'],
            },
            {
                id: 'tagalog-ingestion',
                type: 'service',
                label: 'Tagalog Ingestion',
                description: 'translation_ingestion_fixed.py',
                position: [-3, -6, 1],
                technologies: ['Python', 'Supabase Client'],
            },

            // Data Source Files
            {
                id: 'health-txt',
                type: 'external',
                label: 'Health.txt',
                description: '20 diseases in English',
                position: [-6, -7, 0],
                technologies: ['TXT', 'Pipe-separated'],
            },
            {
                id: 'tagalog-txt',
                type: 'external',
                label: 'Tagalog TXT Files',
                description: '3 translation files (diseases 1-20)',
                position: [-4, -7, 0],
                technologies: ['TXT', 'Pipe-separated'],
            },
        ],
        edges: [
            // Client to CDN
            { source: 'browser-clients', target: 'vercel-cdn', strength: 1, label: 'HTTPS' },
            
            // CDN to App
            { source: 'vercel-cdn', target: 'nextjs-app', strength: 1, label: 'Edge Routing' },
            
            // App to Components
            { source: 'nextjs-app', target: 'pages-routes', strength: 0.9 },
            { source: 'nextjs-app', target: 'ui-components', strength: 0.9 },
            { source: 'nextjs-app', target: 'language-context', strength: 1 },
            { source: 'nextjs-app', target: 'navbar', strength: 0.8 },
            
            // Components to Pages
            { source: 'pages-routes', target: 'home-page', strength: 0.9 },
            { source: 'pages-routes', target: 'diseases-list', strength: 0.9 },
            { source: 'pages-routes', target: 'disease-detail', strength: 0.9 },
            { source: 'pages-routes', target: 'about-page', strength: 0.8 },
            
            // Language Context connections
            { source: 'language-context', target: 'home-page', strength: 0.8 },
            { source: 'language-context', target: 'diseases-list', strength: 0.8 },
            { source: 'language-context', target: 'disease-detail', strength: 1, label: 't() function' },
            { source: 'language-context', target: 'navbar', strength: 0.9, label: 'Toggle' },
            
            // UI Components to Pages
            { source: 'ui-components', target: 'home-page', strength: 0.8 },
            { source: 'ui-components', target: 'diseases-list', strength: 0.9 },
            { source: 'ui-components', target: 'disease-detail', strength: 0.9 },
            
            // Pages to API Client
            { source: 'home-page', target: 'supabase-sdk', strength: 0.8, label: 'Fetch Featured' },
            { source: 'diseases-list', target: 'supabase-sdk', strength: 0.9, label: 'List All' },
            { source: 'disease-detail', target: 'supabase-sdk', strength: 1, label: 'Get by Slug' },
            
            // API Client to Database
            { source: 'supabase-sdk', target: 'supabase-postgres', strength: 1, label: 'SQL Queries' },
            
            // Database to Tables
            { source: 'supabase-postgres', target: 'diseases-table', strength: 1 },
            { source: 'supabase-postgres', target: 'translations-table', strength: 1 },
            { source: 'supabase-postgres', target: 'future-tables', strength: 0.5 },
            
            // Table relationships
            { source: 'translations-table', target: 'diseases-table', strength: 1, label: 'FK: disease_id' },
            
            // Data Ingestion Flow
            { source: 'python-parser', target: 'english-ingestion', strength: 0.9 },
            { source: 'python-parser', target: 'tagalog-ingestion', strength: 0.9 },
            
            // Ingestion to Database
            { source: 'english-ingestion', target: 'diseases-table', strength: 1, label: 'Insert 20 Diseases' },
            { source: 'tagalog-ingestion', target: 'translations-table', strength: 1, label: 'Insert Translations' },
            
            // Source Files to Ingestion
            { source: 'health-txt', target: 'english-ingestion', strength: 1, label: 'Parse TXT' },
            { source: 'tagalog-txt', target: 'tagalog-ingestion', strength: 1, label: 'Parse TXT' },
        ],
    },
};
