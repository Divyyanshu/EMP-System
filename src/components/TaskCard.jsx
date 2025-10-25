import React from "react";
import { Edit2, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { getStatusColor, formatDate } from "../utils/helpers";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {task.title}
          </h3>
          <p className="text-gray-600 mb-3">{task.description}</p>
          <div className="flex flex-wrap gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(
                task.status
              )}`}
            >
              {getStatusIcon(task.status)}
              {task.status}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {task.assignedTo}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              Due: {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
