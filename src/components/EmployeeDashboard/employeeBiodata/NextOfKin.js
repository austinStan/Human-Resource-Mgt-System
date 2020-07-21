import React, { useState } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import {
  Header, Card, Container, Icon, Step, Button
} from 'semantic-ui-react';

function NextOfKin(props) {
  const [FullName, setFullName] = useState('');
  const [Relationship, setRelationship] = useState('');
  const [Address, setAddress] = useState('');
  const [PostalAddress, setPostalAddress] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    const data = new FormData();
    data.append('action', 'save_kin_data');
    data.append('user_token', cookie.load('user_token'));
    data.append('full_name', FullName);
    data.append('relationship', Relationship);
    data.append('address', Address);
    data.append('postal_address', PostalAddress);
    data.append('contact_no', ContactNumber);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/next_of_kin.php', data)
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

                  <Step completed>
                    <Icon name='users' />
                  </Step>

                  <Step completed>
                    <Icon name='student' />
                  </Step>

                  <Step completed>
                    <Icon name='star' />
                  </Step>

                  <Step active>
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
              <div className="panel panel-success setup-content" id="step-6">
                <div className="panel-heading">
                  <h3 className="panel-title">Next of Kin details</h3>
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
                          <label className="control-label">Full Name</label>
                          <input maxLength="100" type="text" required="required" value={FullName} onChange={(e) => setFullName(e.target.value)} className="form-control" />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Relationship Type</label>
                          <input maxLength="100" type="text" required="required" value={Relationship} onChange={(e) => setRelationship(e.target.value)} className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Address</label>
                          <input maxLength="100" type="text" required="required" value={Address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Postal Address</label>
                          <input maxLength="100" type="text" required="required" value={PostalAddress} onChange={(e) => setPostalAddress(e.target.value)} className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Contact Number</label>
                          <input maxLength="100" type="text" required="required" value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} className="form-control" />
                        </div>
                      </div>
                    </div>
                    { spinner
                      ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
                      : <button className="btn btn-success pull-right" type="submit">Save</button>
                    }
                  </form>
                  <Button onClick={props.prevStep}>Back</Button>
                </div>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </>
  );
}

export default NextOfKin;
