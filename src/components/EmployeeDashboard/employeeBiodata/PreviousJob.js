/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import DatePicker from 'react-date-picker';
import {
  Header, Card, Container, Icon, Step, Button
} from 'semantic-ui-react';


import PreviousJobTable from './PreviousJobTable';

function PreviousJob(props) {
  const [institution, setInstitution] = useState('');
  const [address, setAddress] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [leaving_reasons, setLeavingReasons] = useState('');
  const [previousCompany, setPreviousCompany] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setEnd(new Date());
    setStart(new Date());
    setAddress('');
    setPosition('');
    setSalary('');
    setLeavingReasons('');
    setInstitution('');
    setPreviousCompany([...previousCompany,
      {
        id: 0,
        institution,
        address,
        start: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
        end: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
        position,
        salary,
        leaving_reasons,
      }
    ]);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setSpinner(true);
    const data = new FormData();
    data.append('user_token', cookie.load('user_token'));
    data.append('action', 'save_previous_jobs');
    data.append('jobs', JSON.stringify(previousCompany));

    // const obj = {};
    // // eslint-disable-next-line prefer-destructuring
    // for (const prop of data) { obj[prop[0]] = prop[1]; }
    // const arrObj = Object.values(obj);
    // if (arrObj[2].length === 2) {
    //   setSpinner(false);
    //   setErrorMessage('No table entries available....');
    //   return;
    // }
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/previous_jobs.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          setSuccessMessage(res.data.message);
          setSpinner(false);
        } else {
          setErrorMessage(`${res.data.message ? res.data.message : 'error'}`);
          setSpinner(false);
        }
      })
      .catch((submitError) => {
        if (submitError && submitError.response && submitError.response.data
     && submitError.response.data.message) {
          const serverError = `${submitError.response.data.code}: ${submitError.response.data.message}`;
          setErrorMessage(serverError);
          setSpinner(false);
        } else if (submitError && submitError.response && submitError.response.data) {
          setErrorMessage(submitError.response.data);
          setSpinner(false);
        } else {
          setErrorMessage(submitError);
          setSpinner(false);
        }
      });
    props.nextStep();
  };
  return (
    <>
      <Container>
        <Header as='h2' icon textalign='center'>
          <Icon name='users' circular />
          <Header.Content className='mx-auto'>EMPLOYEE REGISTRATION</Header.Content>
        </Header>
        <Card.Group>
          <Card fluid raised>
            <Card.Content>
              <Card.Header>
                <Step.Group style={{ overflow: 'auto', maxWidth: '100%' }}>
                  <Step completed>
                    <Icon name='user' />
                  </Step>
                  <Step completed >
                    <Icon name='map marker alternate' />
                  </Step>
                  <Step active>
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
              <div className="panel panel-success setup-content" id="step-9">
                <div className="panel-heading">
                  <h3 className="panel-title">Previous Employement</h3>
                </div>
                <div className="panel-body">
                  {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
                  }
                  {successMessage
            && <div className="alert alert-success" role="alert">{successMessage}</div>
                  }
                  <form onSubmit={handleSubmit}>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Company</label>
                          <input maxLength="100" type="text" required="required" value ={institution} onChange={(event) => setInstitution(event.target.value)} className="form-control"/>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Address</label>
                          <input maxLength="100" type="text" required="required" value ={address} onChange={(event) => setAddress(event.target.value)}className="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Start Date</label>
                          <br />
                          <DatePicker
                            onChange={setStart}
                            value={start}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">End Date</label>
                          <br />
                          <DatePicker
                            onChange={setEnd}
                            value={end}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Position</label>
                          <input maxLength="100" type="text" required="required" value={position} onChange={(event) => setPosition(event.target.value)} className="form-control"/>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Salary</label>
                          <input maxLength="100" type="text" required="required" value={salary} onChange={(event) => setSalary(event.target.value)} className="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Leaving Reason</label>
                          <textarea className="form-control" rows="3" value={leaving_reasons} onChange={(event) => setLeavingReasons(event.target.value)} placeholder="Enter ..." required='required'></textarea>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <button className="btn btn-dark  pull-left" type="submit">Add Record</button>
                      </div>
                    </div>
                  </form>
                  <br/>
                  <PreviousJobTable previousCompany={previousCompany}/>
                  { spinner
                    ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
                    : <button className="btn btn-success pull-right" onClick={handleClick} type="button">Save</button>
                  }
                </div>
                <Button onClick={props.prevStep}>Back</Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </>
  );
}

export default PreviousJob;
