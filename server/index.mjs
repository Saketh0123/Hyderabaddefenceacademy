import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8787);

app.use(cors());
app.use(express.json());

const requiredVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
const missingVars = requiredVars.filter((key) => !process.env[key]);

const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get("/api/health", (_req, res) => {
  if (missingVars.length > 0) {
    return res.status(500).json({
      ok: false,
      message: "Server is running but SMTP config is incomplete",
      missing: missingVars,
    });
  }

  return res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({
      ok: false,
      message: "Name, email, and phone are required",
    });
  }

  if (missingVars.length > 0) {
    return res.status(500).json({
      ok: false,
      message: "SMTP config is incomplete",
      missing: missingVars,
    });
  }

  const to = process.env.CONTACT_TO || "julukuntlasakethreddy@gmail.com";
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const formattedMessage = String(message || "").trim() || "No message provided";

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Message:",
        formattedMessage,
      ].join("\n"),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${formattedMessage.replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.json({ ok: true, message: "Contact message sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      ok: false,
      message: "Failed to send contact email",
    });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
