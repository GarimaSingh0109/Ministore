import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer id="footer" className="overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="footer-top-area">
              <div className="row d-flex flex-wrap justify-content-between">
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu">
                    <img src="/images/main-logo.png" alt="logo" />
                    <p className="text-dark">
                      Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit
                      hendrerit. Gravida massa volutpat aenean odio erat nullam
                      fringilla.
                    </p>
                    <div className="social-links">
                      <ul className="d-flex list-unstyled">
                        <li>
                          <Link to="#">
                            <i className="fa fa-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-linkedin"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-youtube"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 pb-3">
                  <div className="footer-menu text-uppercase">
                    <h5 className="widget-title pb-2">Quick Links</h5>
                    <ul className="menu-list list-unstyled text-uppercase">
                      <li className="menu-item pb-2">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link to="/shop">Shop</Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link to="/contact-us">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu text-uppercase">
                    <h5 className="widget-title pb-2">Policies</h5>
                    <ul className="menu-list list-unstyled">
                      <li className="menu-item pb-2">
                        <Link to="#">Privacy Policy</Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link to="#">Refund & Returns Policies</Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link to="#">Terms and Conditions</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu contact-item">
                    <h5 className="widget-title text-uppercase pb-2">
                      Contact Us
                    </h5>
                    <p className="text-dark">
                      Do you have any queries or suggestions?{" "}
                      <Link to="mailto:garimasingh@gmail.com">
                        garimasingh@gmail.com
                      </Link>
                    </p>
                    <p className="text-dark">
                      If you need support? Just give us a call.{" "}
                      <Link to="tel:9873848046">9873848046</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
