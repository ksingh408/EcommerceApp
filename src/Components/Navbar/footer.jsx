import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We provide the best fashion products at affordable prices.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li><a href="/faq" className="text-light">FAQ</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <a href="#" className="text-light me-3"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-light me-3"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-light"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <hr className="my-3 border-light" />
        <p className="mb-0">&copy; {new Date().getFullYear()} YourStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
