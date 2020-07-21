import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';


export default class SignIn extends React.Component {
  state={
    email: '',
    password: '',
    errorMessage: '',
    redirzect: false,
    spinner: false,
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: ''
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      spinner: true,
      errorMessage: ''
    });
    if (!this.state.email.trim()) {
      this.setState({
        errorMessage: 'Enter an email',
        spinner: false
      });
      return;
    }
    if (!this.state.password.trim()) {
      this.setState({
        errorMessage: 'Enter a password',
        spinner: false
      });
      return;
    }
    const data = new FormData();
    data.append('email_address', this.state.email);
    data.append('login_password', this.state.password);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/log_in.php?', data)
      .then((res) => {
        if (res.data.code === 1) {
          cookie.save('first-name', res.data.profile.first_name);
          cookie.save('last-name', res.data.profile.last_name);
          this.setState({
            redirect: true,
            spinner: false,
          }, cookie.save('user_token', res.data.login_token, { path: '/' }));
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
      email, password, errorMessage, redirect, spinner
    } = this.state;
    if (redirect) {
      return <Redirect to="/employee/EmployeeBiodata" />;
    }
    return (
      <>
        <div className="container signin ">
          <div className='row'>
            <div className="card mx-auto setLogin">
              <h5 className="card-header success-color-dark white-text text-center py-3">
                <strong>HRIM LOGIN</strong>
              </h5>
              {errorMessage
              && <div className="alert alert-danger" role="alert">{errorMessage}</div>
              }
              <div className="card-body px-lg-5 pt-0">
                <form className="text-center" style={{ color: '#757575' }}>
                  <div className="md-form">
                    <input type="text" onChange={this.handleChange} value={email} name='email' className="form-control" placeholder="Email" required autoFocus /><br/>
                    <input type="password" onChange={this.handleChange} value={password} name='password' className="form-control" placeholder="Password" required />
                  </div>
                  { spinner
                    ? <div className="spinner-border text-success" role="status">
                      <span className="sr-only">Processing...</span>
                    </div>
                    : <button onClick={this.handleClick} className="btn btn-success my-3 btn-block" type="submit">Log In</button>
                  }
                </form>

              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}
