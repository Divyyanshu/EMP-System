import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import TaskCard from "../components/TaskCard";
import {
  filterTasksBySearch,
  filterTasksByStatus,
  sortTasksByDate,
} from "../utils/helpers";

const TaskList = ({ tasks, setCurrentScreen, onDeleteTask }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getFilteredTasks = () => {
    let filtered = tasks;
    filtered = filterTasksBySearch(filtered, searchQuery);
    filtered = filterTasksByStatus(filtered, filterStatus);
    filtered = sortTasksByDate(filtered);
    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
        <button
          onClick={() => setCurrentScreen("createTask")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No tasks found. Create your first task!
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(id) => setCurrentScreen("editTask-" + id)}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
