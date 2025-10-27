import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin, setCurrentScreen, setAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Login API Call with Debug Logs
  const loginUser = async (email, password) => {
    console.log("🟦 [API CALL START] Logging in user...");
    console.log("📤 Payload:", { email });

    try {
      const response = await axios.post(
        "https://backend-tasks-xagf.onrender.com/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("🟩 [API RESPONSE SUCCESS]:", response.data);

      if (response?.data?.token) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
          icon: <CheckCircle />,
        });

        // ✅ Save token & user details locally
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userId", response.data.userid);
        localStorage.setItem("userName", response.data.userName);
        console.log("💾 Token & User Info Saved to localStorage");
        console.log("username ??>>>", response.data.userName);

        // ✅ Redirect (or set screen)
        console.log("🔁 Redirecting to Home / Chat Screen...");
        setAuthenticated(true);
        setCurrentScreen("dashboard");
        return response.data;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.log("🟥 [API ERROR OCCURRED]:", err.response || err.message);
      const msg =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(msg);
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        icon: <AlertCircle />,
      });
      throw err;
    } finally {
      console.log("🟨 [API CALL END]");
    }
  };

  // ✅ Form Handler with Debug Logs
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear(); // clear console before each attempt
    console.log("🟦 [FORM SUBMIT INITIATED]");
    console.log("📋 Form Data:", formData);
    setError("");

    // Validation
    if (!formData.email || !formData.password) {
      console.warn("⚠️ Validation failed: Missing fields");
      setError("Please fill all fields");
      toast.warning("Please fill all fields!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    console.log("🟦 [LOGIN REQUEST TRIGGERED]");
    try {
      await loginUser(formData.email, formData.password);
    } catch (err) {
      console.error("🟥 [LOGIN FAILED]:", err.message);
    } finally {
      console.log("🟨 [LOGIN FLOW COMPLETE]");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 font-medium"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Redirect to Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => setCurrentScreen("signup")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
