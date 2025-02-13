import React from "react";
import { Trophy, TrendingUp, Users, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { getTopGoalkeepers } from "../../utils/StatiticsFuntions";

const OverviewSection = () => {
  const { matches, status } = useSelector((state) => state.matches);
  const { teams } = useSelector((state) => state.teams);
  const { players } = useSelector((state) => state.players);

  const topGoalKeeper = getTopGoalkeepers(matches);


  const stats = [
    {
      id: 1,
      title: "Current Leaders",
      value: (teams && teams[0]?.name.toUpperCase()) || "Not Available",
      icon: <Trophy className="w-6 h-6" />,
      change: teams && teams[0] ? `+${teams[0].currentPoints}` : "N/A",
    },
    {
      id: 2,
      title: "Top Scorer",
      value: (players && players[0]?.name.toUpperCase()) || "Not Available",
      icon: <TrendingUp className="w-6 h-6" />,
      change: players && players[0]?.stats?.goals ? `${players[0].stats.goals} Goals` : "0 Goals",
    },
    {
      id: 3,
      title: "Most Clean Sheats",
      value: topGoalKeeper.length > 0 ? topGoalKeeper[0]?.name.toUpperCase() : "Not Available",
      icon: <Users className="w-6 h-6" />,
      change: topGoalKeeper.length > 0 ? `${topGoalKeeper[0]?.cleanSheets} Clean Sheets` : "N/A",
    },
    {
      id: 4,
      title: "Next Matchday",
      value:
        matches && matches.length > 0
          ? (() => {
              const nextMatch = matches.find((match) => match.status === "scheduled");
              return nextMatch
                ? new Date(nextMatch.date).toLocaleString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "No Match Scheduled";
            })()
          : "No Match Scheduled",
      icon: <Calendar className="w-6 h-6" />,
      change: "",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Season Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[#37003c] bg-opacity-10 rounded-lg">{stat.icon}</div>
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
