import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';

import {
  AuthLayout,
  InputField,
  PasswordField,
  PasswordStrengthBar,
  Spinner,
  Divider,
  GoogleButton
} from '../components';

export default function Signup() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    userType: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

  const { name, value } = e.target;

  setForm((p) => ({
    ...p,
    [name]: value
  }));

};

  const validate = () => {

    const errs = {};

    if (!form.fullName.trim())
      errs.fullName = 'Full name is required';

    else if (form.fullName.trim().length < 2)
      errs.fullName =
        'Full name must be at least 2 characters';

    if (!form.username.trim())
      errs.username = 'Username is required';

    else if (form.username.length < 3)
      errs.username =
        'Username must be at least 3 characters';

    else if (
      !/^[a-zA-Z0-9_]+$/.test(form.username)
    )
      errs.username =
        'Only letters, numbers, and underscores allowed';

    if (!form.email)
      errs.email = 'Email is required';

    else if (
      !/\S+@\S+\.\S+/.test(form.email)
    )
      errs.email = 'Enter a valid email';

    if (!form.password)
      errs.password = 'Password is required';

    else if (form.password.length < 8)
      errs.password =
        'Password must be at least 8 characters';

    if (!form.userType)
      errs.userType =
        'Please select your purpose';

    return errs;
  };

  const handleSubmit = async (e) => {
    console.log(form);

    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {

      await authAPI.signup(form);

      toast.success(
        'Account created! Check your email for OTP.'
      );

      navigate('/verify-otp', {
        state: {
          email: form.email,
          type: 'verify'
        }
      });

    } catch (err) {

      const res = err.response?.data;

      if (res?.errors?.length) {

        const mapped = {};

        res.errors.forEach((e) => {
          mapped[e.field] = e.message;
        });

        setErrors(mapped);

      } else {

        toast.error(
          res?.message ||
          'Signup failed. Please try again.'
        );
      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of teams using AuthSystem"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate
      >

        <GoogleButton />
        <Divider />

        <div className="grid grid-cols-2 gap-4">

          <InputField
            label="Full Name"
            name="fullName"
            placeholder="John Smith"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            autoComplete="name"
            required
          />

          <InputField
            label="Username"
            name="username"
            placeholder="johnsmith"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
            autoComplete="username"
            required
          />

        </div>

        <InputField
          label="Email address"
          name="email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
        />

        {/* Purpose Dropdown */}

      <div>

  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
    Purpose of Visit
  </label>

  <select
    name="userType"
    value={form.userType}
    onChange={handleChange}
    required
    className="
      w-full
      border
      border-slate-300
      rounded-xl
      px-4
      py-3
    "
  >

    <option value="">
      Select Purpose
    </option>

    <option value="STUDENT">
      Student
    </option>

    <option value="JOB_SEEKER">
      Job Seeker
    </option>

    <option value="CLIENT">
      Client
    </option>

    <option value="BUSINESS_OWNER">
      Business Owner
    </option>

    <option value="OTHER">
      Other
    </option>

  </select>

</div>
 
        <div>

          <PasswordField
            label="Password"
            name="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />

          {form.password && (
            <PasswordStrengthBar
              password={form.password}
            />
          )}

        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-1"
        >

          {loading ? (
            <>
              <Spinner />
              <span>
                Creating account…
              </span>
            </>
          ) : (
            'Create Account'
          )}

        </button>

        <p className="text-center text-sm text-slate-500">

          Already have an account?{' '}

          <Link
            to="/login"
            className="
              text-blue-600
              hover:text-blue-700
              font-semibold
            "
          >
            Sign in
          </Link>

        </p>

      </form>

    </AuthLayout>
  );
}