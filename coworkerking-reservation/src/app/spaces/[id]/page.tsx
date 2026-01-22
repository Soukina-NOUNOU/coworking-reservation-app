import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SpaceDetails from "@/components/Spacedetails";
import SpaceGallery from "@/components/SpaceGallery";
import AdminSpaceActions from "@/components/AdminSpaceActions";
import { getSpace } from "@/controller/spaceController";
import { getCurrentUserOptional } from "@/controller/userController";
import { NotFoundError } from "@/lib/errors";

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
  
  let space;
  let user;
  
  try {
    space = await getSpace(resolvedParams.id);
    user = await getCurrentUserOptional();
    
    if (!space) {
      notFound();
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
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