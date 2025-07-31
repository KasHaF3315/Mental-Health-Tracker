import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmail, getSession } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    checkSession()
  }, [])

  const checkSession = async () => {
    const session = await getSession()
    if (session) {
      router.push('/dashboard')
    }
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await signInWithEmail(email)
      
      if (error) {
        setMessage(error.message)
        setMessageType('error')
      } else {
        setMessage('Check your email for the magic link!')
        setMessageType('success')
        setEmail('')
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        background: '#fff', 
        borderRadius: 20, 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
        padding: '3rem 2.5rem', 
        width: '100%', 
        maxWidth: 400,
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: 800, 
            color: '#1a202c', 
            marginBottom: 8 
          }}>
            Welcome Back
          </h1>
          <p style={{ 
            color: '#718096', 
            fontSize: 16 
          }}>
            Enter your email to receive a magic link
          </p>
        </div>

        <form onSubmit={handleMagicLink}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '2px solid #e2e8f0',
                borderRadius: 12,
                fontSize: 16,
                outline: 'none',
                transition: 'all 0.2s',
                background: '#f7fafc'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.background = '#fff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0'
                e.target.style.background = '#f7fafc'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem 1.25rem',
              background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              transform: loading ? 'none' : 'translateY(0)',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{
                  width: 16,
                  height: 16,
                  border: '2px solid #fff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Sending Magic Link...
              </div>
            ) : (
              '✨ Send Magic Link'
            )}
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: 8,
            background: messageType === 'success' ? '#f0fff4' : '#fed7d7',
            border: `1px solid ${messageType === 'success' ? '#9ae6b4' : '#feb2b2'}`,
            color: messageType === 'success' ? '#22543d' : '#742a2a',
            fontSize: 14,
            fontWeight: 500
          }}>
            {messageType === 'success' && '✅ '}
            {messageType === 'error' && '❌ '}
            {message}
          </div>
        )}

        <div style={{ 
          marginTop: '2rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid #e2e8f0',
          color: '#718096',
          fontSize: 14
        }}>
          <p>
            🔐 Secure passwordless authentication
            <br />
            No passwords to remember!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}