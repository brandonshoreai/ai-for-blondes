import React, { useState, useRef, useEffect, useCallback } from 'react';

type Phase = 'button' | 'input' | 'success';

function DynamicIslandSignup() {
  const [phase, setPhase] = useState<Phase>('button');
  const [email, setEmail] = useState('');
  const [showContent, setShowContent] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fade content out, morph pill, fade new content in
  const morphTo = useCallback((next: Phase) => {
    setShowContent(false);
    setTimeout(() => {
      setPhase(next);
      // Let the CSS transition on the pill start, then fade content in
      requestAnimationFrame(() => {
        setTimeout(() => setShowContent(true), 60);
      });
    }, 150);
  }, []);

  useEffect(() => {
    if (phase === 'input' && showContent && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, showContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    morphTo('success');
    setTimeout(() => {
      morphTo('button');
      setEmail('');
    }, 3000);
  };

  // Pill dimensions per phase
  const pillStyles: Record<Phase, React.CSSProperties> = {
    button: {
      width: 260,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#D4607A',
    },
    input: {
      width: 400,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#F5F5F7',
    },
    success: {
      width: 220,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#D4607A',
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* Single morphing pill — never unmounts */}
      <div
        onClick={() => phase === 'button' && morphTo('input')}
        style={{
          ...pillStyles[phase],
          transition: 'all 0.55s cubic-bezier(0.32, 0.72, 0, 1)',
          cursor: phase === 'button' ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          willChange: 'width, background-color',
          border: phase === 'input' ? '1px solid #E5E5EA' : '1px solid transparent',
          maxWidth: '100%',
        }}
      >
        {/* Content layer — fades in/out independently of pill morph */}
        <div
          style={{
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '0 8px',
          }}
        >
          {phase === 'button' && (
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 600,
                fontSize: 17,
                color: '#fff',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              Get the newsletter
            </span>
          )}

          {phase === 'input' && (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '0 4px',
              }}
            >
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '0 16px',
                  fontSize: 16,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#1D1D1F',
                }}
              />
              <button
                type="submit"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#D4607A',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background-color 0.2s ease, transform 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C4506A';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4607A';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          )}

          {phase === 'success' && (
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 600,
                fontSize: 17,
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
    </div>
  );
}

export default function LandingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            letterSpacing: '-0.02em',
            color: '#1D1D1F',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          AI for Blondes<span style={{ color: '#D4607A' }}>.</span>
        </h1>

        <p
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
            color: '#86868B',
            marginBottom: 56,
            maxWidth: 400,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.3s',
          }}
        >
          Complex AI news, made understandable.
        </p>

        <div
          style={{
            width: '100%',
            maxWidth: 420,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
          }}
        >
          <DynamicIslandSignup />
        </div>
      </div>
    </div>
  );
}
