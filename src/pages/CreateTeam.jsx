import React, { useState } from "react";

const CreateTeam = ({ onCreateTeam, setCurrentScreen }) => {
  const [formData, setFormData] = useState({
    name: "",
    members: 0,
  });

  const handleSubmit = async () => {
    if (!formData.name) {
      alert("Please enter team name");
      return;
    }
    await onCreateTeam(formData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Team</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter team name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Members
          </label>
          <input
            type="number"
            value={formData.members}
            onChange={(e) =>
              setFormData({
                ...formData,
                members: parseInt(e.target.value) || 0,
              })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0"
            min="0"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Create Team
          </button>
          <button
            onClick={() => setCurrentScreen("teams")}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
