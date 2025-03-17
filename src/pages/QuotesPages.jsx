import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function QuotesPage() {
  const [quotes, setQuotes] = useState([
    { text: 'The only journey is the one within.', author: 'Rainer Maria Rilke', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null },
    { text: 'Rock bottom became the solid foundation on which I rebuilt my life.', author: 'J.K. Rowling', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null },
    { text: 'Fall seven times, stand up eight.', author: 'Japanese Proverb', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null },
    { text: 'Out of difficulties grow miracles.', author: 'Jean de La Bruyère', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null },
    { text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null },
    { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null }
  ]);

  const [editingQuote, setEditingQuote] = useState(null);
  const [editedData, setEditedData] = useState({ text: '', author: '', aboutAuthor: '', date: '', image: null });
  const [deletingQuote, setDeletingQuote] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuoteData, setNewQuoteData] = useState({ text: '', author: '', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null });
  
  const [errors, setErrors] = useState({ text: false, author: false });

  const handleEditClick = (quote) => {
    setEditingQuote(quote.text);
    setEditedData(quote);
  };

  const handleDeleteClick = (quoteText) => {
    setDeletingQuote(quoteText);
  };

  const confirmDelete = () => {
    setQuotes(quotes.filter((quote) => quote.text !== deletingQuote));
    setDeletingQuote(null); // Reset deleting quote after deletion
  };

  const cancelDelete = () => {
    setDeletingQuote(null); // Reset deleting quote if user cancels
  };

  const handleSaveEdit = () => {
    if (!editedData.text || !editedData.author) {
      setErrors({ text: !editedData.text, author: !editedData.author });
      return;
    }
    setQuotes(quotes.map((quote) => (quote.text === editingQuote ? editedData : quote)));
    setEditingQuote(null);
    setEditedData({ text: '', author: '', aboutAuthor: '', date: '', image: null });
  };

  const cancelEdit = () => {
    setEditingQuote(null);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setNewQuoteData({ text: '', author: '', aboutAuthor: '', date: new Date().toLocaleDateString(), image: null });
    setErrors({ text: false, author: false });
  };

  const handleSaveNewQuote = () => {
    if (!newQuoteData.text || !newQuoteData.author) {
      setErrors({ text: !newQuoteData.text, author: !newQuoteData.author });
      return;
    }
    setQuotes([...quotes, newQuoteData]);
    setShowAddForm(false);
  };

  const cancelAdd = () => {
    setShowAddForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedData({ ...editedData, image: reader.result });
      setNewQuoteData({ ...newQuoteData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Quotes</h2>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleAddClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span>Add New</span>
        </button>
      </div>

      <div className="w-full">
        <table className="min-w-full bg-white border text-gray-500">
          <thead>
            <tr>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Quote</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Quote Author</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Date</th>
              <th className="py-2 px-2 text-center border-b font-bold text-gray-700">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.text}>
                <td className="py-2 px-2 border-b text-center text-gray-700 max-w-xs break-words">{quote.text}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{quote.author}</td>
                <td className="py-2 px-2 border-b text-center text-gray-700">{quote.date}</td>
                <td className="py-2 px-2 text-center border-b text-gray-700">
                  <button className="text-blue-600 mr-2" onClick={() => handleEditClick(quote)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500" onClick={() => handleDeleteClick(quote.text)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editingQuote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Edit Quote</h2>

            <label className="block text-left">
              Quote
              <textarea
                placeholder="Enter Quote"
                value={editedData.text}
                onChange={(e) => setEditedData({ ...editedData, text: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.text ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left">
              Quote Author
            </label>
            <input
              type="text"
              placeholder="Enter Quote Author"
              value={editedData.author}
              onChange={(e) => setEditedData({ ...editedData, author: e.target.value })}
              className={`border p-2 rounded w-full mt-2 placeholder-gray-500 !text-gray-500 ${errors.author ? 'border-red-500' : ''}`}
            />

            <label className="block text-left">
              About the Author
            </label>
            <input
              type="text"
              placeholder="About the Author (Hidden)"
              value={editedData.aboutAuthor}
              onChange={(e) => setEditedData({ ...editedData, aboutAuthor: e.target.value })}
              className="border p-2 rounded w-full mt-2  placeholder-gray-500 !text-gray-500"
            />

            <label className="block text-left">
              Upload Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <div className="mt-4">
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Quote Form */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add New Quote</h2>

            <label className="block text-left">
              Quote
              <textarea
                placeholder="Enter Quote"
                value={newQuoteData.text}
                onChange={(e) => setNewQuoteData({ ...newQuoteData, text: e.target.value })}
                className={`border p-2 rounded w-full placeholder-gray-500 !text-gray-500 ${errors.text ? 'border-red-500' : ''}`}
              />
            </label>

            <label className="block text-left">
              Quote Author
            </label>
            <input
              type="text"
              placeholder="Enter Quote Author"
              value={newQuoteData.author}
              onChange={(e) => setNewQuoteData({ ...newQuoteData, author: e.target.value })}
              className={`border p-2 rounded w-full mt-2 placeholder-gray-500 !text-gray-500 ${errors.author ? 'border-red-500' : ''}`}
            />

            <label className="block text-left">
              About the Author
            </label>
            <input
              type="text"
              placeholder="About the Author"
              value={newQuoteData.aboutAuthor}
              onChange={(e) => setNewQuoteData({ ...newQuoteData, aboutAuthor: e.target.value })}
              className="border p-2 rounded w-full mt-2  placeholder-gray-500 !text-gray-500"
            />

            <label className="block text-left">
              Upload Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <div className="mt-4">
              <button onClick={handleSaveNewQuote} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={cancelAdd} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation for Deletion */}
      {deletingQuote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this quote?</p>
            <div className="mt-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes</button>
              <button onClick={cancelDelete} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuotesPage;
