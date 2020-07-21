import React from 'react';
import { Link } from 'react-router-dom';

const EmployeesNav = () => (
  <li> <a href="#" data-toggle="collapse" data-target="#dashboard" className="collapsed active" > <i className="fa fa-users"></i> <span className="nav-label"> Employees</span> <span className="fa fa-chevron-left pull-right"></span> </a>
    <ul className="sub-menu collapse" id="dashboard">
      <li className="active">  <Link to="/super-admin/AddEmployee">Add Employee</Link> </li>
      <li><Link to="/super-admin/ManageEmployees">Manage Employees</Link></li>
    </ul>
  </li>
);

export default EmployeesNav;
