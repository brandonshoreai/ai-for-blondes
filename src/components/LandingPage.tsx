import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

/* ─── Signup Form ─── */
function SignupInput({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState('');

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-4 px-8 py-5 rounded-3xl bg-pink/5 border border-pink/20"
      >
        <div className="w-10 h-10 rounded-full bg-pink flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span className="font-display font-semibold text-white text-lg">You're in. Watch your inbox.</span>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(email); }}
      className="flex flex-col sm:flex-row gap-4 w-full max-w-lg"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-7 py-5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 font-body text-lg focus:outline-none focus:border-pink/40 focus:bg-white/[0.06] transition-all duration-500"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-10 py-5 rounded-2xl bg-pink font-display font-bold text-white text-lg hover:bg-pink-light transition-all duration-300"
      >
        Subscribe
      </motion.button>
    </form>
  );
}

/* ─── Subtle floating shapes ─── */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <motion.div
        animate={{ y: [-30, 30, -30], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[20%] right-[15%] w-40 h-40 rounded-full border border-pink/5"
      />
      <motion.div
        animate={{ y: [20, -40, 20] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[25%] left-[10%] w-32 h-32 rounded-full border border-white/[0.03]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[30%] left-[45%] w-96 h-96 rounded-full bg-pink/[0.02] blur-3xl"
      />
    </div>
  );
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="group p-10 sm:p-14 rounded-3xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-sm hover:border-pink/10 transition-all duration-500"
      >
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">{title}</h3>
        <p className="font-body text-white/40 text-lg leading-relaxed">{description}</p>
      </motion.div>
    </Reveal>
  );
}

/* ─── Newsletter Preview ─── */
function NewsletterPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -4, y: x * 4 });
  };

  return (
    <Reveal>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="perspective-[1400px]"
      >
        <motion.div
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: 'spring', stiffness: 150, damping: 30 }}
          className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Email toolbar */}
          <div className="flex items-center gap-3 px-7 py-5 bg-white/[0.02] border-b border-white/[0.04]">
            <div className="w-3.5 h-3.5 rounded-full bg-white/[0.08]" />
            <div className="w-3.5 h-3.5 rounded-full bg-white/[0.08]" />
            <div className="w-3.5 h-3.5 rounded-full bg-white/[0.08]" />
            <div className="ml-5 h-6 w-56 rounded-lg bg-white/[0.03]" />
          </div>

          {/* Email content */}
          <div className="p-10 sm:p-14 space-y-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-pink flex items-center justify-center">
                <span className="font-display font-bold text-lg text-white">AB</span>
              </div>
              <div>
                <p className="font-display font-semibold text-base text-white">AI for Blondes</p>
                <p className="text-sm text-white/30">Tuesday, Feb 11 / 5 min read</p>
              </div>
            </div>

            <div>
              <div className="inline-block px-4 py-2 rounded-xl bg-pink/10 mb-5">
                <span className="text-xs font-display font-bold text-pink uppercase tracking-[0.15em]">The Big Story</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight text-white mb-4">
                OpenAI Just Dropped a Model That Can Actually Reason
              </h2>
              <p className="text-white/40 text-base sm:text-lg leading-relaxed">
                The new o3 model isn't just another chatbot update. It can plan, problem-solve, and think through complex tasks step by step. We broke down what this actually means for you...
              </p>
            </div>

            <div className="border-t border-white/[0.04] pt-8">
              <div className="inline-block px-4 py-2 rounded-xl bg-white/[0.04] mb-5">
                <span className="text-xs font-display font-bold text-white/50 uppercase tracking-[0.15em]">Quick Hits</span>
              </div>
              <div className="space-y-4">
                {[
                  'Google Gemini can now control your phone autonomously',
                  'Meta open-sources their latest model — and it\'s actually good',
                  'The EU just passed new AI rules. The short version: it\'s complicated'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-pink/50 mt-2 flex-shrink-0" />
                    <p className="text-base text-white/40 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ─── Main Page Component ─── */
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  const words = ['Complex AI.', 'Simple words.'];

  return (
    <>
      {/* ─── Gradient BG ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-radial from-pink/[0.04] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <FloatingShapes />

      {/* ─── Nav ─── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-black/50 border-b border-white/[0.03]"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="font-display font-extrabold text-xl tracking-tight">
            AI for Blondes<span className="text-pink">.</span>
          </span>
          <motion.a
            href="#subscribe"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:inline-flex px-6 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-sm font-display font-semibold hover:bg-pink/5 hover:border-pink/20 transition-all duration-500"
          >
            Subscribe
          </motion.a>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center pt-24">
        <motion.div
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-7xl mx-auto px-8 py-32 sm:py-48 w-full"
        >
          <div className="max-w-4xl">
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.06] mb-16"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-pink animate-pulse" />
              <span className="text-sm text-white/40 font-body">Free daily newsletter</span>
            </motion.div>

            {/* Headline with staggered word reveal */}
            <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-9xl leading-[0.92] tracking-tight mb-12">
              {words.map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.6 + wi * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`block ${wi === 1 ? 'text-pink' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-xl sm:text-2xl text-white/40 leading-relaxed mb-16 max-w-2xl font-body"
            >
              We take the complex AI news that only engineers understand and translate it into language everyone can follow. Five minutes a day. Monday through Friday.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <SignupInput id="hero" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── What You Get ─── */}
      <section className="relative py-32 sm:py-48">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-24 max-w-3xl">
            <Reveal>
              <p className="font-display text-sm font-bold text-pink uppercase tracking-[0.2em] mb-6">What you get</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Four sections.<br />
                <span className="text-white/30">Everything that matters.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <FeatureCard
              index={0}
              title="The Big Story"
              description="The one AI development everyone will be talking about, broken down so you actually understand why it matters."
            />
            <FeatureCard
              index={1}
              title="Quick Hits"
              description="3-5 stories worth knowing, each in a few sentences. Designed to skim. Always relevant."
            />
            <FeatureCard
              index={2}
              title="Tool of the Day"
              description="One AI tool worth trying. We test them first — only the genuinely useful ones make the cut."
            />
            <FeatureCard
              index={3}
              title="Vibe Check"
              description="Our honest take on where AI is headed. Sometimes contrarian. Always straight with you."
            />
          </div>
        </div>
      </section>

      {/* ─── Newsletter Preview ─── */}
      <section className="relative py-32 sm:py-48">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <Reveal>
              <p className="font-display text-sm font-bold text-pink uppercase tracking-[0.2em] mb-6">Sneak peek</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                This is what lands<br />in your inbox<span className="text-pink">.</span>
              </h2>
            </Reveal>
          </div>
          <NewsletterPreview />
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-32 sm:py-40">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-3xl overflow-hidden">
            {[
              { value: '5 min', label: 'read time' },
              { value: 'M-F', label: 'delivery' },
              { value: 'Free', label: 'forever' },
              { value: 'Zero', label: 'jargon' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-black p-12 sm:p-16 text-center">
                  <p className="font-display text-4xl sm:text-5xl font-extrabold text-pink mb-2">{stat.value}</p>
                  <p className="font-body text-sm text-white/30 uppercase tracking-[0.15em]">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section id="subscribe" className="relative py-32 sm:py-48">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-pink/[0.04] rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 text-center">
          <Reveal>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] mb-8">
              Stay informed<span className="text-pink">.</span><br />
              <span className="text-white/30">Not overwhelmed.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl sm:text-2xl text-white/35 mb-16 max-w-2xl mx-auto font-body leading-relaxed">
              One email, five minutes, all the AI news that actually matters — translated from tech-speak into plain language.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex justify-center">
              <SignupInput id="bottom" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/[0.02] py-16">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="font-display font-bold text-base text-white/30">
            AI for Blondes<span className="text-pink">.</span>
          </span>
          <p className="text-sm text-white/20 font-body">
            2026 AI for Blondes. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
