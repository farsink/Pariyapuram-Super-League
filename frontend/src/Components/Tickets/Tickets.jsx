import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MatchCard from "./MatchCard";
import SeatSelection from "./SeatSelection";
import { useSelector } from "react-redux";
import PaymentPage from "./PaymentPage";
import PaymentEmbedded from "./PaymentEmbedded";

function Tickets() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { matches, status } = useSelector((state) => state.matches);
  const [ticketData, setTicketData] = useState(null);
  const location = useLocation();

  // Determine if the URL path indicates the confirmation route
  useEffect(() => {
    if (location.pathname.endsWith("/confirmation")) {
      setCurrentStep(4);
    }
  }, [location]);

  const Scheduled = matches && [
    ...matches
      .filter((matches) => matches.status == "scheduled")
      .map((match) => ({ ...match, venue: "ERA TURF,PUTHANAGADI" })),
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

  const handleTicketCreated = (ticket) => {
    setTicketData(ticket);
    setCurrentStep(3); // Move to payment step
  };
  const renderStepIndicator = () => (
    <div className="w-full bg-white p-4 mb-6 rounded-lg shadow">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="flex items-center flex-1"
            onClick={() => {
              setCurrentStep(step.number);
              setSelectedMatch(null);
            }}
          >
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                transition-colors duration-300 ${
                  currentStep >= step.number ? "bg-[#37003C] text-white" : "bg-gray-200"
                }`}
              >
                {step.number}
              </div>
              <span className="text-sm mt-1 text-center">{step.title}</span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`h-1 w-full mx-2 relative transition-colors duration-300 ${
                  currentStep > step.number
                    ? "bg-[#37003C] text-[#37003C]"
                    : "bg-gray-200 text-gray-200"
                }`}
              >
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 
                border-t-4 border-b-4 border-l-4 border-t-transparent 
                border-b-transparent border-l-current"
                />
              </div>
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
              {Scheduled.map((match) => (
                <MatchCard
                  key={match._id}
                  match={match}
                  onSelect={() => handleMatchSelect(match)}
                />
              ))}
            </div>
          )}

          {currentStep === 2 && selectedMatch && (
            <SeatSelection match={selectedMatch} onTicketCreated={handleTicketCreated} />
          )}
          {currentStep === 3 && ticketData && <PaymentEmbedded ticket={ticketData} />}

          {/* conformation */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Tickets;
