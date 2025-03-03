import React, { useEffect } from "react";
import TeamCarousel from "../Components/Home/TeamCarousel";
import HeroSection from "../Components/Home/HeroSection";
import MatchTabs from "../Components/Home/MatchTabs";
import GameWeekCarousel from "../Components/Home/GameWeekCarousel";
import MatchCard from "../Components/Home/MatchCard";
import OverviewSection from "../Components/Home/OverviewSection";
import NewsSection from "../Components/Home/NewsSection";
import Standings from "../Components/Home/Standings";
import TopPlayers from "../Components/Home/TopPlayers";
import { useSelector } from "react-redux";
import Videos from "./VideoPage/Videos";

function Home() {
  const [activeGameWeek, setActiveGameWeek] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("Matches");
  const { matches, status } = useSelector((state) => state.matches);

  const defaultGameweek = matches?.find((m) => m.status === "scheduled")?.round || "Not FOund";

  useEffect(() => {
    if (defaultGameweek) {
      setActiveGameWeek(defaultGameweek?.toUpperCase() || ""); // Set default gameweek if available, otherwise set to SEMI FINAL
    }
  }, [defaultGameweek, matches]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Team Carousel */}
      <TeamCarousel />

      {/* Main Content */}
      <div className="bg-[url('../src/assets/background_white.png')] bg-cover bg-center bg-no-repeat">
        <div className="bg-accent bg-opacity-5">
          {/* Hero Section */}
          <HeroSection />
          {/* Match Tabs */}
          <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {/* Content area */}
          {activeTab === "Matches" ? (
            <>
              <GameWeekCarousel activeWeek={activeGameWeek} onWeekChange={setActiveGameWeek} />
              <div className="max-w-7xl mx-auto px-4 py-8">
                <MatchCard
                  match={matches?.filter(
                    (m) => m.round.toLowerCase() === activeGameWeek.toLowerCase()
                  )}
                />
              </div>
            </>
          ) : activeTab === "Standings" ? (
            <Standings />
          ) : activeTab === "Top Players" ? (
            <TopPlayers />
          ) : activeTab === "Overview" ? (
            <Videos />
          ) : null}{" "}
        </div>
      </div>

      {/* Overview Section */}
      <OverviewSection />

      {/* News Section */}
      <NewsSection />

      {/* Footer */}
    </div>
  );
}

export default Home;
