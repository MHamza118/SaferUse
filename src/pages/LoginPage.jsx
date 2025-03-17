import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();  // We will use this to navigate programmatically

  const handleLogin = (e) => {
    e.preventDefault();
    // Save the email and password to localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('isLoggedIn', 'true'); // Set login status in localStorage
    onLogin(email, password); // Pass the email and password to the parent component
    navigate('/');  // Redirect to the main page
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); // Toggle the password visibility
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Conditionally change input type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility} // Toggle password visibility
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"} {/* Toggle text based on state */}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
