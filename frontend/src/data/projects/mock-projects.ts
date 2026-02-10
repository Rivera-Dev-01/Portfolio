/**
 * Mock Project Data
 * Placeholder data for project detail pages
 */

import { Project } from '@/types/project';

export const mockProjects: Project[] = [
    {
        slug: 'acad-swap',
        title: 'ACAD SWAP',
        tagline: 'University Marketplace Platform',
        description: 'A unified, university-based marketplace platform tailored for college students. This platform allows students to securely buy, sell, and swap academic items, post specific requests, and coordinate meetups for exchanges.',
        heroImage: '/projects/rivera-acad-swap/hero.jpg',
        category: 'backend',

        context: {
            why: 'I wanted to solve the problem of students struggling to find affordable textbooks and academic materials. Traditional marketplaces weren\'t designed for the unique needs of university students, and there was no safe, verified platform for campus exchanges.',
            who: 'College students looking to buy, sell, or swap academic items. University communities needing a trusted platform for peer-to-peer exchanges. Students wanting to save money on textbooks and course materials.',
            problem: 'Students pay high prices for textbooks they only use once. No centralized platform for campus exchanges. Safety concerns with meetups. Difficulty finding specific academic items. No way to verify if sellers are legitimate students.',
            solution: 'Built a university-verified marketplace with .edu email authentication. Implemented a Reddit-style request board for finding specific items. Created an integrated meetup scheduler with smart notifications. Added a reputation system to build trust in the community.'
        },

        stats: [
            { label: 'Active Users', value: '500+', icon: 'users' },
            { label: 'Items Listed', value: '1,200+', icon: 'package' },
            { label: 'Successful Trades', value: '800+', icon: 'repeat' },
            { label: 'Avg Response Time', value: '<2hrs', icon: 'clock' }
        ],

        architecture: {
            diagram: '/projects/rivera-acad-swap/architecture.svg',
            description: 'The platform uses a React frontend with TypeScript for type safety, Flask backend for API endpoints, and Supabase for authentication and database management. The architecture separates concerns between marketplace, request board, and meetup scheduling.',
            components: [
                {
                    name: 'User Dashboard',
                    description: 'Comprehensive view of selling stats, earnings, and reputation',
                    tech: ['React', 'TypeScript', 'Tailwind CSS']
                },
                {
                    name: 'Request Board',
                    description: 'Reddit-style forum for posting and finding items',
                    tech: ['React', 'Flask API', 'PostgreSQL']
                },
                {
                    name: 'Meetup Scheduler',
                    description: 'Coordinate safe exchanges with notifications',
                    tech: ['Flask', 'Supabase', 'Cron Jobs']
                },
                {
                    name: 'Auth System',
                    description: 'University email verification and secure authentication',
                    tech: ['Supabase Auth', 'Email Verification']
                }
            ]
        },

        technicalDetails: {
            overview: 'Rivera Acad Swap features a modern glassmorphism UI with animated backgrounds and smooth transitions. The platform implements a tiered reputation system (Common to Mythic) based on user activity, threaded discussions for requests, and smart notifications for meetup coordination.',
            challenges: [
                'Verifying university students without manual approval',
                'Building a reputation system that prevents gaming',
                'Coordinating safe meetups between strangers',
                'Creating an intuitive UI for complex marketplace features'
            ],
            solutions: [
                'Implemented .edu/.edu.ph email verification with Supabase',
                'Designed multi-factor reputation scoring based on trades and reviews',
                'Built integrated scheduler with 24h advance notifications',
                'Used glassmorphism design with clear visual hierarchy'
            ]
        },

        codeExamples: [
            {
                title: 'User Registration with Referral System',
                description: 'Complete registration flow with university email validation, referral code processing, and automatic reward distribution',
                language: 'python',
                code: `@staticmethod
def register_user(email, password, first_name, last_name, current_year, 
                  block_section, course, phone_number, referral_code=None):
    supabase = get_supabase()
    
    try:
        # Step 1: Validate referral code if provided
        referrer_id = None
        if referral_code:
            referrer = supabase.table('users').select('id').eq(
                'referral_code', referral_code
            ).execute()
            
            if referrer.data and len(referrer.data) > 0:
                referrer_id = referrer.data[0]['id']
                print(f"✓ Valid referral code from user: {referrer_id}")
        
        # Step 2: Create auth user (Supabase handles password hashing)
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        
        if not auth_response.user:
            return {
                "success": False, 
                "message": "Registration failed"
            }, 400
        
        # Step 3: Generate unique referral code for new user
        code_result = supabase.rpc('generate_referral_code', {
            'user_first_name': first_name,
            'user_last_name': last_name
        }).execute()
        new_referral_code = code_result.data
        
        # Step 4: Store user data in database
        user_data = {
            "id": auth_response.user.id,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "current_year": current_year,
            "block_section": block_section,
            "course": course,
            "phone_number": phone_number,
            "referral_code": new_referral_code,
            "referred_by": referrer_id,
            "profile_completed": False
        }
        
        db_response = supabase.table('users').upsert(user_data).execute()
        
        # Step 5: Process referral rewards if referrer exists
        if referrer_id:
            supabase.rpc('process_referral_reward', {
                'referrer_uuid': referrer_id,
                'referred_uuid': auth_response.user.id,
                'ref_code': referral_code
            }).execute()
        
        return {
            "success": True,
            "message": "Registration successful!",
            "user_id": auth_response.user.id
        }, 201
        
    except Exception as e:
        print(f"Registration error: {str(e)}")
        return {
            "success": False, 
            "message": f"Registration error: {str(e)}"
        }, 500`
            },
            {
                title: 'Secure Login with Session Management',
                description: 'Authentication flow with Supabase password verification and user data retrieval',
                language: 'python',
                code: `@staticmethod
def login_user(email, password):
    supabase = get_supabase()
    
    try:
        # Supabase handles password verification automatically
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        if response.user:
            # Get additional user data from users table
            user_data = supabase.table('users').select('*').eq(
                'id', response.user.id
            ).execute()
            
            # Validate user data exists
            if not user_data.data or len(user_data.data) == 0:
                return {
                    "success": False,
                    "message": "User data missing. Please try again."
                }, 400
            
            return {
                "success": True,
                "message": "Login successful",
                "user": user_data.data[0],
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token
                }
            }, 200
        
        return {
            "success": False, 
            "message": "Invalid credentials"
        }, 401
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return {
            "success": False, 
            "message": str(e)
        }, 401`
            },
            {
                title: 'Protected Route with JWT Validation',
                description: 'Middleware for validating bearer tokens and extracting user context',
                language: 'python',
                code: `@user_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    # Extract and validate authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({
            "success": False, 
            "message": "Missing Token"
        }), 401
    
    token = auth_header.replace('Bearer ', '')
    supabase = get_supabase()
    
    # Validate token and get user
    try:
        user_response = supabase.auth.get_user(token)
        user_id = user_response.user.id
    except Exception as e:
        print(f"Auth error: {e}")
        return jsonify({
            "success": False, 
            "message": "Invalid or Expired Token"
        }), 401
    
    # Fetch dashboard data for authenticated user
    response, status = UserService.get_dashboard_data(user_id)
    
    # Handle serialization
    if hasattr(response, 'data'):
        final_data = response.data
    else:
        final_data = response
    
    return jsonify(final_data), status`
            }
        ],

        apiDocs: {
            baseUrl: 'https://api.rivera-acad-swap.com',
            endpoints: [
                {
                    method: 'POST',
                    path: '/api/items',
                    description: 'List a new item for sale or swap',
                    parameters: [
                        {
                            name: 'title',
                            type: 'string',
                            required: true,
                            description: 'Item title'
                        },
                        {
                            name: 'description',
                            type: 'string',
                            required: true,
                            description: 'Item description'
                        },
                        {
                            name: 'price',
                            type: 'number',
                            required: true,
                            description: 'Price in local currency'
                        },
                        {
                            name: 'category',
                            type: 'string',
                            required: true,
                            description: 'Books, Electronics, Clothing, etc.'
                        },
                        {
                            name: 'images',
                            type: 'Array<string>',
                            required: false,
                            description: 'Image URLs'
                        }
                    ],
                    requestExample: `{
  "title": "Calculus Textbook - 10th Edition",
  "description": "Barely used, excellent condition",
  "price": 500,
  "category": "Books",
  "images": ["/uploads/calc-book-1.jpg"]
}`,
                    responseExample: `{
  "item_id": "item_abc123",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z"
}`
                },
                {
                    method: 'POST',
                    path: '/api/requests',
                    description: 'Post a request on the request board',
                    parameters: [
                        {
                            name: 'title',
                            type: 'string',
                            required: true,
                            description: 'Request title'
                        },
                        {
                            name: 'description',
                            type: 'string',
                            required: true,
                            description: 'Detailed request description'
                        },
                        {
                            name: 'category',
                            type: 'string',
                            required: true,
                            description: 'Request category'
                        }
                    ],
                    requestExample: `{
  "title": "Looking for Physics 101 Lab Manual",
  "description": "Need the latest edition for this semester",
  "category": "Books"
}`,
                    responseExample: `{
  "request_id": "req_xyz789",
  "status": "active",
  "replies": 0
}`
                },
                {
                    method: 'POST',
                    path: '/api/meetups',
                    description: 'Schedule a meetup for item exchange',
                    parameters: [
                        {
                            name: 'item_id',
                            type: 'string',
                            required: true,
                            description: 'Item being exchanged'
                        },
                        {
                            name: 'buyer_id',
                            type: 'string',
                            required: true,
                            description: 'Buyer user ID'
                        },
                        {
                            name: 'scheduled_time',
                            type: 'string',
                            required: true,
                            description: 'ISO 8601 datetime'
                        },
                        {
                            name: 'location',
                            type: 'string',
                            required: true,
                            description: 'Meetup location on campus'
                        }
                    ],
                    requestExample: `{
  "item_id": "item_abc123",
  "buyer_id": "user_def456",
  "scheduled_time": "2024-01-20T14:00:00Z",
  "location": "Library Main Entrance"
}`,
                    responseExample: `{
  "meetup_id": "meet_ghi789",
  "status": "scheduled",
  "reminder_set": true
}`
                }
            ]
        },

        techStack: [
            {
                category: 'Frontend',
                technologies: [
                    { name: 'React', purpose: 'UI framework with component-based architecture' },
                    { name: 'TypeScript', purpose: 'Type safety and better developer experience' },
                    { name: 'Vite', purpose: 'Fast build tool and dev server' },
                    { name: 'Tailwind CSS', purpose: 'Utility-first styling with glassmorphism effects' },
                    { name: 'Lucide React', purpose: 'Modern icon library' },
                    { name: 'React Router', purpose: 'Client-side routing' }
                ]
            },
            {
                category: 'Backend',
                technologies: [
                    { name: 'Flask', purpose: 'Lightweight Python web framework' },
                    { name: 'Python 3.8+', purpose: 'Backend language' },
                    { name: 'Supabase', purpose: 'PostgreSQL database and authentication' }
                ]
            },
            {
                category: 'Database',
                technologies: [
                    { name: 'PostgreSQL', purpose: 'Relational database via Supabase' },
                    { name: 'Supabase Auth', purpose: 'User authentication and email verification' }
                ]
            }
        ],

        performance: [
            {
                metric: 'Page Load Time',
                value: '<1.5s',
                description: 'Average time to interactive on dashboard'
            },
            {
                metric: 'API Response',
                value: '<200ms',
                description: 'Average API endpoint response time'
            },
            {
                metric: 'User Satisfaction',
                value: '4.7/5',
                description: 'Average rating from student users'
            }
        ],

        links: {
            github: 'https://github.com/Rivera-Dev/Rivera-Cyclops-UnifiedMarket',
            demo: 'https://rivera-acad-swap.vercel.app'
        },

        timeline: {
            started: '2024-09',
            completed: '2024-12',
            status: 'maintained'
        }
    },

    {
        slug: 'hydra',
        title: 'HYDRA',
        tagline: 'Flood Control Project Transparency System',
        description: 'An AI-powered public accountability platform for monitoring government flood control infrastructure projects. Automatically scrapes, validates, and flags potentially fraudulent projects across the Philippines using satellite imagery and AI analysis.',
        heroImage: '/project_thumbnail/Hydra.png',
        category: 'ai',

        context: {
            why: 'I wanted to address the lack of transparency in government infrastructure spending. Billions of pesos are allocated to flood control projects, but citizens have no way to verify if these projects are legitimate or if funds are being misused.',
            who: 'Filipino citizens seeking government accountability. Journalists investigating corruption. Anti-corruption watchdogs. Government auditors needing data-driven insights.',
            problem: 'Government flood control projects lack transparency. No centralized system to track project legitimacy. Manual auditing is slow and incomplete. Citizens can\'t verify if taxpayer money is being used properly. Fraudulent contractors operate with impunity.',
            solution: 'Built an AI-powered platform that scrapes government data, validates projects using rule-based and AI analysis, integrates satellite imagery for visual verification, and provides a public dashboard with risk scoring. Won "Hack the Flood 2025" hackathon.'
        },

        stats: [
            { label: 'Projects Monitored', value: '10K+', icon: 'database' },
            { label: 'Flagged Projects', value: '847', icon: 'alert-triangle' },
            { label: 'AI Accuracy', value: '94%', icon: 'target' },
            { label: 'Hackathon Winner', value: '2025', icon: 'trophy' }
        ],

        architecture: {
            diagram: '/projects/hydra/architecture.svg',
            description: 'HYDRA uses a 5-stage data pipeline: scraping government data, rule-based validation, geocoding, satellite imagery integration, and AI-powered analysis. The system combines multiple data sources to provide comprehensive project monitoring.',
            components: [
                {
                    name: 'Data Scraper',
                    description: 'Fetches flood control projects from BetterGov API',
                    tech: ['Python', 'MeiliSearch API', 'Requests']
                },
                {
                    name: 'Validation Engine',
                    description: 'Rule-based flagging system with risk scoring',
                    tech: ['Python', 'SQLite', 'Pandas']
                },
                {
                    name: 'AI Analyst',
                    description: 'Google Gemini-powered project analysis',
                    tech: ['Google Gemini', 'Python', 'AI Benchmarking']
                },
                {
                    name: 'Satellite Integration',
                    description: 'Visual verification using satellite imagery',
                    tech: ['Sentinel Hub API', 'Geospatial Analysis']
                },
                {
                    name: 'Public Dashboard',
                    description: 'Interactive transparency platform',
                    tech: ['React 19', 'Leaflet', 'Mapbox']
                }
            ]
        },

        technicalDetails: {
            overview: 'HYDRA implements a sophisticated risk scoring system that combines rule-based validation with AI-powered analysis. Projects are scored based on multiple risk indicators including contractor history, timeline validity, cost anomalies, and satellite evidence.',
            challenges: [
                'Processing and validating thousands of government projects',
                'Integrating multiple data sources (BetterGov, COA, Sentinel Hub)',
                'Building accurate AI models for fraud detection',
                'Creating an intuitive public interface for complex data',
                'Handling anonymous whistleblower submissions securely'
            ],
            solutions: [
                'Built efficient 5-stage pipeline with caching and incremental updates',
                'Unified data model with geocoding and satellite imagery integration',
                'Trained Google Gemini on provincial benchmarks and COA audit reports',
                'Designed interactive map with color-coded risk indicators',
                'Implemented secure dropbox with AI-powered evidence moderation'
            ]
        },

        codeExamples: [
            {
                title: 'Risk Scoring Algorithm',
                description: 'Multi-factor risk assessment system for project validation',
                language: 'python',
                code: `def calculate_risk_score(project):
    """
    Calculate risk score based on multiple indicators
    Returns: score (0-100) and triage level
    """
    score = 0
    flags = []
    
    # Check for known problematic contractors (+80 points)
    if project['contractor'] in KNOWN_PROBLEMATIC_CONTRACTORS:
        score += 80
        flags.append('KNOWN_PROBLEMATIC_CONTRACTOR')
    
    # Invalid timeline (+70 points)
    if project['completion_date'] < project['start_date']:
        score += 70
        flags.append('INVALID_TIMELINE')
    
    # Missing contractor for old projects (+50 points)
    if not project['contractor'] and project['age_years'] > 2:
        score += 50
        flags.append('MISSING_CONTRACTOR')
    
    # Duplicate contract ID (+40 points)
    if is_duplicate_contract_id(project['contract_id']):
        score += 40
        flags.append('DUPLICATE_CONTRACT_ID')
    
    # Missing cost data (+40 points)
    if not project['cost'] or project['cost'] == 0:
        score += 40
        flags.append('MISSING_COST')
    
    # Determine triage level
    if score >= 80:
        triage = 'RED'  # Critical Risk
    elif score >= 60:
        triage = 'YELLOW'  # High Risk
    elif score < 60 and score > 0:
        triage = 'GREEN'  # Low Risk
    else:
        triage = 'GREY'  # Incomplete Data
    
    return {
        'score': min(score, 100),
        'triage': triage,
        'flags': flags
    }`
            },
            {
                title: 'AI-Powered Project Analysis',
                description: 'Google Gemini integration for intelligent fraud detection',
                language: 'python',
                code: `import google.generativeai as genai

def ai_audit_project(project, benchmarks):
    """
    Use Google Gemini to analyze project against benchmarks
    """
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel('gemini-pro')
    
    # Build context with provincial benchmarks
    prompt = f"""
    Analyze this flood control project for potential fraud:
    
    Project Details:
    - Name: {project['name']}
    - Cost: ₱{project['cost']:,.2f}
    - Contractor: {project['contractor']}
    - Province: {project['province']}
    
    Provincial Benchmarks:
    - Average Cost: ₱{benchmarks['avg_cost']:,.2f}
    - Typical Duration: {benchmarks['avg_duration']} months
    - Known Issues: {benchmarks['common_flags']}
    
    Provide:
    1. Risk assessment (Low/Medium/High)
    2. Cost anomaly analysis
    3. Red flags identified
    4. Recommended actions
    """
    
    response = model.generate_content(prompt)
    
    return {
        'ai_analysis': response.text,
        'confidence': calculate_confidence(response),
        'timestamp': datetime.now().isoformat()
    }`
            },
            {
                title: 'Satellite Imagery Integration',
                description: 'Fetch and analyze satellite imagery for project verification',
                language: 'python',
                code: `from sentinelhub import SHConfig, SentinelHubRequest, DataCollection

def fetch_satellite_evidence(lat, lon, date_range):
    """
    Fetch satellite imagery for project location
    """
    config = SHConfig()
    config.sh_client_id = os.getenv('SENTINELHUB_CLIENT_ID')
    config.sh_client_secret = os.getenv('SENTINELHUB_CLIENT_SECRET')
    
    # Define bounding box around project location
    bbox = BBox(
        bbox=[lon - 0.01, lat - 0.01, lon + 0.01, lat + 0.01],
        crs=CRS.WGS84
    )
    
    # Request true color imagery
    request = SentinelHubRequest(
        evalscript="""
        //VERSION=3
        function setup() {
            return {
                input: ["B04", "B03", "B02"],
                output: { bands: 3 }
            };
        }
        function evaluatePixel(sample) {
            return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02];
        }
        """,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL2_L2A,
                time_interval=date_range
            )
        ],
        responses=[SentinelHubRequest.output_response('default', MimeType.PNG)],
        bbox=bbox,
        size=[512, 512],
        config=config
    )
    
    return request.get_data()[0]`
            }
        ],

        apiDocs: {
            baseUrl: 'https://api.hydra-transparency.com',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/projects',
                    description: 'List all flood control projects with pagination',
                    parameters: [
                        {
                            name: 'page',
                            type: 'number',
                            required: false,
                            description: 'Page number (default: 1)'
                        },
                        {
                            name: 'limit',
                            type: 'number',
                            required: false,
                            description: 'Results per page (default: 50)'
                        },
                        {
                            name: 'triage',
                            type: 'string',
                            required: false,
                            description: 'Filter by risk level: RED, YELLOW, GREEN'
                        }
                    ],
                    responseExample: `{
  "projects": [
    {
      "id": "proj_123",
      "name": "Flood Control - Manila Bay",
      "cost": 50000000,
      "contractor": "ABC Construction",
      "risk_score": 85,
      "triage": "RED",
      "flags": ["KNOWN_PROBLEMATIC_CONTRACTOR"]
    }
  ],
  "total": 10247,
  "page": 1
}`
                },
                {
                    method: 'POST',
                    path: '/api/ai-audit',
                    description: 'Run AI analysis on selected projects',
                    parameters: [
                        {
                            name: 'project_ids',
                            type: 'Array<string>',
                            required: true,
                            description: 'List of project IDs to analyze'
                        }
                    ],
                    requestExample: `{
  "project_ids": ["proj_123", "proj_456"]
}`,
                    responseExample: `{
  "results": [
    {
      "project_id": "proj_123",
      "ai_analysis": "High risk detected...",
      "confidence": 0.94
    }
  ]
}`
                },
                {
                    method: 'POST',
                    path: '/api/submit-evidence',
                    description: 'Submit whistleblower evidence anonymously',
                    parameters: [
                        {
                            name: 'project_id',
                            type: 'string',
                            required: true,
                            description: 'Related project ID'
                        },
                        {
                            name: 'description',
                            type: 'string',
                            required: true,
                            description: 'Evidence description'
                        },
                        {
                            name: 'files',
                            type: 'Array<File>',
                            required: false,
                            description: 'Supporting documents/images'
                        }
                    ],
                    responseExample: `{
  "report_id": "rep_789",
  "status": "pending_review",
  "message": "Evidence submitted successfully"
}`
                }
            ]
        },

        techStack: [
            {
                category: 'Backend',
                technologies: [
                    { name: 'Python 3.8+', purpose: 'Core application language' },
                    { name: 'Flask 3.0', purpose: 'REST API framework' },
                    { name: 'SQLite', purpose: 'Project database' },
                    { name: 'Pandas', purpose: 'Data processing and analysis' }
                ]
            },
            {
                category: 'AI/ML',
                technologies: [
                    { name: 'Google Gemini', purpose: 'AI-powered project analysis' },
                    { name: 'Sentinel Hub', purpose: 'Satellite imagery integration' },
                    { name: 'Geospatial Analysis', purpose: 'Location validation' }
                ]
            },
            {
                category: 'Frontend',
                technologies: [
                    { name: 'React 19', purpose: 'UI framework' },
                    { name: 'Leaflet', purpose: 'Interactive mapping' },
                    { name: 'Mapbox', purpose: 'Map tiles and geocoding' },
                    { name: 'Chart.js', purpose: 'Data visualization' }
                ]
            },
            {
                category: 'Data Sources',
                technologies: [
                    { name: 'BetterGov.ph', purpose: 'Government project data' },
                    { name: 'COA Reports', purpose: 'Contractor audit history' },
                    { name: 'MeiliSearch API', purpose: 'Project search engine' }
                ]
            }
        ],

        performance: [
            {
                metric: 'Projects Analyzed',
                value: '10,000+',
                description: 'Total flood control projects monitored across Philippines'
            },
            {
                metric: 'Fraud Detection Rate',
                value: '94%',
                description: 'AI accuracy in identifying high-risk projects'
            },
            {
                metric: 'Processing Speed',
                value: '<5min',
                description: 'Full pipeline execution time for 1000 projects'
            },
            {
                metric: 'Public Impact',
                value: 'Hackathon Winner',
                description: 'Won "Hack the Flood 2025" competition'
            }
        ],

        links: {
            github: 'https://github.com/Rivera-Dev/Hydra-HackTheFlood2025',
            demo: 'https://hydra-transparency.vercel.app'
        },

        timeline: {
            started: '2025-12',
            completed: '2025-12',
            status: 'maintained'
        }
    },

    {
        slug: 'rule-vii',
        title: 'RULE VII SAAS',
        tagline: 'AI Architectural Compliance Mentor',
        description: 'An AI-powered architectural design critique system that helps professionals adhere to Philippine building regulations. Uses RAG and LLMs to analyze designs against NBCP Rule VII, Fire Code, and Accessibility Law with real-time compliance checking.',
        heroImage: '/project_thumbnail/RuleVII.png',
        category: 'ai',

        context: {
            why: 'Architects spend countless hours manually checking building codes and regulations. A single compliance error can delay projects by months and cost millions. I wanted to automate this process using AI while ensuring accuracy through legal citations.',
            who: 'Professional architects and engineers. Building code compliance officers. Architectural firms managing multiple projects. Students learning Philippine building regulations.',
            problem: 'Manual code checking is time-consuming and error-prone. Generic AI gives unreliable advice without legal backing. No centralized system for Philippine building codes. Difficult to track compliance across multiple projects.',
            solution: 'Built a RAG-powered system that provides AI critiques backed by actual legal citations from NBCP, Fire Code (RA 9514), and Accessibility Law (BP 344). Integrated project management and draft proposal generation for complete workflow automation.'
        },

        stats: [
            { label: 'Legal Documents', value: '7+', icon: 'file-text' },
            { label: 'Response Time', value: '<2s', icon: 'zap' },
            { label: 'Citation Accuracy', value: '98%', icon: 'check-circle' },
            { label: 'Cost Savings', value: '70%', icon: 'trending-down' }
        ],

        architecture: {
            diagram: '/projects/rule-vii/architecture.svg',
            description: 'Rule VII uses a modern RAG architecture with Next.js frontend, FastAPI backend, and Supabase for database and vector search. The system processes building codes through LlamaParse, stores embeddings in pgvector, and uses Groq for fast LLM inference.',
            components: [
                {
                    name: 'Frontend Dashboard',
                    description: 'Next.js 14 with real-time chat and project management',
                    tech: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS']
                },
                {
                    name: 'RAG Engine',
                    description: 'Hybrid search with semantic and keyword matching',
                    tech: ['sentence-transformers', 'pgvector', 'LlamaParse']
                },
                {
                    name: 'LLM Service',
                    description: 'Fast inference with streaming responses',
                    tech: ['Groq', 'Llama 3.3 70B', 'FastAPI']
                },
                {
                    name: 'Database',
                    description: 'PostgreSQL with vector search capabilities',
                    tech: ['Supabase', 'PostgreSQL', 'pgvector']
                }
            ]
        },

        technicalDetails: {
            overview: 'Rule VII implements a sophisticated RAG pipeline that processes Philippine building codes into searchable chunks with vector embeddings. The system uses hybrid search to retrieve relevant regulations and provides streaming AI responses with accurate legal citations.',
            challenges: [
                'Processing complex legal documents with tables and diagrams',
                'Ensuring AI responses include accurate legal citations',
                'Maintaining low latency for real-time chat experience',
                'Managing costs while using powerful LLMs',
                'Handling multiple concurrent users with rate limiting'
            ],
            solutions: [
                'Used LlamaParse for high-quality PDF extraction with structure preservation',
                'Implemented RAG with pgvector for semantic search with legal citations',
                'Leveraged Groq for sub-2-second response times with streaming',
                'Optimized with caching and Gemini Flash for cost-effective queries',
                'Implemented slowapi rate limiting (20 req/min) and JWT authentication'
            ]
        },

        codeExamples: [
            {
                title: 'RAG Document Retrieval',
                description: 'Hybrid search combining semantic similarity and keyword matching for accurate legal citations',
                language: 'python',
                code: `async def retrieve_relevant_context(query: str, top_k: int = 5):
    """
    Retrieve relevant building code sections using hybrid search
    """
    # Generate query embedding
    query_embedding = embedding_model.encode(query).tolist()
    
    # Semantic search using pgvector
    semantic_results = supabase.rpc(
        'match_documents',
        {
            'query_embedding': query_embedding,
            'match_threshold': 0.7,
            'match_count': top_k
        }
    ).execute()
    
    # Keyword search for exact matches
    keyword_results = supabase.table('rag_documents').select('*').textSearch(
        'content',
        query,
        config='english'
    ).limit(top_k).execute()
    
    # Combine and deduplicate results
    combined = merge_results(semantic_results.data, keyword_results.data)
    
    # Format context with citations
    context = []
    for doc in combined:
        context.append({
            'text': doc['content'],
            'source': doc['source_document'],
            'section': doc['section_number'],
            'similarity': doc['similarity']
        })
    
    return context`
            },
            {
                title: 'Streaming AI Response',
                description: 'Real-time streaming chat with Groq LLM and legal citations',
                language: 'python',
                code: `@router.post("/chat")
async def chat_endpoint(request: ChatRequest, user_id: str = Depends(get_current_user)):
    """
    Stream AI responses with building code citations
    """
    # Retrieve relevant building codes
    context = await retrieve_relevant_context(request.message)
    
    # Build prompt with legal context
    system_prompt = f"""
    You are an expert architectural compliance advisor for Philippine building codes.
    
    Relevant Building Codes:
    {format_context_with_citations(context)}
    
    Provide specific advice citing exact sections (e.g., "NBCP Rule VII Section 704.2").
    """
    
    # Stream response from Groq
    async def generate():
        async for chunk in groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            stream=True,
            temperature=0.3,
            max_tokens=1024
        ):
            if chunk.choices[0].delta.content:
                yield f"data: {json.dumps({'content': chunk.choices[0].delta.content})}\\n\\n"
        
        # Send citations at the end
        yield f"data: {json.dumps({'citations': context})}\\n\\n"
        yield "data: [DONE]\\n\\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")`
            },
            {
                title: 'Document Processing Pipeline',
                description: 'Process building code PDFs into searchable vector embeddings',
                language: 'python',
                code: `from llama_parse import LlamaParse
from sentence_transformers import SentenceTransformer

async def process_building_code(pdf_path: str, document_name: str):
    """
    Parse PDF and create vector embeddings for RAG
    """
    # Parse PDF with LlamaParse
    parser = LlamaParse(api_key=os.getenv('LLAMA_CLOUD_API_KEY'))
    documents = parser.load_data(pdf_path)
    
    # Chunk documents intelligently
    chunks = []
    for doc in documents:
        # Split by sections while preserving structure
        sections = split_by_section(doc.text)
        
        for section in sections:
            if len(section['text']) > 100:  # Skip tiny chunks
                chunks.append({
                    'content': section['text'],
                    'section_number': section['number'],
                    'source_document': document_name,
                    'page': section['page']
                })
    
    # Generate embeddings
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    for chunk in chunks:
        embedding = model.encode(chunk['content']).tolist()
        
        # Store in Supabase with pgvector
        supabase.table('rag_documents').insert({
            'content': chunk['content'],
            'embedding': embedding,
            'source_document': chunk['source_document'],
            'section_number': chunk['section_number'],
            'page_number': chunk['page']
        }).execute()
    
    return len(chunks)`
            }
        ],

        apiDocs: {
            baseUrl: 'https://api.rulevii.com',
            endpoints: [
                {
                    method: 'POST',
                    path: '/api/v1/chat',
                    description: 'Send a message and receive AI critique with citations',
                    parameters: [
                        {
                            name: 'message',
                            type: 'string',
                            required: true,
                            description: 'User query about building codes'
                        },
                        {
                            name: 'conversation_id',
                            type: 'string',
                            required: false,
                            description: 'Continue existing conversation'
                        }
                    ],
                    requestExample: `{
  "message": "What are the fire exit requirements for a 5-story building?",
  "conversation_id": "conv_123"
}`,
                    responseExample: `{
  "response": "According to NBCP Rule VII Section 704.2...",
  "citations": [
    {
      "source": "NBCP Rule VII",
      "section": "704.2",
      "text": "Fire exits shall be..."
    }
  ],
  "conversation_id": "conv_123"
}`
                },
                {
                    method: 'GET',
                    path: '/api/v1/projects',
                    description: 'List all user projects',
                    responseExample: `{
  "projects": [
    {
      "id": "proj_456",
      "name": "Manila Office Tower",
      "status": "in_review",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ]
}`
                },
                {
                    method: 'POST',
                    path: '/api/v1/projects',
                    description: 'Create a new architectural project',
                    parameters: [
                        {
                            name: 'name',
                            type: 'string',
                            required: true,
                            description: 'Project name'
                        },
                        {
                            name: 'description',
                            type: 'string',
                            required: false,
                            description: 'Project description'
                        }
                    ],
                    requestExample: `{
  "name": "Residential Complex - Quezon City",
  "description": "15-story residential building"
}`,
                    responseExample: `{
  "project_id": "proj_789",
  "status": "created"
}`
                }
            ]
        },

        techStack: [
            {
                category: 'Frontend',
                technologies: [
                    { name: 'Next.js 14', purpose: 'React framework with App Router' },
                    { name: 'TypeScript', purpose: 'Type-safe development' },
                    { name: 'Tailwind CSS', purpose: 'Utility-first styling' },
                    { name: 'Vercel', purpose: 'Deployment and hosting' }
                ]
            },
            {
                category: 'Backend',
                technologies: [
                    { name: 'FastAPI', purpose: 'High-performance Python API framework' },
                    { name: 'Python 3.12', purpose: 'Core backend language' },
                    { name: 'slowapi', purpose: 'Rate limiting (20 req/min)' },
                    { name: 'Docker', purpose: 'Containerization' }
                ]
            },
            {
                category: 'AI/RAG',
                technologies: [
                    { name: 'Groq', purpose: 'Fast LLM inference (Llama 3.3 70B)' },
                    { name: 'LlamaParse', purpose: 'PDF parsing with structure preservation' },
                    { name: 'sentence-transformers', purpose: 'Text embeddings' },
                    { name: 'pgvector', purpose: 'Vector similarity search' }
                ]
            },
            {
                category: 'Database',
                technologies: [
                    { name: 'Supabase', purpose: 'PostgreSQL database and auth' },
                    { name: 'PostgreSQL', purpose: 'Relational data storage' },
                    { name: 'pgvector', purpose: 'Vector embeddings storage' }
                ]
            }
        ],

        performance: [
            {
                metric: 'Response Time',
                value: '<2s',
                description: 'Average time for AI response with citations'
            },
            {
                metric: 'Citation Accuracy',
                value: '98%',
                description: 'Accuracy of legal citations provided by RAG'
            },
            {
                metric: 'Cost Efficiency',
                value: '$0.02/query',
                description: 'Average cost per AI query using Groq'
            },
            {
                metric: 'Documents Indexed',
                value: '7 Codes',
                description: 'NBCP, Fire Code, BP 344, BP 220, DO 48, RA 386, etc.'
            }
        ],

        links: {
            github: 'https://github.com/Rivera-Dev/RuleVII-SaaS',
            demo: 'https://rulevii.vercel.app'
        },

        timeline: {
            started: '2026-01',
            completed: '2026-02',
            status: 'maintained'
        }
    }
];
