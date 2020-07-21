/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import {
  Header, Card, Container, Icon, Step, Button
} from 'semantic-ui-react';
import RefereesTable from './RefereesTable';


function Referees(props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [RefereesList, setRefereesList] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [spinner, setSpinner] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setRefereesList([...RefereesList, {
      id: 0,
      name,
      address
    }]);
  };
  const handleClick = () => {
    const data = new FormData();
    setSpinner(true);
    data.append('user_token', cookie.load('user_token'));
    data.append('action', 'save_referee');
    data.append('referees', JSON.stringify(RefereesList));
    // const obj = {};
    // // eslint-disable-next-line prefer-destructuring
    // for (const prop of data) { obj[prop[0]] = prop[1]; }
    // const arrObj = Object.values(obj);
    // if (arrObj[2].length === 2) {
    //   setSpinner(false);
    //   setErrorMessage('No entry available....');
    //   return;
    // }
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/referee.php', data)
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
                  <Step completed>
                    <Icon name='book' />
                  </Step>

                  <Step active>
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
              <div className="panel panel-success setup-content" id="step-7">
                <div className="panel-heading">
                  <h3 className="panel-title">Referees</h3>
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
                          <label className="control-label">Fullname</label>
                          <input maxLength="100" type="text" required="required" value={name} onChange={(e) => setName(e.target.value)} className="form-control"/>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Address</label>
                          <input maxLength="100" type="text" required="required" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Telephone</label>
                          <input maxLength="100" type="text" required="required" className="form-control"/>
                        </div>
                        <button className="btn btn-dark  pull-left" type="submit">Add Referee</button>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Email Address</label>
                          <input maxLength="100" type="text" required="required" className="form-control"/>
                        </div>
                      </div>
                    </div>
                  </form>
                  <br/>
                  <RefereesTable RefereesList ={RefereesList}/>
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

export default Referees;
