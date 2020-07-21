import axios from 'axios';
import React, { Component } from 'react';

import TermsOfEmployment from './TermsOfEmployment';
import Department from './Department';
import Section from './Section';
import Designation from './Designation';
import Station from './Station';
import Status from './Status';
import CurrentEmailAddress from './CurrentEmailAddress';
import CompanysEmailAddress from './CompanysEmailAddress';
import DateOfJoining from './DateOfJoining';
import BasicSalary from './BasicSalary';
import Allowances from './Allowances';
// import FullNames from './FullNames';


export default class AddEmployee extends Component {
  state = {
    departments: [],
    designations: [],
    sections: [],
    stations: [],
    terms: [],
    errorMessage: '',
    department_id_error: '',
    section_id_error: '',
    designation_id_error: '',
    station_id_error: '',
    term_id_error: '',
    user_status_error: '',
    current_email_error: '',
    company_email_error: '',
    date_joined_error: '',
    basic_salary_error: '',
    fullname_error: '',
    allowance_error: '',
    serverError: '',
    serverSuccess: '',
    spinner: false,
    refreshComponents: false
  };

  submitObject = {
    department_id: null,
    section_id: null,
    designation_id: null,
    station_id: null,
    term_id: null,
    user_status: null,
    current_email: null,
    company_email: null,
    date_joined: null,
    basic_salary: null,
    allowance: null,
    fullname: null
  };

  onSet = (name, value) => {
    this.submitObject[name] = value;
    this.setState({
      serverError: '',
      serverSuccess: '',
      [`${name}_error`]: '',
      refreshComponents: false
    });
  }

  onSubmit=(event) => {
    event.preventDefault();
    this.setState({
      serverError: '',
      serverSuccess: '',
      spinner: true
    });

    let errorState = false;
    Object.keys(this.submitObject).forEach((key) => {
      if (!this.submitObject[key]) {
        errorState = true;
        this.setState({
          [`${key}_error`]: 'This field is required',
          spinner: false
        });
      }
    });

    const data = new FormData();
    Object.keys(this.submitObject).forEach((key) => {
      data.append(key, this.submitObject[key]);
    });

    if (!errorState) {
      axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/create_user.php', data)
        .then((res) => {
          if (res.data.code === 1) {
            this.setState({
              spinner: false,
              serverSuccess: 'Employee created successfully',
              refreshComponents: true
            });
          } else {
            this.setState({
              serverError: `${res.data.code} : ${res.data.message ? res.data.message : 'error'}`,
              spinner: false
            });
          }
        })
        .catch((submitError) => {
          console.log(submitError);
          debugger;
          if (submitError && submitError.response && submitError.response.data) {
            const serverError = `${submitError.response.data.code}: ${submitError.response.data.message}`;
            this.setState({
              serverError,
              spinner: false
            });
          } else {
            this.setState({
              serverError: submitError,
              spinner: false
            });
          }
        });
    }
  }

  componentDidMount() {
    axios.get('https://hrims.redtokens.ug/api/william/admin/get_data.php/')
      .then((response) => {
        const {
          departments,
          designations,
          sections,
          stations,
          terms
        } = response.data;

        this.setState({
          departments,
          designations,
          sections,
          stations,
          terms
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }


  render() {
    const {
      department_id_error,
      section_id_error,
      designation_id_error,
      station_id_error,
      term_id_error,
      user_status_error,
      current_email_error,
      company_email_error,
      date_joined_error,
      basic_salary_error,
      // fullname_error,
      allowance_error,
      serverError,
      serverSuccess,
      spinner,
      refreshComponents
    } = this.state;
    return (
      <>
        {serverError
            && <div className="alert alert-danger " role="alert">{serverError}</div>
        }
        {serverSuccess
            && <div className="alert alert-success" role="alert">{serverSuccess}</div>
        }

        <div className='row'>
          <Department
            departments={this.state.departments}
            onSet={this.onSet}
            error={department_id_error}
            refreshComponents={refreshComponents}
          />
          <Section
            sections={this.state.sections}
            onSet={this.onSet}
            error={section_id_error}
            refreshComponents={refreshComponents}
          />
        </div>

        <div className='row'>
          <Designation
            designations={this.state.designations}
            onSet={this.onSet}
            error={designation_id_error}
            refreshComponents={refreshComponents}
          />
          <Station
            stations={this.state.stations}
            onSet={this.onSet}
            error={station_id_error}
            refreshComponents={refreshComponents}
          />
        </div>

        <div className='row'>
          <Status
            onSet={this.onSet}
            error={user_status_error}
            refreshComponents={refreshComponents}
          />
          <CurrentEmailAddress
            onSet={this.onSet}
            error={current_email_error}
            refreshComponents={refreshComponents}
          />
        </div>

        <div className='row'>
          <CompanysEmailAddress
            onSet={this.onSet}
            error={company_email_error}
            refreshComponents={refreshComponents}
          />
          <DateOfJoining
            onSet={this.onSet}
            error={date_joined_error}
            refreshComponents={refreshComponents}
          />
        </div>

        <div className='row'>
          <TermsOfEmployment
            terms={this.state.terms}
            onSet={this.onSet} error={term_id_error}
            refreshComponents={refreshComponents}
          />
          <BasicSalary
            onSet={this.onSet}
            error={basic_salary_error}
            refreshComponents={refreshComponents}
          />
        </div>

        <div className='row'>
          <Allowances
            onSet={this.onSet}
            error={allowance_error}
            refreshComponents={refreshComponents}
          />
          {/* <FullNames
            onSet={this.onSet}
            error={fullname_error}
            refreshComponents={refreshComponents}
          /> */}
        </div>

        <div className="col-md-12">
          {
            spinner
              ? <button onClick={(event) => this.onSubmit(event)} className="btn btn-success nextBtn pull-right" type="button">
                <i className='fa fa-refresh fa-spin'></i>
              </button>
              : <button onClick={(event) => this.onSubmit(event)} className="btn btn-success nextBtn pull-right" type="button">
              Create Employee
              </button>
          }
        </div>
      </>
    );
  }
}
