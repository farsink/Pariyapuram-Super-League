import React from "react";
import { Trophy, Award, Star, AlertTriangle, Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { getTopGoalkeepers } from "../../utils/StatiticsFuntions";
import { serverurl } from "../../Api/ServerURL";

const StatCard = ({ title, players, icon, color }) => {
  const getPlayerStat = (player) => {
    switch (title) {
      case "Top Scorers":
        return player.stats?.goals || 0;
      case "Clean Sheets":
        return player.cleanSheets || 0;
      case "Most Yellow Cards":
        return player.stats?.yellowCards || 0;
      case "Most Red Cards":
        return player.stats?.redCards || 0;
      default:
        return "N/A";
    }
  };

  return (
    <div key={title} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`${color} p-4 text-white`}>
        <div className="flex justify-between items-center">
          {icon}
          <span className="text-2xl font-bold">{players.length}</span>
        </div>
        <h3 className="mt-2 font-medium">{title}</h3>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {players.map((player, index) => (
          <div key={index} className="flex items-center gap-3 mb-4">
            {/* Player Image */}
            <img
              src={`${serverurl}/uploads/${player.team?.logo}` || "https://via.placeholder.com/50"} // Fallback image if no image is provided
              alt={player.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Player Details */}
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="font-semibold">{player.name.toUpperCase()}</p>
                <p className="text-sm text-gray-600">
                  {player.team?.name
                    ? player.team.name.replace(/\b\w/g, (l) => l.toUpperCase())
                    : "Unknown Team"}
                </p>
              </div>
              <div className="justify-end">
                <p className="text-sm text-gray-600">{getPlayerStat(player)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopPlayers = () => {
  const { matches } = useSelector((state) => state.matches);
  const { players } = useSelector((state) => state.players);
  const { teams } = useSelector((state) => state.teams);

  const topScorer = players.filter((player) => player.stats.goals > 5);

  const CleanSheet = getTopGoalkeepers(matches);

  const YellowCards = players.filter((player) => player.stats.yellowCards > 1);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 mx-6">Player Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* top player */}
        <StatCard
          title="Top Scorers"
          players={topScorer}
          icon={<Trophy className="w-6 h-6" />}
          color="bg-yellow-500"
        />
        {/* top goalkeeper */}
        <StatCard
          title="Clean Sheets"
          players={CleanSheet}
          icon={<Shield className="w-6 h-6" />}
          color="bg-blue-500"
        />
        {/* most yellow cards */}
        <StatCard
          title="Most Yellow Cards"
          players={YellowCards} // Example filter
          icon={<AlertTriangle className="w-6 h-6" />}
          color="bg-amber-500"
        />
        {/* most red cards */}
        <StatCard
          title="Most Red Cards"
          players={players.filter((player) => player.stats.redCards > 0)} // Example filter
          icon={<Award className="w-6 h-6" />}
          color="bg-red-500"
        />
      </div>
    </div>
  );
};

export default TopPlayers;
