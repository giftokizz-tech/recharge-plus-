import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from 'constants';

const PrivacyPolicy = () => {
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

      {/* Privacy Policy Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="mb-4">Privacy Policy</h1>
              <p className="text-muted mb-4">Last updated: April 4, 2026</p>

              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and payment information.</p>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.</p>

              <h2>3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.</p>

              <h2>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

              <h2>5. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>

              <h2>6. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.</p>

              <h2>7. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

              <h2>8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at support@rechargeplus.com.</p>

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

export default PrivacyPolicy;