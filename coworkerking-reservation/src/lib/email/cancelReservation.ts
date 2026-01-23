import { User } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCancelReservationEmail(user: User) {
  await resend.emails.send({
    from: "Coworking <onboarding@resend.dev>",
    to: user.email,
    subject: "Annulation de réservation",
    html: `<p>Bonjour ${user.firstname || ''}, votre réservation a été annulée avec succès.</p> <br> <p> Nous espérons vous revoir très vite.</p> <br> <p>À bientôt !</p>`,
  });
}
