import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_URL } from 'constants';
import { auth, db } from 'utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const profileSnap = await getDoc(doc(db, 'profiles', user.uid));
      if (!profileSnap.exists() || profileSnap.data().role !== 'user') {
        setError('This account is not registered as a user. Please use the admin login if appropriate.');
        return;
      }
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={LOGO_URL} alt="Recharge Plus Logo" className="navbar-logo" />
            <strong className="text-muted">Recharge Plus</strong>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-muted" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-muted" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                  <h2 className="text-center mb-4">Login to Your Account</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                        >
                          <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </button>
                      </div>
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="remember" />
                      <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>
                    <div className="mb-3 text-end">
                      <Link to="/forgot-password">Forgot your password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>
                  <div className="text-center mt-3">
                    <Link to="/register">Don't have an account? Register here</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - same as landing page */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="fw-bold mb-3">Recharge Plus</h5>
              <p className="mb-3">Your trusted partner for all recharge services. Fast, secure, and reliable.</p>
              <h6>Follow Us</h6>
              <div className="social-icons d-flex gap-3">
                <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white"><i className="fab fa-tiktok"></i></a>
                <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                <a href="https://wa.me/message/KNZ6CB54OLZ2D1" className="text-white"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <h6 className="fw-bold mb-3">Contact Us</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-phone-alt me-2"></i>
                  <span>+2347043084431</span>
                </li>
                <li className="mb-2">
                  <i className="fas fa-envelope me-2"></i>
                  <span>support@rechargeplus.com</span>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt me-2"></i>
                  <span>Umusoya, Oyigbo, Rivers State</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/privacy-policy" className="text-decoration-none">Privacy Policy</Link></li>
                <li className="mb-2"><Link to="/terms-of-service" className="text-decoration-none">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <hr className="border-secondary" />
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0" style={{color: 'white'}}>&copy; 2024 Recharge Plus. All rights reserved.</p>
            </div>
            <br />
            <br />
            <div>
              <p className="mb-0" style={{fontSize: 'small', textAlign: 'center'}}>
                Developed by: <a href="https://wa.me/message/KNZ6CB54OLZ2D1" className="text-decoration-none">GKtech💻</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;