import { useState, useCallback } from 'react';

// ─── useForm ──────────────────────────────────────────────────────────────────
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const setFieldError = useCallback((field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const setFieldErrors = useCallback((errs) => {
    const mapped = {};
    errs.forEach(e => { mapped[e.field] = e.message; });
    setErrors(mapped);
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const showError = (name) => touched[name] && errors[name];

  return { values, errors, touched, handleChange, handleBlur, setFieldError, setFieldErrors, reset, showError, setValues };
};

// ─── usePasswordStrength ──────────────────────────────────────────────────────
export const usePasswordStrength = (password) => {
  const checks = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'Uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'Lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: 'Number', test: (p) => /[0-9]/.test(p) },
    { label: 'Special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
  ];

  const passed = checks.filter(c => c.test(password)).length;

  const strength = passed <= 1 ? 'weak' : passed <= 3 ? 'fair' : passed === 4 ? 'good' : 'strong';
  const colors = { weak: '#ef4444', fair: '#f97316', good: '#eab308', strong: '#22c55e' };
  const labels = { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong' };

  return { strength, color: colors[strength], label: labels[strength], score: passed, checks, total: checks.length };
};

// ─── useCountdown ─────────────────────────────────────────────────────────────
import { useState as useS, useEffect as useE } from 'react';

export const useCountdown = (seconds) => {
  const [count, setCount] = useS(0);

  const start = useCallback(() => setCount(seconds), [seconds]);

  useE(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return { count, start, isActive: count > 0 };
};
