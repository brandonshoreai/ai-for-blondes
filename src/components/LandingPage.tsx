import React, { useState, useRef, useEffect, useCallback } from 'react';

type Phase = 'button' | 'squish' | 'input' | 'success';

// System font stack — same as Cursor on Mac (SF Pro)
const systemFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';

function DynamicIslandSignup() {
  const [phase, setPhase] = useState<Phase>('button');
  const [email, setEmail] = useState('');
  const [sendVisible, setSendVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (phase !== 'button') return;
    setPhase('squish');
    setTimeout(() => {
      setPhase('input');
      setTimeout(() => setSendVisible(true), 250);
    }, 140);
  }, [phase]);

  useEffect(() => {
    if (phase === 'input') {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSendVisible(false);
    setTimeout(() => {
      setPhase('success');
      setTimeout(() => {
        setPhase('button');
        setEmail('');
      }, 2200);
    }, 100);
  }, [email]);

  const isExpanded = phase === 'input';
  const isSquished = phase === 'squish';
  const isSuccess = phase === 'success';
  const isButton = phase === 'button';

  const width = isExpanded ? 380 : isSquished ? 160 : isSuccess ? 185 : 200;
  const height = 50;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        onClick={handleClick}
        style={{
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: isSuccess ? '#D4607A' : 'transparent',
          border: '1.5px solid #D4607A',
          transition: isSquished
            ? 'all 0.1s cubic-bezier(0.4, 0, 1, 1)'
            : [
                'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              ].join(', '),
          transform: isSquished ? 'scale(0.82)' : 'scale(1)',
          cursor: isButton ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          willChange: 'width, transform',
          maxWidth: 'calc(100vw - 48px)',
        }}
      >
        {(isButton || isSquished) && (
          <span
            style={{
              fontFamily: systemFont,
              fontWeight: 500,
              fontSize: 15,
              color: '#D4607A',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              opacity: isSquished ? 0 : 1,
              transition: 'opacity 0.08s ease',
            }}
          >
            Sign Up
          </span>
        )}

        {isExpanded && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              padding: '0 5px 0 0',
            }}
          >
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="island-input"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '0 18px',
                fontSize: 17,
                fontFamily: systemFont,
                fontWeight: 400,
                color: '#D4607A',
                caretColor: '#D4607A',
                letterSpacing: '0.01em',
              }}
            />
            <button
              type="submit"
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: '#D4607A',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transform: sendVisible ? 'scale(1)' : 'scale(0)',
                opacity: sendVisible ? 1 : 0,
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        )}

        {isSuccess && (
          <span
            style={{
              fontFamily: systemFont,
              fontWeight: 500,
              fontSize: 14,
              color: '#fff',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            You're in ✓
          </span>
        )}
      </div>
    </div>
  );
}

function Nav() {
  const linkStyle: React.CSSProperties = {
    fontFamily: systemFont,
    fontWeight: 400,
    fontSize: 13,
    color: '#86868B',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    transition: 'color 0.2s ease',
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 28,
        padding: '18px 32px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <a
        href="/"
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#1D1D1F')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#86868B')}
      >
        Home
      </a>
      <a
        href="/about"
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#1D1D1F')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#86868B')}
      >
        About
      </a>
      <a
        href="/login"
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#1D1D1F')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#86868B')}
      >
        Log In
      </a>
    </nav>
  );
}

export { Nav };

export default function LandingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

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
          padding: '80px 24px 80px',
          backgroundColor: '#fff',
          paddingTop: 92,
        }}
      >
        {/* Hero image — gigantic */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(1.01)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: 4,
            width: '87%',
            maxWidth: 957,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="/hero.png"
            alt="Artificial Intelligence for blondes"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
          />
        </div>

        {/* Sign Up button — raised 10px closer to hero */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <DynamicIslandSignup />
        </div>
      </div>
    </>
  );
}
