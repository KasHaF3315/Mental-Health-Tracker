import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage('Signup successful! (placeholder)');
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e9d6f6 0%, #dbeafe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(77, 64, 255, 0.10)', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 400, width: '100%' }}>
        <h1 style={{ fontWeight: 800, fontSize: 28, color: '#f472b6', marginBottom: 24, textAlign: 'center' }}>Signup</h1>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #c7d2fe', fontSize: 16 }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #c7d2fe', fontSize: 16 }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #c7d2fe', fontSize: 16 }}
            required
          />
          <button type="submit" style={{ background: 'linear-gradient(90deg, #f472b6 0%, #a78bfa 100%)', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '0.8rem 0', cursor: 'pointer', marginTop: 8 }}>
            Signup
          </button>
        </form>
        {message && <p style={{ marginTop: 18, color: '#f472b6', textAlign: 'center' }}>{message}</p>}
      </div>
    </div>
  );
} 