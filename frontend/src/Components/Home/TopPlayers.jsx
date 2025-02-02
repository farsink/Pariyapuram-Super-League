import React from "react";
import { Trophy, Award, Star, AlertTriangle } from "lucide-react";

const statCards = [
  {
    id: 1,
    title: "Top Scorer",
    player: {
      name: "Erling Haaland",
      team: "Manchester City",
      teamLogo: "https://resources.premierleague.com/premierleague/badges/t43.svg",
    },
    value: 14,
    icon: <Trophy className="w-6 h-6" />,
    color: "bg-yellow-500",
  },
  {
    id: 2,
    title: "Most Assists",
    player: {
      name: "Ollie Watkins",
      team: "Aston Villa",
      teamLogo: "https://resources.premierleague.com/premierleague/badges/t7.svg",
    },
    value: 8,
    icon: <Award className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Most Clean Sheets",
    player: {
      name: "Alisson",
      team: "Liverpool",
      teamLogo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
    },
    value: 8,
    icon: <Star className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Most Yellow Cards",
    player: {
      name: "Bruno Guimarães",
      team: "Newcastle",
      teamLogo: "https://resources.premierleague.com/premierleague/badges/t4.svg",
    },
    value: 7,
    icon: <AlertTriangle className="w-6 h-6" />,
    color: "bg-amber-500",
  },
];

const TopPlayers = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 mx-6">Player Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className={`${stat.color} p-4 text-white`}>
              <div className="flex justify-between items-center">
                {stat.icon}
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <h3 className="mt-2 font-medium">{stat.title}</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <img
                  src={stat.player.teamLogo}
                  alt={stat.player.team}
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="font-semibold">{stat.player.name}</p>
                  <p className="text-sm text-gray-600">{stat.player.team}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlayers;
