"""
Chat API Routes
Handles AI chatbot interactions via Groq.
"""
from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.models.chat import ChatRequest, ChatResponse
from app.services.groq_service import GroqService

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

# Initialize Groq service
groq_service = GroqService()


@router.post("/", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(request: Request, chat_request: ChatRequest):
    """
    Send a message to the AI chatbot and receive a response.
    Rate limited to 20 requests per minute.
    """
    try:
        response = await groq_service.generate_response(
            message=chat_request.message,
            conversation_id=chat_request.conversation_id,
            context=chat_request.context
        )
        return ChatResponse(
            message=response["message"],
            conversation_id=response["conversation_id"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")


@router.get("/history/{conversation_id}")
async def get_chat_history(conversation_id: str):
    """
    Retrieve chat history for a specific conversation.
    """
    try:
        # TODO: Implement with Supabase
        return {"conversation_id": conversation_id, "messages": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching history: {str(e)}")
