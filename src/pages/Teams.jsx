import React from "react";
import { Plus } from "lucide-react";
import TeamCard from "../components/TeamCard";

const Teams = ({ teams, setCurrentScreen, onDeleteTeam }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Teams Management</h1>
        <button
          onClick={() => setCurrentScreen("createTeam")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No teams found. Create your first team!
          </div>
        ) : (
          teams.map((team) => (
            <TeamCard key={team.id} team={team} onDelete={onDeleteTeam} />
          ))
        )}
      </div>
    </div>
  );
};

export default Teams;
