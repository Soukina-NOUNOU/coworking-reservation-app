import Navbar from "@/components/Navbar";
import UpdateSpaceForm from "@/components/UpdateSpaceForm";
import { getCurrentUser } from "@/controller/userController";
import { getSpace } from "@/controller/spaceController";
import { getSpaceTypes } from "@/serverAction/spaceAction";
import { AuthError, ForbiddenError, NotFoundError } from "@/lib/errors";
import AdminUnauthorized from "@/app/admin/unauthorized/page";
import NotFound from "@/app/not-found";
import Forbidden from "@/app/forbidden/page";

interface UpdateSpacePageProps {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
}

export default async function UpdateSpacePage({ params }: UpdateSpacePageProps) {
  const resolvedParams = await Promise.resolve(params);
  
  let user;
  let space;
  let types;
  
  try {
    user = await getCurrentUser();
    
    if (!user || user.role !== "ADMIN") {
      return <AdminUnauthorized />;
    }
    
    space = await getSpace(resolvedParams.id);
    types = await getSpaceTypes();
    
    if (!space) {
      return <NotFound />;
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return <AdminUnauthorized />;
    }
    else if (error instanceof ForbiddenError) {
      return <Forbidden />;
    }
    if (error instanceof NotFoundError) {
       return <NotFound/> 
    }
    throw error;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">{`Modifier l'espace :`}</h1>
                  <p className="text-primary-100 mt-2">{space.name.toUpperCase()}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <UpdateSpaceForm space={space} types={types} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}