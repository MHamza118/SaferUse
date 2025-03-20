//settings page
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from '../components/settings/DeleteConfirmationModal';

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [adminToDelete, setAdminToDelete] = useState(null);

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem('admins'));
    setAdmins(storedAdmins || []);
  }, []);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!validateForm(newAdmin)) return;

    const updatedAdmins = [...admins, { ...newAdmin, id: Date.now() }];
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    setNewAdmin({ firstName: '', lastName: '', email: '', address: '', mobile: '', profilePhoto: '' });
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
  };

  const validateForm = (data) => {
    const errors = {};
    const fields = ['firstName', 'lastName', 'email', 'address', 'mobile'];
    fields.forEach(field => {
      if (!data[field]) errors[field] = true;
    });
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
  };

  const handleDeleteConfirm = () => {
    const updatedAdmins = admins.filter((admin) => admin.id !== adminToDelete.id);
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    setAdminToDelete(null);
  };

  const handleDeleteCancel = () => {
    setAdminToDelete(null);
  };

  const handleEditAdmin = (index) => {
    const adminToEdit = admins[index];
    setNewAdmin(adminToEdit);
    setIsFormVisible(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Admin Settings</h2>
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Admin
        </button>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin, index) => (
              <tr key={admin.id || index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {admin.firstName} {admin.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditAdmin(index)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(admin)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Admin Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-md my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {newAdmin.id ? 'Edit Admin' : 'Add New Admin'}
              </h3>
              <button
                onClick={() => {
                  setIsFormVisible(false);
                  setNewAdmin({
                    firstName: '',
                    lastName: '',
                    email: '',
                    address: '',
                    mobile: '',
                    profilePhoto: ''
                  });
                  setFormErrors({});
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={newAdmin.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm p-2`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={newAdmin.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm p-2`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newAdmin.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm p-2`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={newAdmin.mobile}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.mobile ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm p-2`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newAdmin.address}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.address ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm p-2`}
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormVisible(false);
                    setNewAdmin({
                      firstName: '',
                      lastName: '',
                      email: '',
                      address: '',
                      mobile: '',
                      profilePhoto: ''
                    });
                    setFormErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {newAdmin.id ? 'Save Changes' : 'Add Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {adminToDelete && (
        <DeleteConfirmationModal
          adminName={`${adminToDelete.firstName} ${adminToDelete.lastName}`}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}

export default SettingsPage;
