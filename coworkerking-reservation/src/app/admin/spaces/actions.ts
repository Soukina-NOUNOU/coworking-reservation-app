"use server";

import { getCurrentUser } from "@/controller/userController";
import { SpaceType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";

export async function updateSpaceAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as SpaceType;
  const capacity = Number(formData.get("capacity"));
  const pricePerHour = Number(formData.get("pricePerHour"));
  const equipments = (formData.get("equipments") as string)
    .split(",")
    .map((e) => e.trim())
    .filter(e => e.length > 0);

  const thumbnailFile = formData.get("thumbnail") as File;
  const photosFiles = formData.getAll("photos") as File[];

  const uploadDir = path.join(process.cwd(), "public/images/spaces");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Get current space data
  const currentSpace = await prisma.space.findUnique({
    where: { id }
  });

  if (!currentSpace) {
    throw new Error("Space not found");
  }

  let thumbnailUrl = currentSpace.thumbnail;
  let photosUrls = [...currentSpace.photos];

  // --- Update thumbnail if new one provided ---
  if (thumbnailFile && thumbnailFile.size > 0) {
    const bytes = Buffer.from(await thumbnailFile.arrayBuffer());
    const fileName = `${Date.now()}-${thumbnailFile.name}`;
    fs.writeFileSync(path.join(uploadDir, fileName), bytes);
    thumbnailUrl = `/images/spaces/${fileName}`;
  }

  // --- Add new photos if provided ---
  for (const file of photosFiles) {
    if (file.size === 0) continue;

    const bytes = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    fs.writeFileSync(path.join(uploadDir, fileName), bytes);

    photosUrls.push(`/images/spaces/${fileName}`);
  }

  await prisma.space.update({
    where: { id },
    data: {
      name,
      description,
      type,
      capacity,
      pricePerHour,
      thumbnail: thumbnailUrl,
      photos: photosUrls,
      equipments,
    }
  });

  redirect(`/spaces/${id}`);
}

export async function deleteSpaceAction(id: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  // Delete all reservations first (because of foreign key constraint)
  await prisma.reservation.deleteMany({
    where: { spaceId: id }
  });

  // Delete the space
  await prisma.space.delete({
    where: { id }
  });

}