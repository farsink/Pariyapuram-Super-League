import React, { useState } from "react";
import { User, Edit, Trash2, Plus } from "lucide-react";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlayers,
  selectAllPlayers,
  getPlayersStatus,
  getPlayersError,
} from "../../Redux/slices/PlayerSlice";

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
   const { players, status, error } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);
  console.log(players);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const photo = formData.get("photo");

    // Validate photo type and size
    if (!photo.type.includes("image")) {
      alert("Invalid photo format. Please upload a JPEG or PNG image.");
      return;
    }

    if (photo.size > 5 * 1024 * 1024) {
      alert("Image size is too large. Please upload an image less than 5MB.");
      return; 
    }
    
    // Create player object from form data
    const playerData = {
      name: formData.get("name"),
      position: formData.get("position"),
      team: formData.get("team"),
      stats: {
        goals: parseInt(formData.get("goals")),
        assists: parseInt(formData.get("assists")),
      },
      photo:photo
    };

    if (editingPlayer) {
      setPlayers(players.map((p) => (p.id === editingPlayer.id ? playerData : p)));
    } else {
      setPlayers([...players, playerData]);
    }

    setShowForm(false);
    setEditingPlayer(null);
  };

  const handleDelete = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  return (
    <PlayersContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Players Management</h1>
          <p className="text-gray-400">Manage tournament players and details</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
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
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Team</label>
                <input
                  name="team"
                  defaultValue={editingPlayer?.team}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Photo URL</label>
                <input
                  name="photo"
                  defaultValue={editingPlayer?.photo}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
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
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Assists</label>
                <input
                  name="assists"
                  type="number"
                  defaultValue={editingPlayer?.stats.assists}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                  required
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player._id} className="player-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img src={player.photo} alt={player.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold text-white">{player.name}</h3>
                <p className="text-sm text-gray-400">{player.position}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 space-y-2">
              <p>Team: {player.team}</p>
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
    </PlayersContainer>
  );
}

export default PlayersManagement;
