import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import PostContext from "../../context/post/postContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearPosts } = postContext;

  const onLogout = () => {
    logout();
    clearPosts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt">
            {" "}
            <span className="hide-sm">Logout</span>
          </i>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>{title}</h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Story Digital Blog",
};

export default Navbar;
