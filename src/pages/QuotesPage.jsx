import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import QuotesList from '../components/quotes/QuotesList';
import AddQuote from '../components/quotes/AddQuote';

function QuotesPage() {
  // Initial quotes data
  const [quotes, setQuotes] = useState([
    {
      quoteName: 'Medical Equipment Quote',
      description: 'Advanced MRI Machine',
      address: '123 Walnut Street Bloomington Indiana 47401',
      dateAdded: '03/19/2024'
    },
    {
      quoteName: 'Laboratory Supplies',
      description: 'Annual Lab Equipment',
      address: '118 S Rogers St Suite 2 Bloomington, IN 47404',
      dateAdded: '03/19/2024'
    },
    {
      quoteName: 'Pharmaceutical Supply',
      description: 'Quarterly Medicine Stock',
      address: '2009 Brown St Suite #2 Anderson, IN 46016',
      dateAdded: '03/19/2024'
    },
    {
      quoteName: 'Medical Furniture',
      description: 'Hospital Beds and Cabinets',
      address: '2300 Ferry St Lafayette, IN 47904',
      dateAdded: '03/19/2024'
    }
  ]);

  const handleAddQuote = (newQuote) => {
    setQuotes([...quotes, newQuote]);
  };

  const handleDeleteQuote = (quoteName) => {
    setQuotes(quotes.filter(quote => quote.quoteName !== quoteName));
  };

  const handleEditQuote = (updatedQuote) => {
    setQuotes(quotes.map(quote => 
      quote.quoteName === updatedQuote.quoteName ? updatedQuote : quote
    ));
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/quotes/list" replace />} />
      <Route 
        path="/list" 
        element={
          <QuotesList 
            quotes={quotes} 
            onDeleteQuote={handleDeleteQuote}
            onEditQuote={handleEditQuote}
          />
        } 
      />
      <Route 
        path="/add" 
        element={<AddQuote onAddQuote={handleAddQuote} />} 
      />
    </Routes>
  );
}

export default QuotesPage; 