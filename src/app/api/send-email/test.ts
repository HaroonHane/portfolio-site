// This is a test file for the email API
// You can run this file to test the email functionality without using the UI

import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_USER = "www.hajerhanesof@gmail.com";
const EMAIL_PASS = "hzdl mgbk dexy njrw";

async function testEmailSending() {
  try {
    console.log('Testing email sending...');
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Test email content
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER, // Send to yourself
      subject: 'Test Email from Portfolio Contact Form',
      html: `
        <h3>This is a test email</h3>
        <p>If you're seeing this, the email functionality is working correctly!</p>
        <p><strong>Name:</strong> Test User</p>
        <p><strong>Email:</strong> test@example.com</p>
        <p><strong>Subject:</strong> Test Email</p>
        <p><strong>Message:</strong></p>
        <p>This is a test message to verify that the email functionality is working correctly.</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending test email:', error);
    return { success: false, error };
  }
}

// Uncomment the line below to run the test
// testEmailSending();

export default testEmailSending;
