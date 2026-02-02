"""
Projects API Routes
Handles portfolio project CRUD operations.
"""
from fastapi import APIRouter, HTTPException
from typing import Optional

from app.models.project import Project, ProjectCreate, ProjectList
from app.services.supabase_service import SupabaseService

router = APIRouter()

# Initialize Supabase service
supabase_service = SupabaseService()


@router.get("/", response_model=ProjectList)
async def get_projects(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    limit: int = 10
):
    """
    Get all portfolio projects with optional filtering.
    """
    try:
        projects = await supabase_service.get_projects(
            category=category,
            featured=featured,
            limit=limit
        )
        return ProjectList(projects=projects, total=len(projects))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """
    Get a specific project by ID.
    """
    try:
        project = await supabase_service.get_project_by_id(project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return project
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching project: {str(e)}")


@router.get("/slug/{slug}", response_model=Project)
async def get_project_by_slug(slug: str):
    """
    Get a specific project by slug.
    """
    try:
        project = await supabase_service.get_project_by_slug(slug)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return project
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching project: {str(e)}")
