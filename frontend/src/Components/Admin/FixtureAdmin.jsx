import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Edit, Trash2, PlayCircle, X, CheckCircle, Plus } from "lucide-react";
import styled from "styled-components";
import ProtectedAdminRoute from "../../Middlewares/Protected.Jsx";

const FixturesContainer = styled.div`
  .fixture-form {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    &.upcoming {
      background: rgba(99, 102, 241, 0.1);
      color: #6366f1;
    }
    &.live {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    &.completed {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  }
`;

function FixtureAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [editingFixture, setEditingFixture] = useState(null);
  const [fixtures, setFixtures] = useState([
    {
      id: 1,
      teamA: "Team Alpha",
      teamB: "Team Beta",
      date: "2024-03-20",
      time: "19:00",
      venue: "City Stadium",
      status: "upcoming",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add/update fixture logic
    setShowForm(false);
    setEditingFixture(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setFixtures(fixtures.map((f) => (f.id === id ? { ...f, status: newStatus } : f)));
  };

  return (
    <ProtectedAdminRoute>
      <FixturesContainer>
        <div className="min-h-screen bg-gray-900 text-white flex">
          {/* Reuse same sidebar component from dashboard */}

          <div className="flex-1 flex flex-col min-h-screen">
            {/* Reuse same top bar component from dashboard */}

            <main className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Fixtures Management</h1>
                  <p className="text-gray-400">Manage tournament matches and schedules</p>
                </div>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add New Fixture
                </button>
              </div>

              {showForm && (
                <div className="fixture-form p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-white">
                    {editingFixture ? "Edit Fixture" : "New Fixture"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Team A</label>
                        <input
                          className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Team B</label>
                        <input
                          className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Date</label>
                        <input
                          type="date"
                          className="w-full bg-gray-800 rounded-lg px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Time</label>
                        <input
                          type="time"
                          className="w-full bg-gray-800 rounded-lg px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Venue</label>
                        <input className="w-full bg-gray-800 rounded-lg px-4 py-2" required />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingFixture(null);
                        }}
                        className="px-4 py-2 text-gray-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
                      >
                        {editingFixture ? "Update" : "Create"} Fixture
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="text-gray-400 text-sm border-b border-gray-700">
                        <tr>
                          <th className="pb-3 text-left">Match ID</th>
                          <th className="pb-3 text-left">Teams</th>
                          <th className="pb-3 text-left">Date</th>
                          <th className="pb-3 text-left">Time</th>
                          <th className="pb-3 text-left">Venue</th>
                          <th className="pb-3 text-left">Status</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        {fixtures.map((fixture) => (
                          <tr
                            key={fixture.id}
                            className="border-b border-gray-700 hover:bg-gray-750"
                          >
                            <td className="py-4">#{fixture.id}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <span>{fixture.teamA}</span>
                                <span className="text-gray-400">vs</span>
                                <span>{fixture.teamB}</span>
                              </div>
                            </td>
                            <td className="py-4">{fixture.date}</td>
                            <td className="py-4">{fixture.time}</td>
                            <td className="py-4">{fixture.venue}</td>
                            <td className="py-4">
                              <span className={`status-badge ${fixture.status}`}>
                                {fixture.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex justify-end gap-3">
                                <button
                                  onClick={() => setEditingFixture(fixture)}
                                  className="text-indigo-400 hover:text-indigo-300"
                                >
                                  <Edit size={18} />
                                </button>
                                <button className="text-red-400 hover:text-red-300">
                                  <Trash2 size={18} />
                                </button>
                                <div className="relative group">
                                  <button className="text-gray-400 hover:text-white">
                                    <PlayCircle size={18} />
                                  </button>
                                  <div className="hidden group-hover:block absolute right-0 bottom-full bg-gray-800 p-2 rounded-lg shadow-lg z-10">
                                    {["upcoming", "live", "completed"].map((status) => (
                                      <button
                                        key={status}
                                        onClick={() => handleStatusChange(fixture.id, status)}
                                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-700 w-full rounded-md"
                                      >
                                        {status === fixture.status ? (
                                          <CheckCircle size={16} className="text-green-500" />
                                        ) : (
                                          <span className="w-4 h-4" />
                                        )}
                                        <span className="capitalize">{status}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </FixturesContainer>
    </ProtectedAdminRoute>
  );
}

export default FixtureAdmin;
