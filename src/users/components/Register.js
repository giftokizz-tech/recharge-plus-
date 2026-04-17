import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_URL } from 'constants';
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      try {
        await setDoc(doc(db, 'profiles', user.uid), {
          role: 'user',
          fullname: formData.fullname,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          createdAt: new Date().toISOString()
        });
        navigate('/dashboard'); // Redirect to dashboard after successful registration
      } catch (writeError) {
        console.error('Profile creation failed:', writeError);
        await deleteUser(user).catch((deleteError) => {
          console.error('Failed to delete orphaned auth user:', deleteError);
        });
        throw writeError;
      }
    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
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
                <Link className="nav-link text-muted" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Register Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                  <h2 className="text-center mb-4">Create Your Account</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="fullname" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </button>
                      </div>
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">I agree to the <a href="#">Terms of Service</a></label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? 'Registering...' : 'Register'}
                    </button>
                  </form>
                  <div className="text-center mt-3">
                    <Link to="/login">Already have an account? Login here</Link>
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
                <li className="mb-2"><a href="privacy-policy.html" className="text-decoration-none">Privacy Policy</a></li>
                <li className="mb-2"><a href="terms-of-service.html" className="text-decoration-none">Terms of Service</a></li>
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

export default Register;