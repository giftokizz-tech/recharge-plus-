import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from 'constants';

const LandingPage = () => {
  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={LOGO_URL} alt="Recharge Plus Logo" className="navbar-logo" />
            <strong className="text-muted">Recharge Plus</strong>
          </a>
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
                <Link className="nav-link text-muted" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section style={{backgroundImage: `url(${process.env.PUBLIC_URL}/background.svg)`}} className="hero-section py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 text-muted">Fast & Secure VTU Services</h1>
              <p className="lead mb-4 text-muted">Top up airtime, buy data bundles, subscribe to TV services, and convert airtime to cash - all in one place!</p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/register" className="btn btn-light btn-lg fw-bold text-muted">Get Started</Link>
                <Link to="/login" className="btn btn-light btn-lg fw-bold text-muted">Login Now</Link>
              </div>
            </div>
            {/* Mobile device illustration */}
            <div className="col-lg-6 text-center">
              <div className="hero-visual position-relative">
                <img src="https://i.postimg.cc/Yqf1jHXz/8125eb7e57a417b13338c58d4f604978-(1).png" 
                     alt="image" 
                     className="img-fluid hero-device-image"
                     loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">Why Choose Recharge Plus?</h2>
              <p className="text-muted">Experience the best recharge services with our advanced platform</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-shield-alt fa-3x text-primary"></i>
                  </div>
                  <h5 className="card-title">Secure & Reliable</h5>
                  <p className="card-text">Your transactions are protected with advanced security measures and encryption.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-bolt fa-3x text-primary"></i>
                  </div>
                  <h5 className="card-title">Instant Delivery</h5>
                  <p className="card-text">Get your airtime, data, and TV subscriptions delivered instantly to your device.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-wallet fa-3x text-primary"></i>
                  </div>
                  <h5 className="card-title">Wallet System</h5>
                  <p className="card-text">Manage your funds with our integrated wallet system and track all transactions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">Our Services</h2>
              <p className="text-muted">Comprehensive recharge services for all your needs</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className="fas fa-phone-volume fa-2x text-primary"></i>
                  </div>
                  <h6 className="card-title fw-bold">Airtime Recharge</h6>
                  <p className="card-text text-muted small">Buy airtime for MTN, Airtel, Glo, and 9mobile at competitive rates.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className="fas fa-wifi fa-2x text-primary"></i>
                  </div>
                  <h6 className="card-title fw-bold">Data Bundles</h6>
                  <p className="card-text text-muted small">Purchase data bundles for all networks with flexible plans.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className="fas fa-tv fa-2x text-primary"></i>
                  </div>
                  <h6 className="card-title fw-bold">TV Subscriptions</h6>
                  <p className="card-text text-muted small">Subscribe to DSTV, GOTV, Startimes, and other TV services.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className="fas fa-exchange-alt fa-2x text-primary"></i>
                  </div>
                  <h6 className="card-title fw-bold">Airtime to Cash</h6>
                  <p className="card-text text-muted small">Convert your airtime to cash for MTN, Airtel, Glo, and 9mobile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Networks Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">Supported Networks</h2>
              <p className="text-muted">We support all major Nigerian networks</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4">
                <div className="network-logo mb-3">
                  <img style={{height: '30px', width: '40px'}} src="https://i.postimg.cc/44LP0CMP/IMG-20260313-WA0005.jpg" alt="MTN Logo" />
                  <strong><div className="network-name">MTN</div></strong>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4">
                <div className="network-logo mb-3">
                  <img style={{height: '30px', width: '40px'}} src="https://i.postimg.cc/263bbtwD/IMG-20260313-WA0007.jpg" alt="AIRTEL Logo" />
                  <strong><div className="network-name">Airtel</div></strong>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4">
                <div className="network-logo mb-3">
                  <img style={{height: '30px', width: '40px'}} src="https://i.postimg.cc/YCh9MPpq/images-(15).jpg" alt="GLO Logo" />
                  <strong><div className="network-name">Glo</div></strong>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4">
                <div className="network-logo mb-3">
                  <img style={{height: '30px', width: '40px'}} src="https://i.postimg.cc/C16rTdJx/images-(3).png" alt="9mobile Logo" />
                  <strong><div className="network-name">9mobile</div></strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-2">Ready to Get Started?</h3>
              <p className="mb-0">Join thousands of satisfied customers using Recharge Plus for their recharge needs.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <Link to="/register" className="btn btn-light btn-lg fw-bold me-3">Sign Up Free</Link>
              <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
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

export default LandingPage;