import React, { Component } from 'react';

import DashboardNav from './DashboardNav';
import EmployeesNav from './EmployeesNav';
import SettingsNav from './SettingsNav';

export default class SideBar extends Component {
  render() {
    return (
      <>

        <div className="sidebar left ml-2">
          <ul className="list-sidebar bg-dark">
            <DashboardNav/>
            <EmployeesNav/>
            <SettingsNav/>
          </ul>
        </div>
      </>
    );
  }
}
