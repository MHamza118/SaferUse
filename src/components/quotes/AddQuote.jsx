import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddQuote({ onAddQuote }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quoteName: '',
    description: '',
    address: '',
    dateAdded: new Date().toLocaleDateString()
  });

  const [errors, setErrors] = useState({
    quoteName: false,
    description: false,
    address: false
  });

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

    // Add the new quote
    onAddQuote(formData);
    
    // Navigate back to the quotes list
    navigate('/quotes/list');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Quote</h1>
        <button 
          onClick={() => navigate('/quotes/list')}
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
                  Quote Name
                  <input
                    type="text"
                    name="quoteName"
                    value={formData.quoteName}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quoteName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter quote name"
                  />
                  {errors.quoteName && (
                    <p className="text-red-500 text-xs mt-1">Quote name is required</p>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">Address is required</p>
                  )}
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter quote description"
                    rows="4"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">Description is required</p>
                  )}
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
              >
                Add Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddQuote; 