import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Phase = 'button' | 'input' | 'success';

function DynamicIslandSignup() {
  const [phase, setPhase] = useState<Phase>('button');
  const [email, setEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === 'input' && inputRef.current) {
      // Small delay so the expansion animation starts first
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setPhase('success');
    // Reset after a while so they could re-use if needed
    setTimeout(() => {
      setPhase('button');
      setEmail('');
    }, 4000);
  };

  // Shared pill style
  const pillBase =
    'relative flex items-center justify-center rounded-full cursor-pointer select-none overflow-hidden';

  return (
    <div className="flex justify-center">
      <AnimatePresence mode="wait">
        {/* ─── BUTTON state ─── */}
        {phase === 'button' && (
          <motion.button
            key="btn"
            onClick={() => setPhase('input')}
            layoutId="pill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`${pillBase} bg-pink hover:bg-pink-light px-10 py-4 shadow-lg shadow-pink/20 hover:shadow-pink/30 transition-shadow duration-300`}
          >
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="font-display font-bold text-white text-lg tracking-wide whitespace-nowrap"
            >
              Get the newsletter
            </motion.span>
          </motion.button>
        )}

        {/* ─── INPUT state ─── */}
        {phase === 'input' && (
          <motion.form
            key="input"
            onSubmit={handleSubmit}
            layoutId="pill"
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            className={`${pillBase} bg-gray-100 border border-gray-200 w-full max-w-md px-2 py-2`}
          >
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-5 py-2.5 text-black placeholder:text-gray-400 font-body text-base outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-pink flex items-center justify-center hover:bg-pink-light transition-colors duration-200"
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
            </motion.button>
          </motion.form>
        )}

        {/* ─── SUCCESS state ─── */}
        {phase === 'success' && (
          <motion.div
            key="success"
            layoutId="pill"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`${pillBase} bg-pink px-10 py-4`}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="font-display font-bold text-white text-lg tracking-wide whitespace-nowrap"
            >
              You're in ✓
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* ─── Entrance animation wrapper ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Brand */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-4">
          AI for Blondes<span className="text-pink">.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-lg sm:text-xl font-body mb-14 max-w-md"
        >
          Complex AI news, made understandable.
        </motion.p>

        {/* Dynamic Island Signup */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full max-w-md"
        >
          <DynamicIslandSignup />
        </motion.div>
      </motion.div>
    </div>
  );
}
