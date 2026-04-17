import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'utils/firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Recharge Plus
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section id="dashboard" className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 text-muted">Welcome to Your Dashboard</h1>
              <p className="lead mb-4 text-muted">Manage your recharges, view transactions, and top up easily.</p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#services" className="btn btn-light btn-lg fw-bold text-muted">Top Up Now</a>
                <a href="#transactions" className="btn btn-light btn-lg fw-bold text-muted">View Transactions</a>
              </div>
            </div>
            {/* Balance Card */}
            <div className="col-lg-6 text-center">
              <div className="card bg-light text-dark p-4">
                <h5>Wallet Balance</h5>
                <h2 className="text-primary">₦0.00</h2>
                <p>Available funds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section id="services" className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">Quick Actions</h2>
              <p className="text-muted">Perform common tasks quickly</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-phone-volume fa-3x text-primary"></i>
                  </div>
                  <h5 className="card-title">Airtime Recharge</h5>
                  <p className="card-text">Buy airtime instantly</p>
                  <Link to="/airtime" className="btn btn-primary">Recharge</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-wifi fa-3x text-primary"></i>
                  </div>
                  <h5 className="card-title">Data Bundles</h5>
                  <p className="card-text">Purchase data bundles</p>
                  <Link to="/data" className="btn btn-primary">Buy Data</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-tv fa-3x text-primary"></i>
                  </div>
                  <h5 className="card-title">TV Subscriptions</h5>
                  <p className="card-text">Subscribe to TV services</p>
                  <Link to="/tv" className="btn btn-primary">Subscribe</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transactions Section */}
      <section id="transactions" className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">Recent Transactions</h2>
              <p className="text-muted">Your latest activities</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>No transactions yet</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;