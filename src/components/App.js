import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Signin from './auth/signin/SignIn';
import Setpassword from './auth/setpassword/Setpasssword';
import SuperAdminDashboard from './superAdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

import PageNotFound from './common/PageNotFound';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Signin} />
          <Route exact path='/auth/setpassword/:token' component={Setpassword} />

          {/* employee routes */}
          <Route exact path='/employee/:component' component={EmployeeDashboard} />
          <Route exact path='/employee/update/:component' component={EmployeeDashboard} />
          <Route exact path='/employee/applyforleave/:component' component={EmployeeDashboard} />
          {/* super admin routes */}
          <Route exact path='/super-admin/:component' component={SuperAdminDashboard} />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}
