import React, { useEffect } from "react";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";
import News from "./Pages/News";
import Auth from "./Pages/Auth";
import History from "./Pages/History";
import Home from "./Pages/Home";
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
import MatchResult from "./Components/Home/MatchResult";
import Tickets from "./Components/Tickets/Tickets";
import Gallery from "./Pages/Gallery";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Confirmation from "./Components/Tickets/Confirmation";

const stripePromise = loadStripe(
  "pk_test_51QsjtyKoJsv2Mn0LXjJ0xwEJJl2AXMRMDCrN1CPA5Igaalp21xUBMRYho7AsBiENprTJ6jdkBnPj5RE6a4j6hGmf00XcDf94WQ"
);
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
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/match/:matchId" element={<MatchResult />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/news" element={<News />} />
            <Route path="/tickets" element={<Tickets />}>
              <Route path="confirmation" element={<Confirmation />} />
            </Route>
            <Route path="/login" element={<Auth isregister={false} />} />
            <Route path="/register" element={<Auth isregister={true} />} />
            <Route path="/history" element={<History />} />
            <Route path="/gallery" element={<Gallery />} />
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
        </Elements>
        {!isAdminRoute && <Footer />}
      </UserProvider>
    </>
  );
}

export default App;
