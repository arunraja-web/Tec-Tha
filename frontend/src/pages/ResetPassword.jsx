import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { AuthLayout, PasswordField, PasswordStrengthBar, Spinner } from '../components';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email || !otp) {
  toast.error("Please verify OTP first");
  navigate('/forgot-password');
}
  }, [email, otp, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Minimum 8 characters required';
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Must include an uppercase letter';
    else if (!/[a-z]/.test(form.password)) errs.password = 'Must include a lowercase letter';
    else if (!/[0-9]/.test(form.password)) errs.password = 'Must include a number';
    else if (!/[^A-Za-z0-9]/.test(form.password)) errs.password = 'Must include a special character';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await authAPI.resetPassword({ email, otp, password: form.password });
      setSuccess(true);
      toast.success('Password reset successfully!');
    } catch (err) {
      const res = err.response?.data;
      if (res?.errors?.length) {
        const mapped = {};
        res.errors.forEach(e => { mapped[e.field] = e.message; });
        setErrors(mapped);
      } else {
        toast.error(res?.message || 'Reset failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout title="Password reset!" subtitle="Your password has been updated successfully">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-600 text-sm">
            Your password has been changed. Please sign in with your new password.
          </p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to Sign In
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Choose a strong new password for your account"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <PasswordField
            label="New Password"
            name="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />
          {form.password && <PasswordStrengthBar password={form.password} />}
        </div>

        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        {/* Match indicator */}
        {form.password && form.confirmPassword && (
          <div className={`flex items-center gap-2 text-xs font-medium ${form.password === form.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
            {form.password === form.confirmPassword ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Passwords match
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Passwords don't match
              </>
            )}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary mt-2">
          {loading ? <><Spinner /><span>Resetting…</span></> : 'Reset Password'}
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
