import React from "react";
import TeamCarousel from "../Components/Home/TeamCarousel";
import HeroSection from "../Components/Home/HeroSection";
import MatchTabs from "../Components/Home/MatchTabs";
import GameWeekCarousel from "../Components/Home/GameWeekCarousel";
import MatchCard from "../Components/Home/MatchCard";
import OverviewSection from "../Components/Home/OverviewSection";
import NewsSection from "../Components/Home/NewsSection";
import Standings from "../Components/Home/Standings";
import TopPlayers from "../Components/Home/TopPlayers";

const matchData = {
  gameWeek23: {
    id: 23,
    date: "SATURDAY 27 JANUARY",
    matches: [
      {
        id: 1,
        homeTeam: {
          name: "Chelsea",
          logo: "https://resources.premierleague.com/premierleague/badges/t8.svg",
        },
        awayTeam: {
          name: "Aston Villa",
          logo: "https://resources.premierleague.com/premierleague/badges/t7.svg",
        },
        time: "15:00",
      },
      {
        id: 2,
        homeTeam: {
          name: "Arsenal",
          logo: "https://resources.premierleague.com/premierleague/badges/t3.svg",
        },
        awayTeam: {
          name: "Crystal Palace",
          logo: "https://resources.premierleague.com/premierleague/badges/t31.svg",
        },
        time: "17:30",
      },
    ],
  },
  gameWeek24: {
    id: 24,
    date: "SATURDAY 1 FEBRUARY",
    matches: [
      {
        id: 1,
        homeTeam: {
          name: "Nottingham Forest",
          logo: "https://resources.premierleague.com/premierleague/badges/t17.svg",
        },
        awayTeam: {
          name: "Brighton",
          logo: "https://resources.premierleague.com/premierleague/badges/t36.svg",
        },
        time: "18:00",
      },
      {
        id: 2,
        homeTeam: {
          name: "Bournemouth",
          logo: "https://resources.premierleague.com/premierleague/badges/t91.svg",
        },
        awayTeam: {
          name: "Liverpool",
          logo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
        },
        time: "20:30",
      },
    ],
  },
  gameWeek25: {
    id: 25,
    date: "SATURDAY 10 FEBRUARY",
    matches: [
      {
        id: 1,
        homeTeam: {
          name: "Manchester City",
          logo: "https://resources.premierleague.com/premierleague/badges/t43.svg",
        },
        awayTeam: {
          name: "Everton",
          logo: "https://resources.premierleague.com/premierleague/badges/t11.svg",
        },
        time: "12:30",
      },
      {
        id: 2,
        homeTeam: {
          name: "Tottenham",
          logo: "https://resources.premierleague.com/premierleague/badges/t6.svg",
        },
        awayTeam: {
          name: "Brighton",
          logo: "https://resources.premierleague.com/premierleague/badges/t36.svg",
        },
        time: "15:00",
      },
    ],
  },
};

function Home() {
  const [activeGameWeek, setActiveGameWeek] = React.useState(24);
  const [activeTab, setActiveTab] = React.useState("Matches");

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
                  match={
                    activeGameWeek === 23
                      ? matchData.gameWeek23
                      : activeGameWeek === 24
                      ? matchData.gameWeek24
                      : matchData.gameWeek25
                  }
                />
              </div>
            </>
          ) : activeTab === "Standings" ? (
            <Standings />
          ) : activeTab === "Top Players" ? (
            <TopPlayers />
          ) : null}
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
