import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faBell, 
  faUserCircle, 
  faEnvelope, 
  faCog, 
  faSignOutAlt, 
  faQuestionCircle,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons';

function Header({ onSearch, profilePhoto, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const notifications = [
    { id: 1, message: 'System update completed', time: '2 minutes ago', read: false },
    { id: 2, message: 'New donation received', time: '1 hour ago', read: false },
    { id: 3, message: 'Clinic inspection scheduled', time: '3 hours ago', read: true },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply dark mode to the entire app here
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-10">
      {/* Left side - Welcome message */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Welcome to SaferUse</h1>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>
      
      {/* Right side - Search, notifications, profile */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
          />
          <span 
            className="absolute left-3 top-2.5 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        
        {/* Dark mode toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
        
        {/* Messages */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <FontAwesomeIcon icon={faBell} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${notification.read ? 'border-transparent' : 'border-blue-500'}`}
                  >
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile */}
        <div className="relative">
          <button 
            onClick={toggleProfileMenu}
            className="flex items-center focus:outline-none"
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Admin Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} className="text-2xl text-gray-600" />
            )}
          </button>
          
          {/* Profile dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
              <Link 
                to="/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                My Profile
              </Link>
              <Link 
                to="/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Settings
              </Link>
              <Link 
                to="/help" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                Help Center
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <button 
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
