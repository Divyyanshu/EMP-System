import React, { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";

const Navbar = ({ currentScreen, setCurrentScreen, onLogout }) => {
  const [userName, setUserName] = useState("");

  // 🧠 Load username from localStorage dynamically
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
      console.log("✅ Navbar loaded userName:", storedName);
    } else {
      console.warn("⚠️ No userName found in localStorage");
    }
  }, []);

  return (
    <nav className="bg-white shadow">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">TaskTracker Pro</h1>

          <div className="flex items-center gap-4">
            {/* Dashboard Button */}
            <button
              onClick={() => {
                console.log("📊 Navigating to Dashboard");
                setCurrentScreen("dashboard");
              }}
              className={`px-4 py-2 rounded-lg transition ${
                currentScreen === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>

            {/* Tasks Button */}
            <button
              onClick={() => {
                console.log("🗂 Navigating to Tasks");
                setCurrentScreen("tasks");
              }}
              className={`px-4 py-2 rounded-lg transition ${
                currentScreen.includes("task")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tasks
            </button>

            {/* Teams Button */}
            <button
              onClick={() => {
                console.log("👥 Navigating to Teams");
                setCurrentScreen("teams");
              }}
              className={`px-4 py-2 rounded-lg transition ${
                currentScreen.includes("team")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Teams
            </button>

            {/* User Info & Logout */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {userName || "Guest User"}
                </span>
              </div>

              <button
                onClick={() => {
                  console.log("🚪 Logging out...");
                  onLogout();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
