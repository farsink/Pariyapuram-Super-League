import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teams = [
  {
    id: 1,
    name: "Arsenal",
    logo: "https://resources.premierleague.com/premierleague/badges/t3.svg",
  },
  {
    id: 2,
    name: "Aston Villa",
    logo: "https://resources.premierleague.com/premierleague/badges/t7.svg",
  },
  {
    id: 3,
    name: "Bournemouth",
    logo: "https://resources.premierleague.com/premierleague/badges/t91.svg",
  },
  {
    id: 4,
    name: "Brighton",
    logo: "https://resources.premierleague.com/premierleague/badges/t36.svg",
  },
  {
    id: 5,
    name: "Chelsea",
    logo: "https://resources.premierleague.com/premierleague/badges/t8.svg",
  },
  {
    id: 6,
    name: "Crystal Palace",
    logo: "https://resources.premierleague.com/premierleague/badges/t31.svg",
  },
  {
    id: 7,
    name: "Everton",
    logo: "https://resources.premierleague.com/premierleague/badges/t11.svg",
  },
  {
    id: 8,
    name: "Fulham",
    logo: "https://resources.premierleague.com/premierleague/badges/t54.svg",
  },
  {
    id: 9,
    name: "Liverpool",
    logo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
  },
  {
    id: 10,
    name: "Manchester City",
    logo: "https://resources.premierleague.com/premierleague/badges/t43.svg",
  },
];

const TeamCarousel = () => {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full bg-white py-2 md:py-4 border-b">
      <div className="max-w-5xl mx-auto px-2 md:px-4 flex items-center justify-center">
        {showArrows && (
          <button
            onClick={() => scroll("left")}
            className="p-1 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden scroll-smooth gap-4 md:gap-8 px-2 md:px-4 mx-2 md:mx-4"
        >
          {teams.map((team) => (
            <div key={team.id} className="flex-shrink-0 flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="w-8 h-8 md:w-12 md:h-12 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {showArrows && (
          <button
            onClick={() => scroll("right")}
            className="p-1 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamCarousel;