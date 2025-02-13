import React, { useState } from "react";
import { useSelector } from "react-redux";
import { serverurl } from "../../Api/ServerURL";
import Loader from "../Customs/Loader";

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
  const { teams, status, error } = useSelector((state) => state.teams);

  const standings =
    teams &&
    [...teams] // Create a shallow copy of the array
      .sort((a, b) => a.currentPosition - b.currentPosition) // Sort by currentPosition
      .map((team, index) => ({
        position: index + 1, // Use currentPosition if available, otherwise use index + 1
        team: {
          name: team.name,
          logo: `${serverurl}/uploads/${team.logo}`,
        },
        played: team.stats.matchesPlayed || 0, // Default to 0 if undefined
        won: team.stats.wins || 0, // Default to 0 if undefined
        drawn: team.stats.draws || 0, // Default to 0 if undefined
        lost: team.stats.losses || 0, // Default to 0 if undefined
        goalDifference: team.stats.goalDifference || 0, // Default to 0 if undefined
        points: team.currentPoints || 0, // Default to 0 if undefined
        form: team.form || [], // Default to empty array if undefined
      }));

  return (
    <div className="max-w-7xl mx-auto px-2  py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold sm:text-2xl">Premier League Table</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 sm:text-base">Form</span>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`w-12 h-6 bg-gray-200 rounded-full relative hover:bg-gray-300 ${
                showForm && "bg-green-400 hover:bg-[#37003c]"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-accent rounded-full shadow-sm transition-transform ${
                  showForm ? "right-1" : "left-1"
                }`}
              ></div>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-600 border-b sm:text-base">
                <th className="py-2 px-2 text-left sm:py-4 sm:px-4">Pos</th>
                <th className="py-2 px-2 text-left sm:py-4 sm:px-4">Team</th>
                <th className="py-2 px-2 text-center sm:py-4 sm:px-4">P</th>
                <th className="py-2 px-2 text-center sm:py-4 sm:px-4">W</th>
                {!showForm && (
                  <>
                    <th className="py-2 px-2 text-center sm:py-4 sm:px-4">D</th>
                    <th className="py-2 px-2 text-center sm:py-4 sm:px-4">L</th>
                    <th className="py-2 px-2 text-center sm:py-4 sm:px-4">+/-</th>
                    <th className="py-2 px-2 text-center sm:py-4 sm:px-4">PTS</th>
                  </>
                )}
                {showForm && <th className="py-2 px-2 text-center sm:py-4 sm:px-4">Form</th>}
              </tr>
            </thead>
            <tbody>
              {status === "loading" && <Loader />}
              {status === "failed" && <tr>Error: {error}</tr>}
              {standings?.map((team) => (
                <tr key={team.position} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-2 font-medium sm:py-4 sm:px-4">{team.position}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={team.team.logo}
                        alt={team.team.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full"
                      />
                      <span className="font-medium text-sm sm:text-base">{team.team.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-center sm:py-4 sm:px-4">{team.played}</td>
                  <td className="py-2 px-2 text-center sm:py-4 sm:px-4">{team.won}</td>
                  {!showForm && (
                    <>
                      <td className="py-2 px-2 text-center sm:py-4 sm:px-4">{team.drawn}</td>
                      <td className="py-2 px-2 text-center sm:py-4 sm:px-4">{team.lost}</td>
                      <td className="py-2 px-2 text-center sm:py-4 sm:px-4">
                        {team.goalDifference}
                      </td>
                      <td className="py-2 px-2 text-center font-bold sm:py-4 sm:px-4">
                        {team.points}
                      </td>
                    </>
                  )}
                  {showForm && (
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
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
