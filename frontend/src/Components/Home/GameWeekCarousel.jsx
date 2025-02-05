import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../Customs/Loader";

const GameWeekCarousel = ({ activeWeek, onWeekChange }) => {
  const scrollRef = useRef(null);
  const { matches, status } = useSelector((state) => state.matches);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const gameWeeks = matches
    ? Array.from(new Set(matches.map((match) => match.round.toUpperCase()))).map(
        (round, index) => ({ id: index + 1, label: round })
      )
    : [];

  useEffect(() => {
    if (scrollRef.current && activeWeek) {
      const activeIndex = gameWeeks.findIndex((week) => week.label === activeWeek);
      if (activeIndex !== -1) {
        const scrollAmount = activeIndex * 200; // Adjust 200 based on button width + gap
        scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }, [activeWeek, gameWeeks]);

  return (
    <div className="bg-white py-4 border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
        <button onClick={() => scroll("left")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div ref={scrollRef} className="flex overflow-x-hidden scroll-smooth gap-4">
          {status === "loading" && <Loader />}
          {gameWeeks?.map((week) => (
            <button
              key={week.id}
              onClick={() => onWeekChange(week.label)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${
                  week.label === activeWeek
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
