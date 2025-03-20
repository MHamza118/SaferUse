import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function DonationsPage() {
  const [donations, setDonations] = useState([
    { 
      title: 'Donate for Education', 
      description: 'Help fund education for underprivileged children.', 
      amount: 5000,
      donatedBy: 'Arif Jan',
      date: new Date().toLocaleDateString(), 
      image: null 
    },
    { 
      title: 'Support for Homeless Shelters', 
      description: 'Provide shelter and food for the homeless this winter.', 
      amount: 7500,
      donatedBy: 'Hanzallah',
      date: new Date().toLocaleDateString(), 
      image: null 
    },
    { 
      title: 'Medical Aid Fund', 
      description: 'Donate to help provide medical supplies for rural hospitals.', 
      amount: 10000,
      donatedBy: 'Zain',
      date: new Date().toLocaleDateString(), 
      image: null 
    },
    { 
      title: 'Clean Water Initiative', 
      description: 'Support the construction of wells in drought-stricken areas.', 
      amount: 15000,
      donatedBy: 'ALi',
      date: new Date().toLocaleDateString(), 
      image: null 
    },
    { 
      title: 'Disaster Relief Fund', 
      description: 'Help victims of natural disasters with essential supplies.', 
      amount: 12000,
      donatedBy: 'Hamza',
      date: new Date().toLocaleDateString(), 
      image: null 
    },
    { 
      title: 'Animal Rescue Fund', 
      description: 'Donate to save animals from cruelty and provide care.', 
      amount: 8000,
      donatedBy: 'Farah',
      date: new Date().toLocaleDateString(), 
      image: null 
    }
  ]);
  
  const [editingDonation, setEditingDonation] = useState(null);
  const [editedData, setEditedData] = useState({ 
    title: '', 
    description: '', 
    amount: 0,
    donatedBy: '',
    date: '', 
    image: null 
  });
  const [deletingDonation, setDeletingDonation] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDonationData, setNewDonationData] = useState({ 
    title: '', 
    description: '', 
    amount: 0,
    donatedBy: '',
    date: new Date().toLocaleDateString(), 
    image: null 
  });
  
  const [errors, setErrors] = useState({ 
    title: false, 
    description: false,
    amount: false,
    donatedBy: false 
  });

  

  const handleDeleteClick = (donationTitle) => {
    setDeletingDonation(donationTitle);
  };

  const confirmDelete = () => {
    setDonations(donations.filter((donation) => donation.title !== deletingDonation));
    setDeletingDonation(null);
  };

  const cancelDelete = () => {
    setDeletingDonation(null);
  };


  const handleEditClick = (donation) => {
    setEditingDonation(donation.title);
    setEditedData(donation);
  };
  const handleSaveEdit = () => {
    if (!editedData.title || !editedData.description || !editedData.amount || !editedData.donatedBy) {
      setErrors({ 
        title: !editedData.title, 
        description: !editedData.description,
        amount: !editedData.amount,
        donatedBy: !editedData.donatedBy 
      });
      return;
    }
    setDonations(donations.map((donation) => (donation.title === editingDonation ? editedData : donation)));
    setEditingDonation(null);
    setEditedData({ title: '', description: '', amount: 0, donatedBy: '', date: '', image: null });
  };

  const cancelEdit = () => {
    setEditingDonation(null);
  };

  
  const handleAddClick = () => {
    setShowAddForm(true);
    setNewDonationData({ title: '', description: '', amount: 0, donatedBy: '', date: new Date().toLocaleDateString(), image: null });
    setErrors({ title: false, description: false, amount: false, donatedBy: false });
  };

  const handleSaveNewDonation = () => {
    if (!newDonationData.title || !newDonationData.description || !newDonationData.amount || !newDonationData.donatedBy) {
      setErrors({ 
        title: !newDonationData.title, 
        description: !newDonationData.description,
        amount: !newDonationData.amount,
        donatedBy: !newDonationData.donatedBy 
      });
      return;
    }
    setDonations([...donations, newDonationData]);
    setShowAddForm(false);
  };

  const cancelAdd = () => {
    setShowAddForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedData({ ...editedData, image: reader.result });
      setNewDonationData({ ...newDonationData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Donations</h2>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleAddClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span>Add New</span>
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border text-gray-500">
          <thead>
            <tr>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Donation Title</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Description</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Amount</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Donated By</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Date</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.title}>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.title}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.description}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">${donation.amount.toLocaleString()}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.donatedBy}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.date}</td>
                <td className="py-2 px-2 text-center border-b text-gray-700">
                  <button className="text-blue-600 mr-2" onClick={() => handleEditClick(donation)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500" onClick={() => handleDeleteClick(donation.title)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editingDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Edit Donation</h2>

            <label className="block text-left">
              Donation Title
              <input
                type="text"
                placeholder="Enter Donation Title"
                value={editedData.title}
                onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.title ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Donation Description
              <input
                type="text"
                placeholder="Enter Donation Description"
                value={editedData.description}
                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.description ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Amount ($)
              <input
                type="number"
                min="0"
                placeholder="Enter Donation Amount"
                value={editedData.amount}
                onChange={(e) => setEditedData({ ...editedData, amount: parseFloat(e.target.value) })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.amount ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Donated By
              <input
                type="text"
                placeholder="Enter Donor Name"
                value={editedData.donatedBy}
                onChange={(e) => setEditedData({ ...editedData, donatedBy: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.donatedBy ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Upload Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <div className="mt-6">
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Donation Form */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add New Donation</h2>

            <label className="block text-left">
              Donation Title
              <input
                type="text"
                placeholder="Enter Donation Title"
                value={newDonationData.title}
                onChange={(e) => setNewDonationData({ ...newDonationData, title: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.title ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Donation Description
              <input
                type="text"
                placeholder="Enter Donation Description"
                value={newDonationData.description}
                onChange={(e) => setNewDonationData({ ...newDonationData, description: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.description ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Amount ($)
              <input
                type="number"
                min="0"
                placeholder="Enter Donation Amount"
                value={newDonationData.amount}
                onChange={(e) => setNewDonationData({ ...newDonationData, amount: parseFloat(e.target.value) })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.amount ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Donated By
              <input
                type="text"
                placeholder="Enter Donor Name"
                value={newDonationData.donatedBy}
                onChange={(e) => setNewDonationData({ ...newDonationData, donatedBy: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.donatedBy ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left mt-4">
              Upload Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <div className="mt-6">
              <button onClick={handleSaveNewDonation} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={cancelAdd} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this donation?</p>
            <div className="mt-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
              <button onClick={cancelDelete} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationsPage;
