import React from "react";
import StatsCard from "../components/StatsCard";

const Dashboard = ({ tasks, setCurrentScreen }) => {
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Tasks" value={stats.total} />
        <StatsCard
          title="Pending"
          value={stats.pending}
          bgColor="bg-yellow-50"
          textColor="text-yellow-800"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          bgColor="bg-blue-50"
          textColor="text-blue-800"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          bgColor="bg-green-50"
          textColor="text-green-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setCurrentScreen("tasks")}
          className="bg-blue-600 text-white p-8 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <div className="text-2xl font-bold mb-2">Manage Tasks</div>
          <div className="text-blue-100">
            Create, view, and manage all tasks
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("teams")}
          className="bg-purple-600 text-white p-8 rounded-lg shadow hover:bg-purple-700 transition"
        >
          <div className="text-2xl font-bold mb-2">Manage Teams</div>
          <div className="text-purple-100">Create and manage team members</div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
