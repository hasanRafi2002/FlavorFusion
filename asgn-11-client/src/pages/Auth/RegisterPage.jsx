


import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../../firebase/firebase.init';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import Lottie from "lottie-react";
import RegisterBanner from "../../assets/login-banner.json";

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', imageURL: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/'; // Get the previous path or default to home

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, imageURL } = formData;

    if (!validatePassword(password)) {
      showAlert('Password must be at least 6 characters long and include both uppercase and lowercase letters.', 'error');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
        photoURL: imageURL,
      });
      const idToken = await user.getIdToken();
      Cookies.set('token', idToken, { path: '/', expires: 1 });
      setShowModal(true);
      showAlert("Registration successful!", "success");
    } catch (err) {
      console.error('Error registering user:', err);
      showAlert(err.message || 'Registration failed. Please try again.', "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = from; // Navigate back to the previous page
  };

  const showAlert = (message, type) => {
    const id = Date.now();
    setAlerts([...alerts, { id, message, type }]);
    setTimeout(() => {
      setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r  dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
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
        <Lottie animationData={RegisterBanner} loop className="object-cover w-full h-full" />
      </div>

      <div className="relative max-w-xl px-4 py-8 mx-auto mt-10">
        <button 
          onClick={() => navigate('/login', { state: { from } })}
          className="absolute flex items-center text-gray-600 transition-colors left-4 -top-4 hover:text-violet-600"
        >
          <FaArrowLeft className="w-4 h-4 mr-1" />
          Back to Login
        </button>

        <div className="p-8 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
          <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text">
            Create Account
          </h2>

          {error && (
            <div className="p-3 mb-6 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="relative">
                <FaUser className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full py-2 pl-10 pr-4 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full py-2 pl-10 pr-4 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full py-2 pl-10 pr-12 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="imageURL" className="block mb-1 text-sm font-medium text-gray-700">
                Profile Image URL
              </label>
              <div className="relative">
                <FaImage className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="url"
                  id="imageURL"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  placeholder="Enter a valid image URL"
                  required
                  className="w-full py-2 pl-10 pr-4 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg font-medium hover:from-violet-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            Already registered?{" "}
            <button
              onClick={() => navigate('/login', { state: { from } })}
              className="font-medium transition-colors text-violet-600 hover:text-violet-700"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Registration Successful!</h2>
            <p className="mb-4">You have successfully registered. You will be redirected shortly.</p>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-white rounded-lg bg-violet-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;