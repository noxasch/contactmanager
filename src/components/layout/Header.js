import React from 'react';
// to check props type
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// active link will add "active" attributes to the className
// when it is no the page

const Header = (props) => {
  // destructuring the property
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">{branding}</a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {/* <a href="/" className="nav-link">Home</a> */}
              <NavLink exact to="/" className="nav-link">
                <i className="fas fa-home"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact/add" className="nav-link">
              <i className="fas fa-plus"></i>Add
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
              <i className="fas fa-question"></i>About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// default props
// default property if no value are passed in
Header.defaultProps = {
  branding: 'My App'
}

// validate props data type
Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;