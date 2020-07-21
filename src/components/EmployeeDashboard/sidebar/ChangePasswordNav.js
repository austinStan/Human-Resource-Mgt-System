import React from 'react';
import { Link } from 'react-router-dom';

const ChangePasswordNav = () => (
  <li>
    <Link to="/employee/ChangePassword">
      <i className="fa fa-asterisk"></i><span className="nav-label">Change Password</span>
    </Link>
  </li>
);

export default ChangePasswordNav;
