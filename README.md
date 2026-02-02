# 🚀 Personal Portfolio

A modern, AI-powered portfolio website featuring an intelligent chatbot that knows me, showcases my projects, and hosts my technical blog.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                  │
│              Next.js 14 (App Router) + TypeScript               │
│                     + Tailwind CSS                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │ API Calls
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND                                   │
│                    Python FastAPI                                │
│         ┌───────────────┴───────────────┐                       │
│         ▼                               ▼                        │
│    Groq API                      Supabase Client                │
│  (LLM Inference)                 (Data Access)                  │
└─────────┬───────────────────────────────┬───────────────────────┘
          │                               │
          ▼                               ▼
┌─────────────────────┐     ┌─────────────────────────────────────┐
│    Groq Cloud       │     │           Supabase                  │
│  (Fine-tuned LLM)   │     │  ┌─────────────────────────────┐   │
│                     │     │  │  PostgreSQL                 │   │
└─────────────────────┘     │  │  • Projects metadata        │   │
                            │  │  • Blog posts               │   │
                            │  │  • Chat history             │   │
                            │  │  • Vector embeddings (RAG)  │   │
                            │  └─────────────────────────────┘   │
                            └─────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend (Interface Layer)
| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router for SSR/SSG |
| **TypeScript** | Type-safe code for reliability |
| **Tailwind CSS** | Utility-first styling |

### Backend (Logic & AI Layer)
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance async Python API |
| **Groq** | Ultra-fast LLM inference |
| **Unsloth** | Fine-tuning (via Google Colab) |

### Data (Persistence Layer)
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database + Auth + Storage |

## 📁 Project Structure

```
Portfolio/
├── frontend/                # Next.js Application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utilities & API clients
│   │   ├── types/           # TypeScript definitions
│   │   └── hooks/           # Custom React hooks
│   └── public/              # Static assets
│
├── backend/                 # FastAPI Application
│   └── app/
│       ├── api/routes/      # API endpoints
│       ├── services/        # Business logic (Groq, Supabase)
│       ├── models/          # Pydantic schemas
│       └── core/            # Prompts & configuration
│
├── docker-compose.yml       # Container orchestration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker (optional)

### Environment Variables

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backend** (`backend/.env`):
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
GROQ_API_KEY=your_groq_api_key
```

### Development

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Docker (Both):**
```bash
docker-compose up --build
```

## 🤖 AI Features

### Personalized Chatbot
- Fine-tuned LLM that responds in my voice and style
- Contextual memory using chat history from Supabase
- RAG-enhanced responses using vector embeddings

### How It Works
1. **Fine-tuning**: Done in Google Colab using Unsloth
2. **Inference**: Handled by Groq for lightning-fast responses
3. **Context**: RAG retrieval from Supabase pgvector

## 📝 License

MIT License - Feel free to use this as inspiration for your own portfolio!

---

Built with ❤️ and ☕
