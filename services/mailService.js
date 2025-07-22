// services/mailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS   // Your email password (use app password if using Gmail)
  }
});

// Function to send a confirmation email
const sendConfirmationEmail = (name, studentId, className, studentEmail) => {
  const mailOptions = {
    from: `"Student Registration" <${process.env.EMAIL_USER}>`,  // Sender's email address
    to: studentEmail,  // The student's email address
    subject: `Registration Confirmation - Student ID #${studentId}`,  // Subject with Student ID
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmation</title>
        <style>
          /* General styles for email */
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #474747ff;  /* Dark background */
            color: #f1f1f1;  /* Light text color on dark background */
          }
          table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #1f1f1fff;  /* White background for the content */
            border-radius: 20px;
            border: 3px solid #e96cffff;  /* Light lavender border */
          }
          .email-container {
            padding: 20px;
            text-align: center;
          }
          .email-header {
            font-size: 24px;
            font-weight: bold;
            color: #e96cffff;  /* Accent color for title */
            margin-bottom: 15px;
          }
          .email-body {
            font-size: 16px;
            line-height: 1.5;
            color: #ffffffff;  /* Dark text for content */
            margin-bottom: 30px;
          }

          /* Line between body and footer */
          .separator {
            width: 90%; /* Adjust width to create space on the sides */
            margin: 20px auto; /* Center the line and add spacing */
            border-top: 0.25px solid #e96cffff; /* Accent color separator line */
          }

          .footer {
            font-size: 14px;
            color: #bbb;
          }

          /* Responsive design */
          @media only screen and (max-width: 600px) {
            table {
              width: 90%;
            }
            .email-header {
              font-size: 20px;
            }
            .email-body {
              font-size: 14px;
            }
          }

        </style>
      </head>
      <body>
        <table>
          <tr>
            <td class="email-container">
              <div class="email-header">
                Registration Successful!
              </div>
              <div class="email-body">
                <p>Dear ${name},</p>
                <p>We’re happy to confirm your registration!</p>
                <p>Your Student ID: <strong>${studentId}</strong></p>
                <p>Class Assigned: <strong>${className}</strong></p>
                <p>Thank you for registering with us.</p>
                <p>Best regards,<br>Student Registration Team</p>
              </div>
              <!-- Separator Line -->
              <div class="separator"></div>
              <div class="footer">
                &copy; 2025 Student Registration System | All Rights Reserved
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);  // Send the email
};

module.exports = { sendConfirmationEmail };
