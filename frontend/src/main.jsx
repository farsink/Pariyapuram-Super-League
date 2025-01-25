import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import "./bootstrap.min.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { UserProvider } from "./context/UserContext.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


//
if (!clerk_key) {
  throw new Error("Invalid Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={clerk_key}>
        <Provider store={store}>
        <App />

        </Provider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
