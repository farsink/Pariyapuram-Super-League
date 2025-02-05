import React, { useState, useEffect } from "react";

const tabs = ["Matches", "Results", "Overview", "Standings", "Top Players"];

const MatchTabs = ({ activeTab, onTabChange }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`bg-white ${isSticky ? "sticky top-16 z-30 shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto custom-scrollbar">
          <nav className="flex min-w-max px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`
                  whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === tab
                      ? "border-[#37003c] text-[#37003c]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MatchTabs;
