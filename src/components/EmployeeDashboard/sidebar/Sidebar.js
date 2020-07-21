import React, { Component } from 'react';


import DashboardNav from './DashboardNav';
import ChangePasswordNav from './ChangePasswordNav';
import EmployeeNav from './employeeNav';
import LeaveNav from './LeaveNav';

export default class SideBar extends Component {
  render() {
    return (
      <>
        <div className="sidebar left ml-2">
          <ul className="list-sidebar bg-dark">
            <DashboardNav/>
            <EmployeeNav/>
            <LeaveNav/>
            <ChangePasswordNav/>
          </ul>
        </div>
      </>
    );
  }
}
