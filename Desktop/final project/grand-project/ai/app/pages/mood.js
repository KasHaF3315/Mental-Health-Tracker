import { useState, useEffect } from 'react';

const moods = [
  { label: 'Happy', emoji: '😊', color: '#fbbf24' },
  { label: 'Sad', emoji: '😢', color: '#60a5fa' },
  { label: 'Anxious', emoji: '😰', color: '#f472b6' },
  { label: 'Angry', emoji: '😠', color: '#f87171' },
  { label: 'Calm', emoji: '😌', color: '#34d399' },
];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dailyMoods');
    if (saved) {
      const data = JSON.parse(saved);
      setHistory(data);
      const todaysMood = data.find(entry => entry.date === today);
      if (todaysMood) {
        setTodayEntry(todaysMood);
        setSelectedMood(todaysMood.moodLabel);
        setNote(todaysMood.note);
      }
    }
  }, [today]);

  const handleSave = () => {
    const newEntry = {
      date: today,
      mood: moods.find(m => m.label === selectedMood)?.emoji,
      moodLabel: selectedMood,
      note: note,
      timestamp: new Date().toISOString()
    };

    let updatedHistory;
    if (todayEntry) {
      updatedHistory = history.map(entry => 
        entry.date === today ? newEntry : entry
      );
      setMessage('Today\'s mood updated!');
    } else {
      updatedHistory = [newEntry, ...history];
      setMessage('Mood saved for today!');
    }

    setHistory(updatedHistory);
    setTodayEntry(newEntry);
    localStorage.setItem('dailyMoods', JSON.stringify(updatedHistory));
    
    setTimeout(() => setMessage(''), 2000);
  };

  const getStreak = () => {
    let streak = 0;
    const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sorted.length; i++) {
      const entryDate = new Date(sorted[i].date);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (entryDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0e7ff 0%, #c7d2fe 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60 }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(77, 64, 255, 0.10)', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 400, width: '100%', marginBottom: 40 }}>
        <h1 style={{ fontWeight: 800, fontSize: 28, color: '#6d28d9', marginBottom: 8, textAlign: 'center' }}>
          {todayEntry ? 'Update Today\'s Mood' : 'Daily Mood Entry'}
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          {moods.map(mood => (
            <button
              key={mood.label}
              style={{
                fontSize: 32,
                padding: 12,
                borderRadius: '50%',
                border: selectedMood === mood.label ? `3px solid ${mood.color}` : '2px solid #e0e7ff',
                background: selectedMood === mood.label ? mood.color : '#f3f4f6',
                color: selectedMood === mood.label ? '#fff' : '#222',
                transition: 'all 0.15s',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedMood(mood.label)}
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
        
        <textarea
          placeholder="How are you feeling today? (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
          style={{ border: '1px solid #c7d2fe', borderRadius: 8, padding: '0.8rem 1rem', width: '100%', minHeight: 70, fontSize: 16, marginBottom: 18 }}
        />
        
        <button
          onClick={handleSave}
          style={{ background: 'linear-gradient(90deg, #6d4aff 0%, #4f8cff 100%)', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '0.8rem 0', cursor: 'pointer', width: '100%' }}
          disabled={!selectedMood}
        >
          {todayEntry ? 'Update Mood' : 'Save Mood'}
        </button>
        
        {message && <p style={{ marginTop: 18, color: '#10b981', textAlign: 'center', fontWeight: 600 }}>{message}</p>}
      </div>

      {history.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(77, 64, 255, 0.07)', padding: '1.5rem', minWidth: 340, maxWidth: 500, width: '100%', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 18, color: '#6d28d9', marginBottom: 16, textAlign: 'center' }}>Stats</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0369a1' }}>{getStreak()}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Day Streak</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#166534' }}>{history.length}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Total Days</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(77, 64, 255, 0.07)', padding: '2rem 1.5rem', minWidth: 340, maxWidth: 500, width: '100%' }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#6d28d9', marginBottom: 16 }}>Mood History</h2>
        {history.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic' }}>Start tracking your daily mood!</p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {history
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 7)
              .map((entry, idx) => (
                <li key={idx} style={{ 
                  marginBottom: 12, 
                  padding: 12, 
                  borderRadius: 10, 
                  background: entry.date === today ? '#f0f9ff' : '#f3f4f6', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12 
                }}>
                  <span style={{ fontSize: 24 }}>{entry.mood}</span>
                  <span style={{ fontWeight: 600, color: '#6366f1', minWidth: 90 }}>{entry.date}</span>
                  <span style={{ color: '#222' }}>{entry.note}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}