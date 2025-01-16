import React, { useEffect } from "react";
import { useUserContext } from "../context/UserContext";


function Profile() {
  const { user, token } = useUserContext();

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
      <p>Token: {token}</p>
    </div>
  );
}

export default Profile;
