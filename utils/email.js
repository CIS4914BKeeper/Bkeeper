const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.user = user;
    this.url = url;
    this.from = `Bkeeper <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject, to = this.user.email) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.user.name.split(' ')[0],
        url: this.url,
        subject,
        user: this.user,
      },
    );

    const mailOptions = {
      from: this.from,
      to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendAdmin() {
    await this.send('reviewUser', 'A Bkeeper user requested to sign up', 'admin@example.com');
  }

  async sendApprove() {
    await this.send('approvedUser', 'Your Bkeeper account request is approved');
  }

  async sendReject() {
    await this.send('rejectedUser', 'Your Bkeeper account request is rejected')
  }
};
