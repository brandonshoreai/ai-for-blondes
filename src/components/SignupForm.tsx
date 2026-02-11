import { useState } from 'react';

export default function SignupForm({ variant = 'hero' }: { variant?: 'hero' | 'bottom' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Placeholder — wire to your backend later
    // For now, simulate success after a brief delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 py-4">
        <span className="text-3xl">✨</span>
        <div>
          <p className="text-lg font-semibold text-white">You're in!</p>
          <p className="text-sm text-white/60">Check your inbox for a welcome from us.</p>
        </div>
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className={`flex ${isHero ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'} gap-3`}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all text-base"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-7 py-3.5 rounded-xl bg-pink hover:bg-pink-dark text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-pink/25 disabled:opacity-70 whitespace-nowrap active:scale-[0.98]"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Joining...
            </span>
          ) : (
            'Subscribe free →'
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-sm text-pink-light">Something went wrong. Try again?</p>
      )}
      <p className="mt-3 text-xs text-white/40">Free forever. Unsubscribe anytime. No spam, pinky promise 💅</p>
    </form>
  );
}
