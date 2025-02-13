// /**
//  * Function to calculate the top goalkeepers based on clean sheets.
//  * @param {Array} matches - Array of match objects.
//  * @returns {Array} - Sorted array of goalkeepers with their clean sheet counts.
//  */
export const getTopGoalkeepers = (matches) => {
  if (!Array.isArray(matches) || matches.length === 0) {
    return []; // Return an empty array if matches are invalid or empty
  }

  const cleanSheetCounts = {};

  // Iterate through all matches
  matches.forEach((match) => {
    const { homeTeam, awayTeam, homeGoals, awayGoals } = match;

    // Helper function to update clean sheet counts
    const updateCleanSheets = (team, isCleanSheet) => {
      if (!isCleanSheet) return;
      const goalkeeper = team.players.find((player) => player.position === "GK");
      if (goalkeeper)  {
        const { name } = goalkeeper;
        if (!cleanSheetCounts[name]) {
          cleanSheetCounts[name] = {
            count: 0,
            team :{
              name: team.name,
              logo: team.logo,
            },
          };
        }
        cleanSheetCounts[name].count += 1;
      }
    };

    // Check for clean sheets
    const homeTeamCleanSheet = awayGoals === 0; // Home team did not concede
    const awayTeamCleanSheet = homeGoals === 0; // Away team did not concede

    // Update clean sheet counts for both teams
    updateCleanSheets(homeTeam, homeTeamCleanSheet);
    updateCleanSheets(awayTeam, awayTeamCleanSheet);
  });

  // Convert the cleanSheetCounts object into an array of objects
  const topGoalkeepers = Object.entries(cleanSheetCounts).map(([name, data]) => ({
    name,
    cleanSheets: data.count,
    team: {
      name: data.team.name,
      logo: data.team.logo,
    },
  }));

  // Sort the array by clean sheet count in descending order
  topGoalkeepers.sort((a, b) => b.cleanSheets - a.cleanSheets);

  return topGoalkeepers;
};


