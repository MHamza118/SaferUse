import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditQuoteModal from './EditQuoteModal';
import DeleteQuoteModal from './DeleteQuoteModal';

function QuotesList({ quotes, onDeleteQuote, onEditQuote }) {
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQuote, setEditingQuote] = useState(null);
  const [deletingQuote, setDeletingQuote] = useState(null);

  const filteredQuotes = quotes.filter(quote =>
    quote.quoteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (quote) => {
    setEditingQuote(quote);
  };

  const handleSaveEdit = (updatedQuote) => {
    onEditQuote(updatedQuote);
    setEditingQuote(null);
  };

  const handleCancelEdit = () => {
    setEditingQuote(null);
  };

  const handleDeleteClick = (quote) => {
    setDeletingQuote(quote);
  };

  const handleConfirmDelete = () => {
    onDeleteQuote(deletingQuote.quoteName);
    setDeletingQuote(null);
  };

  const handleCancelDelete = () => {
    setDeletingQuote(null);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">List of Quotes</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search quotes..."
            className="w-full p-2 border rounded-lg pl-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 uppercase font-semibold text-sm">Quote Name</th>
              <th className="text-left p-3 uppercase font-semibold text-sm">Description</th>
              <th className="text-left p-3 uppercase font-semibold text-sm">Address</th>
              <th className="text-left p-3 uppercase font-semibold text-sm">Date Added</th>
              <th className="text-left p-3 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotes.map((quote, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{quote.quoteName}</td>
                <td className="p-3">{quote.description}</td>
                <td className="p-3">{quote.address}</td>
                <td className="p-3">{quote.dateAdded}</td>
                <td className="p-3">
                  <button 
                    className="text-blue-600 mr-3"
                    onClick={() => handleEditClick(quote)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="text-red-600"
                    onClick={() => handleDeleteClick(quote)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingQuote && (
        <EditQuoteModal
          quote={editingQuote}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      {deletingQuote && (
        <DeleteQuoteModal
          quoteName={deletingQuote.quoteName}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default QuotesList; 