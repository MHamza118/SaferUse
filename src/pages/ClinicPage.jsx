import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function ClinicPage() {
  const [clinics, setClinics] = useState([
    { name: 'Clinic A', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic B', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic C', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic D', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic E', address: '123 Main St', date: new Date().toLocaleDateString() },
    { name: 'Clinic F', address: '123 Main St', date: new Date().toLocaleDateString()},
  ]);

  const [editingClinic, setEditingClinic] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', address: '', date: '' });
  const [deletingClinic, setDeletingClinic] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleEditClick = (clinic) => {
    setEditingClinic(clinic.name);
    setEditedData(clinic);
  };

  const handleDeleteClick = (clinicName) => {
    setDeletingClinic(clinicName);
  };

  const confirmDelete = () => {
    setClinics(clinics.filter(clinic => clinic.name !== deletingClinic));
    setDeletingClinic(null);
  };

  const cancelDelete = () => {
    setDeletingClinic(null);
  };

  const handleSaveEdit = () => {
    setClinics(clinics.map(clinic => (clinic.name === editingClinic ? editedData : clinic)));
    setEditingClinic(null);
    setEditedData({ name: '', address: '', date: '' });
  };
  
  const cancelEdit = () => {
    setEditingClinic(null);
  };
  

  const handleAddClick = () => {
    setShowAddForm(true);
    setNewClinicData({
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
    setFormErrors({});
  };

  const handleSaveNewClinic = () => {
    const errors = {};
    if (!newClinicData.name) errors.name = 'Name is required';
    if (!newClinicData.address) errors.address = 'Address is required';
    if (!newClinicData.description) errors.description = 'Description is required';
    if (!newClinicData.mobile) errors.mobile = 'Mobile number is required';
    if (!newClinicData.website) errors.website = 'Website is required';
    if (!newClinicData.officeTime.from || !newClinicData.officeTime.to) errors.officeTime = 'Office time is required';
    if (!newClinicData.image) errors.image = 'Image is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setClinics([...clinics, newClinicData]);
      setShowAddForm(false);
    }
  };

  const cancelAdd = () => {
    setShowAddForm(false);
  };

  const handleImageChange = (e) => {
    setNewClinicData({ ...newClinicData, image: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClinicData({ ...newClinicData, [name]: value });
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Clinics</h2>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleAddClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span>Add New</span>
        </button>
      </div>

      <div className="w-full">
        <table className="min-w-full bg-white border text-gray-500">
          <thead>
            <tr>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Clinic Name</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Clinic Address</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Date</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.name}>
                <td className="py-2 px-2 text-center border-b text-gray-700">{clinic.name}</td>
                <td className="py-2 px-2 text-center border-b text-gray-700">{clinic.address}</td>
                <td className="py-2 px-2 text-center border-b text-gray-700">{clinic.date}</td>
                <td className="py-2 px-2 text-center border-b text-gray-700">
                  <button className="text-blue-600 mr-2" onClick={() => handleEditClick(clinic)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500" onClick={() => handleDeleteClick(clinic.name)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Clinic Form */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-bold mb-4">Add New Clinic</h2>

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={newClinicData.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              required
            />
            {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}

            <input
              type="text"
              placeholder="Address"
              name="address"
              value={newClinicData.address}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              required
            />
            {formErrors.address && <p className="text-red-500">{formErrors.address}</p>}

            <textarea
              placeholder="Description"
              name="description"
              value={newClinicData.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              required
            />
            {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}

            <input
              type="text"
              placeholder="Coordinates (Latitude, Longitude)"
              name="coordinates"
              value={newClinicData.coordinates}
              onChange={handleCoordinateChange}
              pattern="^-?\d{1,2}\.\d{1,6},\s?-?\d{1,2}\.\d{1,6}$"
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.coordinates && <p className="text-red-500">{formErrors.coordinates}</p>}

            <div className="flex justify-between mb-2">
              <input
                type="time"
                placeholder="Office Time From"
                name="from"
                value={newClinicData.officeTime.from}
                onChange={handleTimeChange}
                className="border p-2 rounded w-full mb-2"
                required
              />
              <input
                type="time"
                placeholder="Office Time To"
                name="to"
                value={newClinicData.officeTime.to}
                onChange={handleTimeChange}
                className="border p-2 rounded w-full mb-2"
                required
              />
            </div>
            {formErrors.officeTime && <p className="text-red-500">{formErrors.officeTime}</p>}

            <input
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={newClinicData.mobile}
              onChange={handleInputChange}
              pattern="\d*"
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.mobile && <p className="text-red-500">{formErrors.mobile}</p>}

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={newClinicData.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

            <input
              type="url"
              placeholder="Website URL"
              name="website"
              value={newClinicData.website}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.website && <p className="text-red-500">{formErrors.website}</p>}

            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.image && <p className="text-red-500">{formErrors.image}</p>}

            <div className="flex justify-between mt-4">
              <button onClick={cancelAdd} className="bg-gray-300 p-2 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleSaveNewClinic} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Save Clinic
              </button>
            </div>
          </div>
        </div>
      )}
    {/* Edit Clinic Form */}
      {editingClinic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-bold mb-4">Edit Clinic</h2>

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />

            <input
              type="text"
              placeholder="Address"
              name="address"
              value={editedData.address}
              onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />


              
            <textarea
              placeholder="Description"
              name="description"
              value={newClinicData.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              required
            />
            {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}

            <input
              type="text"
              placeholder="Coordinates (Latitude, Longitude)"
              name="coordinates"
              value={newClinicData.coordinates}
              onChange={handleCoordinateChange}
              pattern="^-?\d{1,2}\.\d{1,6},\s?-?\d{1,2}\.\d{1,6}$"
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.coordinates && <p className="text-red-500">{formErrors.coordinates}</p>}

            <div className="flex justify-between mb-2">
              <input
                type="time"
                placeholder="Office Time From"
                name="from"
                value={newClinicData.officeTime.from}
                onChange={handleTimeChange}
                className="border p-2 rounded w-full mb-2"
                required
              />
              <input
                type="time"
                placeholder="Office Time To"
                name="to"
                value={newClinicData.officeTime.to}
                onChange={handleTimeChange}
                className="border p-2 rounded w-full mb-2"
                required
              />
            </div>
            {formErrors.officeTime && <p className="text-red-500">{formErrors.officeTime}</p>}

            <input
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={newClinicData.mobile}
              onChange={handleInputChange}
              pattern="\d*"
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.mobile && <p className="text-red-500">{formErrors.mobile}</p>}

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={newClinicData.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

            <input
              type="url"
              placeholder="Website URL"
              name="website"
              value={newClinicData.website}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.website && <p className="text-red-500">{formErrors.website}</p>}

            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 rounded w-full mb-2"
            />
            {formErrors.image && <p className="text-red-500">{formErrors.image}</p>}

            <div className="flex justify-between mt-4">
              <button onClick={cancelEdit} className="bg-gray-300 p-2 rounded">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white p-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {deletingClinic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {deletingClinic}?</p>
            <div className="mt-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                Delete
              </button>
              <button onClick={cancelDelete} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
}

export default ClinicPage;