import React, { useEffect } from "react";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";
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
import FixtureAdmin from "./Components/Admin/FixtureAdmin";
import Dashboard from "./Components/Admin/Dashboard";
import PlayersManagement from "./Components/Admin/Players";
import MatchesManagement from "./Components/Admin/Matches";
import TeamsManagement from "./Components/Admin/Team";
import TestNavbar from "./Components/TestNavbar";
import Footer from "./Components/Footer";
import { useDispatch } from "react-redux";
import { fetchMatches } from "./Redux/slices/MatchSlice";
import { fetchTeams } from "./Redux/slices/TeamSlice";
import { fetchPlayers } from "./Redux/slices/PlayerSlice";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchMatches());
    dispatch(fetchTeams());
    dispatch(fetchPlayers());
  }, [dispatch]);
  return (
    <>
      <UserProvider>
        {!isAdminRoute && <TestNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/news" element={<News />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/login" element={<Auth isregister={false} />} />
          <Route path="/register" element={<Auth isregister={true} />} />
          <Route path="/history" element={<History />} />
          <Route path="/fixtures" element={<Fixture />} />
          <Route path="/verify-email" element={<Verify isReset={false} />} />
          <Route path="/reset-verify" element={<Verify isReset={true} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resetPassword" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} /> {/* Default admin route */}
            <Route path="*" element={<Dashboard />} />
            <Route path="fixture" element={<FixtureAdmin />} /> {/* Nested admin route */}
            <Route path="players" element={<PlayersManagement />} />
            <Route path="matches" element={<MatchesManagement />} />
            <Route path="teams" element={<TeamsManagement />} />
            {/* Add more nested admin routes here */}
          </Route>
        </Routes>
        {!isAdminRoute && <Footer />}
      </UserProvider>
    </>
  );
}

export default App;
