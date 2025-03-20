import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faChevronDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddClinic() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    coordinates: '',
    mobileNumber: '',
    website: '',
    type: [],
    officeTimeStart: '09:00',
    officeTimeEnd: '17:00',
    picture: null
  });

  const [errors, setErrors] = useState({});
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

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

  const handleTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.picture) {
      newErrors.picture = 'Clinic picture is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Get existing clinics from localStorage
    const existingClinics = JSON.parse(localStorage.getItem('clinics')) || [];
    
    // Convert picture file to data URL for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      // Add new clinic with current date and picture data
      const newClinic = {
        ...formData,
        picture: reader.result,
        dateAdded: new Date().toLocaleDateString()
      };
      
      // Save updated clinics list
      localStorage.setItem('clinics', JSON.stringify([...existingClinics, newClinic]));
      
      // Navigate back to clinic list
      navigate('/clinic/list');
    };
    
    if (formData.picture) {
      reader.readAsDataURL(formData.picture);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Clinic</h1>
        <button 
          onClick={() => navigate('/clinic/list')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to List
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <form id="addClinicForm" onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clinic Picture <span className="text-red-500">*</span>
              </label>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  errors.picture ? 'border-red-500' : 'border-gray-300'
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic title</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter clinic title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter clinic description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter clinic address"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Co-Ordinates</label>
                <input
                  type="text"
                  name="coordinates"
                  value={formData.coordinates}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address coordinates"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter website URL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                    className="w-full px-3 py-2 border rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className="text-gray-700">
                      {formData.type.length > 0 ? formData.type.join(', ') : 'Select clinic types'}
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

              <div>
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
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
              >
                Add Clinic
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClinic; 