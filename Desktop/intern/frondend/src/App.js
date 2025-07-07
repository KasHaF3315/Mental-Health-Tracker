import React, { useState } from 'react';
import './App.css';
import './index.css';

// Static quotes data for frontend-only operation
const STATIC_QUOTES = [
  // Motivation
  { id: 1, text: 'Push yourself, because no one else is going to do it for you.', author: 'Emma Carter', topic: 'motivation', likes: 101 },
  { id: 2, text: 'Great things never come from comfort zones.', author: 'Liam Turner', topic: 'motivation', likes: 87 },
  { id: 3, text: 'Dream it. Wish it. Do it.', author: 'Sophia Lee', topic: 'motivation', likes: 93 },
  // Life
  { id: 4, text: 'Life is short, and it is up to you to make it sweet.', author: 'Sarah Parker', topic: 'life', likes: 77 },
  { id: 5, text: 'Difficult roads often lead to beautiful destinations.', author: 'Noah Smith', topic: 'life', likes: 82 },
  { id: 6, text: 'Life is really simple, but we insist on making it complicated.', author: 'Olivia Brown', topic: 'life', likes: 69 },
  // Love
  { id: 7, text: 'Love is not what you say. Love is what you do.', author: 'Mason Clark', topic: 'love', likes: 110 },
  { id: 8, text: 'To love and be loved is to feel the sun from both sides.', author: 'Ava Wilson', topic: 'love', likes: 98 },
  { id: 9, text: 'Love recognizes no barriers.', author: 'Lucas Martinez', topic: 'love', likes: 105 },
  // Success
  { id: 10, text: 'Success is not the key to happiness. Happiness is the key to success.', author: 'Mia Johnson', topic: 'success', likes: 120 },
  { id: 11, text: 'Success doesnt just find you. You have to go out and get it.', author: 'Benjamin Evans', topic: 'success', likes: 99 },
  { id: 12, text: 'Dont watch the clock; do what it does. Keep going.', author: 'Charlotte King', topic: 'success', likes: 112 },
];

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      const filtered = STATIC_QUOTES.filter(q =>
        q.text.toLowerCase().includes(search.toLowerCase()) ||
        q.author.toLowerCase().includes(search.toLowerCase()) ||
        (q.topic && q.topic.toLowerCase().includes(search.toLowerCase()))
      );
      setResults(filtered);
      setLoading(false);
    }, 400);
  };

  const handleClear = () => {
    setSearch('');
    setResults([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-100">
      {/* Navbar */}
      <nav className="w-full bg-white/80 shadow-md py-4 pl-0 pr-6 flex items-center justify-between fixed top-0 left-0 z-10 backdrop-blur-md">
        <div className="flex-1 flex items-center"></div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-2xl">💡</span>
          <span className="app-title-gradient">Quote Generator</span>
        </div>
        <div className="flex-1"></div>
      </nav>
      {/* Spacer for navbar */}
      <div className="h-20" />
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Find Your Inspiration</h1>
        <p>Search for motivational, life, love, and success quotes instantly.</p>
        <p>Type a topic (e.g., <span className="font-semibold text-indigo-500">life</span>, <span className="font-semibold text-indigo-500">love</span>, <span className="font-semibold text-indigo-500">success</span>) and get inspired!</p>
      </section>
      {/* Main Card/Box */}
      <main className="flex flex-col items-center w-full flex-1">
        <div className="main-card">
        <form className="search-bar-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
              placeholder="Enter a topic..."
            value={search}
            onChange={handleSearch}
          />
          <button className="search-btn" type="submit">Search</button>
        </form>
        <button className="reset-btn" onClick={handleClear} style={{marginBottom: '1rem'}}>Reset</button>
          <div className="results-section">
        {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : results.length === 0 && search ? (
              <div className="text-center text-gray-500">No quotes found.</div>
            ) : (
              <section>
                <div className="results-header">
                  <span className="text-2xl">📜</span>
                  <h2>Quotes</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {results.map((q, i) => (
                    <div
                      className="quote-card"
                      key={q.id}
                    >
                      <p className="quote-text">"{q.text}"</p>
                      <p className="quote-author">- {q.author}</p>
                      {q.topic && <span className="quote-topic">#{q.topic}</span>}
                      <div className="quote-likes">❤️ {q.likes}</div>
                    </div>
                  ))}
            </div>
              </section>
            )}
          </div>
      </div>
      </main>
      {/* Footer */}
      <footer>
        Made with <span className="text-pink-500">♥</span> by Kashaf &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App; 