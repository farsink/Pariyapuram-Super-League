import React from "react";

const SourceBadge = ({ source }) => {
  const getSourceColor = (sourceType) => {
    switch (sourceType) {
      case "Sky Sports":
        return "bg-blue-100 text-blue-800";
      case "BBC Sport":
        return "bg-red-100 text-red-800";
      case "ESPN":
        return "bg-red-100 text-red-800";
      case "The Athletic":
        return "bg-purple-100 text-purple-800";
      case "Guardian":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(
        source
      )}`}
    >
      {source}
    </div>
  );
};

export default SourceBadge;
