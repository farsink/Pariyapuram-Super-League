import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Trophy,
  BarChart,
  X,
  FolderMinus,
} from "lucide-react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeams,
  addTeamAsync,
  updateTeamAsync,
  deleteTeamAsync,
} from "../../Redux/slices/TeamSlice";
import { serverurl } from "../../Api/ServerURL";
import Swal from "sweetalert2";
import "./Global.css";
import { Slide, toast, ToastContainer } from "react-toastify";

const TeamsContainer = styled.div`
  .team-form {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;
  }

  .team-card {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .modal-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
  }
  /* Custom SweetAlert2 Popup */
  .custom-swal-popup {
    background-color: #1f2937; /* Dark background */
    color: #ffffff; /* White text */
    border: 1px solid #374151; /* Border color */
    font-family: "Inter", sans-serif; /* Match app's font */
    padding: 1rem; /* Reduced padding for smaller size */
  }

  /* Title Styling */
  .custom-swal-title {
    font-size: 1rem; /* Smaller font size */
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  /* Content Styling */
  .custom-swal-content {
    font-size: 0.875rem; /* Smaller font size */
    margin-bottom: 1rem;
  }

  /* Buttons Styling */
  .custom-swal-actions .swal2-confirm {
    background-color: #ef4444; /* Red for confirm button */
    font-size: 0.875rem; /* Smaller font size */
    padding: 0.5rem 1rem; /* Reduced padding */
  }

  .custom-swal-actions .swal2-cancel {
    background-color: #6c757d; /* Gray for cancel button */
    font-size: 0.875rem; /* Smaller font size */
    padding: 0.5rem 1rem; /* Reduced padding */
  }
`;

function TeamsManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);

  // Fetch teams on component mount
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Get values directly from form
    const name = formData.get("name");
    const logoFile = formData.get("logo");
    const players = formData.get("players");
    const manager = formData.get("manager"); // Singular!

    // Validate file type and size
    if (logoFile && logoFile.size > 0) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/svg+xml",
      ];
      const maxSize = 9 * 1024 * 1024; // 9MB in bytes

      if (!allowedTypes.includes(logoFile.type)) {
        alert("Only JPG/JPEG files are allowed.");
        return;
      }

      if (logoFile.size > maxSize) {
        alert("File size must be less than 9MB.");
        return;
      }
    }

    const apiFormData = new FormData();
    apiFormData.append("name", JSON.stringify(name)); // Must be JSON string
    apiFormData.append("manager", manager); // Singular field name
    apiFormData.append("currentPosition", formData.get("currentPosition"));
    apiFormData.append("currentPoints", formData.get("currentPoints"));
    apiFormData.append("players", players);
    if (logoFile && logoFile.size > 0) {
      apiFormData.append("logo", logoFile);
    }
    apiFormData.append(
      "stats",
      JSON.stringify({
        wins: formData.get("wins"),
        draws: formData.get("draws"),
        losses: formData.get("losses"),
        matchesPlayed: formData.get("matchesPlayed"),
        goalsScored: formData.get("goalsScored"),
        goalsConceded: formData.get("goalsConceded"),
      })
    );

    try {
      let response;
      if (editingTeam) {
        // Update existing team

        response = await dispatch(
          updateTeamAsync({ id: editingTeam._id, formData: apiFormData })
        );
        toast.success("Team updated");
      } else {
        // Add new team
        response = await dispatch(addTeamAsync(apiFormData)); // Send FormData directly
        toast.success("Team added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    dispatch(fetchTeams());
    setShowForm(false);
    setEditingTeam(null);
    setSelectedTeam(null); // Close modal after editing
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
        const response = await dispatch(deleteTeamAsync(id));

        if (response.meta.requestStatus === "fulfilled") {
          // Success alert
          Swal.fire({
            title: "Deleted!",
            text: "Team deleted successfully!",
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
            text: "Error deleting team",
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
      console.error("Error deleting team:", error);
      // Error alert in case of unexpected errors
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred while deleting the team.",
        icon: "error",
        timer: 1500,
        customClass: {
          popup: "custom-swal-popup", // Custom class for styling
          title: "custom-swal-title", // Custom class for title
          content: "custom-swal-content", // Custom class for content
        },
        width: "300px", // Smaller width
      });
    } finally {
      setSelectedTeam(null); // Close modal after deleting
    }
  };

  if (status === "error") {
    return (
      <TeamsContainer>
        <p className='text-red-500'>An error occurred: {error}</p>
      </TeamsContainer>
    );
  }

  return (
    <TeamsContainer>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme='dark'
      />
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Teams Management</h1>
          <p className='text-gray-400'>Manage tournament teams and details</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className='bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2'
        >
          <Plus size={18} />
          Add New Team
        </button>
      </div>

      {status === "loading" ? (
        <p className='text-white'>Loading...</p>
      ) : (
        <>
          {showForm && (
            <div className='team-form p-6 mb-8'>
              <h2 className='text-xl font-semibold mb-4 text-white'>
                {editingTeam ? "Edit Team" : "New Team"}
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Team Name
                    </label>
                    <input
                      name='name'
                      defaultValue={editingTeam?.name}
                      className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Team Logo (JPG only, max 9MB)
                    </label>
                    <input
                      type='file'
                      name='logo'
                      accept='.jpg,.jpeg,.png' // Only allow JPG/JPEG files
                      className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Current Position
                    </label>
                    <input
                      type='number'
                      name='currentPosition'
                      defaultValue={editingTeam?.currentPosition}
                      className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Current Points
                    </label>
                    <input
                      type='number'
                      name='currentPoints'
                      defaultValue={editingTeam?.currentPoints}
                      className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Players (comma-separated)
                    </label>
                    <input
                      name='players'
                      defaultValue={editingTeam?.players
                        .map((player) => player.name)
                        .join(",")}
                      className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Managers (comma-separated)
                    </label>
                    <input
                      name='manager'
                      defaultValue={editingTeam?.manager?.join(", ")}
                      className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      placeholder='John Doe, Jane Smith'
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Stats (Wins, Draws, Losses)
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      <input
                        type='number'
                        name='wins'
                        defaultValue={editingTeam?.stats.wins}
                        placeholder='Wins'
                        className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      />
                      <input
                        type='number'
                        name='draws'
                        defaultValue={editingTeam?.stats.draws}
                        placeholder='Draws'
                        className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      />
                      <input
                        type='number'
                        name='losses'
                        defaultValue={editingTeam?.stats.losses}
                        placeholder='Losses'
                        className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm text-gray-300 mb-2'>
                      Matches Played,GoalScored,GoalConceded
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      <input
                        type='number'
                        name='matchesPlayed'
                        defaultValue={editingTeam?.stats.matchesPlayed}
                        placeholder='Matches Played'
                        className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      />
                      <input
                        type='number'
                        name='goalsScored'
                        defaultValue={editingTeam?.stats.goalsScored}
                        placeholder='Goal Scored'
                        className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      />
                      <input
                        type='number'
                        name='goalsConceded'
                        defaultValue={editingTeam?.stats.goalsConceded}
                        placeholder='Goal Conceded'
                        className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex justify-end gap-3 mt-6'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowForm(false);
                      setEditingTeam(null);
                    }}
                    className='px-4 py-2 text-gray-300 hover:text-white'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg'
                  >
                    {editingTeam ? "Update" : "Create"} Team
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {teams &&
              teams.map((team) => (
                <div
                  key={team._id}
                  className='team-card p-6 cursor-pointer'
                  onClick={() => {
                    setSelectedTeam(team);
                    setShowForm(false);
                  }}
                >
                  <div className='flex items-center space-x-4 mb-4'>
                    <img
                      src={team.logo}
                      alt={team.name}
                      className='w-16 h-16 rounded-full'
                    />
                    <div>
                      <h3 className='text-lg font-semibold text-white'>
                        {team.name}
                      </h3>
                      <p className='text-sm text-gray-400'>
                        Position: {team.currentPosition}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between text-sm text-gray-400'>
                    <div className='flex items-center gap-2'>
                      <Trophy size={16} />
                      <span>{team.currentPoints} Points</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Users size={16} />
                      <span>{team.players.length} Players</span>
                    </div>
                  </div>
                </div>
              ))}
            {!teams && (
              <div>
                {" "}
                <p className='text-red-500'>An error occurred</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Team Card Modal */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay'
            onClick={() => setSelectedTeam(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className='modal-content p-6 w-full max-w-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-white'>
                  {selectedTeam.name}
                </h2>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className='text-gray-400 hover:text-white'
                >
                  <X size={24} />
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <img
                    src={selectedTeam.logo}
                    alt={selectedTeam.name}
                    className='w-32 h-32 rounded-full mx-auto mb-4'
                  />
                  <div className='text-center'>
                    <p className='text-lg font-semibold text-white'>
                      Position: {selectedTeam.currentPosition}
                    </p>
                    <p className='text-sm text-gray-400'>
                      Points: {selectedTeam.currentPoints}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-white mb-2'>
                    Managers
                  </h3>
                  <ul className='list-none list-inside'>
                    {selectedTeam.manager?.map((manager, index) => (
                      <li key={index} className='text-gray-400 '>
                        {manager}
                      </li>
                    ))}
                  </ul>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Players
                  </h3>
                  <div
                    className='overflow-y-auto'
                    style={{ height: "calc(100vh - 500px)" }}
                  >
                    <ul className='space-y-2'>
                      {selectedTeam.players.map((player, index) => (
                        <li key={index} className='text-gray-400'>
                          {player.name}
                        </li>
                      ))}

                      {selectedTeam.players.slice(4).map((player, index) => (
                        <li key={index} className='text-gray-400'>
                          {player.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='mt-4'></div>
              </div>

              <div className='mt-6'>
                <h3 className='text-xl font-semibold text-white mb-4'>Stats</h3>
                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div>
                    <p className='text-lg font-semibold text-white'>
                      {selectedTeam.stats.wins}
                    </p>
                    <p className='text-sm text-gray-400'>Wins</p>
                  </div>
                  <div>
                    <p className='text-lg font-semibold text-white'>
                      {selectedTeam.stats.draws}
                    </p>
                    <p className='text-sm text-gray-400'>Draws</p>
                  </div>
                  <div>
                    <p className='text-lg font-semibold text-white'>
                      {selectedTeam.stats.losses}
                    </p>
                    <p className='text-sm text-gray-400'>Losses</p>
                  </div>
                </div>
              </div>

              <div className='flex justify-end gap-3 mt-6'>
                <button
                  onClick={() => {
                    setEditingTeam(selectedTeam);
                    setShowForm(true);
                    setSelectedTeam(null);
                  }}
                  className='bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2'
                >
                  <Edit size={18} />
                  Edit Team
                </button>
                <button
                  onClick={() => handleDelete(selectedTeam._id)}
                  className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2'
                >
                  <Trash2 size={18} />
                  Delete Team
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TeamsContainer>
  );
}

export default TeamsManagement;
