import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { AuthLayout, InputField, Spinner } from '../components';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address'); return; }

    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
      toast.success('Password reset OTP sent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle="We've sent a password reset OTP to your email"
      >
        <div className="text-center space-y-6">
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce-slow">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <div>
            <p className="text-slate-600 text-sm leading-relaxed">
              If an account exists for <span className="font-semibold text-slate-800">{email}</span>,{' '}
              we've sent a 6-digit OTP. It expires in 10 minutes.
            </p>
          </div>

          <button
            onClick={() => navigate('/verify-otp', { state: { email, type: 'reset' } })}
            className="btn-primary"
          >
            Enter OTP
          </button>

          <button
            type="button"
            onClick={() => { setSent(false); }}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Use a different email
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <Link to="/login" className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries — we'll send you a reset code"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Icon */}
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
          <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>

        <InputField
          label="Email address"
          name="email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          error={error}
          autoComplete="email"
          required
        />

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? <><Spinner /><span>Sending OTP…</span></> : 'Send Reset OTP'}
        </button>

        <div className="text-center">
          <Link to="/login" className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
