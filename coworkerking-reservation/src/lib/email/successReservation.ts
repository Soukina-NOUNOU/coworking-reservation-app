import { User } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSuccessReservationEmail(user: User) {
  await resend.emails.send({
    from: "Coworking <onboarding@resend.dev>",
    to: user.email,
    subject: "Confirmation de réservation",
    html: `<p>Bonjour ${user.firstname || ''}, votre réservation est confirmée.</p> <br> <p> Nous vous remercions pour votre confiance.</p> <br> <p>À bientôt !</p>`,
  });
}
