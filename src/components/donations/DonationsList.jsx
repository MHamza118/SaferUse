import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditDonationModal from './EditDonationModal';

function DonationsList({ donations, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [deletingDonation, setDeletingDonation] = useState(null);
  const [editingDonation, setEditingDonation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDonations = donations.filter(donation =>
    donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donation.donatedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (donation) => {
    setDeletingDonation(donation);
  };

  const handleConfirmDelete = () => {
    onDelete(deletingDonation.title);
    setDeletingDonation(null);
  };

  const handleCancelDelete = () => {
    setDeletingDonation(null);
  };

  const handleEditClick = (donation) => {
    setEditingDonation(donation);
  };

  const handleSaveEdit = (updatedDonation) => {
    onEdit(updatedDonation);
    setEditingDonation(null);
  };

  const handleCancelEdit = () => {
    setEditingDonation(null);
  };

  const handleAddClick = () => {
    navigate('/donations/add');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">List of Donations</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span>Add New</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search donations..."
            className="w-full p-2 border rounded-lg pl-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
            {filteredDonations.map((donation) => (
              <tr key={donation.title}>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.title}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.description}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">${donation.amount.toLocaleString()}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.donatedBy}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{donation.date}</td>
                <td className="py-2 px-2 text-center border-b text-gray-700">
                  <button 
                    className="text-blue-600 mr-3"
                    onClick={() => handleEditClick(donation)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="text-red-600"
                    onClick={() => handleDeleteClick(donation)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deletingDonation && (
        <DeleteConfirmationModal
          donationTitle={deletingDonation.title}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {editingDonation && (
        <EditDonationModal
          donation={editingDonation}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default DonationsList; 