import React, { useState } from "react";
import { MapPin } from "lucide-react";
import MatchLineup from "./MatchLineup";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { serverurl } from "../../Api/ServerURL";

const MatchResult = () => {
  const [activeTab, setActiveTab] = useState("live");
  const { matches, status } = useSelector((state) => state.matches);
  const { matchId } = useParams();

  const match = matches?.find((m) => m._id === matchId);

  const HomeScorer =
    match?.goalScorers?.filter(
      (scorer) => scorer.team === match?.homeTeam?._id
    ) || [];

  const AwayScorer =
    match?.goalScorers?.filter(
      (scorer) => scorer.team === match?.awayTeam?._id
    ) || [];

  const renderTabContent = () => {
    switch (activeTab) {
      case "line-ups":
        return <MatchLineup />;
      default:
        return (
          <div className='p-4 text-center text-gray-500'>
            Content for {activeTab} tab
          </div>
        );
    }
  };
  return (
    <div className='w-full max-w-7xl mx-auto'>
      {/* Header Section */}
      <div className='bg-[#f9f9f9] text-[#37003C] p-4 shadow-sm'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl md:text-3xl'>
            <span className='font-normal'>Matchday</span>{" "}
            <span className='font-bold'>Live</span>
          </h1>
          <div className='flex flex-col items-end'>
            <span className='text-sm font-medium'>
              {match?.round.toUpperCase()}
            </span>
            <span className='text-xs text-gray-600'>
              {new Date(match?.date).toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col md:flex-row'>
        {/* Left Section - Only visible on desktop */}
        <div className='hidden md:block w-64 bg-[#37003C] rounded-e-md'>
          <nav className='p-4 '>
            <div className='space-y-4 bg-gray-100 rounded-lg shadow-md shadow-gray-950'>
              <div className='flex items-center justify-between p-3  hover:bg-[#7F95D1] cursor-pointer rounded'>
                <span className='font-medium'>Live Blog</span>
                <span>›</span>
              </div>
              <div className='flex items-center justify-between p-3 hover:bg-[#7F95D1] cursor-pointer rounded'>
                <span className='font-medium'>League Table</span>
                <span>›</span>
              </div>
              <div className='flex items-center justify-between p-3 hover:bg-[#7F95D1] cursor-pointer rounded'>
                <span className='font-medium'>News & Video</span>
                <span>›</span>
              </div>
            </div>
          </nav>
        </div>

        {/* Match Details Section */}
        <div className='flex-1 sm:ps-4 bg-white'>
          {/* Match Info - Only location on mobile */}
          <div className='p-4 border-b bg-Purple rounded-md '>
            <div className='flex items-center gap-2 text-sm text-gray-200'>
              <MapPin className='w-4 h-4' />
              <span className='text-sm'>ERA SPORTS TURF, PUTHANAGADI</span>
            </div>

            {/* Additional details only visible on desktop */}
            <div className='hidden md:flex flex-wrap items-center gap-4 text-sm text-gray-200 mt-2'>
              <div>
                {new Date(match?.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                })}
                <span> • </span> Kick Off:{" "}
                {new Date(match?.date).toLocaleTimeString()}
              </div>
              <div>Att: 17,154</div>
              <div>Ref: Jarred Gillett</div>
            </div>
          </div>
          {/* Score Card Section */}
        
          <div className="p-4 md:p-8 mt-4 md:mt-6 mx-2 md:mx-4 rounded-xl bg-[url('/assets/background_white.png')] bg-cover shadow-sm shadow-gray-500">
            <div className='text-center mb-4'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Super League
              </h2>
              <p className='text-sm text-gray-600'>
                {match?.round.toUpperCase()}
              </p>
            </div>

            <div className='flex items-center justify-between max-w-4xl mx-auto px-4'>
              {/* Team 1 */}
              <div className='flex flex-col items-center'>
                <img
                  src={match?.homeTeam?.logo}
                  alt={match?.homeTeam?.name}
                  className='w-12 h-12 md:w-16 md:h-16 mb-1'
                />
                <span className='text-lg md:text-3xl font-black uppercase'>
                  {match?.homeTeam?.name}
                </span>
              </div>

              {/* Score */}
              <div className='flex flex-col items-center mx-4'>
                {match?.status === "completed" ? (
                  <>
                    <div className='text-xl md:text-6xl font-bold flex items-center justify-center'>
                      <span>{match?.homeGoals}</span>
                      <span className='mx-1'>-</span>
                      <span>{match?.awayGoals}</span>
                    </div>
                    <div className='text-sm font-medium'>
                      <span className='uppercase'>FT</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-3xl md:text-6xl font-bold'>
                      <span className='text-gray-600'>--</span>
                    </div>
                    <div className='text-sm font-medium'>
                      <span className='uppercase'>
                        {new Date(match?.date).toLocaleTimeString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Team 2 */}
              <div className='flex flex-col items-center'>
                <img
                  src={match?.awayTeam?.logo}
                  alt={match?.awayTeam?.name}
                  className='w-12 h-12 md:w-16 md:h-16 mb-1'
                />
                <span className='text-lg md:text-3xl font-black uppercase'>
                  {match?.awayTeam?.name}
                </span>
              </div>
            </div>

            {/* Goals - with border line and team separation */}
            <div className='mt-6 pt-6 border-t-2 border-gray-200'>
              <div className='max-w-4xl mx-auto flex justify-between px-4'>
                {/* Newcastle Goals */}
                <div className='text-center md:text-left'>
                  <h3 className='text-xs uppercase text-gray-500 mb-2'>
                    {match?.homeTeam?.name}
                  </h3>
                  <div className='text-sm'>
                    {HomeScorer?.reduce((acc, scorer) => {
                      const existing = acc.find(
                        (s) => s.player.name === scorer.player.name
                      );
                      if (existing) {
                        existing.count += 1;
                      } else {
                        acc.push({ player: scorer.player, count: 1 });
                      }
                      return acc;
                    }, []).map((scorer) => (
                      <p key={scorer.player.name}>
                        {scorer.player.name?.replace(
                          /(^\w{1})|(\s+\w{1})/g,
                          (letter) => letter.toUpperCase()
                        )}
                        <span className='text-gray-900'>
                          {" "}
                          {scorer.count > 1 ? `x${scorer.count}` : ""}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bournemouth Goals */}
                <div className='text-center md:text-right'>
                  <h3 className='text-xs uppercase text-gray-500 mb-2'>
                    {match?.awayTeam?.name}
                  </h3>
                  <div className='text-sm'>
                    {AwayScorer?.reduce((acc, scorer) => {
                      const existing = acc.find(
                        (s) => s.player.name === scorer.player.name
                      );
                      if (existing) {
                        existing.count += 1;
                      } else {
                        acc.push({ player: scorer.player, count: 1 });
                      }
                      return acc;
                    }, []).map((scorer) => (
                      <p key={scorer.player.name}>
                        {scorer.player.name?.replace(
                          /(^\w{1})|(\s+\w{1})/g,
                          (letter) => letter.toUpperCase()
                        )}
                        <span className='text-gray-900 align-text-top'>
                          {" "}
                          {scorer.count > 1 ? `x${scorer.count}` : ""}
                        </span>
                      </p>
                    ))}
                    ;
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs Section */}
          <div className='bg-white mt-4 border-b'>
            <div className='max-w-4xl mx-auto px-4'>
              <div className='flex justify-between space-x-1 md:space-x-4 overflow-x-auto scrollbar-hide'>
                {["live", "news", "line-ups", "stats"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      relative px-3 md:px-6 py-2 text-sm md:text-base font-medium 
                      transition-colors duration-200
                      ${
                        activeTab === tab
                          ? "text-[#37003C]"
                          : "text-gray-500 hover:text-gray-700"
                      }
                      focus:outline-none whitespace-nowrap
                    `}
                  >
                    {tab.toUpperCase()}
                    {activeTab === tab && (
                      <span
                        className='absolute bottom-0 left-0 w-full h-0.5 bg-[#37003C] rounded-t-full'
                        style={{
                          transform: "scaleX(1)",
                          transition: "transform 0.2s ease-in-out",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MatchResult;
