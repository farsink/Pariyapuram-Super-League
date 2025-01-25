import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";
import Auth from "../Pages/Auth";

function ProtectedAdminRoute({ children }) {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <Auth />;
  }

  if (user.publicMetadata.role !== "admin") {
    return <p>You do not have access to this page.</p>;
  }

  return children;
}

export default ProtectedAdminRoute;
