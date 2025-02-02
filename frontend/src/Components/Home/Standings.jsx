import React, { useState } from "react";

const standings = [
  {
    position: 1,
    team: {
      name: "Liverpool",
      logo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
    },
    played: 23,
    won: 17,
    drawn: 5,
    lost: 1,
    goalDifference: 35,
    points: 56,
    form: ["W", "W", "W", "D", "D"],
  },
  {
    position: 2,
    team: {
      name: "Arsenal",
      logo: "https://resources.premierleague.com/premierleague/badges/t3.svg",
    },
    played: 23,
    won: 13,
    drawn: 8,
    lost: 2,
    goalDifference: 23,
    points: 47,
    form: ["W", "D", "W", "D", "W"],
  },
  // ... (previous standings data with form added)
];

const FormBadge = ({ result }) => {
  const bgColor = result === "W" ? "bg-green-600" : result === "D" ? "bg-gray-500" : "bg-red-600";

  return (
    <div
      className={`${bgColor} w-8 h-8 rounded-sm flex items-center justify-center text-white font-medium`}
    >
      {result}
    </div>
  );
};

const Standings = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Premier League Table</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Form</span>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`w-12 h-6 bg-gray-200 rounded-full relative  hover:bg-gray-300 ${
                showForm ? "bg-background hover:bg-background" : ""
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                  showForm ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-600 border-b">
                <th className="py-4 px-4 text-left">Pos</th>
                <th className="py-4 px-4 text-left">Team</th>
                <th className="py-4 px-4 text-center">P</th>
                <th className="py-4 px-4 text-center">W</th>
                {!showForm && (
                  <>
                    <th className="py-4 px-4 text-center">D</th>
                    <th className="py-4 px-4 text-center">L</th>
                    <th className="py-4 px-4 text-center">+/-</th>
                    <th className="py-4 px-4 text-center">PTS</th>
                  </>
                )}
                {showForm && <th className="py-4 px-4 text-center">Form</th>}
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr key={team.position} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium">{team.position}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={team.team.logo}
                        alt={team.team.name}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="font-medium">{team.team.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">{team.played}</td>
                  <td className="py-4 px-4 text-center">{team.won}</td>
                  {!showForm && (
                    <>
                      <td className="py-4 px-4 text-center">{team.drawn}</td>
                      <td className="py-4 px-4 text-center">{team.lost}</td>
                      <td className="py-4 px-4 text-center">{team.goalDifference}</td>
                      <td className="py-4 px-4 text-center font-bold">{team.points}</td>
                    </>
                  )}
                  {showForm && (
                    <td className="py-4 px-4">
                      <div className="flex gap-1 justify-center">
                        {team.form.map((result, index) => (
                          <FormBadge key={index} result={result} />
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Standings;
