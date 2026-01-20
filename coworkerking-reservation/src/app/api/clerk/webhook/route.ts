import { PrismaClient } from "@prisma/client";
import { Webhook } from "svix";
import { NextRequest } from "next/server";

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

const prisma = new PrismaClient();

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

  if (evt.type === "user.created") {
    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          firstname: first_name,
          lastname: last_name,
          role: "USER",
        },
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      return new Response("Failed to create user", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
