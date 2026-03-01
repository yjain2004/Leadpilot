const nodemailer = require("nodemailer");

async function sendEmail(to, subject, htmlContent) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or use host and port like process.env.SMTP_HOST
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html: htmlContent
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error("Email Service Error:", error);
        throw error;
    }
}

module.exports = {
    sendEmail
};
