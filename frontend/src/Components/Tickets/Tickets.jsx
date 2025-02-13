import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MatchCard from "./MatchCard";

function Tickets() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const matches = [
    {
      id: 1,
      league: "ENGLISH PREMIER LEAGUE",
      homeTeam: "Everton",
      awayTeam: "Liverpool",
      date: "2025-02-12",
      time: "19:30",
      venue: "Goodison Park, Liverpool, United Kingdom",
      price: "£45",
    },
    {
      id: 2,
      league: "ENGLISH PREMIER LEAGUE",
      homeTeam: "Manchester City",
      awayTeam: "Newcastle United",
      date: "2025-02-15",
      time: "15:00",
      venue: "Etihad Stadium, Manchester, United Kingdom",
      price: "£55",
    },
  ];

  const steps = [
    { number: 1, title: "Choose Match" },
    { number: 2, title: "Choose Seats" },
    { number: 3, title: "Payment" },
    { number: 4, title: "Confirmation" },
  ];

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
    setCurrentStep(2);
  };
  const renderStepIndicator = () => (
    <div className="w-full bg-white p-4 mb-6 rounded-lg shadow">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex flex-col items-center ${index !== steps.length - 1 && "w-full"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.number ? "bg-[#37003C] text-white" : "bg-gray-200"
                }`}
              >
                {step.number}
              </div>
              <span className="text-sm mt-1">{step.title}</span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`h-1 w-full mx-2 ${
                  currentStep > step.number ? "bg-[#37003C]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-[#f9f9f9] text-[#37003C] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl">
            <span className="font-normal">tickets</span> <span className="font-bold">booking</span>
          </h1>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{matches?.league}</span>
            <span className="text-xs text-gray-600">
              {new Date(matches?.date).toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* {mainContent} */}
      <div className="flex flex-col md:flex-row">
        {currentStep === 1 && (
          <div className="hidden md:block w-64 bg-[#37003C] rounded-e-md min-h-screen">
            <nav className="p-4">
              <div className="space-y-4 bg-gray-100 rounded-lg shadow-md shadow-gray-950">
                <div className="flex items-center justify-between p-3 hover:bg-[#7F95D1] cursor-pointer rounded transition-colors duration-200 group">
                  <span className="font-medium">Match Info</span>
                  <ChevronRight className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1" />
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-[#7F95D1] cursor-pointer rounded transition-colors duration-200 group">
                  <span className="font-medium">Stadium Map</span>
                  <ChevronRight className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1" />
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-[#7F95D1] cursor-pointer rounded transition-colors duration-200 group">
                  <span className="font-medium">Ticket Info</span>
                  <ChevronRight className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </nav>
          </div>
        )}
        <div className="flex-1 p-6">
          {renderStepIndicator()}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} onSelect={() => handleMatchSelect(match)} />
              ))}
            </div>
          )}

          {/* {currentStep === 2 && selectedMatch && <SeatSelection match={selectedMatch} />} */}
        </div>
      </div>
    </div>
  );
}

export default Tickets;
