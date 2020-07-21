import React, { Component } from 'react';


import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Footer from '../common/footer/Footer';

import ChangePassword from './changePassword/ChangePassword';
import EmployeeBiodata from './employeeBiodata/EmployeeBiodata';
import ComponentNotFound from './ComponentNotFound';
import EmployeeBiodataUpdate from './employeeBiodataUpdate/EmployeeBiodata';
import LeaveManagement from './LeaveManagement/LeaveManagement';


class EmployeeDashboard extends Component {
  constructor(props) {
    super(props);

    this.allComponents = {
      ChangePassword,
      EmployeeBiodata,
      ComponentNotFound,
      EmployeeBiodataUpdate,
      LeaveManagement
    };


    this.component2Render = props.match.params.component;
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.component2Render = props.match.params.component;
  }

  render() {
    let Tagname = this.allComponents[this.component2Render];
    if (!Tagname) {
      Tagname = this.allComponents.ComponentNotFound;
    }
    return (
      <>
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-md-10 mt-5 mb-2">
            <div className="card">
              <h5 className="card-header h5 bg-success text-white">{this.component2Render}</h5>
              <div className="card-body">
                <Tagname/>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default EmployeeDashboard;
