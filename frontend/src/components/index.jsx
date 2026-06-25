  import { useState } from 'react';
  import { Navigate } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';

  // ─── Logo ─────────────────────────────────────────────────────────────────────
  export const Logo = ({ size = 'md', showText = true }) => {
    const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
    const textSizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' };

    return (
      <div className="flex items-center gap-3">
        <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br from-blue-600 to-[#061B4E] flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0`}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        {showText && (
          <div>
            <span className={`font-display font-bold ${textSizes[size]} text-slate-800 tracking-tight`}>
              Auth<span className="text-blue-600">System</span>
            </span>
            <p className="text-xs text-slate-400 font-medium -mt-0.5">Enterprise Security</p>
          </div>
        )}
      </div>
    );
  };

  // ─── InputField ───────────────────────────────────────────────────────────────
  export const InputField = ({
    label, name, type = 'text', placeholder, value, onChange, onBlur,
    error, icon: Icon, rightElement, hint, autoComplete, required = false,
  }) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={name} className="
  block
  text-sm
  font-bold

  text-blue-900
  dark:text-white 
">
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600">
              <Icon size={16} />
            </div>
          )}
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            className={`auth-input ${Icon ? 'pl-10' : ''} ${rightElement ? 'pr-12' : ''} ${error ? 'error' : ''}`}
          />
          {rightElement && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      </div>
    );
  };

  // ─── PasswordField ────────────────────────────────────────────────────────────
  export const PasswordField = ({ label = 'Password', name = 'password', placeholder = 'Enter your password', value, onChange, onBlur, error, autoComplete }) => {
    const [show, setShow] = useState(false);

    return (
      <div className="space-y-1.5">
        {label && (
         <label htmlFor={name} className="
  block
  text-sm
  font-semibold

  text-blue-900
  dark:text-blue-900
">
            {label} <span className="text-red-400">*</span>
          </label>
        )}
        <div className="relative">
          
          <input
            id={name}
            name={name}
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            className={`auth-input pl-10 pr-12 ${error ? 'error' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  };

  // ─── PasswordStrengthBar ──────────────────────────────────────────────────────
  export const PasswordStrengthBar = ({ password }) => {
    if (!password) return null;

    const checks = [
      { label: 'Min. 8 characters', test: (p) => p.length >= 8 },
      { label: 'Uppercase', test: (p) => /[A-Z]/.test(p) },
      { label: 'Lowercase', test: (p) => /[a-z]/.test(p) },
      { label: 'Number', test: (p) => /[0-9]/.test(p) },
      { label: 'Special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
    ];

    const passed = checks.filter(c => c.test(password)).length;
    const pct = (passed / checks.length) * 100;
    const color = passed <= 1 ? '#ef4444' : passed <= 2 ? '#f97316' : passed <= 3 ? '#eab308' : passed === 4 ? '#22c55e' : '#16a34a';
    const label = passed <= 1 ? 'Weak' : passed <= 2 ? 'Fair' : passed <= 3 ? 'Good' : 'Strong';

    return (
      <div className="space-y-2 mt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Password strength</span>
          <span className="text-xs font-semibold" style={{ color }}>{label}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <div className="grid grid-cols-2 gap-1">
          {checks.map((c, i) => {
            const ok = c.test(password);
            return (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${ok ? 'bg-green-100' : 'bg-slate-100'}`}>
                  <svg className={`w-2 h-2 transition-colors duration-300 ${ok ? 'text-green-600' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={`text-xs transition-colors duration-300 ${ok ? 'text-green-700' : 'text-slate-400'}`}>{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Spinner ──────────────────────────────────────────────────────────────────
  export const Spinner = ({ size = 'sm', color = 'white' }) => {
    const sizes = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
    return (
      <svg className={`${sizes[size]} animate-spin`} fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    );
  };

  // ─── ProtectedRoute ───────────────────────────────────────────────────────────
  export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen auth-bg flex items-center justify-center">
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-[#061B4E] flex items-center justify-center">
              <Spinner size="md" />
            </div>
            <p className="text-slate-500 text-sm font-medium">Loading your account…</p>
          </div>
        </div>
      );
    }

    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  // ─── AuthLayout ───────────────────────────────────────────────────────────────
 import { motion } from "framer-motion";

export const AuthLayout = ({ children, title, subtitle }) => (
  <div className="relative h-screen w-screen overflow-hidden">

    {/* Background Image */}
    <img
      src="/office-bg.jpg.jpeg"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />

    {/* Main Content */}
    <div className="relative z-10 h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Animated Login Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
  bg-white/95
  dark:bg-slate-950/95

  backdrop-blur-xl
 rounded-xl
  border
  border-slate-200
  dark:border-slate-700

  p-8

  shadow-2xl

  transition-all
  duration-500
"
        >

          {/* Logo */}
          <div className="text-center mb-8">

            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-900 text-white text-2xl font-bold mb-4">
              <img
  src="/TecTha Logo.jpeg"
  alt="Tec Tha Logo"
  className="w-16 h-16 object-contain"
/>
       
            </div>

            <h1
  className="
  text-3xl
  font-bold

  text-blue-900
  dark:text-white

  mb-2
"
>
  {title}
</h1>

           <p
  className="
    text-slate-500
    dark:text-slate-400

    mt-2
  "
>
              {subtitle}
            </p>

          </div>

          {children}

        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-white/80 mt-6">
          © {new Date().getFullYear()} Tec Tha.
          All rights reserved.
        </p>

      </div>

    </div>

  </div>
);


  // ─── Divider ──────────────────────────────────────────────────────────────────
  export const Divider = ({ text = 'or' }) => (
    <div className="relative flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <span
  className="
    text-xs
    text-slate-700
    dark:text-slate-300

    font-medium
    px-1
  "
>{text}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );

  // ─── GoogleButton ─────────────────────────────────────────────────────────────
 export const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="btn-secondary"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      Continue with Google
    </button>
  );
};