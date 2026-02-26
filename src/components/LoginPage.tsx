import React, { useState, useEffect } from 'react';
import { Nav } from './LandingPage';

const systemFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';

export default function LoginPage() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Nav />
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 360,
            width: '100%',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: '#1D1D1F',
              marginBottom: 36,
              fontStyle: 'italic',
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            Log In
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 24,
                border: '1.5px solid #E5E5EA',
                backgroundColor: 'transparent',
                padding: '0 20px',
                fontSize: 15,
                fontFamily: systemFont,
                color: '#1D1D1F',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4607A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5EA')}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 24,
                border: '1.5px solid #E5E5EA',
                backgroundColor: 'transparent',
                padding: '0 20px',
                fontSize: 15,
                fontFamily: systemFont,
                color: '#1D1D1F',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4607A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5EA')}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                height: 48,
                borderRadius: 24,
                border: 'none',
                backgroundColor: '#D4607A',
                color: '#fff',
                fontSize: 14,
                fontFamily: systemFont,
                fontWeight: 500,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease, transform 0.15s ease',
                marginTop: 4,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Log In
            </button>
          </form>

          <p
            style={{
              fontFamily: systemFont,
              fontSize: 13,
              color: '#86868B',
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            Don't have an account?{' '}
            <a
              href="/"
              style={{ color: '#D4607A', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
