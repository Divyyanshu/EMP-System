import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ setCurrentScreen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Registration API with Debug Logs
  const registerUser = async (name, email, password) => {
    console.log("🟦 [API CALL START] Registering user...");
    console.log("📤 Payload:", { name, email });

    try {
      const response = await axios.post(
        "https://backend-tasks-xagf.onrender.com/users/register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("🟩 [API RESPONSE SUCCESS]:", response.data);

      if (response?.data?.message === "User created successfully") {
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          icon: <CheckCircle />,
        });
        return response.data.token;
      }
    } catch (err) {
      console.log("🟥 [API ERROR OCCURRED]:", err.response || err.message);
      const msg =
        err.response?.data?.message ||
        "Signup failed. Please check your inputs.";
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

  // ✅ Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear(); // Clears old logs for fresh debug view
    console.log("🟦 [FORM SUBMIT INITIATED]");
    console.log("📋 Form Data:", formData);
    setError("");

    // ✅ Validation Layer
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      console.warn("⚠️ Validation failed: Missing fields");
      setError("Please fill all fields");
      toast.warning("Please fill all fields!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.warn("⚠️ Validation failed: Password mismatch");
      setError("Passwords do not match");
      toast.warning("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.password.length < 6) {
      console.warn("⚠️ Validation failed: Password too short");
      setError("Password must be at least 6 characters");
      toast.warning("Password must be at least 6 characters!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    console.log("🟦 [API CALL TRIGGERED]");
    try {
      const token = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      console.log("✅ [USER TOKEN RECEIVED]:", token);

      // Save Token
      localStorage.setItem("userToken", token);
      console.log("💾 Token saved to localStorage");

      // Redirect to Login
      console.log("🔁 Redirecting to login in 2s...");
      setTimeout(() => setCurrentScreen("login"), 2000);
    } catch (err) {
      console.error("🟥 [SIGNUP FAILED]:", err.message);
    } finally {
      console.log("🟨 [SIGNUP FLOW COMPLETE]");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us today!</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:bg-purple-300 font-medium"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        {/* Login Redirect */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => setCurrentScreen("login")}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
