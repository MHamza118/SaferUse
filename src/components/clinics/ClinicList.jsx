import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditClinicModal from './EditClinicModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function ClinicList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState(null);

  // Hardcoded initial clinics data
  const initialClinics = [
    { 
      name: 'Test ABC Bloomington Clinic',
      description: 'Fentanyl test strips, syringes',
      address: '123 Walnut Street Bloomington Indiana 47401',
      coordinates: '41.87000104130843, -87.62447533396624',
      dateAdded: '03/19/2024'
    },
    { 
      name: 'Indiana Recovery Alliance MCSSP', 
      address: '118 S Rogers St Suite 2 Bloomington, IN 47404',
      dateAdded: '03/19/2024'
    },
    { 
      name: 'Aspire Indiana Health HARP', 
      address: '2009 Brown St Suite #2 Anderson, IN 46016',
      dateAdded: '03/19/2024'
    },
    { 
      name: 'Tippecanoe County Health Department', 
      address: '2300 Ferry St Lafayette, IN 47904',
      dateAdded: '03/19/2024'
    }
  ];

  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);

  // Load clinics on component mount
  useEffect(() => {
    // Get clinics from localStorage
    const savedClinics = JSON.parse(localStorage.getItem('clinics')) || [];
    
    // Combine hardcoded and saved clinics, avoiding duplicates by name
    const combinedClinics = [...initialClinics];
    
    savedClinics.forEach(savedClinic => {
      if (!combinedClinics.some(clinic => clinic.name === savedClinic.name)) {
        combinedClinics.push(savedClinic);
      }
    });
    
    setClinics(combinedClinics);
    setFilteredClinics(combinedClinics);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredClinics(clinics);
    } else {
      const searchTerm = searchQuery.toLowerCase();
      const filtered = clinics.filter(clinic => 
        clinic.name.toLowerCase().includes(searchTerm) ||
        clinic.address.toLowerCase().includes(searchTerm) ||
        (clinic.description && clinic.description.toLowerCase().includes(searchTerm))
      );
      setFilteredClinics(filtered);
    }
  }, [searchQuery, clinics]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditClick = (clinic) => {
    setSelectedClinic(clinic);
    setShowEditModal(true);
  };

  const handleEditSave = (updatedClinic) => {
    const updatedClinics = clinics.map(clinic => 
      clinic.name === selectedClinic.name ? { ...clinic, ...updatedClinic } : clinic
    );
    setClinics(updatedClinics);
    
    // Update localStorage while preserving hardcoded data
    const savedClinics = JSON.parse(localStorage.getItem('clinics')) || [];
    const updatedSavedClinics = savedClinics.map(clinic =>
      clinic.name === selectedClinic.name ? { ...clinic, ...updatedClinic } : clinic
    );
    localStorage.setItem('clinics', JSON.stringify(updatedSavedClinics));
    
    setShowEditModal(false);
    setSelectedClinic(null);
  };

  const handleDeleteClick = (clinic) => {
    setClinicToDelete(clinic);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedClinics = clinics.filter(clinic => clinic.name !== clinicToDelete.name);
    setClinics(updatedClinics);
    
    // Update localStorage while preserving hardcoded data
    const savedClinics = JSON.parse(localStorage.getItem('clinics')) || [];
    const updatedSavedClinics = savedClinics.filter(clinic => clinic.name !== clinicToDelete.name);
    localStorage.setItem('clinics', JSON.stringify(updatedSavedClinics));
    
    setShowDeleteModal(false);
    setClinicToDelete(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">List of Clinics</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search clinics..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={handleSearch}
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[35%]">Clinic Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[35%]">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Date Added</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClinics.map((clinic, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{clinic.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{clinic.address}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{clinic.dateAdded}</td>
                <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                  <button 
                    onClick={() => handleEditClick(clinic)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(clinic)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && selectedClinic && (
        <EditClinicModal
          clinic={selectedClinic}
          onClose={() => {
            setShowEditModal(false);
            setSelectedClinic(null);
          }}
          onSave={handleEditSave}
        />
      )}

      {showDeleteModal && clinicToDelete && (
        <DeleteConfirmationModal
          clinicName={clinicToDelete.name}
          onClose={() => {
            setShowDeleteModal(false);
            setClinicToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

export default ClinicList; 