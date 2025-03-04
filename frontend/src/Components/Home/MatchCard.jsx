import React from "react";
import styled from "styled-components";
import { serverurl } from "../../Api/ServerURL";
import { useNavigate } from "react-router-dom";

const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  let Matchdate = match?.find((match) => match.date)?.date;
  return (
    // <StyledWrapper>
    <div className='bg-white rounded-lg shadow-md overflow-hidden mb-4'>
      {/* Header Section */}
      <div className='px-6 py-4 border-b flex items-center gap-3'>
        <img
          src='/assets/psl-logo1.png'
          alt='Premier League'
          className='w-6 h-6 sm:w-8 sm:h-8'
        />
        <h3 className='font-bold text-lg sm:text-xl'>
          {new Date(Matchdate).toLocaleString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
      </div>

      {/* Matches List */}
      <div className='divide-y'>
        {match?.map((game) => (
          <div
            key={game._id}
            className='px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer'
            onClick={() => navigate(`/match/${game._id}`)}
          >
            <div className='flex items-center justify-between'>
              {/* Home Team */}
              <div className='flex items-center gap-2 sm:gap-4 flex-1'>
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.name}
                  className='w-6 h-6 sm:w-8 sm:h-8'
                />
                <div className='relative overflow-hidden whitespace-nowrap max-w-[100px] sm:max-w-[150px]'>
                  <span
                    className='font-medium text-sm sm:text-base inline-block animate-marquee'
                    style={{
                      animationDuration: "5s", // Adjust speed of scrolling
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                    }}
                  >
                    {game.homeTeam.name.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Match Time */}
              {game.status === "completed" ? (
                <>
                  <div className='flex items-center justify-center px-4 min-w-[60px]'>
                    <div className='font-bold text-base sm:text-lg'>
                      <span className='border text-textColor border-solid p-2 bg-[#37003c] rounded'>
                        {game.homeGoals}
                      </span>
                      :
                      <span className='border text-textColor border-solid p-2 bg-[#37003c] rounded'>
                        {game.awayGoals}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className='flex items-center justify-center px-4 min-w-[60px]'>
                  <span className='font-bold text-base sm:text-lg'>
                    {new Date(game.date).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
              )}
              {/* Away Team */}
              <div className='flex items-center gap-2 sm:gap-4 flex-1 justify-end'>
                <div className='relative overflow-hidden whitespace-nowrap max-w-[100px] sm:max-w-[150px]'>
                  <span
                    className='font-medium text-sm sm:text-base inline-block animate-marquee'
                    style={{
                      animationDuration: "5s", // Adjust speed of scrolling
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                    }}
                  >
                    {game.awayTeam.name.toUpperCase()}
                  </span>
                </div>
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.name}
                  className='w-6 h-6 sm:w-8 sm:h-8'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .animate-marquee {
    display: inline-block;
    padding-left: 100%; /* Start off-screen */
    animation-name: marquee;
  }

  @keyframes marquee {
    from {
      transform: translateX(10%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;
export default MatchCard;
