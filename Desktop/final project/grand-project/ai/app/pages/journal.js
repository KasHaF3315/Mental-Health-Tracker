import { useState } from 'react';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage('Journal entry saved! (placeholder)');
    setEntry('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Journal Entry</h1>
      <textarea
        placeholder="Write your thoughts..."
        value={entry}
        onChange={e => setEntry(e.target.value)}
        className="border p-2 rounded mb-4 w-64 h-40"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={!entry}
      >
        Save
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
} 