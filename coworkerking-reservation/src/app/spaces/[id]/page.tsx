import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SpaceDetails from "@/components/Spacedetails";
import SpaceGallery from "@/components/SpaceGallery";
import AdminSpaceActions from "@/components/AdminSpaceActions";
import { getSpace } from "@/controller/spaceController";
import { getCurrentUser } from "@/controller/userController";

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
  const user = await getCurrentUser();
  
  if (!space) {
    notFound(); // Page 404 if the space does not exist
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Gallery Section */}
        <SpaceGallery photos={space.photos} thumbnail={space.thumbnail} />
        
        {/* Content Section */}
        <div className="container py-12">
          {/* Admin Actions */}
          {user && user.role === "ADMIN" && (
            <AdminSpaceActions spaceId={space.id} spaceName={space.name} />
          )}
          
          <SpaceDetails space={space} />
        </div>
      </div>
    </>
  );
}