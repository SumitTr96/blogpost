import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-3">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              className="logo-navbar"
              alt="logo"
              style={{
                width: "3rem",
                height: "3rem",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {currentUser?.id && (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/profile:/id" className="nav-link">
                    {currentUser?.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="create" className="nav-link">
                    Create Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="authors" className="nav-link">
                    Authors
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="logout" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            )}

            {!currentUser?.id && (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/Authors" className="nav-link">
                    Authors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
