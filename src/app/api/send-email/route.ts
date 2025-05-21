import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Basic email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Check request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizeHtml = (str: string): string => {
      return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedSubject = subject ? sanitizeHtml(subject) : '';
    const sanitizedMessage = sanitizeHtml(message);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      // Add security options
      secure: true, // Use TLS
      tls: {
        rejectUnauthorized: true // Verify TLS/SSL certificates
      }
    });

    // Email content to send to the site owner
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER, // Send to yourself (the portfolio owner)
      subject: `Portfolio Contact: ${sanitizedSubject || 'New message from your portfolio'}`,
      html: `
        <h3>New message from your portfolio website</h3>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Subject:</strong> ${sanitizedSubject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Auto-reply to the sender
    const autoReplyOptions = {
      from: EMAIL_USER,
      to: sanitizedEmail,
      subject: 'Thank you for contacting me',
      html: `
        <h3>Thank you for reaching out!</h3>
        <p>Hello ${sanitizedName},</p>
        <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${sanitizedSubject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <p>Best regards,</p>
        <p>Haroon Aawan</p>
      `,
    };

    try {
      // Send email to portfolio owner
      const ownerEmailResult = await transporter.sendMail(mailOptions);
      console.log('Email to owner sent:', ownerEmailResult.response);

      try {
        // Send auto-reply to sender
        const autoReplyResult = await transporter.sendMail(autoReplyOptions);
        console.log('Auto-reply sent:', autoReplyResult.response);
      } catch (autoReplyError) {
        // Log auto-reply error but don't fail the whole request
        console.error('Error sending auto-reply:', autoReplyError);
        // Continue with success response since the main email was sent
      }

      // Return success response
      return NextResponse.json({
        success: true,
        message: "Email sent successfully"
      });
    } catch (emailError) {
      console.error('Error sending main email:', emailError);
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: emailError instanceof Error ? emailError.message : String(emailError)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
