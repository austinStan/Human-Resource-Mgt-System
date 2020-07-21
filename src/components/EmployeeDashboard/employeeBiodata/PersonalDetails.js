import React from 'react';
import cookie from 'react-cookies';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import {
  Card, Container, Icon, Step
} from 'semantic-ui-react';


export default class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birth_date: new Date(),
      selectGender: '',
      id_no: '',
      issue_date: new Date(),
      nssf_no: '',
      tin_no: '',
      bank_acc_no: '',
      spinner: false,
      successMessage: '',
      errorMessage: '',
      bank_name: '',
      branch_name: ''
    };
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
      birth_date: date
    });
  }

  issueDateChange = (date) => {
    this.setState({
      issue_date: date
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      birth_date, selectGender, id_no, issue_date, tin_no,
      bank_acc_no, nssf_no
    } = this.state;

    this.setState({
      spinner: true
    });
    const data = new FormData();
    data.append('action', 'bio_data');
    data.append('user_token', cookie.load('user_token'));
    data.append('gender', selectGender);
    data.append('birth_date', ` ${birth_date.getFullYear()}-${birth_date.getMonth() + 1}-${birth_date.getDate()}`);
    data.append('id_no', id_no);
    data.append('tin_no', tin_no);
    data.append('nssf_no', nssf_no);
    data.append('issue_date', ` ${issue_date.getFullYear()}-${issue_date.getMonth() + 1}-${issue_date.getDate()}`);
    data.append('account_no', bank_acc_no);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/bio_data.php?', data)
      .then((res) => {
        if (res.data.code === 1) {
          this.setState({
            successMessage: res.data.message,
            spinner: false,
          });
          this.props.nextStep();
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
      selectGender, spinner, selectError,
      birth_date,
      id_no,
      issue_date,
      tin_no,
      nssf_no,
      bank_acc_no,
      successMessage,
      errorMessage
    } = this.state;
    return (
      <>
        <Container>
          {/* <Header as='h2' icon textalign='center'>
            <Icon name='users' circular />
            <Header.Content className='mx-auto'>EMPLOYEE REGISTRATION</Header.Content>
          </Header> */}
          <Card.Group>
            <Card fluid raised>
              <Card.Content>
                <Card.Header>
                  <Step.Group style={{ overflow: 'auto', maxWidth: '100%' }}>
                    <Step active>
                      <Icon name='user' />
                      <Step.Content>
                        <Step.Title>Personal Information</Step.Title>
                        <Step.Description>Enter employee personal details</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step >
                      <Icon name='map marker alternate' />
                      <Step.Content>
                        <Step.Title>Residential Details</Step.Title>
                        <Step.Description>Enter residence </Step.Description>
                      </Step.Content>
                    </Step>
                    <Step>
                      <Icon name='book' />
                      <Step.Content>
                        <Step.Title>Previous Employement</Step.Title>
                        <Step.Description>Enter previous Employment Details</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step>
                      <Icon name='users' />
                      <Step.Content>
                        <Step.Title>Referees Details</Step.Title>
                        <Step.Description>Enter Referees Information</Step.Description>
                      </Step.Content>
                    </Step>

                    <Step>
                      <Icon name='student' />
                      <Step.Content>
                        <Step.Title>Educational Background</Step.Title>
                        <Step.Description>Enter Educational
                          Background information</Step.Description>
                      </Step.Content>
                    </Step>

                    <Step>
                      <Icon name='star' />
                      <Step.Content>
                        <Step.Title>Qualifications</Step.Title>
                        <Step.Description>Enter qualification details</Step.Description>

                      </Step.Content>
                    </Step>

                    <Step>
                      <Icon name='user' />
                      <Step.Content>
                        <Step.Title>Next of Kin Details</Step.Title>
                        <Step.Description>Enter next of kin details</Step.Description>

                      </Step.Content>
                    </Step>

                    <Step>
                      <Icon name='other gender horizontal' />
                      <Step.Content>
                        <Step.Title>Spouse Details</Step.Title>
                        <Step.Description>Enter Spouse information</Step.Description>
                      </Step.Content>
                    </Step>

                    <Step>
                      <Icon name='child' />
                      <Step.Content>
                        <Step.Title>Children Details</Step.Title>
                        <Step.Description>Enter children information</Step.Description>
                      </Step.Content>
                    </Step>
                  </Step.Group>

                </Card.Header>
              </Card.Content>
              <Card.Content>
                <form onSubmit={this.handleSubmit}>
                  <div className="panel panel-success setup-content">
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
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            {selectError
                        && <div className="alert alert-danger" role="alert">{selectError}</div>
                            }
                            <label>Gender</label>
                            <select className="form-control" name="selectGender" onChange={this.handleChange} value={selectGender} required="required">
                              <option value="">select gender</option>
                              <option value="male" >Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label>Birth Date:</label> <br />
                            <DatePicker
                              onChange={this.birthDateChange}
                              value={birth_date}
                              showYearDropdown
                              showMonthDropdown
                              maxDate={new Date()}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="control-label">National ID Number</label>
                            <input value={id_no} min='0' maxLength="100" type="number" required="required" onChange={this.handleChange} name='id_no' className="form-control" placeholder="National ID /Passport No" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="control-label">Tin Number</label>
                            <input value={tin_no} min='0' maxLength="100" type="number" required="required" onChange={this.handleChange} name='tin_no' className="form-control" placeholder="Tin Number" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="control-label">NSSF Number</label>
                            <input value={nssf_no} min='0' maxLength="100" type="number" required="required" onChange={this.handleChange} name='nssf_no' className="form-control" placeholder="NSSF Number" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="control-label">Bank Account Number</label>
                            <input value={bank_acc_no} min='0' maxLength="100" type="number" required="required" onChange={this.handleChange} name='bank_acc_no' className="form-control" placeholder="bank account number" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="control-label">Issue Date</label><br />
                            <DatePicker
                              onChange={this.issueDateChange}
                              value={issue_date}
                              showYearDropdown
                              showMonthDropdown
                              minDate={new Date()}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="control-label">Bank Name</label>
                            <input value="bank_name" maxLength="100" type="text" required="required" onChange={this.handleChange} name='bank_name' className="form-control" placeholder="Bank Name" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="control-label">Branch Name</label>
                            <input value="branch_name" maxLength="100" type="text" required="required" onChange={this.handleChange} name='branch_name' className="form-control" placeholder="Branch Name" />
                          </div>
                        </div>
                      </div>
                      {spinner
                        ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
                        : <button className="btn btn-success pull-right"type="submit">Save</button>
                      }
                    </div>
                  </div>
                </form>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
      </>
    );
  }
}
