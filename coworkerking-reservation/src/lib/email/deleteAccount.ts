import { User } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDeleteAccountEmail(user: User) {
  await resend.emails.send({
    from: "Coworking <onboarding@resend.dev>",
    to: user.email,
    subject: "Suppression de compte",
    html: `<p>Bonjour ${user.firstname || ''}, votre compte a été supprimé avec succès.</p> <br> <p> Nous espérons vous revoir très vite.</p> <br> <p>À bientôt !</p>`,
  });
}
