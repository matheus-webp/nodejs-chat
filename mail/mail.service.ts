import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  sendPasswordResetEmail(to: string, resetLink: string) {
    const mailOptions = {
      to,
      subject: 'Reset your password',
      html: `Now you can change your password: <a href="${resetLink}">Click this link to reset your password</a>`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
