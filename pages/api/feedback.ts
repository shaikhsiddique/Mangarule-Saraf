import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing fields' });

  try {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.FEEDBACK_TO_EMAIL;
    if (!host || !user || !pass || !to) {
      return res.status(500).json({ message: 'Email environment not configured' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `Mangarule Saraf Feedback <${user}>`,
      to,
      subject: `New feedback from ${name}`,
      replyTo: email,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br/>')}</p>`
    });

    return res.status(200).json({ message: 'Feedback sent', id: info.messageId });
  } catch (e: any) {
    return res.status(500).json({ message: 'Failed to send', error: e?.message || 'unknown' });
  }
}


