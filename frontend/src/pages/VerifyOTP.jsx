import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { AuthLayout, Spinner } from '../components';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, type = 'verify' } = location.state || {};

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const refs = useRef([]);

  useEffect(() => {
    if (!email) { navigate('/login'); return; }
    refs.current[0]?.focus();
  }, [email, navigate]);

  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleInput = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
    if (next.every(d => d !== '')) {
      setTimeout(() => handleVerify(next.join('')), 100);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!paste) return;
    const next = [...otp];
    paste.split('').forEach((c, i) => { if (i < 6) next[i] = c; });
    setOtp(next);
    refs.current[Math.min(paste.length, 5)]?.focus();
    if (paste.length === 6) setTimeout(() => handleVerify(paste), 100);
  };

 const handleVerify = async (code) => {
  setLoading(true);

  try {
    if (type === 'verify') {
      await authAPI.verifyOTP({ email, otp: code });

      toast.success('Email verified! You can now sign in.');
      navigate('/login');
    } else {
      // Forgot password flow
      toast.success('OTP verified!');

      navigate('/reset-password', {
        state: { email, otp: code }
      });
    }
  } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      refs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) { toast.error('Please enter the full 6-digit OTP.'); return; }
    handleVerify(code);
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await authAPI.resendOTP({ email, type });
      toast.success('A new OTP has been sent to your email.');
      setCountdown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      refs.current[0]?.focus();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  const maskedEmail = email ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '';

  return (
    <AuthLayout
      title={type === 'reset' ? 'Check your email' : 'Verify your email'}
      subtitle={`We sent a 6-digit code to ${maskedEmail}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP inputs */}
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => refs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`otp-input ${digit ? 'filled' : ''}`}
              disabled={loading}
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-slate-500">
              Resend code in{' '}
              <span className="font-semibold text-blue-600 tabular-nums">
                0:{String(countdown).padStart(2, '0')}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5 mx-auto"
            >
              {resendLoading ? <><Spinner color="blue" /><span>Sending…</span></> : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Resend OTP
                </>
              )}
            </button>
          )}
        </div>

        <button type="submit" disabled={loading || otp.join('').length !== 6} className="btn-primary">
          {loading ? <><Spinner /><span>Verifying…</span></> : 'Verify Code'}
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

      {/* Info box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex gap-2.5">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-blue-700 leading-relaxed">
            The code expires in 10 minutes. Check your spam folder if you don't see it. Never share this code with anyone.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
