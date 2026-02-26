import React, { useState, useEffect } from 'react';
import { Nav } from './LandingPage';

const systemFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';

export default function AboutPage() {
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
          padding: '120px 24px 80px',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 600,
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
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#1D1D1F',
              marginBottom: 32,
              fontStyle: 'italic',
              lineHeight: 1.2,
            }}
          >
            About
          </h1>

          <div
            style={{
              fontFamily: systemFont,
              fontSize: 16,
              lineHeight: 1.75,
              color: '#48484A',
            }}
          >
            <p style={{ marginBottom: 24 }}>
              <strong style={{ color: '#1D1D1F' }}>AI for Blondes</strong> is a free daily newsletter that breaks down the most important AI news into simple, understandable language.
            </p>

            <p style={{ marginBottom: 24 }}>
              No jargon. No hype. Just the stuff that actually matters, explained like you're catching up with a friend who happens to work in tech.
            </p>

            <p style={{ marginBottom: 24 }}>
              Every morning, we read through dozens of AI announcements, research papers, and industry moves so you don't have to. Then we distill it into a quick read you can finish with your coffee.
            </p>

            <p style={{ marginBottom: 40 }}>
              Whether you're a complete beginner or just tired of feeling lost in AI conversations, this newsletter is for you.
            </p>

            <a
              href="/"
              style={{
                fontFamily: systemFont,
                fontWeight: 500,
                fontSize: 14,
                color: '#D4607A',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                borderBottom: '1.5px solid #D4607A',
                paddingBottom: 2,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              ← Back to home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
