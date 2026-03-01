import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Option 1: Using Resend (recommended - professional email service)
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>', // Change after domain verification
          to: process.env.CONTACT_EMAIL || 'your-email@example.com',
          subject: `New Portfolio Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Contact Form Submission</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #666; font-size: 12px;">
                Sent from your portfolio contact form
              </p>
            </div>
          `,
          reply_to: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Resend API error:', data);
        throw new Error(data.message || 'Failed to send email via Resend');
      }

      return NextResponse.json(
        { message: 'Email sent successfully!' },
        { status: 200 }
      );
    }

    // Option 2: Fallback to SendGrid if Resend not configured
    if (process.env.SENDGRID_API_KEY) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: process.env.CONTACT_EMAIL || 'your-email@example.com' }],
            subject: `New Portfolio Message from ${name}`,
          }],
          from: { email: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com' },
          reply_to: { email },
          content: [{
            type: 'text/html',
            value: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
          }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email via SendGrid');
      }

      return NextResponse.json(
        { message: 'Email sent successfully!' },
        { status: 200 }
      );
    }

    // No email service configured - log to console (development only)
    console.log('📧 Contact Form Submission:', { name, email, message });
    
    return NextResponse.json(
      { message: 'Message received! (Email service not configured)' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
