import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import LandingPage from './users/components/LandingPage';
import Login from './users/components/Login';
import Register from './users/components/Register';
import Dashboard from './users/components/Dashboard';
import ForgotPassword from './users/components/ForgotPassword';
import TermsOfService from './users/components/TermsOfService';
import PrivacyPolicy from './users/components/PrivacyPolicy';
import About from './users/components/About';
import AdminLogin from './admin/AdminLogin';
import AdminRegister from './admin/AdminRegister';
import AdminDashboard from './admin/AdminDashboard';
import AdminHome from './admin/AdminHome';
import AddService from './admin/AddService';
import AddPlan from './admin/AddPlan';
import ManagePricing from './admin/ManagePricing';
import FundDebitUsers from './admin/FundDebitUsers';
import ViewUsers from './admin/ViewUsers';
import ViewTransactions from './admin/ViewTransactions';
import { auth, db } from './utils/firebase';
import './App.css';

const useAuthProfile = () => {
  const [state, setState] = React.useState({
    loading: true,
    user: null,
    role: null
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setState({ loading: false, user: null, role: null });
        return;
      }

      try {
        const profileSnap = await getDoc(doc(db, 'profiles', firebaseUser.uid));
        const role = profileSnap.exists() ? profileSnap.data().role : null;
        setState({ loading: false, user: firebaseUser, role });
      } catch (error) {
        console.error('Failed to read user profile:', error);
        setState({ loading: false, user: firebaseUser, role: null });
      }
    });

    return () => unsubscribe();
  }, []);

  return state;
};

const ProtectedRoute = ({ allowedRole, children, fallbackPath }) => {
  const { loading, user, role } = useAuthProfile();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

const PublicAuthRoute = ({ children }) => {
  const { loading, user, role } = useAuthProfile();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return children;
  }

  if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  if (role === 'user') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={(
            <PublicAuthRoute>
              <Login />
            </PublicAuthRoute>
          )}
        />
        <Route
          path="/register"
          element={(
            <PublicAuthRoute>
              <Register />
            </PublicAuthRoute>
          )}
        />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute allowedRole="user" fallbackPath="/login">
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/admin/login"
          element={(
            <PublicAuthRoute>
              <AdminLogin />
            </PublicAuthRoute>
          )}
        />
        <Route
          path="/admin/register"
          element={(
            <PublicAuthRoute>
              <AdminRegister />
            </PublicAuthRoute>
          )}
        />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute allowedRole="admin" fallbackPath="/admin/login">
              <AdminDashboard />
            </ProtectedRoute>
          )}
        >
          <Route index element={<AdminHome />} />
          <Route path="services" element={<AddService />} />
          <Route path="plans" element={<AddPlan />} />
          <Route path="pricing" element={<ManagePricing />} />
          <Route path="fund-debit" element={<FundDebitUsers />} />
          <Route path="users" element={<ViewUsers />} />
          <Route path="transactions" element={<ViewTransactions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
