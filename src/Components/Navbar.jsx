import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <header
        id="header"
        className="site-header header-scrolled sticky-top text-black bg-light"
      >
        <nav id="header-nav" className="navbar navbar-expand-lg px-3 mb-3">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/images/main-logo.png" className="logo" />
            </Link>
            <button
              className="navbar-toggler d-flex d-lg-none order-3 p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdNavbar"
              aria-controls="bdNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa fa-bars text-dark fs-1"></i>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="bdNavbar"
              aria-labelledby="bdNavbarOffcanvasLabel"
            >
              <div className="offcanvas-header px-4 pb-0">
                <Link className="navbar-brand" to="/">
                  <img src="/images/main-logo.png" className="logo" />
                </Link>
                <button
                  type="button"
                  className="btn-close btn-close-black"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  data-bs-target="#bdNavbar"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul
                  id="navbar"
                  className="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3"
                >
                  <li className="nav-item">
                    <Link className="nav-link me-4 active" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link me-4" to="/shop?mc=Clothing">
                      Clothing
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link me-4" to="/shop?mc=Shoes">
                      Shoes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link me-4" to="/shop?mc=Accessories">
                      Accessories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link me-4" to="/shop?mc=Beauty">
                      Beauty
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link me-4" to="/contact-us">
                      ContactUs
                    </Link>
                  </li>
                  {localStorage.getItem("login") ? (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link me-4 dropdown-toggle link-dark"
                        data-bs-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-expanded="false"
                      >
                        {localStorage.getItem("name")}
                      </a>
                      <ul className="dropdown-menu">
                        {localStorage.getItem("role") === "Buyer" ? (
                          <>
                            <li>
                              <Link to="/profile" className="dropdown-item">
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link to="/cart" className="dropdown-item">
                                Cart
                              </Link>
                            </li>
                            <li>
                              <Link to="/checkout" className="dropdown-item">
                                Checkout
                              </Link>
                            </li>
                          </>
                        ) : (
                          <li>
                            <Link to="/admin" className="dropdown-item">
                              Profile
                            </Link>
                          </li>
                        )}
                        <li>
                          <button className="dropdown-item" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link me-4" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
