"""
Blog API Routes
Handles blog post operations.
"""
from fastapi import APIRouter, HTTPException
from typing import Optional

from app.services.supabase_service import SupabaseService

router = APIRouter()

# Initialize Supabase service
supabase_service = SupabaseService()


@router.get("/")
async def get_blog_posts(
    tag: Optional[str] = None,
    limit: int = 10,
    offset: int = 0
):
    """
    Get all blog posts with optional filtering and pagination.
    """
    try:
        posts = await supabase_service.get_blog_posts(
            tag=tag,
            limit=limit,
            offset=offset
        )
        return {"posts": posts, "total": len(posts)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}")


@router.get("/{slug}")
async def get_blog_post(slug: str):
    """
    Get a specific blog post by slug.
    """
    try:
        post = await supabase_service.get_blog_post_by_slug(slug)
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return post
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching post: {str(e)}")


@router.get("/tags/all")
async def get_all_tags():
    """
    Get all unique blog tags.
    """
    try:
        tags = await supabase_service.get_blog_tags()
        return {"tags": tags}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching tags: {str(e)}")
