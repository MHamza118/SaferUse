import React from 'react';

function DeleteConfirmationModal({ donationTitle, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Delete Donation</h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">
          Are you sure you want to delete this donation?
        </p>
        <p className="text-gray-800 mb-4">{donationTitle}</p>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 bg-gray-50 text-gray-800 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal; 