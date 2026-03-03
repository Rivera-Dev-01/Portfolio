import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Import your portfolio data
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import certificationsData from '@/data/certifications.json';
import organizationsData from '@/data/organizations.json';
import interestsData from '@/data/interests.json';
import socialLinksData from '@/data/social_links.json';
import techStackData from '@/data/tech_stack.json';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Build context from your JSON files
const buildSystemPrompt = () => {
  const context = `You are an AI assistant representing ${profileData.name}, a ${profileData.title} based in ${profileData.location}.

ABOUT:
${profileData.bio}

EDUCATION:
- ${profileData.education.degree} at ${profileData.education.school}
- Year: ${profileData.education.year}

EXPERIENCE:
${experienceData.map(exp => `- ${exp.title} at ${exp.company} (${exp.period})
  Role: ${exp.role}
  ${exp.description}`).join('\n')}

ORGANIZATIONS:
${organizationsData.map(org => `- ${org.name}: ${org.role}`).join('\n')}

CERTIFICATIONS:
${certificationsData.map(cert => `- ${cert.name} (${cert.issuer}, ${cert.date})`).join('\n')}

TECH STACK:
${techStackData.map(tech => `${tech.key}: ${tech.value}`).join('\n')}

INTERESTS:
${interestsData.map(interest => `- ${interest.name}: ${interest.description}`).join('\n')}

CONTACT:
${socialLinksData.map(link => `- ${link.key}: ${link.value}`).join('\n')}

PROJECTS:
You can discuss these major projects:
1. ACAD SWAP - University marketplace platform (React, Flask, Supabase)
2. HYDRA - AI flood control transparency system (React, Python, Google Gemini) - Won Hack the Flood 2025
3. Rule VII SaaS - AI architectural compliance mentor (Next.js, FastAPI, Groq, RAG)
4. Care Cures - Philippine health information system (Next.js, Supabase, bilingual EN/TL)

PERSONALITY:
- Be friendly, professional, and enthusiastic
- Speak in first person as if you ARE ${profileData.name}
- Be concise but informative
- Show passion for technology and problem-solving
- Highlight relevant experience when asked about skills
- If asked about projects, provide specific technical details
- If you don't know something, be honest and suggest contacting via the contact form

GUIDELINES:
- Keep responses under 150 words unless asked for details
- Use bullet points for lists
- Be conversational but professional
- Don't make up information not in the context
- Encourage visitors to check out projects or reach out via contact form`;

  return context;
};

export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    // Build messages array with system prompt and conversation history
    const messages = [
      {
        role: 'system' as const,
        content: buildSystemPrompt(),
      },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Fast and capable
      messages,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
    });

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({
      reply,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: reply },
      ],
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
