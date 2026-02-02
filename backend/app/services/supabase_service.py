"""
Supabase Service
Handles all database operations via Supabase.
"""
from typing import Optional
from supabase import create_client, Client

from app.config import get_settings

settings = get_settings()


class SupabaseService:
    """Service for interacting with Supabase PostgreSQL database."""
    
    def __init__(self):
        if settings.supabase_url and settings.supabase_key:
            self.client: Client = create_client(
                settings.supabase_url,
                settings.supabase_key
            )
        else:
            self.client = None
    
    # ============ PROJECTS ============
    
    async def get_projects(
        self,
        category: Optional[str] = None,
        featured: Optional[bool] = None,
        limit: int = 10
    ) -> list:
        """Fetch projects with optional filters."""
        if not self.client:
            return []
        
        query = self.client.table("projects").select("*")
        
        if category:
            query = query.eq("category", category)
        if featured is not None:
            query = query.eq("featured", featured)
        
        query = query.order("created_at", desc=True).limit(limit)
        
        response = query.execute()
        return response.data if response.data else []
    
    async def get_project_by_id(self, project_id: str) -> Optional[dict]:
        """Fetch a single project by ID."""
        if not self.client:
            return None
        
        response = self.client.table("projects").select("*").eq("id", project_id).single().execute()
        return response.data
    
    async def get_project_by_slug(self, slug: str) -> Optional[dict]:
        """Fetch a single project by slug."""
        if not self.client:
            return None
        
        response = self.client.table("projects").select("*").eq("slug", slug).single().execute()
        return response.data
    
    # ============ BLOG ============
    
    async def get_blog_posts(
        self,
        tag: Optional[str] = None,
        limit: int = 10,
        offset: int = 0
    ) -> list:
        """Fetch blog posts with optional filtering."""
        if not self.client:
            return []
        
        query = self.client.table("blog_posts").select("*")
        
        if tag:
            query = query.contains("tags", [tag])
        
        query = query.order("published_at", desc=True).range(offset, offset + limit - 1)
        
        response = query.execute()
        return response.data if response.data else []
    
    async def get_blog_post_by_slug(self, slug: str) -> Optional[dict]:
        """Fetch a single blog post by slug."""
        if not self.client:
            return None
        
        response = self.client.table("blog_posts").select("*").eq("slug", slug).single().execute()
        return response.data
    
    async def get_blog_tags(self) -> list:
        """Get all unique blog tags."""
        if not self.client:
            return []
        
        # Fetch all posts and extract unique tags
        response = self.client.table("blog_posts").select("tags").execute()
        
        if not response.data:
            return []
        
        all_tags = set()
        for post in response.data:
            if post.get("tags"):
                all_tags.update(post["tags"])
        
        return sorted(list(all_tags))
    
    # ============ CHAT HISTORY ============
    
    async def save_chat_message(
        self,
        conversation_id: str,
        role: str,
        content: str
    ) -> Optional[dict]:
        """Save a chat message to history."""
        if not self.client:
            return None
        
        response = self.client.table("chat_history").insert({
            "conversation_id": conversation_id,
            "role": role,
            "content": content
        }).execute()
        
        return response.data[0] if response.data else None
    
    async def get_chat_history(
        self,
        conversation_id: str,
        limit: int = 20
    ) -> list:
        """Fetch chat history for a conversation."""
        if not self.client:
            return []
        
        response = self.client.table("chat_history").select("*").eq(
            "conversation_id", conversation_id
        ).order("created_at", desc=False).limit(limit).execute()
        
        return response.data if response.data else []
