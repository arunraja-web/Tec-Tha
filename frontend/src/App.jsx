import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import UserDashboard from "./pages/UserDashboard";
import InternshipApply from "./pages/InternshipApply";
import AdminDashboard from "./pages/AdminDashboard";
import CareersPage from "./pages/CareersPage";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              fontSize: '14px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              padding: '12px 16px',
              maxWidth: '360px',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#fff' },
              style: { borderLeft: '4px solid #22c55e' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
              style: { borderLeft: '4px solid #ef4444' },
            },
          }}
        />
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} /> 
         <Route
  path="/dashboard"
  element={<UserDashboard />}
/>

<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>
          <Route
  path="/internship-apply"
  element={<InternshipApply />}
/>
          <Route path="/admin" element={<AdminDashboard />} />
        
         <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
