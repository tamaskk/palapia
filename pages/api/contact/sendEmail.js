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

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Email sent successfully', to: to, subject: subject, text: text });
  } catch (error) {
    console.error(error);
    if (error.response && error.response.body && error.response.body.errors) {
      return res.status(401).json({ error: 'Unauthorized', details: error.response.body.errors });
    } else {
      return res.status(500).json({ error: 'Error sending email' });
    }
  }
}
