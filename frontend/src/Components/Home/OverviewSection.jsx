import React from "react";
import { Trophy, TrendingUp, Users, Calendar } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Current Leaders",
    value: "Liverpool",
    icon: <Trophy className="w-6 h-6" />,
    change: "+2 Points",
  },
  {
    id: 2,
    title: "Top Scorer",
    value: "Haaland",
    icon: <TrendingUp className="w-6 h-6" />,
    change: "21 Goals",
  },
  {
    id: 3,
    title: "Most Assists",
    value: "De Bruyne",
    icon: <Users className="w-6 h-6" />,
    change: "12 Assists",
  },
  {
    id: 4,
    title: "Next Matchday",
    value: "Feb 10",
    icon: <Calendar className="w-6 h-6" />,
    change: "Gameweek 24",
  },
];

const OverviewSection = () => {
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
