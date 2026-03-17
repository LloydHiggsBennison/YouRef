import nodemailer from "nodemailer";

function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

export async function sendMail({ to, subject, html, debugPayload }) {
  const transport = createTransport();
  const from = process.env.MAIL_FROM || "CRM YouRef <no-reply@youref.cl>";

  if (!transport) {
    console.warn("--- MAILBOX FALLBACK (No SMTP) ---");
    console.warn(`To: ${to}`);
    console.warn(`Subject: ${subject}`);
    console.warn(`Content (HTML):`, html);
    console.warn(`Payload:`, debugPayload);
    return { delivered: false, mode: "local-mailbox" };
  }

  await transport.sendMail({ from, to, subject, html });
  return { delivered: true, mode: "smtp" };
}
