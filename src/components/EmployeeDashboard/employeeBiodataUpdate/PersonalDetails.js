import React, { Component } from 'react';
import cookie from 'react-cookies';
import DatePicker from 'react-date-picker';
import { Button } from 'semantic-ui-react';
import axios from 'axios';


export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      other_name: '',
      birth_date: '',
      birth_object_date: '',
      gender: '',
      id_no: '',
      issue_date: '',
      issue_object_date: '',
      nssf_no: '',
      account_no: '',
      spinner: false,
      successMessage: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug//api/william/employee/info/bio_data.php?action=get_bio_data&user_token=${cookie.load('user_token')}`)
      .then((res) => {
        const {
          first_name,
          last_name,
          other_name,
          birth_date,
          gender,
          id_no,
          issue_date,
          nssf_no,
          account_no
        } = res.data;
        if (res.data.code === 1) {
          this.setState({
            first_name,
            last_name,
            other_name,
            birth_object_date: new Date(birth_date),
            issue_object_date: new Date(issue_date),
            birth_date,
            gender,
            id_no,
            issue_date,
            nssf_no,
            account_no
          });
        } else {
          this.setState({
            errorMessage: `${res.data.code} : ${res.data.message ? res.data.message : 'error'}`,
          });
        }
      }).catch((submitError) => {
        if (submitError && submitError.response && submitError.response.data
           && submitError.response.data.message) {
          const serverError = `${submitError.response.data.code}: ${submitError.response.data.message}`;
          this.setState({
            errorMessage: serverError,
          });
        } else if (submitError && submitError.response && submitError.response.data) {
          this.setState({
            errorMessage: submitError.response.data,
          });
        } else {
          this.setState({
            errorMessage: submitError,
          });
        }
      });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

   birthDateChange = (date) => {
     this.setState({
       birth_object_date: date
     });
   }

  issueDateChange = (date) => {
    this.setState({
      issue_object_date: date
    });
  }

  handleSubmit = (e) => {
    const {
      first_name, last_name, other_name, birth_date, gender, id_no, issue_date,
      birth_object_date, issue_object_date,
      account_no, nssf_no
    } = this.state;
    e.preventDefault();
    this.setState({
      spinner: true
    });
    const data = new FormData();
    data.append('action', 'bio_data');
    data.append('user_token', cookie.load('user_token'));
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('other_name', other_name);
    data.append('gender', gender);
    data.append('issue_date', issue_date);
    data.append('issue_date', `${issue_object_date.getFullYear()}-${issue_object_date.getMonth() + 1}-${issue_object_date.getDate()}`);
    data.append('birth_date', birth_date);
    data.append('birth_date', `${birth_object_date.getFullYear()}-${birth_object_date.getMonth() + 1}-${birth_object_date.getDate()}`);
    data.append('id_no', id_no);
    data.append('nssf_no', nssf_no);
    data.append('account_no', account_no);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/bio_data.php?', data)
      .then((res) => {
        if (res.data.code === 1) {
          this.setState({
            successMessage: 'Staff bio data saved successfully updated',
            spinner: false,
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
        } else if (submitError && submitError.response && submitError.response.data) {
          this.setState({
            spinner: false,
            errorMessage: submitError.response.data,
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
      gender, spinner, selectError, first_name,
      last_name,
      other_name,
      birth_date,
      birth_object_date,
      issue_object_date,
      id_no,
      issue_date,
      nssf_no,
      account_no,
      successMessage,
      errorMessage
    } = this.state;
    return (
      <>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="panel panel-success setup-content" id="step-1">
              {successMessage
            && <div className="alert alert-success" role="alert">{successMessage}</div>
              }
              {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
              }
              <div className="panel-heading">
                <h3 className="panel-title">Personal Information </h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label">First Name</label>
                      <input maxLength="100" type="text" required="required" value={first_name} name='first_name' onChange={this.handleChange} className="form-control" placeholder="Enter First Name" />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label">Last Name</label>
                      <input value={last_name} maxLength="100" type="text" required="required" name='last_name' onChange={this.handleChange}className="form-control" placeholder="Enter Last Name" />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label">Other Name</label>
                      <input value={other_name} maxLength="100" type="text" required="required" name='other_name' onChange={this.handleChange} className="form-control" placeholder="Enter Other Name" />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-group">
                      {selectError
            && <div className="alert alert-danger" role="alert">{selectError}</div>
                      }
                      <label>Gender</label>
                      <select className="form-control" name="gender" value={gender} onChange={this.handleChange} required="required">
                        <option value="">select gender</option>
                        <option value="male" >Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label>Birth Date:</label> <br/>
                      { (this.birthDateChange)
                      && <DatePicker
                        onChange={this.birthDateChange}
                        value={birth_object_date}
                      />
                      } { (!this.birthDateChange)
                        && <DatePicker
                          onChange={this.birthDateChange}
                          value={birth_date}
                        />
                      }
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label">ID Number</label>
                      <input value={id_no} maxLength="100" type="text" required="required" onChange={this.handleChange} name='id_no' className="form-control" placeholder="National ID /Passport No" />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label">NSSF Number</label>
                      <input value={nssf_no} maxLength="100" type="text" required="required" name='nssf_no' onChange={this.handleChange} className="form-control" placeholder="NSSF Number" />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label">Bank Account Number</label>
                      <input value={account_no} maxLength="100" type="text" required="required" name='account_no' onChange={this.handleChange} className="form-control" placeholder="bank account number" />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label">Issue Date</label><br/>
                      { (this.issueDateChange)
                      && <DatePicker
                        onChange={this.issueDateChange}
                        value={issue_object_date}
                      />
                      } { (!this.birthDateChange)
                        && <DatePicker
                          onChange={this.issueDateChange}
                          value={issue_date}
                        />
                      }
                    </div>
                  </div>
                </div>
                <button className="btn btn-elegant pull-right" onClick={this.props.nextStep} type="button">Next</button>
                { spinner
                  ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
                  : <button className="btn btn-success pull-right" onClick={this.handleSubmit} type="submit">Update</button>
                }
              </div>
            </div>
          </form>
          <Button onClick={this.props.prevStep}>Back</Button>
        </div>
      </>
    );
  }
}
