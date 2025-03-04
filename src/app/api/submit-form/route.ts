import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ClientFormData } from '@/app/types/form';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function formatFormData(data: ClientFormData): string {
  return `
Website Project Questionnaire Submission

BASIC INFORMATION
----------------
Business Name: ${data.businessName}
Contact Name: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone}

PROJECT GOALS
------------
Project Description:
${data.projectDescription}

Target Audience:
${data.targetAudience}

Main Objectives:
${data.mainObjectives.map(obj => `- ${obj}`).join('\n')}

DESIGN PREFERENCES
----------------
Desired Style:
${data.desiredStyle}

Color Preferences:
${data.colorPreferences}

Website Examples:
${data.websiteExamples}

Existing Branding: ${data.existingBranding ? 'Yes' : 'No'}
${data.existingBranding ? `Branding Materials:\n${data.brandingMaterials}` : ''}

UPLOADED FILES
-------------
Media Files:
${data.mediaFiles.length > 0 
  ? data.mediaFiles.map(file => `- ${file.name}\n  ${('url' in file) ? file.url : 'URL not available'}`).join('\n')
  : 'No media files uploaded'}

Reference Files:
${data.referenceFiles.length > 0
  ? data.referenceFiles.map(file => `- ${file.name}\n  ${('url' in file) ? file.url : 'URL not available'}`).join('\n')
  : 'No reference files uploaded'}

TECHNICAL REQUIREMENTS
--------------------
Desired Features:
${data.desiredFeatures.map(feature => `- ${feature}`).join('\n')}

Content Management System: ${data.contentManagement ? 'Yes' : 'No'}
E-commerce Functionality: ${data.ecommerce ? 'Yes' : 'No'}
Expected Number of Pages: ${data.expectedPages}

${data.socialMediaLinks && data.socialMediaLinks.length > 0 ? `Social Media Links:
${data.socialMediaLinks.map(link => `- ${link.platform}: ${link.url}`).join('\n')}` : 'No social media links provided'}

Special Functionality Requirements:
${data.specialFunctionality}

TIMELINE & ADDITIONAL INFORMATION
------------------------------
Desired Timeline: ${data.desiredTimeline}
Priority Level: ${data.priorityLevel}

Additional Notes:
${data.additionalNotes}
`;
}

export async function POST(request: Request) {
  try {
    const data: ClientFormData = await request.json();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `New Website Project Questionnaire: ${data.businessName}`,
      text: formatFormData(data),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 