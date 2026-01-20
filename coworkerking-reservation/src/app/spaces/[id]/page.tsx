import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SpaceDetails from "@/components/Spacedetails";
import SpaceGallery from "@/components/SpaceGallery";
import { getSpace } from "@/controller/spaceController";

interface SpaceDetailPageProps {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
}

export default async function SpaceDetailPage({ params }: SpaceDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
    
  if (!resolvedParams.id) {
    notFound();
  }
  
  const space = await getSpace(resolvedParams.id);
  
  if (!space) {
    notFound(); // Page 404 if the space does not exist
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Gallery Section */}
        <SpaceGallery photos={space.photos} />
        
        {/* Content Section */}
        <div className="container py-12">
          <SpaceDetails space={space} />
        </div>
      </div>
    </>
  );
}