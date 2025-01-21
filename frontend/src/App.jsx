import React from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import Navbarpsl from "./Components/Navbarpsl";
import News from "./Pages/News";
import Tickets from "./Pages/Tickets";
import Auth from "./Pages/Auth";
import History from "./Pages/History";
import Home from "./Pages/Home";
import Fixture from "./Components/Fixture";
import Videos from "./Pages/Videos";
import Verify from "./Components/Verify";
import Profile from "./Components/Profile";
import { UserProvider } from "./context/UserContext";
import ForgotPassword from "./Pages/ForgotPassword";
import Admin from "./Pages/Admin.Jsx";


function App() {
   const location = useLocation();
   const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <UserProvider>
        {!isAdminRoute && <Navbarpsl />}
        <Routes>
          <Route path="/news" element={<News />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/login" element={<Auth isregister={false} />} />
          <Route path="/register" element={<Auth isregister={true} />} />
          <Route path="/history" element={<History />} />
          <Route path="/fixtures" element={<Fixture />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/verify-email" element={<Verify isReset={false} />} />
          <Route path="/reset-verify" element={<Verify isReset={true} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resetPassword" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
