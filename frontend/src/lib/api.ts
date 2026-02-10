/**
 * API Client for Backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ProfileData {
    name: string;
    role: string;
    location: string;
    education: string;
    status: string;
    bio: string;
    current_company: string;
    current_position: string;
}

export interface ChatMessageRequest {
    message: string;
    conversation_id?: string;
    context?: Array<{ role: string; content: string }>;
}

export interface ChatMessageResponse {
    message: string;
    conversation_id: string;
}

export async function getProfile(): Promise<ProfileData | null> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(`${API_BASE_URL}/profile`, {
            cache: 'no-store',
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

export async function sendChatMessage(
    request: ChatMessageRequest
): Promise<ChatMessageResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return await response.json();
}
