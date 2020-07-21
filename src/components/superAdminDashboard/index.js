import React, { Component } from 'react';

import Header from '../common/header/Header';
import Sidebar from '../common/sidebar/Sidebar';
import Footer from '../common/footer/Footer';

import AddEmployee from './addEmployees/AddEmployee';
import ManageEmployees from './manageEmployees/ManageEmployees';

export default class SuperAdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.allComponents = {
      AddEmployee,
      ManageEmployees
    };


    this.component2Render = props.match.params.component;
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.component2Render = props.match.params.component;
  }

  render() {
    const Tagname = this.allComponents[this.component2Render];

    return (
      <>
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-md-10  mt-5 mb-2">
            <div className="card">
              <h5 className="card-header h5 bg-success text-white">{this.component2Render}</h5>
              <div className="card-body">
                <Tagname/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}
