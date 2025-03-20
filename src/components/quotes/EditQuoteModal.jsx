import React, { useState, useEffect } from 'react';

function EditQuoteModal({ quote, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    quoteName: '',
    description: '',
    address: '',
    dateAdded: ''
  });

  const [errors, setErrors] = useState({
    quoteName: false,
    description: false,
    address: false
  });

  useEffect(() => {
    if (quote) {
      setFormData({
        quoteName: quote.quoteName,
        description: quote.description,
        address: quote.address,
        dateAdded: quote.dateAdded
      });
    }
  }, [quote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      quoteName: !formData.quoteName,
      description: !formData.description,
      address: !formData.address
    };
    
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6">Edit Quote</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quote Name
            </label>
            <input
              type="text"
              name="quoteName"
              value={formData.quoteName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.quoteName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter quote name"
            />
            {errors.quoteName && (
              <p className="text-red-500 text-xs mt-1">Quote name is required</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter quote description"
              rows="3"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">Description is required</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">Address is required</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditQuoteModal; 