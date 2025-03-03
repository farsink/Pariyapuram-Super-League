import React from "react";
import { Play, Clock, Eye } from "lucide-react";
import "./video.css";

const VideoCard = ({ title, thumbnail, duration, views, date, competition = "highlights", onClick }) => {
  function convertYouTubeDuration(duration) {
    // Match the duration using a regex. The parts may be missing.
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
 if (!match) {
   return "0:00"; // Default value if duration is invalid
 }
    // Extract the parts, defaulting to 0 if they don't exist.
    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);

    // Format the result as HH:MM:SS or MM:SS if there are no hours.
    const formattedMinutes = hours > 0 ? minutes.toString().padStart(2, "0") : minutes;
    const formattedSeconds = seconds.toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  }
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img src={thumbnail} alt={title} className="w-full aspect-video object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center play-button-container">
          <div className="bg-red-600 rounded-full p-2">
            <Play className="w-8 h-8 text-white" fill="white" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-sm rounded-md flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {convertYouTubeDuration(duration)}
        </span>
        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
          {competition}
        </span>
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-semibold text-gray-800 line-clamp-2 text-lg">{title}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views}
          </span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
