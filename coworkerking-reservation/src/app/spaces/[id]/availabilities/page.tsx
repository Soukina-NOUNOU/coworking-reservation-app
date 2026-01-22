import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getSpaceDetails } from "@/controller/spaceController";
import AvailabilitiesClient from "@/components/AvailabilitiesClient";
import { NotFoundError } from "@/lib/errors";

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
  
  let space;
  
  try {
    space = await getSpaceDetails(resolvedParams.id);
    
    if (!space) {
      notFound();
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error; // Re-throw other errors
  }

  return (
    <>
      <Navbar />
      <AvailabilitiesClient 
        spaceId={space.id} 
        spaceName={space.name}
        reservations={space.reservations} 
      />
    </>
  );
}
