import { getCurrentUser } from "@/controller/userController";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Vous devez être connecté</div>;
  }

  return (
    <div>
      <h1>Mon profil</h1>
      <p>Email : {user.email}</p>
      <p>Prénom : {user.firstname ?? "Non renseigné"}</p>
      <p>Nom : {user.lastname ?? "Non renseigné"}</p>
      <p>Rôle : {user.role}</p>
    </div>
  );
}
