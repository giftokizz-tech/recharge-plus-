import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LOGO_URL } from '../constants';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3">
          <Link className="navbar-brand d-block mb-4" to="/">
            <img src={LOGO_URL} alt="Recharge Plus Logo" className="navbar-logo mb-2" />
            <strong>Admin Panel</strong>
          </Link>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin">
                <i className="fas fa-home me-2"></i>Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/services">
                <i className="fas fa-cogs me-2"></i>Services Management
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/plans">
                <i className="fas fa-list me-2"></i>Plans Management
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/pricing">
                <i className="fas fa-dollar-sign me-2"></i>Direct Pricing
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/users">
                <i className="fas fa-users me-2"></i>View Users
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/transactions">
                <i className="fas fa-exchange-alt me-2"></i>Transactions
              </Link>
            </li>
            <li className="nav-item mt-4">
              <button className="btn btn-outline-light w-100" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1">
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;