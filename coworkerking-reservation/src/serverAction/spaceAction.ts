'use server';
import { getTypes } from "@/controller/spaceController";

export async function getSpaceTypes() {
    return await getTypes();
}