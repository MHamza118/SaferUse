import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function EditClinicModal({ clinic, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: clinic.name || '',
    description: clinic.description || '',
    address: clinic.address || '',
    coordinates: clinic.coordinates || '',
    mobileNumber: clinic.mobileNumber || '',
    website: clinic.website || '',
    type: clinic.type || [],
    officeTimeStart: clinic.officeTimeStart || '00:00',
    officeTimeEnd: clinic.officeTimeEnd || '00:00',
    picture: clinic.picture || null
  });

  const [errors, setErrors] = useState({});
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(clinic.picture || '');

  const typeOptions = [
    'syringes',
    'safer smoking kit',
    'medical care',
    'cbr',
    'blood test',
    'hiv'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, picture: file }));
        setPreviewUrl(URL.createObjectURL(file));
        setErrors(prev => ({ ...prev, picture: '' }));
      } else {
        setErrors(prev => ({ ...prev, picture: 'Please upload an image file' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!formData.picture && !previewUrl) {
      newErrors.picture = 'Clinic picture is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Update Clinic</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="updateClinicForm" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clinic Picture <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.picture ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="clinic-picture"
                />
                <label
                  htmlFor="clinic-picture"
                  className="cursor-pointer"
                >
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Clinic preview"
                        className="max-h-48 mx-auto rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded">
                        <FontAwesomeIcon icon={faUpload} className="text-white text-3xl" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <FontAwesomeIcon icon={faUpload} className="text-4xl mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload clinic picture</p>
                    </div>
                  )}
                </label>
                {errors.picture && (
                  <p className="text-red-500 text-sm mt-1">{errors.picture}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Fentanyl test strips, syringes"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Co-Ordinates</label>
              <input
                type="text"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="41.87000104130843, -87.62447533396624"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="812 123 4567"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="BloomingtonTestClinic.org"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="w-full px-3 py-2 border rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-gray-700">
                    {formData.type.length > 0 ? formData.type.join(', ') : 'Select types'}
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
                </button>
                {showTypeDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {typeOptions.map((type) => (
                      <label
                        key={type}
                        className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.type.includes(type)}
                          onChange={() => handleTypeToggle(type)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Office Time</label>
              <div className="flex items-center space-x-4">
                <input
                  type="time"
                  name="officeTimeStart"
                  value={formData.officeTimeStart}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">To</span>
                <input
                  type="time"
                  name="officeTimeEnd"
                  value={formData.officeTimeEnd}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t bg-white">
          <div className="flex justify-end">
            <button
              type="submit"
              form="updateClinicForm"
              className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
            >
              Update Clinic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClinicModal; 