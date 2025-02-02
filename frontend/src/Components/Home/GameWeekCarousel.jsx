import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GameWeekCarousel = ({ activeWeek, onWeekChange }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const gameWeeks = [
    { id: 23, label: "Game Week 23" },
    { id: 24, label: "Game Week 24" },
    { id: 25, label: "Game Week 25" },
  ];

  return (
    <div className="bg-white py-4 border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
        <button onClick={() => scroll("left")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div ref={scrollRef} className="flex overflow-x-hidden scroll-smooth gap-4">
          {gameWeeks.map((week) => (
            <button
              key={week.id}
              onClick={() => onWeekChange(week.id)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${
                  week.id === activeWeek
                    ? "bg-[#37003c] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {week.label}
            </button>
          ))}
        </div>

        <button onClick={() => scroll("right")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default GameWeekCarousel;
