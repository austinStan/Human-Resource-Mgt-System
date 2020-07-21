import React from 'react';
import { Link } from 'react-router-dom';

function LeaveNav() {
  return (
    <li> <a href="#" data-toggle="collapse" data-target="#LeaveNav" className="collapsed active" > <i className="fa fa-list"></i> <span className="nav-label">Leave Management</span> <span className="fa fa-chevron-left pull-right"></span> </a>
      <ul className="sub-menu collapse" id="LeaveNav">
        <li className="active"><Link to="/employee/planleave/LeaveManagement">Plan Leave</Link> </li>
        <li><Link to="/employee/applyforLeave/LeaveManagement">Apply For Leave</Link></li>
        <li><Link to="/employee/leavestatus/LeaveManagement">Leave Status</Link></li>
      </ul>
    </li>
  );
}

export default LeaveNav;
