import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getSpaceDetails } from "@/controller/spaceController";
import AvailabilitiesClient from "@/components/AvailabilitiesClient";

interface AvailabilitiesPageProps {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
}

export default async function AvailabilitiesPage({ params }: AvailabilitiesPageProps) {
  const resolvedParams = await Promise.resolve(params);
    
  if (!resolvedParams.id) {
    notFound();
  }
  
  const space = await getSpaceDetails(resolvedParams.id);
  
  if (!space) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <AvailabilitiesClient spaceId={space.id} reservations={space.reservations} />
    </>
  );
}
