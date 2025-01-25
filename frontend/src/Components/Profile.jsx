import React, { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const { user } = useUser(); // Get user data from the context
  const { signOut } = useAuth();
  const { navigate } = useNavigate()
   const SignOut = async () => {

     try {
       await signOut();
       toast.success("User signed out successfully!");
       navigate("/");
     } catch (error) {
       console.error("Error signing out user:", error);
     }
   }

  if (!user) {
    return <div>Loading...</div>;
  }

  // Extract user details
  const username = user.username || "No username set";
  const email = user.primaryEmailAddress?.emailAddress || "No email set";

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>Email: {email}</p>
      <Button onClick={SignOut}>Logout</Button>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </div>
  );
}

export default Profile;
