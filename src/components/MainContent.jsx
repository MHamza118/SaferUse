import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faClinicMedical,
  faCloud,
  faDonate,
  faEdit,
  faTrash,
  faFolder,
  faUsers,
  faChartLine,
  faCalendarAlt,
  faBell,
  faCheckCircle,
  faExclamationTriangle,
  faArrowUp,
  faArrowDown,
  faEllipsisV,
  faFilter,
  faDownload,
  faSync,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import CircularProgressBar from './CircularProgressBar';

function MainContent() {
  // State for clinics data
  const [clinics, setClinics] = useState([
    { name: 'Clinic A', address: '123 Main St', date: new Date().toLocaleDateString(), status: 'Active' },
    { name: 'Clinic B', address: '456 Oak Ave', date: new Date().toLocaleDateString(), status: 'Active' },
    { name: 'Clinic C', address: '789 Pine Rd', date: new Date().toLocaleDateString(), status: 'Inactive' },
    { name: 'Clinic D', address: '101 Maple Dr', date: new Date().toLocaleDateString(), status: 'Active' },
    { name: 'Clinic E', address: '202 Cedar Ln', date: new Date().toLocaleDateString(), status: 'Active' },
    { name: 'Clinic F', address: '303 Birch Blvd', date: new Date().toLocaleDateString(), status: 'Inactive' },
  ]);

  // State for clinic form
  const [newClinicData, setNewClinicData] = useState({
    name: '',
    address: '',
    description: '',
    coordinates: '',
    mobile: '',
    website: '',
    officeTime: { from: '', to: '' },
    date: new Date().toLocaleDateString(),
    image: null,
  });

  // State for form validation
  const [formErrors, setFormErrors] = useState({
    name: '',
    address: '',
    description: '',
    mobile: '',
    website: '',
    officeTimeFrom: '',
    officeTimeTo: '',
    image: '',
  });

  // State for editing and deleting clinics
  const [editingClinic, setEditingClinic] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', address: '', date: '' });
  const [deletingClinic, setDeletingClinic] = useState(null);
  
  // Dashboard data
  const [dashboardData, setDashboardData] = useState([
    { label: 'Clinic', value: 12, color: '#f87171', percentage: 8, increase: true },
    { label: 'Quotes', value: 9, color: '#60a5fa', percentage: 5, increase: true },
    { label: 'Donations', value: 3, color: '#34d399', percentage: 2, increase: false },
    { label: 'Users', value: 42, color: '#a78bfa', percentage: 12, increase: true },
  ]);

  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('weekly');
  
  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTime, setRefreshTime] = useState(new Date());

  // Recent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'New clinic added', user: 'Admin1', time: '2 hours ago', icon: faClinicMedical, color: 'bg-red-100 text-red-500' },
    { id: 2, action: 'Donation received', user: 'Admin2', time: '3 hours ago', icon: faDonate, color: 'bg-green-100 text-green-500' },
    { id: 3, action: 'Quote approved', user: 'Admin3', time: '5 hours ago', icon: faCloud, color: 'bg-blue-100 text-blue-500' },
    { id: 4, action: 'New user registered', user: 'Admin1', time: '1 day ago', icon: faUsers, color: 'bg-purple-100 text-purple-500' },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'System update completed', type: 'success' },
    { id: 2, message: 'Low storage warning', type: 'warning' },
    { id: 3, message: 'New donation received', type: 'info' },
  ]);

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClinics, setFilteredClinics] = useState(clinics);

  // Calculate total data
  const totalData = dashboardData.reduce((acc, curr) => acc + curr.value, 0);
  const clinicProgress = (dashboardData[0].value / totalData) * 100;

  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update dashboard data with random changes
      const updatedData = dashboardData.map(item => {
        const changePercent = Math.floor(Math.random() * 10) - 3; // Random change between -3 and +6
        const newValue = Math.max(1, item.value + Math.floor(Math.random() * 5) - 1); // Random value change
        return {
          ...item,
          value: newValue,
          percentage: Math.abs(changePercent),
          increase: changePercent >= 0
        };
      });
      
      setDashboardData(updatedData);
      setRefreshTime(new Date());
      setIsLoading(false);
    }, 800);
  };

  // Change time period data
  const changeTimePeriod = (period) => {
    setIsLoading(true);
    setTimePeriod(period);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate different data based on selected time period
      let multiplier = 1;
      if (period === 'monthly') multiplier = 4;
      if (period === 'yearly') multiplier = 12;
      
      const updatedData = dashboardData.map(item => {
        const baseValue = Math.floor(item.value / 2); // Use half of current value as base
        const newValue = baseValue + Math.floor(Math.random() * baseValue * multiplier);
        const changePercent = Math.floor(Math.random() * 15) - 5; // Random change between -5 and +10
        
        return {
          ...item,
          value: newValue,
          percentage: Math.abs(changePercent),
          increase: changePercent >= 0
        };
      });
      
      setDashboardData(updatedData);
      setIsLoading(false);
    }, 600);
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredClinics(clinics);
    } else {
      const filtered = clinics.filter(clinic => 
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClinics(filtered);
    }
  }, [searchQuery, clinics]);

  // Form handling functions
  const handleImageChange = (e) => {
    setNewClinicData({ ...newClinicData, image: e.target.files[0] });
  };

  const handleCoordinateChange = (e) => {
    setNewClinicData({
      ...newClinicData,
      coordinates: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setNewClinicData({
      ...newClinicData,
      officeTime: { ...newClinicData.officeTime, [name]: value },
    });
  };

  const handleEditClick = (clinic) => {
    setEditingClinic(clinic.name);
    setEditedData(clinic);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClinicData({ ...newClinicData, [name]: value });
  };

  const handleDeleteClick = (clinicName) => {
    setDeletingClinic(clinicName);
  };

  const confirmDelete = () => {
    const updatedClinics = clinics.filter(clinic => clinic.name !== deletingClinic);
    setClinics(updatedClinics);
    setFilteredClinics(updatedClinics);
    setDeletingClinic(null);
    
    // Add to recent activities
    const newActivity = {
      id: recentActivities.length + 1,
      action: `Deleted clinic: ${deletingClinic}`,
      user: 'Admin',
      time: 'Just now',
      icon: faTrash,
      color: 'bg-red-100 text-red-500'
    };
    
    setRecentActivities([newActivity, ...recentActivities.slice(0, 3)]);
  };

  const cancelDelete = () => {
    setDeletingClinic(null);
  };

  const handleSaveEdit = () => {
    const updatedClinics = clinics.map(clinic => (clinic.name === editingClinic ? editedData : clinic));
    setClinics(updatedClinics);
    setFilteredClinics(updatedClinics);
    setEditingClinic(null);
    setEditedData({ name: '', address: '', date: '' });
    
    // Add to recent activities
    const newActivity = {
      id: recentActivities.length + 1,
      action: `Updated clinic: ${editedData.name}`,
      user: 'Admin',
      time: 'Just now',
      icon: faEdit,
      color: 'bg-blue-100 text-blue-500'
    };
    
    setRecentActivities([newActivity, ...recentActivities.slice(0, 3)]);
  };

  const cancelEdit = () => {
    setEditingClinic(null);
  };

  // Export data function
  const exportData = () => {
    // In a real app, this would generate a CSV or Excel file
    alert('Data export started. Your file will be ready for download shortly.');
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications([]);
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50">
      {/* Dashboard Title */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your organization today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Last updated: {refreshTime.toLocaleTimeString()}
          </span>
          <button 
            onClick={refreshData} 
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            <FontAwesomeIcon 
              icon={faSync} 
              className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`} 
            />
          </button>
          <button 
            onClick={exportData}
            className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg border-l-4" style={{ borderLeftColor: item.color }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{item.value}</h3>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${item.increase ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    <FontAwesomeIcon icon={item.increase ? faArrowUp : faArrowDown} className="mr-1" />
                    {item.percentage}%
                  </span>
                  <span className="text-xs text-gray-400 ml-1">vs last {timePeriod.slice(0, -2)}</span>
                </div>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: `${item.color}20` }}>
                <FontAwesomeIcon
                  icon={
                    index === 0 ? faClinicMedical :
                      index === 1 ? faCloud :
                        index === 2 ? faDonate :
                          faUsers
                  }
                  className="text-xl"
                  style={{ color: item.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section - Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Performance Analytics</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timePeriod === 'weekly' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => changeTimePeriod('weekly')}
                disabled={isLoading}
              >
                Weekly
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timePeriod === 'monthly' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => changeTimePeriod('monthly')}
                disabled={isLoading}
              >
                Monthly
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timePeriod === 'yearly' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => changeTimePeriod('yearly')}
                disabled={isLoading}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center h-64 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                <div className="animate-pulse text-blue-600">
                  <FontAwesomeIcon icon={faSync} className="animate-spin text-2xl" />
                </div>
              </div>
            )}
            
            {/* Histogram charts */}
            <div className="w-full h-full flex items-end justify-around px-4">
              {dashboardData.slice(0, 3).map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-16 rounded-t-lg transition-all duration-500 ease-in-out" 
                    style={{ 
                      height: `${(item.value / Math.max(...dashboardData.map(d => d.value))) * 180}px`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    <div className="text-lg font-bold text-gray-800">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${activity.color}`}>
                  <FontAwesomeIcon icon={activity.icon} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">By {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-800 text-center">
            View All Activity
          </button>
        </div>
      </div>

      {/* Bottom Section - Table and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clinics Table */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Clinics Overview</h2>
            <div className="flex space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search clinics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 pl-9 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-48"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
              <Link to="/clinic" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                View All
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinic Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClinics.length > 0 ? (
                  filteredClinics.slice(0, 5).map((clinic, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800">{clinic.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{clinic.address}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{clinic.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${clinic.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {clinic.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-3" onClick={() => handleEditClick(clinic)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(clinic.name)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      No clinics found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
            <FontAwesomeIcon icon={faBell} className="text-gray-400" />
          </div>

          {notifications.length > 0 ? (
            <>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${notification.type === 'success' ? 'bg-green-100 text-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                          'bg-blue-100 text-blue-500'
                      }`}>
                      <FontAwesomeIcon icon={
                        notification.type === 'success' ? faCheckCircle :
                          notification.type === 'warning' ? faExclamationTriangle :
                            faBell
                      } />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex mt-4">
                <button 
                  onClick={markAllNotificationsAsRead}
                  className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 text-center"
                >
                  Mark All as Read
                </button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="text-gray-400 mb-2">
                <FontAwesomeIcon icon={faBell} className="text-3xl" />
              </div>
              <p className="text-gray-500">No new notifications</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingClinic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete {deletingClinic}?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingClinic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-bold mb-4">Edit Clinic</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editedData.address}
                  onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={editedData.status || 'Active'}
                  onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
