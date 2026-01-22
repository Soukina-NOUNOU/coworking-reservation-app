import { Webhook } from "svix";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
    }>;
    first_name: string;
    last_name: string;
  };
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Missing webhook secret", { status: 500 });
  }

  const wh = new Webhook(webhookSecret);

  let evt: ClerkWebhookEvent;
  try {
    evt = wh.verify(payload, headers) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;

  try {
    switch (evt.type) {
      case "user.created":
        await prisma.user.create({
          data: {
            clerkId: id,
            email: email_addresses[0].email_address,
            firstname: first_name,
            lastname: last_name,
            role: "USER",
          },
        });
        console.log("User created successfully in database");
        break;

      case "user.updated":
        await prisma.user.update({
          where: { clerkId: id },
          data: {
            email: email_addresses[0].email_address,
            firstname: first_name,
            lastname: last_name,
          },
        });
        console.log("User updated successfully in database");
        break;

      case "user.deleted":
        // Delete all reservations first (because of foreign key constraint)
        const userToDelete = await prisma.user.findUnique({
          where: { clerkId: id },
        });
        
        if (userToDelete) {
          await prisma.reservation.deleteMany({
            where: { userId: userToDelete.id },
          });
          
          await prisma.user.delete({
            where: { clerkId: id },
          });
        }
        console.log("User deleted successfully from database");
        break;

      default:
        console.log(`Unhandled webhook event type: ${evt.type}`);
    }
  } catch (error) {
    console.error("Database operation failed:", error);
    return new Response("Failed to process webhook", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}