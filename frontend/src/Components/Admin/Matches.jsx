import React, { useEffect, useState } from "react";
import { Calendar, Home, LucideGoal, Edit, Trash2, Plus, Clock, Trophy, Goal } from "lucide-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addMatchAsync,
  deleteMatchAsync,
  fetchMatches,
  updateMatchAsync,
} from "../../Redux/slices/MatchSlice";
import { serverurl } from "../../Api/ServerURL";
import Swal from "sweetalert2";
import { Slide, toast, ToastContainer } from "react-toastify";

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
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const { matches, status, error } = useSelector((state) => state.matches);
  const [selectedHomeScorers, setSelectedHomeScorers] = useState([]);
  const [selectedAwayScorers, setSelectedAwayScorers] = useState([]);
  const [selectedYellowCards, setSelectedYellowCards] = useState([]);
  const [selectedRedCards, setSelectedRedCards] = useState([]);
  const [score, setScore] = useState({ home: 0, away: 0 });
  // Add a goal scorer to the respective team's list
  const addGoalScorer = (team, playerName) => {
    if (!playerName) return; // Prevent adding empty values
    if (team === "home") {
      setSelectedHomeScorers((prev) => [...prev, playerName]); // Allow duplicates
      setScore((prev) => ({ ...prev, home: prev.home + 1 }));
    } else if (team === "away") {
      setSelectedAwayScorers((prev) => [...prev, playerName]); // Allow duplicates
      setScore((prev) => ({ ...prev, away: prev.away + 1 }));
    }
  };

  // Remove a goal scorer from the respective team's list
  const removeGoalScorer = (team, index) => {
    if (team === "home") {
      setSelectedHomeScorers((prev) => prev.filter((_, i) => i !== index));
      setScore((prev) => ({ ...prev, home: prev.home - 1 }));
    } else if (team === "away") {
      setSelectedAwayScorers((prev) => prev.filter((_, i) => i !== index));
      setScore((prev) => ({ ...prev, away: prev.away - 1 }));
    }
  };
  const addCard = (cardType, playerName) => {
    if (!playerName) return; // Prevent adding empty values
    if (cardType === "yellow") {
      setSelectedYellowCards((prev) => [...prev, playerName]);
    } else if (cardType === "red") {
      setSelectedRedCards((prev) => [...prev, playerName]);
    }
  };

  // Remove a card (yellow or red) from the respective list
  const removeCard = (cardType, index) => {
    if (cardType === "yellow") {
      setSelectedYellowCards((prev) => prev.filter((_, i) => i !== index));
    } else if (cardType === "red") {
      setSelectedRedCards((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleScoreChange = (team, value) => {
    setScore((prevScore) => ({
      ...prevScore,
      [team]: value,
    }));
  };
  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Extract form data
    const date = new Date(formData.get("date"));
    const homeTeamName = formData.get("homeTeam");
    const awayTeamName = formData.get("awayTeam");
    const round = formData.get("round");
    const status = formData.get("status");


    // Construct goal scorers array
    const goalScorers = [
      ...selectedHomeScorers.map((scorer) => ({
        player: hometeamplayers.find((p) => p.name === scorer)?._id || null,
        team: editingMatch?.homeTeam?._id,
      })),
      ...selectedAwayScorers.map((scorer) => ({
        player: awayteamplayers.find((p) => p.name === scorer)?._id || null,
        team: editingMatch?.awayTeam?._id,
      })),
    ];

    // Construct cards array
    const cards = [
      ...selectedYellowCards.map((player) => {
        const playerObj = [...hometeamplayers, ...awayteamplayers].find((p) => p.name === player);
        const teamId = hometeamplayers.includes(playerObj)
          ? editingMatch?.homeTeam?._id
          : editingMatch?.awayTeam?._id;
        return {
          player: playerObj?._id || null,
          team: teamId || null,
          cardType: "yellow",
        };
      }),
      ...selectedRedCards.map((player) => {
        const playerObj = [...hometeamplayers, ...awayteamplayers].find((p) => p.name === player);
        const teamId = hometeamplayers.includes(playerObj)
          ? editingMatch?.homeTeam?._id
          : editingMatch?.awayTeam?._id;
        return {
          player: playerObj?._id || null,
          team: teamId || null,
          cardType: "red",
        };
      }),
    ];
    // Determine the winning team
    const Wonteam =
      score.home > score.away
        ? editingMatch?.homeTeam?._id
        : score.away > score.home
        ? editingMatch?.awayTeam?._id
        : null;

    // Construct the match data object
    const matchData = {
      date,
      homeTeamName,
      awayTeamName,
      round,
      homeGoals: score.home,
      awayGoals: score.away,
      wonTeam: Wonteam,
      status: status,
      goalScorers: goalScorers.filter((scorer) => scorer.player !== null),
      cards: cards.filter((card) => card.player !== null),
    };

    try {
      if (editingMatch) {
        // Update an existing match
        await dispatch(updateMatchAsync({ id: editingMatch._id, matchData }));
        setEditingMatch(null);
        toast.success("Match updated successfully");
      } else {
        // Create a new match
        await dispatch(addMatchAsync(matchData));
        toast.success("Match created successfully");
        setShowForm(false);
      }
      dispatch(fetchMatches()); // Refresh matches list
      setShowForm(false);
      setEditingMatch(null);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Confirmation dialog
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444", // Red for danger actions
        cancelButtonColor: "#6c757d", // Gray for cancel
        confirmButtonText: "Yes, delete it!",
        customClass: {
          popup: "custom-swal-popup", // Custom class for styling
          title: "custom-swal-title", // Custom class for title
          content: "custom-swal-content", // Custom class for content
          actions: "custom-swal-actions", // Custom class for buttons
        },
        width: "300px", // Smaller width
      });

      // If user confirms deletion
      if (confirmation.isConfirmed) {
        try {
          // Dispatch the deleteMatchAsync action
          const response = await dispatch(deleteMatchAsync(id));

          // Check if the deletion was successful
          if (response.meta.requestStatus === "fulfilled") {
            // Success alert
            Swal.fire({
              title: "Deleted!",
              text: "Match deleted successfully!",
              icon: "success",
              timer: 1500,
              customClass: {
                popup: "custom-swal-popup", // Custom class for styling
                title: "custom-swal-title", // Custom class for title
                content: "custom-swal-content", // Custom class for content
              },
              width: "300px", // Smaller width
            });
          } else {
            // Error alert
            Swal.fire({
              title: "Error!",
              text: "Error deleting match",
              icon: "error",
              timer: 1500,
              customClass: {
                popup: "custom-swal-popup", // Custom class for styling
                title: "custom-swal-title", // Custom class for title
                content: "custom-swal-content", // Custom class for content
              },
              width: "300px", // Smaller width
            });
          }
        } catch (error) {
          // Error alert for unexpected errors
          Swal.fire({
            title: "Error!",
            text: `An unexpected error occurred: ${error.message}`,
            icon: "error",
            timer: 1500,
            customClass: {
              popup: "custom-swal-popup", // Custom class for styling
              title: "custom-swal-title", // Custom class for title
              content: "custom-swal-content", // Custom class for content
            },
            width: "300px", // Smaller width
          });
        }
      }
    } catch (error) {
      console.error("Error during deletion process:", error);
    }
  };
  const handleEdit = (match) => () => {
 


// Scroll to the top of the page
    setEditingMatch(match);
    setShowForm(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setScore({ home: match.homeGoals, away: match.awayGoals });

    if (match.goalScorers) {
      const homeScorers = match.goalScorers
        .filter((scorer) => scorer.team === match.homeTeam._id)
        .map((scorer) => scorer.player.name);

      const awayScorers = match.goalScorers
        .filter((scorer) => scorer.team === match.awayTeam._id)
        .map((scorer) => scorer.player.name);

      setSelectedAwayScorers(awayScorers);
      setSelectedHomeScorers(homeScorers);
    } else {
      setSelectedAwayScorers([]);
      setSelectedHomeScorers([]);
    }

    if (match.cards) {
      const yellowCards = match.cards
        .filter((card) => card.cardType === "yellow")
        .map((card) => card.player.name);
      const redCards = match.cards
        .filter((card) => card.cardType === "red")
        .map((card) => card.player.name);
      setSelectedYellowCards(yellowCards);
      setSelectedRedCards(redCards);
    } else {
      setSelectedYellowCards([]);
      setSelectedRedCards([]);
    }
  };
  const handlereset = () => {
    setEditingMatch(null);
    setScore({ home: 0, away: 0 });
    setSelectedHomeScorers([]);
    setSelectedAwayScorers([]);
    setSelectedYellowCards([]);
    setSelectedRedCards([]);
    setShowForm(false);
  };
  function convertToIST(utcDateString) {
    // Parse the UTC date string into a Date object
    const utcDate = new Date(utcDateString);

    // Convert the UTC date to IST using toLocaleString
    const istDateTime = utcDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", // Convert to IST
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    });

    // Reformat the IST date-time string into YYYY-MM-DDTHH:mm
    const [datePart, timePart] = istDateTime.split(", ");
    const [day, month, year] = datePart.split("/");
    const [hour, minute] = timePart.split(":");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  const hometeamplayers = editingMatch?.homeTeam?.players || [];
  const awayteamplayers = editingMatch?.awayTeam?.players || [];

  return (
    <MatchesContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Matches Management</h1>
          <p className="text-gray-400">Manage tournament matches and schedules</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingMatch(null);
          }}
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
                  type="datetime-local"
                  name="date"
                  defaultValue={editingMatch ? convertToIST(editingMatch.date) : ""}
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
                  <option value="Round 1">Round 1</option>
                  <option value="Round 2">Round 2</option>
                  <option value="Round 3">Round 3</option>
                  <option value="Round 4">Round 4</option>
                  <option value="Round 5">Round 5</option>
                  <option value="Round 6">Round 6</option>
                  <option value="Round 7">Round 7</option>
                  <option value="Semi Final">Semi Final</option>
                  <option value="Final">Final</option>
                </select>
              </div>
            </div>
            {!editingMatch && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Home Team</label>
                    <input
                      name="homeTeam"
                      defaultValue={editingMatch?.homeTeam.name}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Away Team</label>
                    <input
                      name="awayTeam"
                      defaultValue={editingMatch?.awayTeam.name}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {editingMatch && (
              <>
                {/* score */}

                <label className="block text-sm text-gray-300 mb-2">Score</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <img
                      src={`${serverurl}/uploads/${editingMatch.homeTeam.logo}`}
                      alt={editingMatch.homeTeam.name}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="homeScore"
                        min="0"
                        defaultValue={editingMatch?.homeGoals}
                        value={score.home}
                        onChange={(e) => handleScoreChange("home", parseInt(e.target.value))}
                        className="w-30 text-white-950 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 text-center"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="awayScore"
                        min="0"
                        value={score.away}
                        onChange={(e) => handleScoreChange("away", parseInt(e.target.value))}
                        className="w-30t text-white-950 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 text-center"
                      />
                    </div>
                    <img
                      src={`${serverurl}/uploads/${editingMatch.awayTeam.logo}`}
                      alt={editingMatch.awayTeam.name}
                      className="w-8 h-8 ml-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Goal Scorers Entry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Home Team Goal Scorers */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Home Team Goal Scorers
                    </label>
                    <div className="relative">
                      <select
                        name="homeGoalScorers"
                        onChange={(e) => addGoalScorer("home", e.target.value)}
                        className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="">Select Player</option>
                        {hometeamplayers.map((player) => (
                          <option key={player._id} value={player.name}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Display Selected Players as Chips */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedHomeScorers.map((scorer, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full text-xs"
                        >
                          <span>{scorer}</span>
                          <button
                            type="button"
                            onClick={() => removeGoalScorer("home", index)}
                            className="text-white hover:text-red-400"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Away Team Goal Scorers */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Away Team Goal Scorers
                    </label>
                    <div className="relative">
                      <select
                        name="awayGoalScorers"
                        onChange={(e) => addGoalScorer("away", e.target.value)}
                        className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="">Select Player</option>
                        {awayteamplayers.map((player) => (
                          <option key={player._id} value={player.name}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Display Selected Players as Chips */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedAwayScorers.map((scorer, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full text-xs"
                        >
                          <span>{scorer}</span>
                          <button
                            type="button"
                            onClick={() => removeGoalScorer("away", index)}
                            className="text-white hover:text-red-400"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Yellow Card and Red Card Entry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Yellow Card Section */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Yellow Cards</label>
                    <div className="relative">
                      <select
                        name="yellowCards"
                        onChange={(e) => addCard("yellow", e.target.value)}
                        className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="">Select Player</option>
                        {[...hometeamplayers, ...awayteamplayers].map((player) => (
                          <option key={player._id} value={player.name}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Display Selected Players as Chips */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedYellowCards.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-black rounded-full text-xs"
                        >
                          <span>{player}</span>
                          <button
                            type="button"
                            onClick={() => removeCard("yellow", index)}
                            className="text-black hover:text-red-700"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Red Card Section */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Red Cards</label>
                    <div className="relative">
                      <select
                        name="redCards"
                        onChange={(e) => addCard("red", e.target.value)}
                        className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="">Select Player</option>
                        {[...hometeamplayers, ...awayteamplayers].map((player) => (
                          <option key={player._id} value={player.name}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Display Selected Players as Chips */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedRedCards.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-full text-xs"
                        >
                          <span>{player}</span>
                          <button
                            type="button"
                            onClick={() => removeCard("red", index)}
                            className="text-white hover:text-red-200"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* {status update} */}
              </>
            )}
            {/* Radio Buttons for Match Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Match Status</label>
              <StyledWrapper>
                <div className="radio-input bg-slate-700">
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="scheduled"
                      defaultChecked={editingMatch?.status === "scheduled"}
                    />
                    <span>Scheduled</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      defaultChecked={editingMatch?.status === "completed"}
                    />
                    <span>Completed</span>
                  </label>
                  <span className="selection " />
                </div>
              </StyledWrapper>
            </div>
            <div className="flex justify-end items-center mt-4">
              <button
                type="button"
                onClick={handlereset}
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
        {matches?.map((match) => (
          <div key={match._id} className="match-card p-6">
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
                <span className="font-medium">{match.homeTeam.name}</span>{" "}
                <span> {match.status === "completed" ? match.homeGoals : ""}</span>
              </div>
              <span className="text-2xl font-bold">vs</span>
              <div className="text-center">
                <Goal size={24} className="mb-1 text-red-500" />
                <span className="font-medium">
                  {match.awayTeam.name}
                  <span> {match.status === "completed" ? match.awayGoals : ""}</span>
                </span>
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
              <button onClick={handleEdit(match)} className="text-indigo-400 hover:text-indigo-300">
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(match._id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="dark"
      />
    </MatchesContainer>
  );
}

const StyledWrapper = styled.div`
  .radio-input input {
    display: none;
  }

  .radio-input {
    --container_width: 300px;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 10px;
    color: #000000;
    width: var(--container_width);
    overflow: hidden;
    border: 1px solid rgba(53, 52, 52, 0.226);
  }

  .radio-input label {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    font-weight: 600;
    letter-spacing: -1px;
    font-size: 14px;
  }

  .selection {
    display: none;
    position: absolute;
    height: 100%;
    width: calc(var(--container_width) / 2);
    z-index: 0;
    left: 0;
    top: 0;
    transition: 0.15s ease;
  }

  .radio-input label:has(input:checked) {
    color: #fff;
  }

  .radio-input label:has(input:checked) ~ .selection {
    background-color: rgb(11 117 223);
    display: inline-block;
  }

  .radio-input label:nth-child(1):has(input:checked) ~ .selection {
    transform: translateX(calc(var(--container_width) * 0 / 2));
  }

  .radio-input label:nth-child(2):has(input:checked) ~ .selection {
    transform: translateX(calc(var(--container_width) * 1 / 2));
  }
`;

export default MatchesManagement;
