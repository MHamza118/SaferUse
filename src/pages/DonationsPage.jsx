import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DonationsList from '../components/donations/DonationsList';
import AddDonation from '../components/donations/AddDonation';

function DonationsPage() {
  const [donations, setDonations] = useState([
    { 
      title: 'Donate for Education', 
      description: 'Help fund education for underprivileged children.', 
      amount: 5000,
      donatedBy: 'Arif Jan',
      date: new Date().toLocaleDateString()
    },
    { 
      title: 'Support for Homeless Shelters', 
      description: 'Provide shelter and food for the homeless this winter.', 
      amount: 7500,
      donatedBy: 'Hanzallah',
      date: new Date().toLocaleDateString()
    },
    { 
      title: 'Medical Aid Fund', 
      description: 'Donate to help provide medical supplies for rural hospitals.', 
      amount: 10000,
      donatedBy: 'Zain',
      date: new Date().toLocaleDateString()
    },
    { 
      title: 'Clean Water Initiative', 
      description: 'Support the construction of wells in drought-stricken areas.', 
      amount: 15000,
      donatedBy: 'ALi',
      date: new Date().toLocaleDateString()
    },
    { 
      title: 'Disaster Relief Fund', 
      description: 'Help victims of natural disasters with essential supplies.', 
      amount: 12000,
      donatedBy: 'Hamza',
      date: new Date().toLocaleDateString()
    },
    { 
      title: 'Animal Rescue Fund', 
      description: 'Donate to save animals from cruelty and provide care.', 
      amount: 8000,
      donatedBy: 'Farah',
      date: new Date().toLocaleDateString()
    }
  ]);

  const handleAddDonation = (newDonation) => {
    const donationWithDate = {
      ...newDonation,
      date: new Date().toLocaleDateString()
    };
    setDonations(prevDonations => [...prevDonations, donationWithDate]);
  };

  const handleEditDonation = (updatedDonation) => {
    setDonations(donations.map(donation => 
      donation.title === updatedDonation.title ? updatedDonation : donation
    ));
  };

  const handleDeleteDonation = (title) => {
    setDonations(donations.filter(donation => donation.title !== title));
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/donations/list" replace />} />
      <Route 
        path="/list" 
        element={
          <DonationsList 
            donations={donations}
            onEdit={handleEditDonation}
            onDelete={handleDeleteDonation}
          />
        }
      />
      <Route 
        path="/add" 
        element={<AddDonation onAdd={handleAddDonation} />} 
      />
    </Routes>
  );
}

export default DonationsPage;
