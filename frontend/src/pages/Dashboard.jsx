import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Logo, Spinner } from '../components';

const StatCard = ({ icon, label, value, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-200',
    green: 'from-emerald-500 to-emerald-600 shadow-emerald-200',
    purple: 'from-violet-500 to-violet-600 shadow-violet-200',
    amber: 'from-amber-500 to-amber-600 shadow-amber-200',
  };
  return (
    <div className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-200">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-xl font-bold text-slate-800 font-display mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const Badge = ({ text, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}>
      {text}
    </span>
  );
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    userAPI.getDashboard()
      .then(({ data }) => setDashData(data.data))
      .catch(() => toast.error('Failed to load dashboard data.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast.success('You have been signed out.');
      navigate('/login');
    } catch {
      toast.error('Logout failed.');
    } finally {
      setLoggingOut(false);
    }
  };

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';

  return (
    <div className="min-h-screen auth-bg">
      {/* Decorative orbs */}
      <div className="orb w-96 h-96 bg-blue-300/20 -top-24 -right-24 fixed" />
      <div className="orb w-64 h-64 bg-indigo-300/15 bottom-0 left-0 fixed" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="sm" />

          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-200">
                {initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.fullName}</p>
                <p className="text-xs text-slate-400">@{user?.username}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
            >
              {loggingOut ? <Spinner color="red" /> : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              )}
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10 space-y-6 animate-slide-up">

        {/* Welcome banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-blue-600/90 to-blue-800/90 text-white relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">Welcome back 👋</p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold">{user?.fullName}</h1>
              <p className="text-blue-200 text-sm mt-1.5">
                <span className="bg-white/20 rounded-lg px-2 py-0.5 text-xs font-semibold mr-2">{user?.role}</span>
                {user?.email}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Badge text={user?.isVerified ? '✓ Verified' : '✗ Unverified'} color={user?.isVerified ? 'green' : 'amber'} />
            </div>
          </div>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 h-20 loading-shimmer" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
              label="Username"
              value={`@${user?.username}`}
              color="blue"
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
              label="Member Since"
              value={joinDate}
              color="purple"
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>}
              label="Account Status"
              value={user?.isVerified ? 'Verified' : 'Pending'}
              color="green"
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>}
              label="Account Age"
              value={`${dashData?.stats?.accountAge ?? 0} days`}
              color="amber"
            />
          </div>
        )}

        {/* Two column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Profile Information
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Full Name', value: user?.fullName },
                { label: 'Username', value: `@${user?.username}` },
                { label: 'Email Address', value: user?.email },
                { label: 'Account Role', value: user?.role },
                { label: 'Email Verified', value: user?.isVerified ? 'Yes ✓' : 'No ✗' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">{label}</span>
                  <span className="text-sm font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security panel */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Security
            </h2>

            <div className="space-y-3">
              {[
                { label: 'JWT Auth', status: 'Active', color: 'green' },
                { label: 'HTTP-only Cookies', status: 'Enabled', color: 'green' },
                { label: 'Bcrypt Hashing', status: 'Active', color: 'green' },
                { label: 'Rate Limiting', status: 'Active', color: 'green' },
                { label: 'CORS Protection', status: 'Active', color: 'green' },
                { label: 'Helmet Headers', status: 'Active', color: 'green' },
              ].map(({ label, status, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">{label}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={() => navigate('/forgot-password')}
                className="w-full py-2.5 px-4 text-sm font-semibold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-100 hover:border-blue-600 rounded-xl transition-all duration-200"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Tech stack banner */}
        <div className="glass-card rounded-2xl p-5">
          <p className="text-xs text-slate-400 text-center font-medium mb-3 uppercase tracking-wider">Powered by</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React + Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'JWT', 'Bcrypt', 'Nodemailer', 'Zod'].map(tech => (
              <span key={tech} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
