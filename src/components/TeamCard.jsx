import React from "react";
import { Users, Trash2 } from "lucide-react";

const TeamCard = ({ team, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
            <p className="text-sm text-gray-600">{team.members} members</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(team.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
