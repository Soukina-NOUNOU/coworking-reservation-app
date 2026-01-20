import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const admin = await prisma.user.create({
    data: {
      clerkId: "admin_clerk_id_123",
      email: "admin@cowork.com",
      firstname: "Admin",
      lastname: "Master",
      role: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      clerkId: "user_clerk_id_456",
      email: "user@test.com",
      firstname: "John",
      lastname: "Doe",
      role: "USER",
    },
  });

  const spaces = await prisma.space.createMany({
    data: [
      {
        name: "Salle de réunion A",
        description: "Salle moderne avec écran et Wi-Fi.",
        type: "meeting_room",
        capacity: 6,
        pricePerHour: 15,
        thumbnail: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1",
        photos: [
          "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1",
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
        ],
        equipments: ["Wi-Fi", "Écran", "Climatisation", "Café"],
      },
      {
        name: "Bureau individuel",
        description: "Bureau calme et lumineux.",
        type: "desk",
        capacity: 1,
        pricePerHour: 8,
        thumbnail: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
        photos: [
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
        ],
        equipments: ["Wi-Fi", "Bureau", "Chaise ergonomique"],
      },
    ],
  });

  const allSpaces = await prisma.space.findMany();

  await prisma.reservation.create({
    data: {
      userId: user.id,
      spaceId: allSpaces[0].id,
      start: new Date("2026-01-20T09:00:00"),
      end: new Date("2026-01-20T10:00:00"),
    },
  });

  console.log("🌱 Seed completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
