import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

/* ─── Signup Form ─── */
function SignupForm({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 rounded-xl bg-pink/10 border border-pink/20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E84393" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span className="font-semibold text-white">You're in. Check your inbox.</span>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-pink/50 transition-colors"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-3.5 rounded-xl bg-pink font-semibold text-white text-base hover:bg-pink-light transition-colors"
      >
        Subscribe
      </motion.button>
    </form>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
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
    { title: 'Tool of the Day', desc: 'One AI tool worth trying. We test them first — only the genuinely useful ones make the cut.' },
    { title: 'Vibe Check', desc: 'Our honest take on where AI is headed. Sometimes contrarian. Always straight with you.' },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-lg">
            AI for Blondes<span className="text-pink">.</span>
          </span>
          <a
            href="#subscribe"
            className="hidden sm:inline-flex px-5 py-2 rounded-lg bg-pink/10 text-pink text-sm font-medium hover:bg-pink/20 transition-colors"
          >
            Subscribe
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
              <span className="text-sm text-white/50">Free daily newsletter</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
          >
            Complex AI.<br />
            <span className="text-pink">Simple words.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/50 leading-relaxed mb-10 max-w-xl"
          >
            The daily newsletter that takes complex AI news and explains it in plain English. Five minutes a day, Monday through Friday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SignupForm id="hero" />
          </motion.div>
        </div>
      </section>

      {/* ─── What You Get ─── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-sm font-semibold text-pink uppercase tracking-wider mb-3">What you get</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
              Four sections. Everything that matters.
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-pink/20 transition-colors">
                  <h3 className="font-semibold text-lg text-white mb-2">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter Preview ─── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-sm font-semibold text-pink uppercase tracking-wider mb-3">Sneak peek</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
              This is what lands in your inbox.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              {/* Email toolbar */}
              <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="ml-4 h-4 w-48 rounded bg-white/[0.05]" />
              </div>

              {/* Email content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink flex items-center justify-center">
                    <span className="font-bold text-sm text-white">AB</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">AI for Blondes</p>
                    <p className="text-xs text-white/30">Tuesday, Feb 11 / 5 min read</p>
                  </div>
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-lg bg-pink/10 text-xs font-semibold text-pink uppercase tracking-wider mb-3">The Big Story</span>
                  <h3 className="font-bold text-xl text-white mb-2">
                    OpenAI Just Dropped a Model That Can Actually Reason
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    The new o3 model isn't just another chatbot update. It can plan, problem-solve, and think through complex tasks step by step. We broke down what this actually means for you...
                  </p>
                </div>

                <div className="border-t border-white/[0.06] pt-5">
                  <span className="inline-block px-3 py-1 rounded-lg bg-white/5 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Quick Hits</span>
                  <div className="space-y-3">
                    {[
                      'Google Gemini can now control your phone autonomously',
                      'Meta open-sources their latest model — and it\'s actually good',
                      'The EU just passed new AI rules. The short version: it\'s complicated'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink/60 mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-white/40">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '5 min', label: 'read time' },
                { value: 'M-F', label: 'delivery' },
                { value: 'Free', label: 'forever' },
                { value: 'Zero', label: 'jargon' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-2xl sm:text-3xl font-bold text-pink mb-1">{stat.value}</p>
                  <p className="text-xs text-white/30 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section id="subscribe" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Stay informed.<br />
              <span className="text-white/40">Not overwhelmed.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/40 mb-10 max-w-lg mx-auto">
              One email, five minutes, all the AI news that matters — in plain language.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex justify-center">
              <SignupForm id="bottom" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-sm text-white/30">
            AI for Blondes<span className="text-pink">.</span>
          </span>
          <p className="text-xs text-white/20">
            2026 AI for Blondes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
