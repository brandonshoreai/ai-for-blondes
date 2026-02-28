import React, { useState, useRef, useEffect, useCallback } from 'react';

type Phase = 'button' | 'squish' | 'input' | 'success';

// System font stack — same as Cursor on Mac (SF Pro)
const systemFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';

function DynamicIslandSignup() {
  const [phase, setPhase] = useState<Phase>('button');
  const [email, setEmail] = useState('');
<<<<<<< Updated upstream
  const [sendVisible, setSendVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
=======
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:8780';
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
        You're in. Check your inbox.
      </motion.p>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={loading}
          className="flex-1 px-5 py-3 rounded-l-full bg-white border border-muted/30 border-r-0 text-cream placeholder:text-muted/50 text-sm focus:outline-none focus:border-pink transition-colors duration-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-r-full bg-pink text-white text-sm font-medium hover:bg-pink/90 transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-pink text-xs mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function LandingPage() {
  const features = [
    { title: 'The Big Story', desc: 'The one AI development everyone will be talking about, broken down so you actually understand why it matters.' },
    { title: 'Quick Hits', desc: '3-5 stories worth knowing, each in a few sentences. Designed to skim.' },
    { title: 'Tool of the Day', desc: 'One AI tool worth trying. We test them first -- only the genuinely useful ones make the cut.' },
    { title: 'The Vibe Check', desc: 'Our honest take on where AI is headed. Sometimes contrarian. Always straight with you.' },
  ];

  return (
    <div className="min-h-screen">

      {/* ─── Header ─── */}
      <header className="fixed top-0 w-full z-50 border-b border-muted/10">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <span className="text-cream text-sm font-medium tracking-tight">AI for Blondes</span>
          <a
            href="#subscribe"
            className="text-muted text-sm font-mono hover:text-cream transition-colors duration-300"
>>>>>>> Stashed changes
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
