import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Phase = 'button' | 'input' | 'success';

// Apple-style easing — smooth, no bounce
const appleEase = [0.4, 0, 0.2, 1] as const;
const appleFastEase = [0.16, 1, 0.3, 1] as const;

function DynamicIslandSignup() {
  const [phase, setPhase] = useState<Phase>('button');
  const [email, setEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === 'input' && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setPhase('success');
    setTimeout(() => {
      setPhase('button');
      setEmail('');
    }, 3500);
  };

  return (
    <div className="flex justify-center">
      <AnimatePresence mode="wait">
        {/* ─── BUTTON ─── */}
        {phase === 'button' && (
          <motion.button
            key="btn"
            onClick={() => setPhase('input')}
            layoutId="pill"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="relative flex items-center justify-center rounded-full cursor-pointer select-none overflow-hidden bg-[#D4607A] hover:bg-[#C4506A] px-12 py-4 transition-colors duration-300"
            style={{ willChange: 'transform, width, border-radius' }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: appleEase }}
              className="font-display font-semibold text-white text-lg tracking-wide whitespace-nowrap"
            >
              Get the newsletter
            </motion.span>
          </motion.button>
        )}

        {/* ─── INPUT ─── */}
        {phase === 'input' && (
          <motion.form
            key="input"
            onSubmit={handleSubmit}
            layoutId="pill"
            transition={{ duration: 0.55, ease: appleFastEase }}
            className="relative flex items-center rounded-full cursor-pointer select-none overflow-hidden bg-[#F5F5F7] border border-[#E5E5EA] w-full max-w-md px-2 py-2"
            style={{ willChange: 'transform, width, border-radius' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.35, ease: appleEase }}
              className="flex items-center w-full"
            >
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-5 py-2 text-[#1D1D1F] placeholder:text-[#A1A1A6] font-body text-base outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: appleEase }}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4607A] flex items-center justify-center hover:bg-[#C4506A] transition-colors duration-200"
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
            </motion.div>
          </motion.form>
        )}

        {/* ─── SUCCESS ─── */}
        {phase === 'success' && (
          <motion.div
            key="success"
            layoutId="pill"
            transition={{ duration: 0.5, ease: appleEase }}
            className="relative flex items-center justify-center rounded-full select-none overflow-hidden bg-[#D4607A] px-12 py-4"
            style={{ willChange: 'transform, width, border-radius' }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.35, ease: appleFastEase }}
              className="font-display font-semibold text-white text-lg tracking-wide whitespace-nowrap"
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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: appleFastEase }}
        className="flex flex-col items-center text-center"
      >
        {/* Brand */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#1D1D1F] mb-4">
          AI for Blondes<span className="text-[#D4607A]">.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: appleEase }}
          className="text-[#86868B] text-lg sm:text-xl font-body mb-16 max-w-md"
        >
          Complex AI news, made understandable.
        </motion.p>

        {/* Dynamic Island Signup */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: appleEase }}
          className="w-full max-w-md"
        >
          <DynamicIslandSignup />
        </motion.div>
      </motion.div>
    </div>
  );
}
