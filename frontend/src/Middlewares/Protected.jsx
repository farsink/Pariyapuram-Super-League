import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";
import Auth from "../Pages/Auth";
import { useNavigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  
  if (!isSignedIn) {
    return navigate("/login");
  }

  if (user.publicMetadata.role !== "admin") {
    return <p>You do not have access to this page.</p>;
  }

  return children;
}

export default ProtectedAdminRoute;
