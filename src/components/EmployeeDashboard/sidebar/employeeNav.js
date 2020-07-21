import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeNav = () => (

  <li> <a href="#" data-toggle="collapse" data-target="#dashboard" className="collapsed active" > <i className="fa fa-users"></i> <span className="nav-label"> Employees</span> <span className="fa fa-chevron-left pull-right"></span> </a>
    <ul className="sub-menu collapse" id="dashboard">
      <li className="active"><Link to="/employee/EmployeeBiodata">Add Information</Link> </li>
      <li><Link to="/employee/update/EmployeeBiodataUpdate">Edit Information</Link></li>
    </ul>
  </li>
);

export default EmployeeNav;
