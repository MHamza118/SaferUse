import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClinicList from '../components/clinics/ClinicList';
import AddClinic from '../components/clinics/AddClinic';

function ClinicPage() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/clinic/list" replace />} />
      <Route path="/list" element={<ClinicList />} />
      <Route path="/add" element={<AddClinic />} />
    </Routes>
  );
}

export default ClinicPage;