import React from "react";
import { MapPin, Clock } from "lucide-react";

const MatchCard = ({ match, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 border-b border-gray-200">
        <span className="text-sm text-gray-600">{match.league}</span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">{match.homeTeam}</div>
          <div className="text-sm font-medium">vs</div>
          <div className="text-xl font-bold">{match.awayTeam}</div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{match.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{match.venue}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-[#37003C]">From {match.price}</div>
          <button
            onClick={onSelect}
            className="bg-[#37003C] text-white px-6 py-2 rounded-full hover:bg-[#2D0031] transition-colors"
          >
            View Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
