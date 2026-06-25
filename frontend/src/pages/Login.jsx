import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AuthLayout, InputField, PasswordField, Spinner, Divider, GoogleButton } from '../components';
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
     const { data } = await authAPI.login(form);

login(data.data.user);

toast.success(
  `Welcome back, ${data.data.user.fullName.split(' ')[0]}!`
);

if (data.data.user.role === "ADMIN") {
  navigate("/admin");
} else {
  navigate("/");
}
    } catch (err) {
      const res = err.response?.data;
      if (res?.code === 'EMAIL_NOT_VERIFIED') {
        toast.error('Please verify your email first.');
        navigate('/verify-otp', { state: { email: form.email, type: 'verify' } });
        return;
      }
      toast.error(res?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  return (
  <AuthLayout
    title="Welcome to Tec Tha"
    subtitle="Access your TEC workspace"
  >
    

    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter Email Address"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
        required
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="
block
text-sm
font-semibold

text-blue-900
dark:text-white
"
          >
            Password <span className="text-red-400">*</span>
          </label>

          <Link
            to="/forgot-password"
           className="
text-xs
font-semibold

text-slate-700
dark:text-slate-300

hover:text-blue-900
dark:hover:text-blue-400
"
          >
            Forgot password?
          </Link>
        </div>

        <PasswordField
          label=""
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          name="rememberMe"
          checked={form.rememberMe}
          onChange={handleChange}
        />
<span
  className="
    text-sm

    text-slate-700
    dark:text-slate-300
  "
>
          Keep me signed in
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
       className="
btn-primary
mt-2

bg-blue-900
hover:bg-blue-800

dark:bg-blue-900
dark:hover:bg-blue-400
dark:text-white

w-full

flex
items-center
justify-center
gap-2
"
      >
        {loading ? (
          <>
            <Spinner />
            <span>Authenticating...</span>
          </>
        ) : (
          "SIGN   IN"
        )}
      </button>

      <Divider text="OR CONTINUE WITH" />

      <GoogleButton />

      <p
  className="
    text-center
    text-sm

    text-slate-500
    dark:text-slate-400
  "
>
        New to TEC?{" "}
        <Link
          to="/signup"
          className="
text-blue-800
dark:text-blue-500

hover:text-blue-700
dark:hover:text-blue-300

font-bold
"
        >
          Create Account
        </Link>
      </p>

    </form>

    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
      TEC • Web Development • Mobile Apps • Client Solutions
    </div>
  </AuthLayout>
);
}
