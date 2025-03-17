//settings page
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function SettingsPage({ onProfilePhotoChange, isSuperAdmin }) {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    profilePhoto: ''
  });
 

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    setNewAdmin({ firstName: '', lastName: '', email: '', address: '', mobile: '' });
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  
  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem('admins'));
    setAdmins(storedAdmins || []);
  }, []);
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    password:'',
    profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgj9zAP5dPVfTc357VxZrF9hXYbG2ybB4vJQ&s',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(adminData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem('loggedInAdmin'));
    if (loggedInAdmin) {
      setAdminData(loggedInAdmin);
      setEditedData(loggedInAdmin); // To enable editing
      if (onProfilePhotoChange) onProfilePhotoChange(loggedInAdmin.profilePhoto);
    }
  }, [onProfilePhotoChange]);
  const [newFormData, setNewFormData] = useState({
    picture: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    password:'',
    profilePhoto: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    mobile: false,
  });

  const [addedData, setAddedData] = useState([]);

  useEffect(() => {
    if (onProfilePhotoChange) onProfilePhotoChange(adminData.profilePhoto);
  }, [adminData.profilePhoto, onProfilePhotoChange]);
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');  // Retrieve email from localStorage
    const userPassword = localStorage.getItem('userPassword');  // Retrieve password from localStorage
    const profilePhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgj9zAP5dPVfTc357VxZrF9hXYbG2ybB4vJQ&s'; // Placeholder for profile photo

    // Update adminData with the values from localStorage
    setAdminData((prevData) => ({
      ...prevData,
      email: userEmail || prevData.email,
      password: userPassword || prevData.password,
      profilePhoto,
    }));
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setAdminData(editedData);
    setIsEditing(false);
    if (onProfilePhotoChange) onProfilePhotoChange(editedData.profilePhoto);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedData(adminData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedData({ ...editedData, profilePhoto: URL.createObjectURL(file) });
    }
  };

  const handleAddClick = () => {
    setIsFormVisible(true);
    setNewFormData({
      picture: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      mobile: '',
      password:'',
      profilePhoto: '',
    });
    setFormErrors({
      firstName: false,
      lastName: false,
      email: false,
      address: false,
      mobile: false,
      password:'',
      profilePhoto: '',
    });
  };

  const closeModal = () => {
    setIsFormVisible(false);
  };

  const handleNewFormChange = (e) => {
    const { name, value } = e.target;
    setNewFormData({ ...newFormData, [name]: value });
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFormData({ ...newFormData, picture: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(newFormData).forEach((key) => {
      if (newFormData[key] === '') {
        errors[key] = true;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAddedData([...addedData, newFormData]);
      setIsFormVisible(false);
    }
  };

  const handleDelete = (index) => {
    const updatedData = addedData.filter((_, i) => i !== index);
    setAddedData(updatedData);
  };

  const handleEditData = (index) => {
    const dataToEdit = addedData[index];
    setNewFormData(dataToEdit);
    setIsFormVisible(true);
    setAddedData(addedData.filter((_, i) => i !== index));
  };
  const handleDeleteAdmin = (index) => {
    // Filter out the admin at the specified index
    const updatedAdmins = admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins)); // Update the local storage
  };
  
  const handleEditAdmin = (index) => {
    const adminToEdit = admins[index];
    setNewAdmin(adminToEdit); // Pre-populate the form with the admin's data for editing
    setIsFormVisible(true); // Show the form for editing
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Admin Settings</h2>

      <div className="flex flex-col space-y-4">
        {/* Profile Section */}
        <div className="relative">
          <img
            src={adminData.profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Data Fields */}
          <div>
            <label className="block text-gray-700 font-medium">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editedData.firstName}
                onChange={handleInputChange}
                className={`border p-2 rounded w-full ${formErrors.firstName ? 'border-red-500' : ''}`}
              />
            ) : (
              <p className="border p-2 rounded w-full bg-gray-100">{adminData.email.split('@')[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={editedData.lastName}
                onChange={handleInputChange}
                className={`border p-2 rounded w-full ${formErrors.lastName ? 'border-red-500' : ''}`}
              />
            ) : (
              <p className="border p-2 rounded w-full bg-gray-100">{adminData.lastName}</p>
            )}
          </div>
        </div>

        {/* Other Data Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                className={`border p-2 rounded w-full ${formErrors.email ? 'border-red-500' : ''}`}
              />
            ) : (
              <p className="border p-2 rounded w-full bg-gray-100">{adminData.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleInputChange}
                className={`border p-2 rounded w-full ${formErrors.address ? 'border-red-500' : ''}`}
              />
            ) : (
              <p className="border p-2 rounded w-full bg-gray-100">{adminData.address}</p>
            )}
          </div>
        </div>

        {/* Mobile Field */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Mobile</label>
            {isEditing ? (
              <input
                type="text"
                name="mobile"
                value={editedData.mobile}
                onChange={handleInputChange}
                className={`border p-2 rounded w-full ${formErrors.mobile ? 'border-red-500' : ''}`}
              />
            ) : (
              <p className="border p-2 rounded w-full bg-gray-100">{adminData.mobile}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={isEditing ? handleSaveEdit : handleEditClick}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          <span>{isEditing ? 'Save' : 'Update'}</span>
        </button>
        {isEditing && (
          <button
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
       {isSuperAdmin && (
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? 'Cancel' : 'Add New Admin'}
          </button>
        )}
      </div>

      {/* New Admin Modal */}
      {isFormVisible && (
        <form onSubmit={handleAddAdmin} className="mt-4 space-y-4">
          <input type="text" name="firstName" placeholder="First Name" value={newAdmin.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={newAdmin.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={newAdmin.email} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={newAdmin.address} onChange={handleChange} required />
          <input type="text" name="mobile" placeholder="Mobile" value={newAdmin.mobile} onChange={handleChange} required />
          <input type="text" name="password" placeholder="password" value={newAdmin.password} onChange={handleChange} required />
         
          <button type="submit">Save Admin</button>
        </form>
      )}

<div className="mt-8">
    <h3 className="text-xl mt-6">Added Admins</h3>
    <ul>
      {admins.map((admin, index) => (
        <li key={index} className="border p-2 my-2 flex justify-between">
          <div>
            {admin.firstName} {admin.lastName} - {admin.email} - {admin.address} - {admin.mobile}
          </div>

          {/* Show Edit and Delete buttons only if the user is a superadmin */}
          {isSuperAdmin && (
            <div className="flex space-x-2">
              <button
                className="flex items-center bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                onClick={() => handleEditAdmin(index)}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-1" />
                Edit
              </button>
              <button
                className="flex items-center bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteAdmin(index)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
   

      {/* Added Admins Data */}
      <div className="mt-8">
      
        <div className="space-y-4">
          {addedData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4 border-b py-2">
              <img
                src={data.picture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgj9zAP5dPVfTc357VxZrF9hXYbG2ybB4vJQ&s'}
                alt="Admin"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p>{data.firstName} {data.lastName}</p>
                <p>{data.email}</p>
                <p>{data.address}</p>
                <p>{data.phoneNumber}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => handleEditData(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
