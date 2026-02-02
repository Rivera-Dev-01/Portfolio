"""
Project Models
Pydantic models for project data validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProjectBase(BaseModel):
    """Base project fields."""
    title: str
    slug: str
    description: str
    category: str
    tech_stack: list[str]
    featured: bool = False
    image_url: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None


class ProjectCreate(ProjectBase):
    """Model for creating a new project."""
    pass


class Project(ProjectBase):
    """Full project model with database fields."""
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ProjectList(BaseModel):
    """Response model for list of projects."""
    projects: list[Project]
    total: int
