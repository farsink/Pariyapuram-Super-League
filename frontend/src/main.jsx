import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./bootstrap.min.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { UserProvider } from "./context/UserContext.jsx";
const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log(clerk_key);

//
if (!clerk_key) {
  throw new Error("Invalid Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={clerk_key}>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
