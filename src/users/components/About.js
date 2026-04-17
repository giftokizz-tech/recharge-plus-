import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from 'constants';

const About = () => {
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

      {/* About Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="mb-4">About Recharge Plus</h1>
              <p className="lead mb-4">Your trusted partner for all virtual top-up services in Nigeria.</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6">
              <h2>Our Mission</h2>
              <p>To provide fast, secure, and reliable recharge services that make life easier for our customers. We strive to offer competitive rates and exceptional customer support.</p>
            </div>
            <div className="col-lg-6">
              <h2>Our Vision</h2>
              <p>To be the leading VTU platform in Nigeria, empowering users with seamless access to essential services through innovative technology.</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <h2>Our Services</h2>
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="text-center">
                    <i className="fas fa-phone-volume fa-2x text-primary mb-2"></i>
                    <h6>Airtime Recharge</h6>
                    <p className="small">Instant airtime top-up for all networks</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <i className="fas fa-wifi fa-2x text-primary mb-2"></i>
                    <h6>Data Bundles</h6>
                    <p className="small">Flexible data plans for your needs</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <i className="fas fa-tv fa-2x text-primary mb-2"></i>
                    <h6>TV Subscriptions</h6>
                    <p className="small">Subscribe to your favorite channels</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <i className="fas fa-exchange-alt fa-2x text-primary mb-2"></i>
                    <h6>Airtime to Cash</h6>
                    <p className="small">Convert airtime to instant cash</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6">
              <h2>Why Choose Us?</h2>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Secure transactions</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Instant delivery</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>24/7 customer support</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Competitive pricing</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>User-friendly interface</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <h2>Contact Us</h2>
              <p>Get in touch with our support team for any questions or assistance.</p>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fas fa-phone me-2"></i>+2347043084431</li>
                <li className="mb-2"><i className="fas fa-envelope me-2"></i>support@rechargeplus.com</li>
                <li className="mb-2"><i className="fas fa-map-marker-alt me-2"></i>Umusoya, Oyigbo, Rivers State</li>
              </ul>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col text-center">
              <h2>Follow Us</h2>
              <div className="social-icons d-flex justify-content-center gap-3 mt-3">
                <a href="#" className="text-primary"><i className="fab fa-facebook-f fa-2x"></i></a>
                <a href="#" className="text-primary"><i className="fab fa-tiktok fa-2x"></i></a>
                <a href="#" className="text-primary"><i className="fab fa-instagram fa-2x"></i></a>
                <a href="https://wa.me/message/KNZ6CB54OLZ2D1" className="text-primary"><i className="fab fa-whatsapp fa-2x"></i></a>
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <Link to="/" className="btn btn-primary">Back to Home</Link>
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

export default About;