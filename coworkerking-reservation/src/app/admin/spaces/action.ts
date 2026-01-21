"use server";

import { adminCreateSpace } from "@/controller/spaceController";
import { SpaceType } from "@prisma/client";
import fs from "fs";
import path from "path";

export async function createSpaceAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as SpaceType;
  const capacity = Number(formData.get("capacity"));
  const pricePerHour = Number(formData.get("pricePerHour"));
  const equipments = (formData.get("equipments") as string)
    .split(",")
    .map((e) => e.trim());

  const thumbnailFile = formData.get("thumbnail") as File;
  const photosFiles = formData.getAll("photos") as File[];

  const uploadDir = path.join(process.cwd(), "public/images/spaces");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // --- Upload thumbnail ---
  let thumbnailUrl = "";
  if (thumbnailFile && thumbnailFile.size > 0) {
    const bytes = Buffer.from(await thumbnailFile.arrayBuffer());
    const fileName = `${Date.now()}-${thumbnailFile.name}`;
    fs.writeFileSync(path.join(uploadDir, fileName), bytes);
    thumbnailUrl = `/images/spaces/${fileName}`;
  }

  // --- Upload photos ---
  const photosUrls: string[] = [];
  for (const file of photosFiles) {
    if (file.size === 0) continue;

    const bytes = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    fs.writeFileSync(path.join(uploadDir, fileName), bytes);

    photosUrls.push(`/images/spaces/${fileName}`);
  }

  await adminCreateSpace({
    name,
    description,
    type,
    capacity,
    pricePerHour,
    thumbnail: thumbnailUrl,
    photos: photosUrls,
    equipments,
  });
}
