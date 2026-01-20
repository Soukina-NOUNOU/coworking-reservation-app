import { listSpaces } from "@/controller/spaceController";
import SpaceList from "@/components/Space/SpaceList";

export default async function SpacesPage() {

  const spaces = await listSpaces();
  
  return (
    <SpaceList spaces={spaces} />
  );
}
