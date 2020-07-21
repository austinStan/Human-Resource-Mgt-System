import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';


export default class Setpassword extends React.Component {
  state={
    setValue: '',
    errorMessage: '',
    successMessage: '',
    spinner: false
  }

onChange =(e) => {
  e.preventDefault();
  this.setState({
    setValue: e.target.value,
    errorMessage: '',
    successMessage: ''
  });
}

// props.match.params.token;
onSetPassword = (event) => {
  const { setValue } = this.state;
  event.preventDefault();
  // Password Validation
  const re = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
  const isOk = re.test(setValue);

  if (!isOk) {
    return this.setState({
      errorMessage: 'Password must consist of 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'
    });
  }

  this.setState({
    spinner: true,
    successMessage: ''
  });

  // check if the input field has a value
  if (!this.state.setValue.trim()) {
    this.setState({
      errorMessage: 'Enter a password',
      spinner: false
    });
    return null;
  }

  if (!this.props.match.params.token.trim()) {
    this.setState({
      errorMessage: 'Click the link provided before filling in form',
      spinner: false
    });
    return null;
  }

  const data = new FormData();
  data.append('new_password', this.state.setValue);
  data.append('action', 'set_password');
  data.append('access_token', this.props.match.params.token);

  axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/user_password.php', data)
    .then((res) => {
      if (res.data.code === 1) {
        cookie.remove('user_token', { path: '/' });
        this.setState({
          spinner: false,
          successMessage: 'Password successfully set'
        },
        cookie.save('user_token', this.props.match.params.token, { path: '/' }));
      } else {
        this.setState({
          errorMessage: `${res.data.code} : ${res.data.message ? res.data.message : 'error'}`,
          spinner: false,
        });
      }
    })
    .catch((submitError) => {
      if (submitError && submitError.response && submitError.response.data
        && submitError.response.data.message) {
        const serverError = `${submitError.response.data.code}: ${submitError.response.data.message}`;
        this.setState({
          errorMessage: serverError,
          spinner: false
        });
      } else {
        this.setState({
          errorMessage: submitError,
          spinner: false
        });
      }
    });
  return null;
}

render() {
  const {
    setValue,
    errorMessage,
    successMessage,
    spinner
  } = this.state;

  if (successMessage) {
    return <Redirect to="/employee/EmployeeBiodata" />;
  }

  return (
    <>
      <div className="container setpassword">
        <div className='row'>
          <div className="card mx-auto setcard">
            <h5 className="card-header success-color-dark white-text text-center py-3">
              <strong>HRIM SET PASSWORD</strong>
            </h5>
            {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
            }
            <div className="card-body px-lg-4 pt-0">
              <form className="text-center" style={{ color: '#757575' }}>
                <div className="md-form">
                  <input type="password" onChange={this.onChange} value={setValue} name='password' className="form-control" placeholder="Password" required />
                </div>
                { spinner
                  ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Processing...</span>
                  </div>
                  : <button onClick={this.onSetPassword} className="btn btn-success my-4 btn-block" type="submit">Confirm</button>
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
