import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
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

      <Container sx={{ mt: 6 }}>
        <SpaceGallery photos={space.photos} />
        <SpaceDetails space={space} />
      </Container>
    </>
  );
}