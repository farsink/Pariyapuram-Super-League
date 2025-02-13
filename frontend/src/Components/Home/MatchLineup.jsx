import React from "react";
import { Users } from "lucide-react";

const MatchLineup = () => {
  const newcastlePlayers = [
    { number: 22, name: "Dubravka", position: "GK" },
    { number: 2, name: "Trippier", position: "RB" },
    { number: 39, name: "Bruno G.", position: "CM" },
    { number: 10, name: "Gordon", position: "LW" },
    { number: 14, name: "Isak", position: "ST" },
  ];

  const newcastleSubs = [
    { number: 7, name: "Longstaff", position: "CM" },
    { number: 11, name: "Murphy", position: "RW" },
  ];

  const bournemouthPlayers = [
    { number: 1, name: "Neto", position: "GK" },
    { number: 2, name: "Smith", position: "RB" },
    { number: 8, name: "Christie", position: "CM" },
    { number: 9, name: "Solanke", position: "ST" },
    { number: 7, name: "Kluivert", position: "LW" },
  ];

  const bournemouthSubs = [
    { number: 4, name: "Cook", position: "CM" },
    { number: 10, name: "Billing", position: "CAM" },
  ];

  const FormationField = ({ players, teamName }) => (
    <div className="relative w-full">
      <div className="aspect-[3/4] bg-[#2b8a3e] rounded-lg p-4 relative overflow-hidden">
        {/* SVG Football Field */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Field base */}
          <rect width="300" height="400" fill="#2b8a3e" />

          {/* Field lines */}
          <g stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            {/* Outer border */}
            <rect x="10" y="10" width="280" height="380" />

            {/* Center line */}
            <line x1="10" y1="200" x2="290" y2="200" />

            {/* Center circle */}
            <circle cx="150" cy="200" r="30" />
            <circle cx="150" cy="200" r="2" fill="rgba(255,255,255,0.3)" />

            {/* Penalty areas */}
            <rect x="90" y="10" width="120" height="60" />
            <rect x="90" y="330" width="120" height="60" />

            {/* Goal areas */}
            <rect x="120" y="10" width="60" height="30" />
            <rect x="120" y="360" width="60" height="30" />

            {/* Corner arcs */}
            <path d="M10,10 Q10,20 20,20" />
            <path d="M290,10 Q290,20 280,20" />
            <path d="M10,390 Q10,380 20,380" />
            <path d="M290,390 Q290,380 280,380" />
          </g>
        </svg>

        {/* Players */}
        <div className="relative h-full flex flex-col justify-between z-10">
          {/* Striker */}
          <div className="flex justify-center pt-4">
            <PlayerDot player={players[4]} />
          </div>
          {/* Midfield */}
          <div className="flex justify-around py-2">
            <PlayerDot player={players[3]} />
            <PlayerDot player={players[2]} />
          </div>
          {/* Defense */}
          <div className="flex justify-around py-2">
            <PlayerDot player={players[1]} />
          </div>
          {/* Goalkeeper */}
          <div className="flex justify-center pb-4">
            <PlayerDot player={players[0]} />
          </div>
        </div>
      </div>
    </div>
  );

  const PlayerDot = ({ player }) => (
    <div className="flex flex-col items-center">
      <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-green-700 shadow-md">
        {player.number}
      </div>
      <div className="mt-0.5 text-[8px] sm:text-[10px] text-white font-medium text-center">
        {player.name}
      </div>
    </div>
  );

  const SubsList = ({ subs, title }) => (
    <div className="mt-2 sm:mt-4">
      <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 pb-1 border-b border-gray-200">
        {title}
      </h4>
      <div className="space-y-1 sm:space-y-2">
        {subs.map((player) => (
          <div
            key={player.number}
            className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-gray-50 rounded-md"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm font-medium">
              {player.number}
            </span>
            <span className="flex-1 font-medium text-xs sm:text-sm">{player.name}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">{player.position}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white">
      <div className="mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 uppercase"
          style={{ fontFamily: "system-ui" }}
        >
          STARTING LINE-UP
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-8">
        {/* Newcastle Section */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <img
              src="https://resources.premierleague.com/premierleague/badges/t4.png"
              alt="Newcastle"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <h3 className="font-bold text-sm sm:text-lg">Newcastle United</h3>
          </div>
          <FormationField players={newcastlePlayers} teamName="Newcastle United" />
          <SubsList subs={newcastleSubs} title="Substitutes" />
        </div>

        {/* Bournemouth Section */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-2 sm:mb-4">
            <img
              src="https://resources.premierleague.com/premierleague/badges/t91.png"
              alt="Bournemouth"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <h3 className="font-bold text-sm sm:text-lg">AFC Bournemouth</h3>
          </div>
          <FormationField players={bournemouthPlayers} teamName="AFC Bournemouth" />
          <SubsList subs={bournemouthSubs} title="Substitutes" />
        </div>
      </div>
    </div>
  );
};

export default MatchLineup;
