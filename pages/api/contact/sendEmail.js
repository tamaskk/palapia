// pages/api/sendEmail.js
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { to, subject, text } = req.body;
  
    if (!to || !subject || !text) {
      return res.status(422).json({ error: 'Invalid input. Please provide "to", "subject", and "text" in the request body.' });
    }
  
    const msg = {
      to,
      from: 'info.palapia@gmail.com',
      subject,
      text,
    };
  
    sgMail.send(msg)
      .then(() => res.status(200).json({ message: 'Email sent successfully' }))
      .catch((error) => res.status(400).json({ error: error.message }));
  }