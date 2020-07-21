/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import cookie from 'react-cookies';
import axios from 'axios';
import {
  Header, Card, Container, Icon, Step, Button
} from 'semantic-ui-react';

import ChildrenTable from './ChildrenTable';

function EmployeeChildren(props) {
  const [DOB, setDOB] = useState(new Date());
  const pickDate = (date) => {
    setDOB(date);
  };

  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [successMessage, setSuccessMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [error, setError] = useState('');

  const [childrenList, setChildrenList] = useState([]);

  const addChildToList = (event) => {
    event.preventDefault();
    if (!name) {
      setError('Enter a child name');
      return;
    }
    const child = {
      id: 0,
      date: `${DOB.getFullYear()}-${DOB.getMonth() + 1}-${DOB.getDate()}`,
      name,
      gender
    };

    setChildrenList([...childrenList, child]);
    setName('');
    if (gender === 'female') {
      setGender('female');
    } else {
      setGender('male');
    }
    setDOB(new Date());
  };

  const onNameChange = (event) => {
    seterrorMessage('');
    setName(event.target.value);
    setError('');
  };
  const handleClick = (event) => {
    event.preventDefault();
    setSpinner(true);
    const data = new FormData();
    data.append('children', JSON.stringify(childrenList));
    data.append('user_token', cookie.load('user_token'));
    data.append('action', 'save_children');
    const obj = {};
    // eslint-disable-next-line prefer-destructuring
    for (const prop of data) { obj[prop[0]] = prop[1]; }
    const arrObj = Object.values(obj);
    if (arrObj[0].length === 2) {
      setSpinner(false);
      seterrorMessage('No entry available....');
      return;
    }
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/children.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          setSuccessMessage(res.data.message);
          setSpinner(false);
        } else {
          seterrorMessage(`${res.data.code} : ${res.data.message ? res.data.message : 'error'}`);
          setSpinner(false);
        }
      })
      .catch((submitError) => {
        if (submitError && submitError.response && submitError.response.data
          && submitError.response.data.message) {
          const serverError = `${submitError.response.data.code}: ${submitError.response.data.message}`;
          seterrorMessage(serverError);
          setSpinner(false);
        } else if (submitError && submitError.response && submitError.response.data) {
          seterrorMessage(submitError.response.data);
          setSpinner(false);
        } else {
          seterrorMessage(submitError);
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

                  <Step completed>
                    <Icon name='users' />
                  </Step>

                  <Step completed>
                    <Icon name='student' />
                  </Step>

                  <Step completed>
                    <Icon name='star' />
                  </Step>

                  <Step completed>
                    <Icon name='user' />
                  </Step>

                  <Step completed>
                    <Icon name='other gender horizontal' />
                  </Step>
                  <Step active>
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
              <div className="panel panel-success setup-content">
                <div className="panel-heading">
                  <h3 className="panel-title">Add Child</h3>
                </div>
                <div className="panel-body">
                  {errorMessage
                    && <div className="alert alert-danger" role="alert">{errorMessage}</div>
                  }
                  {successMessage
                    && <div className="alert alert-success" role="alert">{successMessage}</div>
                  }
                  <form onSubmit={addChildToList} >
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          {error
                            && <div className="alert alert-danger" role="alert">{error}</div>
                          }
                          <label className="control-label">Name</label>
                          <input name='name' value={name} onChange={onNameChange} maxLength="100" type="text" className="form-control" placeholder="Enter Child's Name" />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <label className="control-label">Gender</label>
                        <div className="form-group">
                          <div className='radio'>
                            <label>
                              <input type="radio" name="gender" value="female" defaultChecked onChange={(e) => setGender(e.target.value)} />
                              Female
                            </label>
                            <br />
                            <label>
                              <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                              Male
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <label className="control-label">Date of Birth</label>
                        <div className="form-group">
                          <DatePicker
                            onChange={pickDate}
                            value={DOB}
                          />
                        </div>
                        <button className="btn btn-dark pull-left" type="submit">Add Child</button>
                      </div>
                    </div>
                    <br />
                    <div className="col-xs-12">
                      <br />
                      <ChildrenTable childrenList={childrenList} />
                    </div>
                    {spinner
                      ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
                      : <button className="btn btn-success pull-right" onClick={handleClick} type="button">Save</button>
                    }
                    <Button onClick={props.prevStep}>Back</Button>
                  </form>
                </div>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </>
  );
}

export default EmployeeChildren;
