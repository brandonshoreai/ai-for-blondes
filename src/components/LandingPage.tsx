import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

/* ─── Signup Form ─── */
function SignupInput({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-pink/10 border border-pink/30"
      >
        <div className="w-8 h-8 rounded-full bg-pink flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span className="font-display font-semibold text-white">You're in. Watch your inbox.</span>
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
        className="flex-1 px-5 py-4 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 font-body text-base focus:outline-none focus:border-pink/50 focus:bg-white/[0.08] transition-all duration-300"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="px-8 py-4 rounded-xl bg-pink font-display font-bold text-white text-base tracking-wide hover:bg-pink-light transition-colors duration-200 whitespace-nowrap relative overflow-hidden group"
      >
        <span className="relative z-10">Get smarter</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-light to-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </form>
  );
}

/* ─── Floating shapes for background ─── */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[15%] right-[10%] w-32 h-32 rounded-full border border-pink/10"
      />
      <motion.div
        animate={{ y: [15, -25, 15], x: [5, -15, 5] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-pink/30"
      />
      <motion.div
        animate={{ y: [10, -30, 10], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[20%] right-[20%] w-16 h-16 border border-white/5 rotate-45"
      />
      <motion.div
        animate={{ y: [-10, 20, -10], x: [-5, 15, -5] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[60%] left-[15%] w-24 h-24 rounded-full border border-white/[0.04]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[25%] left-[40%] w-64 h-64 rounded-full bg-pink/[0.03] blur-3xl"
      />
    </div>
  );
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const variants: Record<string, any> = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ title, description, icon, index }: { title: string; description: string; icon: React.ReactNode; index: number }) {
  return (
    <Reveal delay={index * 0.15}>
      <motion.div
        whileHover={{ y: -4, borderColor: 'rgba(232,67,147,0.3)' }}
        transition={{ duration: 0.3 }}
        className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
      >
        <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center mb-5 group-hover:bg-pink/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
        <p className="font-body text-white/50 text-[15px] leading-relaxed">{description}</p>
      </motion.div>
    </Reveal>
  );
}

/* ─── Newsletter Preview with 3D tilt ─── */
function NewsletterPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  return (
    <Reveal>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="perspective-[1200px]"
      >
        <motion.div
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative bg-navy-light border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-px bg-gradient-to-br from-pink/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Email toolbar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="ml-4 h-5 w-48 rounded bg-white/[0.04]" />
          </div>

          {/* Sidebar + email split */}
          <div className="flex">
            {/* Mini sidebar */}
            <div className="hidden md:flex flex-col w-56 border-r border-white/[0.06] p-3 gap-1">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-pink/10 border border-pink/20">
                <div className="w-8 h-8 rounded-full bg-pink flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-xs text-white">AB</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">AI for Blondes</p>
                  <p className="text-[10px] text-white/40 truncate">OpenAI Just Dropped...</p>
                </div>
              </div>
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg opacity-40">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="h-2.5 w-20 bg-white/[0.08] rounded mb-1.5" />
                    <div className="h-2 w-28 bg-white/[0.04] rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Email body */}
            <div className="flex-1 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-pink flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-white">AB</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">AI for Blondes</p>
                  <p className="text-[11px] text-white/30">Tuesday, Feb 11 / 5 min read</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-pink/10 mb-3">
                    <span className="text-[11px] font-display font-bold text-pink uppercase tracking-widest">The Big Story</span>
                  </div>
                  <p className="font-display font-bold text-lg leading-snug text-white">OpenAI Just Dropped a Model That Can Actually Reason</p>
                  <p className="text-white/40 text-sm mt-2 leading-relaxed">The new o3 model isn't just another chatbot update. It can plan, problem-solve, and think through complex tasks step by step. We broke down what this actually means for you...</p>
                </div>

                <div className="border-t border-white/[0.06] pt-5">
                  <div className="inline-block px-2.5 py-1 rounded-md bg-white/[0.05] mb-3">
                    <span className="text-[11px] font-display font-bold text-white/60 uppercase tracking-widest">Quick Hits</span>
                  </div>
                  <div className="space-y-2.5">
                    {['Google Gemini can now control your phone autonomously', 'Meta open-sources their latest model — and it\'s actually good', 'The EU just passed new AI rules. The short version: it\'s complicated'].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink/60 mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-white/50">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-5">
                  <div className="inline-block px-2.5 py-1 rounded-md bg-white/[0.05] mb-3">
                    <span className="text-[11px] font-display font-bold text-white/60 uppercase tracking-widest">Vibe Check</span>
                  </div>
                  <p className="text-sm text-white/40 italic leading-relaxed">"If AI takes my job but automates my taxes, I'm calling that a fair trade."</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { value: '5 min', label: 'read time' },
    { value: 'M-F', label: 'delivery' },
    { value: 'Free', label: 'forever' },
    { value: 'Zero', label: 'jargon' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
      {stats.map((stat, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <div className="bg-navy p-8 sm:p-10 text-center">
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-pink mb-1">{stat.value}</p>
            <p className="font-body text-sm text-white/30 uppercase tracking-widest">{stat.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ─── Icons (abstract shapes, no emojis) ─── */
const icons = {
  bolt: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E84393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E84393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  diamond: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E84393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="4.5" width="15" height="15" rx="1" transform="rotate(45 12 12)" />
    </svg>
  ),
  compass: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E84393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

/* ─── Main Page Component ─── */
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  const words = ['Complex AI.', 'Simple words.'];

  return (
    <>
      {/* ─── Gradient BG ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-pink/[0.07] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-gradient-radial from-pink/[0.04] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <FloatingShapes />

      {/* ─── Nav ─── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-navy/70 border-b border-white/[0.04]"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display font-extrabold text-lg tracking-tight">
            AI for Blondes<span className="text-pink">.</span>
          </span>
          <motion.a
            href="#subscribe"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-display font-semibold hover:bg-pink/10 hover:border-pink/30 transition-all duration-300"
          >
            Subscribe
          </motion.a>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center pt-20">
        <motion.div
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-6xl mx-auto px-6 py-20 sm:py-32 w-full"
        >
          <div className="max-w-3xl">
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
              <span className="text-sm text-white/50 font-body">Free daily newsletter</span>
            </motion.div>

            {/* Headline with staggered word reveal */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
              {words.map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + wi * 0.15, ease: [0.22, 1, 0.36, 1] }}
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
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg sm:text-xl text-white/45 leading-relaxed mb-10 max-w-xl font-body"
            >
              We take the complex AI news that only engineers understand and translate it into language everyone can follow. Five minutes a day. Monday through Friday.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <SignupInput id="hero" />
            </motion.div>
          </div>

          {/* Asymmetric decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-72 h-72"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full border border-pink/20 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-8 rounded-full border border-white/[0.06] animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              <div className="absolute inset-16 rounded-full bg-pink/[0.06] blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── What You Get ─── */}
      <section className="relative py-24 sm:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <Reveal>
              <p className="font-display text-sm font-bold text-pink uppercase tracking-[0.2em] mb-4">What you get</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
                Four sections.<br />
                <span className="text-white/40">Everything that matters.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <FeatureCard
              index={0}
              title="The Big Story"
              description="The one AI development everyone will be talking about, broken down so you actually understand why it matters."
              icon={icons.bolt}
            />
            <FeatureCard
              index={1}
              title="Quick Hits"
              description="3-5 stories worth knowing, each in a few sentences. Designed to skim. Always relevant."
              icon={icons.layers}
            />
            <FeatureCard
              index={2}
              title="Tool of the Day"
              description="One AI tool worth trying. We test them first — only the genuinely useful ones make the cut."
              icon={icons.diamond}
            />
            <FeatureCard
              index={3}
              title="Vibe Check"
              description="Our honest take on where AI is headed. Sometimes contrarian. Always straight with you."
              icon={icons.compass}
            />
          </div>
        </div>
      </section>

      {/* ─── Newsletter Preview ─── */}
      <section className="relative py-24 sm:py-36">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <Reveal>
              <p className="font-display text-sm font-bold text-pink uppercase tracking-[0.2em] mb-4">Sneak peek</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                This is what lands<br />in your inbox<span className="text-pink">.</span>
              </h2>
            </Reveal>
          </div>
          <NewsletterPreview />
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <StatsBar />
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section id="subscribe" className="relative py-24 sm:py-36">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Stay informed<span className="text-pink">.</span><br />
              <span className="text-white/40">Not overwhelmed.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/40 mb-12 max-w-lg mx-auto font-body leading-relaxed">
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
      <footer className="border-t border-white/[0.04] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-sm text-white/40">
            AI for Blondes<span className="text-pink">.</span>
          </span>
          <p className="text-xs text-white/20 font-body">
            2026 AI for Blondes. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
