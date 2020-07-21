import React, { Component } from 'react';
import axios from 'axios';

import Confirmation from './Confirmation';

export default class ChangePassword extends Component {
  state={
    email: '',
    old_password: '',
    new_password: '',
    errorMessage: '',
    successMessage: '',
    spinner: false
  }

  handleChange =(e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
      successMessage: ''
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: '',
      spinner: true,
      successMessage: ''
    });
    if (!this.state.email.trim()) {
      this.setState({
        errorMessage: 'Enter an email',
        spinner: false
      });
      return;
    }
    if (!this.state.old_password.trim()) {
      this.setState({
        errorMessage: 'Enter old password',
        spinner: false
      });
      return;
    }
    if (!this.state.new_password.trim()) {
      this.setState({
        errorMessage: 'Enter new password',
        spinner: false
      });
      return;
    }
    // Password Validation
    const { new_password } = this.state;
    const re = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
    const isOk = re.test(new_password);

    if (!isOk) {
      this.setState({
        errorMessage: 'Password must consist of 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter',
        spinner: false
      });
      return;
    }
    const data = new FormData();
    data.append('action', 'change_password');
    data.append('email_address', this.state.email);
    data.append('old_password', this.state.old_password);
    data.append('new_password', this.state.new_password);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/user_password.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          this.setState({
            successMessage: 'password change successful',
            spinner: false,
            email: '',
            old_password: '',
            new_password: '',
          });
        } else {
          this.setState({
            spinner: false,
            errorMessage: `${res.data.code} : ${res.data.message ? res.data.message : 'error'}`,
          });
        }
      })
      .catch((submitError) => {
        if (submitError && submitError.response && submitError.response.data
         && submitError.response.data.message) {
          const serverError = `${submitError.response.data.code}: ${submitError.response.data.message}`;
          this.setState({
            spinner: false,
            errorMessage: serverError,
          });
        } else {
          this.setState({
            spinner: false,
            errorMessage: submitError,
          });
        }
      });
  }

  render() {
    const {
      email,
      old_password,
      new_password,
      errorMessage,
      successMessage,
      spinner
    } = this.state;
    return (
      <div>
        <>
          <form className="form-horizontal">
            <div className="form-group">
              {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
              }
              {successMessage
            && <div className="alert alert-success" role="alert">{successMessage}</div>
              }

              <div className="col-sm-10 offset-sm-1">
                <label className="control-label">Email</label>
                <input type="email" className="form-control" id="inputEmail3" onChange={this.handleChange} value={email} name='email' placeholder="Email"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-10 offset-sm-1">
                <label className="control-label">Old Password</label>
                <input type="password" className="form-control" id="inputPassword3"onChange={this.handleChange} value={old_password} name='old_password' placeholder="old password" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-10 offset-sm-1">
                <label className="control-label">New Password</label>
                <input type="password" className="form-control" id="inputPassword2" placeholder="new password"onChange={this.handleChange} value={new_password} name='new_password'/>
              </div>
            </div>
            <div className="col-sm-6 offset-sm-1">
              { spinner
                ? <button type="submit" className="btn btn-success btn-lg btn-block"><i className='fa fa-refresh fa-spin'></i></button>
                : <button type="submit" onClick={this.handleClick} className="btn btn-success btn-lg btn-block">Confirm</button>
              }
            </div>
          </form>
          <Confirmation/>
        </>
      </div>
    );
  }
}
