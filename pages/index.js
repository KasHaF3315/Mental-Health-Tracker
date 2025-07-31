import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showCookie, setShowCookie] = useState(true);
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0e7ff 0%, #c7d2fe 100%)' }}>
      {/* Top Navigation Bar */}
      <nav style={{ width: '100%', background: 'rgba(255,255,255,0.95)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 2rem', boxShadow: '0 2px 12px rgba(164, 120, 255, 0.1)', position: 'fixed', top: 0, left: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#6d28d9', letterSpacing: 1 }}>MindfulTrack</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/" style={{ color: '#6d28d9', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Home</Link>
          <Link href="/login" style={{ color: '#6366f1', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Login</Link>
          <Link href="/signup" style={{ color: '#f472b6', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Signup</Link>
        </div>
      </nav>
      <section className="hero" style={{ paddingTop: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a5b4fc 0%, #f472b6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 18,
            boxShadow: '0 2px 12px rgba(164, 120, 255, 0.13)'
          }}>
            <span style={{ fontSize: 32, color: '#fff' }}>💡</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 28, color: '#6d28d9', letterSpacing: 1 }}>MindfulTrack</span>
        </div>
        <div className="hero-title" style={{ color: '#6d28d9', fontSize: '2.7rem', marginBottom: 18 }}>
          Your Journey to Better Wellbeing
        </div>
        <div className="hero-subtitle" style={{ color: '#6366f1', fontSize: '1.5rem', marginBottom: 36 }}>
          Track your mood, reflect daily, and unlock personalized insights.<br />
          <span style={{ color: '#f472b6', fontWeight: 600 }}>All in one place.</span>
        </div>
        <button className="cta-btn" style={{ marginBottom: 18 }} onClick={() => window.location.href='/login'}>
          Start Tracking Now
        </button>
        <div style={{ marginTop: 10, color: '#7c3aed', fontWeight: 500 }}>
          100% Private & Free
        </div>
      </section>
      {showCookie && (
        <div className="cookie-banner">
          <span>
            We use cookies to enhance your experience. See our <a href="#" style={{ color: '#7c3aed', textDecoration: 'underline' }}>Privacy Policy</a>.
          </span>
          <button className="cookie-btn" onClick={() => setShowCookie(false)}>Accept</button>
          <button className="cookie-btn decline" onClick={() => setShowCookie(false)}>Decline</button>
        </div>
      )}
    </div>
  );
} 