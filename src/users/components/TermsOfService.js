import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from 'constants';

const TermsOfService = () => {
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
                <a className="nav-link text-muted" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted" href="#about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Terms of Service Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="mb-4">Terms of Service</h1>
              <p className="text-muted mb-4">Last updated: April 4, 2026</p>

              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using Recharge Plus ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

              <h2>2. Use of Service</h2>
              <p>Recharge Plus provides virtual top-up services for airtime, data bundles, electricity, TV subscriptions, and airtime-to-cash conversions. You agree to use the service only for lawful purposes and in accordance with these terms.</p>

              <h2>3. User Responsibilities</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.</p>

              <h2>4. Prohibited Activities</h2>
              <p>You may not use the service for any illegal or unauthorized purpose. This includes, but is not limited to, fraud, money laundering, or any activity that violates applicable laws.</p>

              <h2>5. Service Availability</h2>
              <p>While we strive to provide continuous service, we do not guarantee that the service will be uninterrupted or error-free. We reserve the right to modify or discontinue the service at any time.</p>

              <h2>6. Payment and Refunds</h2>
              <p>All payments are processed securely. Refunds may be issued at our discretion in case of service failure. Please contact support for refund requests.</p>

              <h2>7. Limitation of Liability</h2>
              <p>Recharge Plus shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the service.</p>

              <h2>8. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of Nigeria.</p>

              <h2>9. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

              <h2>10. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at support@rechargeplus.com.</p>

              <div className="mt-4">
                <Link to="/" className="btn btn-primary">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default TermsOfService;