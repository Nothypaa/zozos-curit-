require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Using 3000 as originally intended

// --- Middleware ---
// Enable CORS ONLY for requests from your frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
// Use Express's built-in JSON and URL-encoded body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Nodemailer Configuration (OAuth 2.0) ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER, // Your Gmail address (sender)
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// --- Verify Transporter Connection ---
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to take messages using OAuth2');
  }
});

// --- API Route for Sending Email ---
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    // Send JSON response for errors
    return res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Use your verified email as sender
    to: process.env.EMAIL_USER, // Send TO your main email address
    replyTo: email, // Set the reply-to field to the sender's email
    subject: `Nouveau message de ${name} via le site Zozo Sécurité`,
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Plain text version
    // Add HTML version for better formatting in email clients
    html: `
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      // Check for specific OAuth errors
      if (error.code === 'EAUTH' || error.responseCode === 401) {
         console.error("Authentication error. Check OAuth credentials or token validity.");
         // Send JSON response
         return res.status(500).json({ message: "Erreur d'authentification avec le service email." });
      }
      // Send JSON response for general errors
      return res.status(500).json({ message: "Oops! Une erreur s'est produite lors de l'envoi." });
    }
    console.log('Email sent: ' + info.response);
    // Send JSON response for success
    res.status(200).json({ message: 'Merci ! Votre message a été envoyé.' });
  });
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});