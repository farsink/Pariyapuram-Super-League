import React, { useState, useEffect } from "react";
import { User, Edit, Trash2, Plus } from "lucide-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlayers,
  selectAllPlayers,
  getPlayersStatus,
  getPlayersError,
  deletePlayer,
  createPlayerAsyncThunk,
  updatePlayerAsyncThunk,
} from "../../Redux/slices/PlayerSlice";
import showConfirmDeleteToast from "../Customs/Toastdelete";

const PlayersContainer = styled.div`
  .player-form {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;
  }

  .player-card {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

function PlayersManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const dispatch = useDispatch();
  const players = useSelector(selectAllPlayers);
  const status = useSelector(getPlayersStatus);
  const error = useSelector(getPlayersError);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      // 1. Create stats object from form inputs
      const stats = {
        goals: parseInt(formData.get("goals")),
        assists: parseInt(formData.get("assists")),
        // Add other stats if needed
      };

      // 2. Prepare FormData for backend
      const data = new FormData();
      data.append("name", formData.get("name"));
      data.append("position", formData.get("position"));
      data.append("team", formData.get("team")); // Team name (backend will convert to ID)
      data.append("stats", JSON.stringify(stats)); // Stringify nested object
      data.append("photo", formData.get("photo")); // Append the file

      // 3. Dispatch action
      if (editingPlayer) {
        await dispatch(updatePlayerAsyncThunk({ id: editingPlayer._id, updatedData: data })).unwrap();
      } else {
        await dispatch(createPlayerAsyncThunk(data)).unwrap();
      }

      // 4. Reset form
      setShowForm(false);
      setEditingPlayer(null);
    } catch (error) {
      alert(`Operation failed: ${error.message}`);
    }
  };

  const handleDelete = (id) => {
    // Delete player logic here
    try {
      dispatch(deletePlayer(id)).unwrap();
    } catch (error) {
      alert(`Operation failed: ${error.message}`);
    }
  };

  return (
    <PlayersContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Players Management</h1>
          <p className="text-gray-400">Manage tournament players and details</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingPlayer(null);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Player
        </button>
      </div>

      {showForm && (
        <div className="player-form p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {editingPlayer ? "Edit Player" : "New Player"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Name</label>
                <input
                  name="name"
                  defaultValue={editingPlayer?.name}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Position</label>
                <input
                  name="position"
                  defaultValue={editingPlayer?.position}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Team</label>
                <input
                  name="team"
                  defaultValue={editingPlayer?.team.name}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Photo URL</label>
                <input
                  name="photo"
                  defaultValue={editingPlayer?.photo}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Goals</label>
                <input
                  name="goals"
                  type="number"
                  defaultValue={editingPlayer?.stats.goals}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Assists</label>
                <input
                  name="assists"
                  type="number"
                  defaultValue={editingPlayer?.stats.assists}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPlayer(null);
                }}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
              >
                {editingPlayer ? "Update" : "Create"} Player
              </button>
            </div>
          </form>
        </div>
      )}

      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          {players &&<p className="text-gray-400">Total players : {players?.length}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players?.map((player) => (
              <div key={player._id} className="player-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={player.photo} alt={player.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{player.name}</h3>
                    <p className="text-sm text-gray-400">{player.position}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400 space-y-2">
                  <p>Team: {player.team?.name || "No Team"}</p>
                  <p>Goals: {player.stats.goals}</p>
                  <p>Assists: {player.stats.assists}</p>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setEditingPlayer(player);
                      setShowForm(true);
                    }}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(player._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {!players && (
        <div>
          {" "}
          <p className="text-red-500">An error occurred</p>
        </div>
      )}
    </PlayersContainer>
  );
}

export default PlayersManagement;
