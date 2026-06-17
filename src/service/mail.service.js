import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});
  

transporter.verify() 
.then(() => {
  console.log("Ready to send emails");})

  .catch((error) => {
    console.error("Error verifying transporter:", error);
  })



export async function sendEmail({ to, subject, html, text }) {
    try {
        const mailOptions = {
            from: process.env.GOOGLE_USER,
            to,
            subject,
            html: html || text,
            text: text || html,
        };

        const details = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", details.response);
        return details;
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error;
    }
}