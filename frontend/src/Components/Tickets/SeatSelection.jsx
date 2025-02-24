import React, { useEffect, useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { createTicket, getSeatAvailability } from "../../Api/ApiList";
import { useUserContext } from "../../context/UserContext";

export default function SeatSelection({ match, onTicketCreated }) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [availability, setAvailability] = useState({ low: 0, premium: 0, VIP: 0 });
  const { user } = useUserContext();

  console.log(user);

  useEffect(() => {
    if (match) {
      getSeatAvailability(match._id).then((response) => {
        setAvailability(response.data.remainingSeats);
      });
    }
  }, [match]);

  const handleSeatSelect = (section) => {
    setSelectedSeat({
      section: section,
      tiers: {
        low: { price: 100, seatNumbers: availability.low },
        premium: { price: 150, seatNumbers: availability.premium },
        VIP: { price: 200, seatNumbers: availability.VIP },
      },
    });
    setSelectedTier(null); // Reset tier selection
  };

  const HandleClear = () => {
    setSelectedSeat(null);
    setSelectedTier(null);
    setTicketQuantity(1);
  };

  const handleGetNow = async () => {
    try {
      const SelectedData = {
        matchId: match._id,
        quantity: ticketQuantity,
        seatTier: selectedTier,
        pricePerTicket: selectedSeat.tiers[selectedTier].price,
        userId: user?.id,
      };

      const response = await createTicket(SelectedData);

      if (response.status === 200) {
        onTicketCreated(response.data.ticket);
        HandleClear();
      } else {
        alert("Failed to create ticket, please try again.");
      }
    } catch (error) {
      console.log("Error fetching seat availability:", error);
    }
  };
  const sectionColors = {
    east: "#DC2626",
    family: "#9333EA",
    south: "#60A5FA",
    west: "#F59E0B",
    premium: "#065F46",
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Stadium Diagram */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-xl md:text-2xl font-bold">{match?.venue}</h1>
              <button
                className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                onClick={HandleClear}
              >
                Clear stadium map filters
              </button>
            </div>

            <div className="relative">
              <svg viewBox="0 0 1200 800" className="w-full">
                <g transform="translate(100, 50)">
                  <text
                    x="500"
                    y="30"
                    className="text-base md:text-lg font-bold"
                    textAnchor="middle"
                  >
                    EAST STAND
                  </text>
                  <path
                    d="M300,50 Q500,30 700,50 L700,100 Q500,80 300,100 Z"
                    fill={sectionColors.east}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("East-301")}
                  />

                  <text
                    x="500"
                    y="620"
                    className="text-base md:text-lg font-bold"
                    textAnchor="middle"
                  >
                    WEST STAND
                  </text>

                  <path
                    d="M300,510 Q500,530 700,510 L700,570 Q500,590 300,570 Z"
                    fill={sectionColors.west}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("West-201")}
                  />

                  <text
                    x="130"
                    y="350"
                    className="text-base md:text-lg font-bold"
                    transform="rotate(-90 130,350)"
                  >
                    FAMILY STAND
                  </text>
                  <path
                    d="M170,170 
     Q160,310 170,450 
     L210,450 
     Q200,310 210,170 Z"
                    fill={sectionColors.family}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("Family-101")}
                  />

                  <text
                    x="800"
                    y="360"
                    className="text-base md:text-lg font-bold"
                    transform="rotate(90 870,350)"
                  >
                    SOUTH STAND
                  </text>
                  <path
                    d="M790,200 
                       Q800,320 790,440 
                       L830,440 
                       Q840,320 830,200 Z"
                    fill={sectionColors.south}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("South-401")}
                  />

                  {/* Corner Sections */}
                  <path
                    d="M210,180 C220,160 280,100 300,100 L300,140 C280,140 230,160 210,180 Z"
                    fill={sectionColors.premium}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("Corner-TL")}
                  />
                  <path
                    d="M700,100 C720,100 780,160 790,180 L790,220 C780,200 720,140 700,140 Z"
                    fill={sectionColors.premium}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("Corner-TR")}
                  />
                  <path
                    d="M210,450 C220,470 280,510 300,510 L300,470 C280,470 230,450 210,450 Z"
                    fill={sectionColors.premium}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("Corner-BL")}
                  />
                  <path
                    d="M700,510 C720,510 780,470 790,450 L790,410 C780,430 720,470 700,470 Z"
                    fill={sectionColors.premium}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleSeatSelect("Corner-BR")}
                  />

                  {/* Football Field */}
                  <g transform="translate(250, 150)">
                    <rect x="0" y="0" width="500" height="300" fill="#2F4F2F" />
                    <rect
                      x="0"
                      y="0"
                      width="500"
                      height="300"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />

                    <line x1="250" y1="0" x2="250" y2="300" stroke="white" strokeWidth="2" />
                    <circle cx="250" cy="150" r="50" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="250" cy="150" r="2" fill="white" />

                    <rect
                      x="0"
                      y="75"
                      width="60"
                      height="150"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <rect
                      x="440"
                      y="75"
                      width="60"
                      height="150"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />

                    <rect
                      x="0"
                      y="120"
                      width="20"
                      height="60"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <rect
                      x="480"
                      y="120"
                      width="20"
                      height="60"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />

                    <path d="M0,0 A10,10 0 0,1 10,10" fill="none" stroke="white" strokeWidth="2" />
                    <path
                      d="M500,0 A10,10 0 0,0 490,10"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,300 A10,10 0 0,0 10,290"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M500,300 A10,10 0 0,1 490,290"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />

                    <circle cx="50" cy="150" r="1" fill="white" />
                    <circle cx="450" cy="150" r="1" fill="white" />

                    <path
                      d="M80,150 A40,40 0 0,1 80,150"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M420,150 A40,40 0 0,0 420,150"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1">
          {selectedSeat ? (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-start gap-4 border-b pb-4">
                <div className="p-2 bg-gray-100 rounded">
                  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 12h12M6 12V5a2 2 0 012-2h8a2 2 0 012 2v7M6 12v7a2 2 0 002 2h8a2 2 0 002-2v-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-semibold">
                    Section: {selectedSeat.section}
                  </h2>
                  {/* <p className="text-sm md:text-base text-gray-600">Man City Fans</p> */}
                </div>
              </div>

              {/* Tier Selection */}
              <div className="py-4 space-y-3 md:space-y-4">
                <h3 className="text-sm md:text-base font-semibold">Choose a Tier:</h3>
                <div className="flex gap-2">
                  {Object.keys(selectedSeat.tiers).map((tier) => (
                    <button
                      key={tier}
                      className={`px-4 py-2 rounded-md text-sm font-semibold ${
                        selectedTier === tier
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedTier(tier)}
                    >
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </button>
                  ))}
                </div>

                {selectedTier && (
                  <div className="mt-4">
                    <p className="text-sm md:text-base">
                      Selected Tier: <strong>{selectedTier}</strong>
                    </p>
                    <p className="text-sm md:text-base">
                      Price: ₹{selectedSeat.tiers[selectedTier].price.toFixed(2)} per ticket
                    </p>
                    <p className="text-sm md:text-base">
                      Seats: {`${selectedSeat.tiers[selectedTier].seatNumbers} Available`}
                    </p>
                  </div>
                )}

                {/* Ticket Quantity and Total Price */}
                {selectedTier && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="relative">
                      <select
                        value={ticketQuantity}
                        onChange={(e) => setTicketQuantity(Number(e.target.value))}
                        className="appearance-none bg-white border rounded-md px-3 md:px-4 py-1.5 md:py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} ticket{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-right">
                      <p className="text-xl md:text-2xl font-bold">
                        ₹{(selectedSeat.tiers[selectedTier].price * ticketQuantity).toFixed(2)}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">per ticket</p>
                    </div>
                  </div>
                )}

                {selectedTier && (
                  <button
                    onClick={handleGetNow}
                    className="w-full bg-green-500 text-white rounded-md py-2 md:py-3 text-sm md:text-base font-semibold hover:bg-green-600 transition-colors"
                  >
                    Get Now
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-6 md:py-8 bg-white rounded-lg shadow-md">
              Select a seat to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
