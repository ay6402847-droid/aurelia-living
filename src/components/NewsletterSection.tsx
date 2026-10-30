import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Strict email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-20 bg-[#EEEAE3] border-t border-[#D8C9B8]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-[#C98755]" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#85817B]">
            Exclusive Invitations
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#292929] tracking-tight">
          A Little Inspiration, Delivered.
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#85817B] max-w-lg mx-auto">
          Join our community for fresh design ideas, seasonal lookbooks, early access to new arrivals, and quiet design stories.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-6 bg-white rounded-xl border border-[#D8C9B8]/50 shadow-xs max-w-md mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-[#C98755] mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-serif text-lg font-medium text-[#292929]">Welcome to Aurelia Living</span>
            </div>
            <p className="text-xs text-[#85817B] leading-relaxed">
              Your subscription is registered for our private previews. (Demo state active: connect to Mailchimp or Klaviyo for live production broadcasts).
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#C98755] hover:underline"
            >
              Register another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="flex-1 px-4 py-3 bg-white border border-[#D8C9B8] rounded-sm text-sm text-[#292929] placeholder-[#85817B] focus:outline-none focus:border-[#C98755] transition-colors"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-[#C98755] hover:bg-[#b57544] text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-70 whitespace-nowrap"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === 'error' && (
              <p className="mt-2 text-xs text-rose-600 text-left pl-1">
                {errorMessage}
              </p>
            )}

            <p className="mt-4 text-xs text-[#85817B]">
              We respect your sanctuary. Unsubscribe at any time with a single click. No spam ever.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
