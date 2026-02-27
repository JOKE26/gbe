import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  react: React.ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Gbé <noreply@gbe.app>",
    to,
    subject,
    react,
  });
}
