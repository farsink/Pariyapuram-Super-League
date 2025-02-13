import React, { createContext, useState, useEffect } from "react";

// Create a context
export const GoalkeeperContext = createContext();

export const GoalkeeperProvider = ({ children, matches }) => {
  const [topGoalkeeper, setTopGoalkeeper] = useState("N/A");

  useEffect(() => {
    const calculateTopGoalkeeper = () => {
      const cleanSheetCounts = {};

      matches.forEach((match) => {
        const { homeTeam, awayTeam, homeGoals, awayGoals } = match;

        const updateCleanSheets = (team, isCleanSheet) => {
          if (!isCleanSheet) return;
          const goalkeeper = team.players.find((player) => player.position === "GK");
          if (goalkeeper) {
            const { name } = goalkeeper;
            cleanSheetCounts[name] = (cleanSheetCounts[name] || 0) + 1;
          }
        };

        const homeTeamCleanSheet = awayGoals === 0;
        const awayTeamCleanSheet = homeGoals === 0;

        updateCleanSheets(homeTeam, homeTeamCleanSheet);
        updateCleanSheets(awayTeam, awayTeamCleanSheet);
      });

      let maxCleanSheets = 0;
      let topGK = "N/A";
      for (const [name, count] of Object.entries(cleanSheetCounts)) {
        if (count > maxCleanSheets) {
          topGK = name;
          maxCleanSheets = count;
        }
      }

      setTopGoalkeeper(topGK);
    };

    calculateTopGoalkeeper();
  }, [matches]);

  return (
    <GoalkeeperContext.Provider value={{ topGoalkeeper }}>{children}</GoalkeeperContext.Provider>
  );
};
