import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

/* ─── Signup Form ─── */
function SignupForm({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-pink font-medium"
      >
        You're in. Check your inbox.
      </motion.p>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
      className="flex w-full max-w-md"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-5 py-3 rounded-l-full bg-white border border-muted/30 border-r-0 text-cream placeholder:text-muted/50 text-sm focus:outline-none focus:border-pink transition-colors duration-300"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-r-full bg-pink text-white text-sm font-medium hover:bg-pink/90 transition-colors duration-300"
      >
        Subscribe
      </button>
    </form>
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
          >
            Subscribe
          </a>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-10">
        <div className="max-w-[1100px] w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-muted tracking-wide mb-8">free daily newsletter</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6"
          >
            Complex AI.<br />Simple words.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-muted leading-relaxed mb-10 max-w-lg"
          >
            We take the overwhelming world of AI and break it into a calm, five-minute morning read. No jargon. No panic. Just clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SignupForm id="hero" />
            <p className="font-mono text-xs text-muted/60 mt-4">Join free. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── What's Inside ─── */}
      <section className="py-20 sm:py-24 px-6 sm:px-10 border-t border-muted/10">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <p className="font-mono text-xs text-muted tracking-wide mb-12">What's inside</p>
          </FadeIn>

          <div className="border-t border-muted/15">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="py-6 border-b border-muted/15 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
                  <h3 className="text-cream font-medium text-base sm:w-48 flex-shrink-0">{f.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter Preview ─── */}
      <section className="py-20 sm:py-24 px-6 sm:px-10 border-t border-muted/10">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <p className="font-mono text-xs text-muted tracking-wide mb-12">A peek inside</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-2xl mx-auto rounded-sm bg-white text-[#1a1a1a] shadow-sm border border-muted/15 overflow-hidden">
              {/* Email header */}
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-[#eee]">
                <p className="font-medium text-sm">AI for Blondes</p>
                <p className="text-xs text-[#888] mt-0.5">Tuesday, Feb 11 / 5 min read</p>
              </div>

              {/* Email body */}
              <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-6">
                <div>
                  <p className="font-mono text-[10px] text-[#888] uppercase tracking-wider mb-2">The Big Story</p>
                  <h3 className="font-medium text-lg leading-snug mb-2">
                    OpenAI Just Dropped a Model That Can Actually Reason
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed">
                    The new o3 model isn't just another chatbot update. It can plan, problem-solve, and think through complex tasks step by step. We broke down what this actually means for you...
                  </p>
                </div>

                <hr className="border-[#eee]" />

                <div>
                  <p className="font-mono text-[10px] text-[#888] uppercase tracking-wider mb-3">Quick Hits</p>
                  <div className="space-y-2.5">
                    {[
                      'Google Gemini can now control your phone autonomously',
                      'Meta open-sources their latest model -- and it\'s actually good',
                      'The EU just passed new AI rules. The short version: it\'s complicated'
                    ].map((item, i) => (
                      <p key={i} className="text-sm text-[#555] leading-relaxed pl-4 border-l-2 border-[#E84393]/30">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-16 sm:py-20 px-6 sm:px-10 border-t border-muted/10">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="flex flex-wrap justify-center items-center gap-0">
              {[
                '5 min read',
                'Mon-Fri',
                '100% free',
                'Zero jargon',
              ].map((stat, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px h-4 bg-muted/20 mx-6 sm:mx-10 hidden sm:block" />}
                  <p className="font-mono text-xs text-muted tracking-wide px-4 py-2">{stat}</p>
                </React.Fragment>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section id="subscribe" className="py-20 sm:py-24 px-6 sm:px-10 border-t border-muted/10">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              Stop doomscrolling.<br />Start knowing things.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8">
              <SignupForm id="bottom" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-muted/10 py-6 px-6 sm:px-10">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <span className="text-sm text-muted/60">AI for Blondes</span>
          <span className="text-sm text-muted/40">&copy; 2026</span>
        </div>
      </footer>
    </div>
  );
}
