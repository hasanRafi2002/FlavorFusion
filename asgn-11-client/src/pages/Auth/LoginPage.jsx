



import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import Cookies from "js-cookie";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "../../firebase/firebase.init";
import Logbanner from "../../assets/reg.json";
import Logfire from "../../assets/firebase.json";
import Loggoogle from "../../assets/google.json";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // Get the previous path or default to home

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      Cookies.set("token", idToken, { path: "/", expires: 1 });
      setIsSuccessModalOpen(true); // Show the success modal
      showAlert("Login successful!", "success");
    } catch (err) {
      // setError(err.message || "Login failed. Please try again.");
      showAlert(err.message || "Login failed. Please try again.", "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      Cookies.set("token", idToken, { path: "/", expires: 1 });
      setIsSuccessModalOpen(true); // Show the success modal
      showAlert("Google login successful!", "success");
    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
      showAlert(err.message || "Google login failed. Please try again.", "error");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      showAlert("Password reset email sent", "success");
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to send password reset email. Please try again.");
      showAlert(err.message || "Failed to send password reset email. Please try again.", "error");
    }
  };

  const openForgotPasswordModal = () => {
    setResetEmail(formData.email); // Pre-fill the email from the form
    setIsModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate(from, { replace: true });
  };

  const showAlert = (message, type) => {
    const id = Date.now();
    setAlerts([...alerts, { id, message, type }]);
    setTimeout(() => {
      setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r  dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      {/* Alert Messages */}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 text-sm rounded-lg shadow-md ${
              alert.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            {alert.message}
          </div>
        ))}
      </div>

      {/* Banner Section */}
      <div className="relative w-full h-[100px] md:h-[150px] overflow-hidden shadow-lg">
        <Lottie animationData={Logbanner} loop className="object-cover w-full h-full" />
      </div>

      {/* Login Form Section */}
      <div className="flex items-center justify-center flex-1 px-4 py-8 mt-10">
        <div className="w-full max-w-xl p-8 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
          <div className="flex">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 transition-transform transform rounded-full shadow-lg bg-white/90 hover:scale-105">
              <Lottie animationData={Logfire} loop className="w-20 h-20" />
            </div>
            <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text">
              Welcome Back
            </h2>
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 transition-transform transform rounded-full shadow-lg bg-white/90 hover:scale-105">
              <Lottie animationData={Loggoogle} loop className="w-20 h-20" />
            </div>
          </div>

          <p className="text-center text-gray-600">Login to access your account</p>

          {error && (
            <div className="p-3 mt-4 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <AiOutlineMail className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
                <AiOutlineLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm font-medium transition-colors text-violet-600 hover:text-violet-700"
                onClick={openForgotPasswordModal}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-4 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg font-medium hover:from-violet-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Login with Google
          </button>

          <div className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register", { state: { from } })}
              className="font-medium transition-colors text-violet-600 hover:text-violet-700"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Reset Password</h2>
            <div>
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">
                Enter your email
              </label>
              <input
                type="email"
                id="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700"
                onClick={handlePasswordReset}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Login Successful!</h2>
            <p className="mb-4">You have successfully logged in. You will be redirected shortly.</p>
            <button
              type="button"
              className="px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700"
              onClick={handleCloseSuccessModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;