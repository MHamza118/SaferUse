import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faClinicMedical,
  faDonate,
  faCog,
  faCloud,
  faSignOutAlt,
  faChevronRight,
  faChevronDown,
  faList,
  faPlus,
  faUsers,
  faUser,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../components/saferuselogo.png';

function Sidebar({ handleLogout }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  //State for dropdown menus
  const [openDropdown, setOpenDropdown] = useState({
    dashboard: false,
    clinics: false,
    quotes: false,
    donations: false,
    settings: false
  });

  const toggleDropdown = (dropdown) => {
    if (collapsed) {
      setCollapsed(false);
      setTimeout(() => {
        setOpenDropdown({
          ...openDropdown,
          [dropdown]: !openDropdown[dropdown]
        });
      }, 300);
    } else {
      setOpenDropdown({
        ...openDropdown,
        [dropdown]: !openDropdown[dropdown]
      });
    }
  };

  const isActive = (path) => {
    return location.pathname === path ||
      (location.pathname === '/' && path === '/dashboard');
  };

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-gray-900 text-gray-300 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden`}>
      <div>
        {/* Logo */}
        <div className="p-4 flex items-center justify-center">
          {collapsed ? (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
          ) : (
            <img src={logo} alt="Logo" className="h-16" />
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-16 -right-3 bg-blue-600 text-white rounded-full p-1 shadow-md hover:bg-blue-700 transition-colors"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`text-xs transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Navigation */}
        <nav className="mt-8">
          <ul className="space-y-2 px-3">
            {/* Dashboard */}
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center py-3 px-4 rounded-lg transition-colors ${isActive('/dashboard')
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
                  }`}
              >
                <FontAwesomeIcon icon={faTachometerAlt} className={`${collapsed ? 'text-lg' : 'mr-3'}`} />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>

            {/* Clinics with dropdown */}
            <li>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('clinics')}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isActive('/clinic') || location.pathname.includes('/clinic/')
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faClinicMedical} className={`${collapsed ? 'text-lg' : 'mr-3'}`} />
                    {!collapsed && <span>Clinics</span>}
                  </div>
                  {!collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs transition-transform duration-200 ${openDropdown.clinics ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {openDropdown.clinics && !collapsed && (
                  <div className="pl-10 mt-1 space-y-1 bg-gray-800 rounded-md py-2">
                    <Link
                      to="/clinic/list"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/clinic/list' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faList} className="mr-2 text-xs" />
                      List of Clinics
                    </Link>
                    <Link
                      to="/clinic/add"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/clinic/add' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2 text-xs" />
                      Add New Clinic
                    </Link>
                  </div>
                )}
              </div>
            </li>

            {/* Quotes with dropdown */}
            <li>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('quotes')}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isActive('/quotes') || location.pathname.includes('/quotes/')
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCloud} className={`${collapsed ? 'text-lg' : 'mr-3'}`} />
                    {!collapsed && <span>Quotes</span>}
                  </div>
                  {!collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs transition-transform duration-200 ${openDropdown.quotes ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {openDropdown.quotes && !collapsed && (
                  <div className="pl-10 mt-1 space-y-1 bg-gray-800 rounded-md py-2">
                    <Link
                      to="/quotes/list"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/quotes/list' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faList} className="mr-2 text-xs" />
                      List of Quotes
                    </Link>
                    <Link
                      to="/quotes/add"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/quotes/add' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2 text-xs" />
                      Add New Quote
                    </Link>
                  </div>
                )}
              </div>
            </li>

            {/* Donations */}
            <li>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('donations')}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isActive('/donations') || location.pathname.includes('/donations/')
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faDonate} className={`${collapsed ? 'text-lg' : 'mr-3'}`} />
                    {!collapsed && <span>Donations</span>}
                  </div>
                  {!collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs transition-transform duration-200 ${openDropdown.donations ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {openDropdown.donations && !collapsed && (
                  <div className="pl-10 mt-1 space-y-1 bg-gray-800 rounded-md py-2">
                    <Link
                      to="/donations/list"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/donations/list' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faList} className="mr-2 text-xs" />
                      List of Donations
                    </Link>
                    <Link
                      to="/donations/add"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/donations/add' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2 text-xs" />
                      Add New Donation
                    </Link>
                  </div>
                )}
              </div>
            </li>

            {/* Users */}
            <li>
              <Link
                to="/users"
                className={`flex items-center py-3 px-4 rounded-lg transition-colors ${isActive('/users')
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
                  }`}
              >
                <FontAwesomeIcon icon={faUsers} className={`${collapsed ? 'text-lg' : 'mr-3'}`} />
                {!collapsed && <span>Users</span>}
              </Link>
            </li>

            {/* Settings */}
            <li>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('settings')}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isActive('/settings')
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCog} className={`${collapsed ? 'text-lg' : 'mr-3'}`} />
                    {!collapsed && <span>Settings</span>}
                  </div>
                  {!collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs transition-transform duration-200 ${openDropdown.settings ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {openDropdown.settings && !collapsed && (
                  <div className="pl-10 mt-1 space-y-1 bg-gray-800 rounded-md py-2">
                    <Link
                      to="/settings/profile"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/settings/profile' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2 text-xs" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/settings/security"
                      className={`block py-2 px-3 rounded-md text-sm hover:bg-gray-700 flex items-center ${location.pathname === '/settings/security' ? 'text-blue-400' : ''
                        }`}
                    >
                      <FontAwesomeIcon icon={faLock} className="mr-2 text-xs" />
                      Security
                    </Link>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center py-3 px-4 rounded-lg text-red-400 hover:bg-gray-800 transition-colors"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className={`${collapsed ? 'text-lg' : 'mr-3'}`} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default Sidebar;