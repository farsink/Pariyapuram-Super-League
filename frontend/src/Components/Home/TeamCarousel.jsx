import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { serverurl } from "../../Api/ServerURL";

const TeamCarousel = () => {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const { teams } = useSelector((state) => state.teams);

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
    <div className='relative w-full bg-white py-2 md:py-4 border-b'>
      <div className='max-w-5xl mx-auto px-2 md:px-4 flex items-center justify-center'>
        {showArrows && (
          <button
            onClick={() => scroll("left")}
            className='p-1 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200'
          >
            <ChevronLeft className='w-4 h-4 md:w-6 md:h-6' />
          </button>
        )}

        <div
          ref={scrollRef}
          className='flex overflow-x-hidden scroll-smooth gap-4 md:gap-8 px-2 md:px-4 mx-2 md:mx-4'
        >
          {teams?.map((team) => (
            <div
              key={team._id}
              className='flex-shrink-0 flex flex-col items-center'
            >
              <div className='w-10 h-10 md:w-16 md:h-16 rounded-full flex  items-center justify-center'>
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className='w-10 h-10 md:w-14 md:h-14 object-fill '
                />
              </div>
            </div>
          ))}
        </div>

        {showArrows && (
          <button
            onClick={() => scroll("right")}
            className='p-1 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200'
          >
            <ChevronRight className='w-4 h-4 md:w-6 md:h-6' />
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamCarousel;
