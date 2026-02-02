"""
Chat Models
Pydantic models for chat request/response validation.
"""
from pydantic import BaseModel
from typing import Optional


class ChatMessage(BaseModel):
    """A single chat message."""
    role: str  # 'user' or 'assistant'
    content: str


class ChatRequest(BaseModel):
    """Request body for chat endpoint."""
    message: str
    conversation_id: Optional[str] = None
    context: Optional[list[ChatMessage]] = None


class ChatResponse(BaseModel):
    """Response body for chat endpoint."""
    message: str
    conversation_id: str


class ChatHistoryResponse(BaseModel):
    """Response body for chat history."""
    conversation_id: str
    messages: list[ChatMessage]
