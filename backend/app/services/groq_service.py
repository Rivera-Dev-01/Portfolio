"""
Groq Service
Handles LLM inference via Groq's ultra-fast API.
"""
import uuid
from groq import Groq

from app.config import get_settings
from app.core.prompts import SYSTEM_PROMPT

settings = get_settings()


class GroqService:
    """Service for interacting with Groq's LLM API."""
    
    def __init__(self):
        self.client = Groq(api_key=settings.groq_api_key) if settings.groq_api_key else None
        self.model = "llama-3.1-8b-instant"  # Fast and capable
    
    async def generate_response(
        self,
        message: str,
        conversation_id: str | None = None,
        context: list[dict] | None = None
    ) -> dict:
        """
        Generate a response using Groq's LLM.
        
        Args:
            message: The user's message
            conversation_id: Optional conversation ID for continuity
            context: Optional list of previous messages for context
        
        Returns:
            dict with message and conversation_id
        """
        if not self.client:
            return {
                "message": "AI service is not configured. Please set GROQ_API_KEY.",
                "conversation_id": conversation_id or str(uuid.uuid4())
            }
        
        # Build messages array
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        # Add context if provided
        if context:
            messages.extend(context)
        
        # Add current message
        messages.append({"role": "user", "content": message})
        
        try:
            # Call Groq API
            completion = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
                top_p=1,
                stream=False
            )
            
            response_text = completion.choices[0].message.content
            
            return {
                "message": response_text,
                "conversation_id": conversation_id or str(uuid.uuid4())
            }
            
        except Exception as e:
            return {
                "message": f"Sorry, I encountered an error: {str(e)}",
                "conversation_id": conversation_id or str(uuid.uuid4())
            }
    
    async def generate_stream(
        self,
        message: str,
        conversation_id: str | None = None,
        context: list[dict] | None = None
    ):
        """
        Generate a streaming response using Groq's LLM.
        Yields chunks of the response as they arrive.
        """
        if not self.client:
            yield "AI service is not configured."
            return
        
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        if context:
            messages.extend(context)
        
        messages.append({"role": "user", "content": message})
        
        try:
            stream = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
                stream=True
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
        except Exception as e:
            yield f"Error: {str(e)}"
