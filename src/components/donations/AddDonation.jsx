import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddDonation({ onAdd }) {
  const navigate = useNavigate();
  const [newDonation, setNewDonation] = useState({
    title: '',
    description: '',
    amount: '',
    donatedBy: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newDonation,
      amount: parseFloat(newDonation.amount)
    });
    navigate('/donations/list');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Donation</h1>
        <button 
          onClick={() => navigate('/donations/list')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to List
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Title
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newDonation.title}
                    onChange={(e) => setNewDonation({ ...newDonation, title: e.target.value })}
                    placeholder="Enter donation title"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newDonation.amount}
                    onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                    placeholder="Enter donation amount"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donated By
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newDonation.donatedBy}
                    onChange={(e) => setNewDonation({ ...newDonation, donatedBy: e.target.value })}
                    placeholder="Enter donor name"
                    required
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                  <textarea
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newDonation.description}
                    onChange={(e) => setNewDonation({ ...newDonation, description: e.target.value })}
                    placeholder="Enter donation description"
                    rows="4"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
              >
                Add Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDonation; 