import { NextRequest, NextResponse } from 'next/server';
import sendEmail from '@/lib/emailSender';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { to, subject, text }: EmailOptions = await req.json();

    // Validate input fields
    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, or text' },
        { status: 400 }
      );
    }

    // Send the email
    await sendEmail({ to, subject, text });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in email API route:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
