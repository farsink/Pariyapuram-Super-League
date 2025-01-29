const Player = require("../Models/Player");
const Team = require("../Models/Team");

// Update player stats (goals, cards)
// Update player stats (goals, cards)
async function updatePlayerStats(goalScorers, cards) {
  // Update goal scorers
  for (const { player } of goalScorers) {
    await Player.findByIdAndUpdate(player, { $inc: { "stats.goals": 1 } });
  }

  // Update cards
  for (const { player, cardType } of cards) {
    if (cardType === "yellow") {
      await Player.findByIdAndUpdate(player, { $inc: { "stats.yellowCards": 1 } });
    } else if (cardType === "red") {
      await Player.findByIdAndUpdate(player, { $inc: { "stats.redCards": 1 } });
    }
  }
}

// Update team stats (wins, draws, losses, points, goals)
async function updateTeamStats(homeTeamId, awayTeamId, homeGoals, awayGoals) {
  const homeTeamUpdate = { $inc: { "stats.goalsScored": homeGoals, "stats.goalsConceded": awayGoals } };
  const awayTeamUpdate = { $inc: { "stats.goalsScored": awayGoals, "stats.goalsConceded": homeGoals } };

  if (homeGoals > awayGoals) {
    homeTeamUpdate.$inc["stats.wins"] = 1;
    homeTeamUpdate.$inc["stats.points"] = 3;
    awayTeamUpdate.$inc["stats.losses"] = 1;
  } else if (homeGoals < awayGoals) {
    awayTeamUpdate.$inc["stats.wins"] = 1;
    awayTeamUpdate.$inc["stats.points"] = 3;
    homeTeamUpdate.$inc["stats.losses"] = 1;
  } else {
    homeTeamUpdate.$inc["stats.draws"] = 1;
    homeTeamUpdate.$inc["stats.points"] = 1;
    awayTeamUpdate.$inc["stats.draws"] = 1;
    awayTeamUpdate.$inc["stats.points"] = 1;
  }

  await Team.findByIdAndUpdate(homeTeamId, homeTeamUpdate);
  await Team.findByIdAndUpdate(awayTeamId, awayTeamUpdate);
}

module.exports = {
  updatePlayerStats,
  updateTeamStats,
};