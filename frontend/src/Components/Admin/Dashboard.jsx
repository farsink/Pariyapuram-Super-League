import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Calendar, Users, Gavel, Ticket, DollarSign } from "lucide-react";

const Dashboard = () => {
  // Chart Data (Reuse from Admin.jsx)
  const ticketSalesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Ticket Sales",
        data: [1200, 1900, 1500, 2200, 2800, 2400],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const topPlayersData = {
    labels: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"],
    datasets: [
      {
        label: "Bids Received",
        data: [150000, 120000, 95000, 85000, 75000],
        backgroundColor: "rgb(99, 102, 241)",
      },
    ],
  };

  const matchStatusData = {
    labels: ["Upcoming", "Live", "Completed"],
    datasets: [
      {
        data: [8, 2, 14],
        backgroundColor: ["rgb(99, 102, 241)", "rgb(34, 197, 94)", "rgb(239, 68, 68)"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9CA3AF",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "rgba(75, 85, 99, 0.2)" },
      },
      x: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "rgba(75, 85, 99, 0.2)" },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9CA3AF",
        },
      },
    },
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, Admin User</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Total Matches</h3>
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-semibold">24</p>
          <p className="text-sm text-gray-400 mt-2">8 upcoming</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Players</h3>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-semibold">156</p>
          <p className="text-sm text-gray-400 mt-2">+12 this month</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Total Bids</h3>
            <Gavel className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-semibold">2.4k</p>
          <p className="text-sm text-gray-400 mt-2">$890k value</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Tickets Sold</h3>
            <Ticket className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-semibold">12.8k</p>
          <p className="text-sm text-gray-400 mt-2">82% capacity</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Revenue</h3>
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-semibold">$1.2M</p>
          <p className="text-sm text-gray-400 mt-2">+18% from last month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Ticket Sales Chart */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Ticket Sales Trend</h2>
          <div className="h-80">
            <Line data={ticketSalesData} options={chartOptions} />
          </div>
        </div>

        {/* Top Players by Bids */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Top Players by Bids</h2>
          <div className="h-80">
            <Bar data={topPlayersData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Match Status Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Match Status</h2>
          <div className="h-64">
            <Pie data={matchStatusData} options={pieOptions} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-500">View all</button>
          </div>
          <div className="space-y-4 text-white">
            {[
              {
                title: "New Match Scheduled",
                description: "Team A vs Team B - Tomorrow at 15:00",
                time: "2 hours ago",
                icon: Calendar,
              },
              {
                title: "Player Transfer",
                description: "John Doe transferred to Team C",
                time: "4 hours ago",
                icon: Users,
              },
              {
                title: "Ticket Sales Update",
                description: "Season tickets are now available",
                time: "6 hours ago",
                icon: Ticket,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="bg-gray-700 p-2 rounded-lg">
                  <activity.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{activity.title}</h3>
                  <p className="text-sm text-gray-400">{activity.description}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
