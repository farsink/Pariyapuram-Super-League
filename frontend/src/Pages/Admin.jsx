import React, { useState } from "react";
import {
  Home,
  Calendar,
  Users,
  DollarSign,
  Newspaper,
  Play,
  Ticket,
  Settings,
  Search,
  Bell,
  ChevronRight,
  Menu,
  X,
  LogOut,
  User,
  Gavel,
  Trophy,
  ShieldHalf,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styled from "styled-components";
import ProtectedAdminRoute from "../Middlewares/Protected.Jsx";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

const Sidebar = styled.div`
  .sidebar::-webkit-scrollbar {
    width: 12px;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background-color: #5c6ac4; /* indigo-600 */
    border-radius: 6px;
  }

  .sidebar::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const { navigate } = useNavigate();
  const navItems = [
    { icon: Home, label: "Dashboard", to: "/admin" },
    { icon: ShieldHalf, label: "Teams", to: "/admin/teams" },
    { icon: Users, label: "Players", to: "/admin/players" },
    { icon: Trophy, label: "Matches", to: "/admin/matches" },
    { icon: DollarSign, label: "Bidding" },
    { icon: Newspaper, label: "News" },
    { icon: Play, label: "Live Streaming" },
    { icon: Ticket, label: "Tickets" },
    { icon: Users, label: "Users" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <ProtectedAdminRoute>
      <div className="min-h-screen bg-gray-900 text-white flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <Sidebar>
          <aside
            className={`
        fixed lg:sticky top-0 left-0 z-30
        w-64 bg-gray-800 h-screen
        flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Link to="/">
                  <img src="../src/assets/psl-logo1.png" className="w-9 h-8" alt="" />
                </Link>
                <span className="text-xl font-bold">Sports Admin</span>
              </div>
              <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 sidebar overflow-y-auto py-4 px-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 no-underline
                ${
                  item.active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }
              `}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Bar */}
          <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="w-6 h-6" />
                </button>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search matches, players..."
                    className="bg-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-2 relative"
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setProfileOpen(false);
                    }}
                  >
                    <Bell className="w-6 h-6 text-gray-400" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <h3 className="font-semibold text-gray-200">Notifications</h3>
                      </div>
                      {[
                        "New player registration request",
                        "Upcoming match in 2 hours",
                        "Ticket sales report available",
                      ].map((notification, index) => (
                        <a key={index} href="#" className="px-4 py-3 hover:bg-gray-700 block">
                          <p className="text-sm text-gray-200">{notification}</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative ">
                  <button
                    className="flex items-center space-x-3"
                    onClick={() => {
                      setProfileOpen(!profileOpen);
                      setNotificationsOpen(false);
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:inline-block text-white">
                      {user?.username || user?.primaryEmailAddress.emailAddress}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transform transition-transform ${
                        profileOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                      <a
                        href="#"
                        className="px-4 py-2 text-white no-underline hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span> Profile</span>
                      </a>
                      <a
                        href="#"
                        className="px-4 py-2 text-white no-underline hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </a>
                      <div className="border-t border-gray-700 my-2"></div>
                      <a
                        href="#"
                        className="px-4 py-2 hover:bg-gray-700 flex items-center no-underline space-x-2 text-red-400"
                        onClick={() => {
                          signOut().then(() => {
                            navigate("/");
                          });
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}

export default Admin;
