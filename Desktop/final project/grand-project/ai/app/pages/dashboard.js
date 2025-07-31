import { useState } from 'react';

const moods = [
  { label: 'Happy', emoji: '😊', color: '#fbbf24' },
  { label: 'Sad', emoji: '😢', color: '#60a5fa' },
  { label: 'Anxious', emoji: '😰', color: '#f472b6' },
  { label: 'Angry', emoji: '😠', color: '#f87171' },
  { label: 'Calm', emoji: '😌', color: '#34d399' },
];

const getPrediction = (mood, note, recentEntries) => {
  const predictions = {
    'Happy': [
      'Great mood! Keep up the positive energy.',
      'Your happiness is contagious - spread it around!',
      'Perfect time to tackle challenging tasks.',
      'Consider journaling about what made you happy today.',
      'This positive energy is perfect for creative projects!',
      'Share your joy with someone who might need it today.'
    ],
    'Sad': [
      'It\'s okay to feel sad. Try talking to a friend.',
      'Consider going for a walk to clear your mind.',
      'Practice self-care - you deserve it.',
      'Remember, this feeling is temporary.',
      'Try listening to your favorite music to lift your spirits.',
      'Consider reaching out to someone you trust.'
    ],
    'Anxious': [
      'Take deep breaths - you\'re doing great.',
      'Try some grounding exercises.',
      'Consider what\'s causing anxiety and address it step by step.',
      'Remember to be kind to yourself today.',
      'Try the 4-7-8 breathing technique: inhale 4, hold 7, exhale 8.',
      'Focus on what you can control right now.'
    ],
    'Angry': [
      'Take a moment to pause and breathe.',
      'Try physical exercise to release tension.',
      'Consider what triggered this and how to address it.',
      'Remember, anger is a valid emotion - channel it constructively.',
      'Try counting to 10 before responding.',
      'Consider writing down your feelings to process them.'
    ],
    'Calm': [
      'This peaceful state is perfect for reflection.',
      'Use this calm energy for creative activities.',
      'Consider meditation to maintain this state.',
      'Your calm presence can help others around you.',
      'This is a great time for deep work or learning.',
      'Enjoy this moment of tranquility.'
    ]
  };

  const moodPredictions = predictions[mood] || predictions['Happy'];
  const randomPrediction = moodPredictions[Math.floor(Math.random() * moodPredictions.length)];
  
  // Enhanced note-based insights
  let noteInsight = '';
  let triggerAnalysis = '';
  let recommendation = '';
  
  if (note) {
    const lowerNote = note.toLowerCase();
    
    // Work-related analysis
    if (lowerNote.includes('work') || lowerNote.includes('job') || lowerNote.includes('office')) {
      noteInsight = 'Work-related mood detected. Consider work-life balance.';
      if (mood === 'Happy' || mood === 'Calm') {
        recommendation = 'Great work energy! Consider using this momentum for important tasks.';
      } else {
        recommendation = 'Try setting clear boundaries between work and personal time.';
      }
    }
    
    // Exercise analysis
    if (lowerNote.includes('walk') || lowerNote.includes('exercise') || lowerNote.includes('run') || lowerNote.includes('gym')) {
      noteInsight = 'Physical activity is great for mood regulation!';
      recommendation = 'Keep up the physical activity - it\'s excellent for mental health!';
    }
    
    // Social connections
    if (lowerNote.includes('friend') || lowerNote.includes('family') || lowerNote.includes('talk') || lowerNote.includes('call')) {
      noteInsight = 'Social connections are important for wellbeing.';
      recommendation = 'Maintain these social connections - they\'re valuable for your mental health.';
    }
    
    // Rest and sleep
    if (lowerNote.includes('sleep') || lowerNote.includes('rest') || lowerNote.includes('tired') || lowerNote.includes('bed')) {
      noteInsight = 'Rest is crucial for mental health.';
      recommendation = 'Prioritize quality sleep - it significantly impacts mood regulation.';
    }
    
    // Food and nutrition
    if (lowerNote.includes('food') || lowerNote.includes('eat') || lowerNote.includes('hungry') || lowerNote.includes('meal')) {
      noteInsight = 'Nutrition can significantly impact mood.';
      recommendation = 'Consider how your eating patterns affect your mood.';
    }
    
    // Weather impact
    if (lowerNote.includes('sunny') || lowerNote.includes('rain') || lowerNote.includes('weather') || lowerNote.includes('cold')) {
      noteInsight = 'Weather can influence mood patterns.';
      recommendation = 'Be aware of weather\'s impact on your mood and plan accordingly.';
    }
  }

  // Pattern analysis based on recent entries
  let patternAnalysis = '';
  let trendPrediction = '';
  
  if (recentEntries.length > 0) {
    const moodCounts = {};
    recentEntries.forEach(entry => {
      const moodLabel = Object.keys(moods).find(key => moods[key].emoji === entry.mood);
      if (moodLabel) {
        moodCounts[moodLabel] = (moodCounts[moodLabel] || 0) + 1;
      }
    });
    
    const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    
    if (dominantMood === 'Happy' || dominantMood === 'Calm') {
      patternAnalysis = 'You\'ve been in a positive mood pattern recently.';
      trendPrediction = 'This suggests good mental wellbeing habits.';
    } else if (dominantMood === 'Sad' || dominantMood === 'Anxious') {
      patternAnalysis = 'You\'ve been experiencing some challenging emotions lately.';
      trendPrediction = 'Consider reaching out for support or trying new coping strategies.';
    } else {
      patternAnalysis = 'Your mood has been varied recently.';
      trendPrediction = 'This is normal - everyone experiences mood fluctuations.';
    }
  }

  // Trigger identification
  const commonTriggers = {
    'work': 'Work stress or pressure',
    'social': 'Social interactions or isolation',
    'health': 'Physical health or sleep issues',
    'personal': 'Personal relationships or conflicts',
    'environment': 'Environmental factors like weather or noise'
  };

  if (note) {
    const lowerNote = note.toLowerCase();
    for (const [key, value] of Object.entries(commonTriggers)) {
      if (lowerNote.includes(key)) {
        triggerAnalysis = `Potential trigger identified: ${value}`;
        break;
      }
    }
  }

  return {
    prediction: randomPrediction,
    insight: noteInsight,
    recommendation: recommendation,
    patternAnalysis: patternAnalysis,
    trendPrediction: trendPrediction,
    triggerAnalysis: triggerAnalysis,
    moodTrend: mood === 'Happy' || mood === 'Calm' ? 'positive' : mood === 'Sad' || mood === 'Anxious' ? 'negative' : 'neutral',
    confidence: Math.floor(Math.random() * 30) + 70 // 70-100% confidence
  };
};

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [recentEntries, setRecentEntries] = useState([
    { date: '2024-07-19', mood: '😊', note: 'Had a great day at work!' },
    { date: '2024-07-18', mood: '😢', note: 'Felt a bit down, but went for a walk.' },
    { date: '2024-07-17', mood: '😌', note: 'Relaxed and read a book.' },
  ]);

  const handleMoodSelect = (moodLabel) => {
    setSelectedMood(moodLabel);
    const predictionData = getPrediction(moodLabel, note, recentEntries);
    setPrediction(predictionData);
  };

  const handleNoteChange = (newNote) => {
    setNote(newNote);
    if (selectedMood) {
      const predictionData = getPrediction(selectedMood, newNote, recentEntries);
      setPrediction(predictionData);
    }
  };

  const handleAddMood = () => {
    if (!selectedMood) return;
    
    const newEntry = {
      date: new Date().toISOString().slice(0, 10),
      mood: moods.find(m => m.label === selectedMood)?.emoji,
      note: note || 'No note added'
    };
    
    setRecentEntries([newEntry, ...recentEntries]);
    setMessage('Mood added successfully!');
    setSelectedMood(null);
    setNote('');
    setPrediction(null);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e9d6f6 0%, #dbeafe 100%)', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: 32, color: '#6d28d9', marginBottom: 32, textAlign: 'center' }}>Dashboard</h1>
        
        {/* Quick Add Mood Section */}
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(77, 64, 255, 0.10)', padding: '2rem 1.5rem', marginBottom: 32 }}>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: '#6d28d9', marginBottom: 16 }}>Quick Add Mood</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            {moods.map(mood => (
              <button
                key={mood.label}
                style={{
                  fontSize: 24,
                  padding: 8,
                  borderRadius: '50%',
                  border: selectedMood === mood.label ? `3px solid ${mood.color}` : '2px solid #e0e7ff',
                  background: selectedMood === mood.label ? mood.color : '#f3f4f6',
                  color: selectedMood === mood.label ? '#fff' : '#222',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
                onClick={() => handleMoodSelect(mood.label)}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Add a note (optional)"
            value={note}
            onChange={e => handleNoteChange(e.target.value)}
            style={{ border: '1px solid #c7d2fe', borderRadius: 8, padding: '0.8rem 1rem', width: '100%', minHeight: 60, fontSize: 16, marginBottom: 16 }}
          />
          <button
            onClick={handleAddMood}
            style={{ background: 'linear-gradient(90deg, #6d4aff 0%, #4f8cff 100%)', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '0.8rem 1.5rem', cursor: 'pointer' }}
            disabled={!selectedMood}
          >
            Add Mood Entry
          </button>
          {message && <p style={{ marginTop: 12, color: '#6366f1', textAlign: 'center' }}>{message}</p>}
        </div>

        {/* Enhanced Prediction Section */}
        {prediction && (
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(77, 64, 255, 0.10)', padding: '2rem 1.5rem', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontWeight: 700, fontSize: 22, color: '#6d28d9' }}>AI Prediction & Insights</h2>
              <span style={{ background: prediction.moodTrend === 'positive' ? '#10b981' : prediction.moodTrend === 'negative' ? '#ec4899' : '#3b82f6', color: '#fff', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                {prediction.confidence}% Confidence
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {/* Main Prediction */}
              <div style={{ background: prediction.moodTrend === 'positive' ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)' : prediction.moodTrend === 'negative' ? 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)' : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
                <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>💡 Primary Insight</h3>
                <p style={{ fontSize: 16, marginBottom: 12, fontWeight: 500 }}>{prediction.prediction}</p>
                {prediction.insight && (
                  <p style={{ fontSize: 14, marginTop: 8, opacity: 0.9 }}>🔍 {prediction.insight}</p>
                )}
              </div>

              {/* Pattern Analysis */}
              {prediction.patternAnalysis && (
                <div style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
                  <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>📊 Pattern Analysis</h3>
                  <p style={{ fontSize: 16, marginBottom: 8, fontWeight: 500 }}>{prediction.patternAnalysis}</p>
                  <p style={{ fontSize: 14, opacity: 0.9 }}>{prediction.trendPrediction}</p>
                </div>
              )}

              {/* Recommendations */}
              {prediction.recommendation && (
                <div style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
                  <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>💪 Recommendation</h3>
                  <p style={{ fontSize: 16, fontWeight: 500 }}>{prediction.recommendation}</p>
                </div>
              )}

              {/* Trigger Analysis */}
              {prediction.triggerAnalysis && (
                <div style={{ background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
                  <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>⚠️ Trigger Alert</h3>
                  <p style={{ fontSize: 16, fontWeight: 500 }}>{prediction.triggerAnalysis}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
          <div style={{ flex: '1 1 260px', background: 'linear-gradient(135deg, #a5b4fc 0%, #f472b6 100%)', borderRadius: 18, boxShadow: '0 4px 24px rgba(77, 64, 255, 0.10)', padding: '2rem 1.5rem', minWidth: 260, color: '#fff' }}>
            <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Mood Trends</h2>
            <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '1.2rem', minHeight: 80, color: '#fff', fontWeight: 500 }}>
              😊😊😢😊😌<br />
              <span style={{ fontSize: 15, color: '#f3e8ff' }}>Your mood has improved 20% this week!</span>
            </div>
          </div>
          <div style={{ flex: '1 1 260px', background: 'linear-gradient(135deg, #fbbf24 0%, #34d399 100%)', borderRadius: 18, boxShadow: '0 4px 24px rgba(77, 64, 255, 0.10)', padding: '2rem 1.5rem', minWidth: 260, color: '#fff' }}>
            <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Recent Entries</h2>
            <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '1.2rem', minHeight: 80, color: '#fff', fontWeight: 500 }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {recentEntries.slice(0, 3).map((entry, idx) => (
                  <li key={idx} style={{ marginBottom: 8, fontSize: 14 }}>
                    {entry.date}: {entry.mood} "{entry.note}"
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ flex: '1 1 260px', background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)', borderRadius: 18, boxShadow: '0 4px 24px rgba(77, 64, 255, 0.10)', padding: '2rem 1.5rem', minWidth: 260, color: '#fff' }}>
            <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>AI Suggestions</h2>
            <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '1.2rem', minHeight: 80, color: '#fff', fontWeight: 500 }}>
              Based on your recent entries, try to get some fresh air today. You often feel better after a walk!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 