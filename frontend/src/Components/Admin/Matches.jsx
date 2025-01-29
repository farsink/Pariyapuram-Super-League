import React, { useState } from "react";
import { Calendar, Home, LucideGoal, Edit, Trash2, Plus, Clock, Trophy, Goal } from "lucide-react";
import styled from "styled-components";

const MatchesContainer = styled.div`
  .match-form {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;
  }

  .match-card {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;

    &.scheduled {
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
    }
    &.ongoing {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    &.completed {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  }
`;

function MatchesManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [matches, setMatches] = useState([
    {
      id: 1,
      date: "2024-03-25",
      homeTeam: "Team Alpha",
      awayTeam: "Team Beta",
      round: "Quarter Final",
      score: "2-1",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-04-01",
      homeTeam: "Team Gamma",
      awayTeam: "Team Delta",
      round: "Semi Final",
      score: "0-0",
      status: "scheduled",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ScoreHome = formData.get("score").split("-")[0];
    const ScoreAway = formData.get("score").split("-")[1];
    const Wonteam = ScoreHome > ScoreAway ? formData.get("homeTeam") : formData.get("awayTeam");
    const goalScorers = [{
    }];

    
    const matchData = {
      date: formData.get("date"),
      homeTeam: formData.get("homeTeam"),
      awayTeam: formData.get("awayTeam"),
      round: formData.get("round"),
      homeGoals: ScoreHome,
      awayGoals: ScoreAway,
      wonTeam: Wonteam,
      status: formData.get("status"),
      goalScorers:[],
    };

    if (editingMatch) {
      setMatches(matches.map((m) => (m.id === editingMatch.id ? matchData : m)));
    } else {
      setMatches([...matches, matchData]);
    }

    setShowForm(false);
    setEditingMatch(null);
  };

  const handleDelete = (id) => {
    setMatches(matches.filter((m) => m.id !== id));
  };

  return (
    <MatchesContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Matches Management</h1>
          <p className="text-gray-400">Manage tournament matches and schedules</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Match
        </button>
      </div>

      {showForm && (
        <div className="match-form p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {editingMatch ? "Edit Match" : "New Match"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={editingMatch?.date}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Round</label>
                <select
                  name="round"
                  defaultValue={editingMatch?.round}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
                >
                  <option value="Group Stage">Group Stage</option>
                  <option value="Quarter Final">Quarter Final</option>
                  <option value="Semi Final">Semi Final</option>
                  <option value="Final">Final</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Home Team</label>
                <input
                  name="homeTeam"
                  defaultValue={editingMatch?.homeTeam}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Away Team</label>
                <input
                  name="awayTeam"
                  defaultValue={editingMatch?.awayTeam}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
            </div>

            {editingMatch && (
              <>
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Score (Home-Away)</label>
                    <input
                      name="score"
                      placeholder="e.g., 2-1"
                      defaultValue={editingMatch?.score}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Status</label>
                    <select
                      name="status"
                      defaultValue={editingMatch?.status}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Home Team Goal Scorers
                    </label>
                    <input
                      name="homeTeamGoalScorers"
                      defaultValue={editingMatch?.homeTeamGoalScorers}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Away Team Goal Scorers
                    </label>
                    <input
                      name="awayTeamGoalScorers"
                      defaultValue={editingMatch?.awayTeamGoalScorers}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Yellow Cards</label>
                    <input
                      name="YellowCards"
                      defaultValue={editingMatch?.YellowCards}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">RedCards</label>
                    <input
                      name="RedCards"
                      defaultValue={editingMatch?.redcards}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMatch(null);
                }}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
              >
                {editingMatch ? "Update" : "Create"} Match
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="match-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <Calendar size={18} />
                <span>{new Date(match.date).toLocaleDateString()}</span>
              </div>
              <span className={`status-badge ${match.status}`}>{match.status}</span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <Home size={24} className="mb-1 text-green-500" />
                <span className="font-medium">{match.homeTeam}</span>
              </div>
              <span className="text-2xl font-bold">vs</span>
              <div className="text-center">
                <Goal size={24} className="mb-1 text-red-500" />
                <span className="font-medium">{match.awayTeam}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>{match.round}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{match.score}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setEditingMatch(match);
                  setShowForm(true);
                }}
                className="text-indigo-400 hover:text-indigo-300"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(match.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </MatchesContainer>
  );
}

export default MatchesManagement;
