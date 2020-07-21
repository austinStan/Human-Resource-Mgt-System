import React, { useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import cookie from 'react-cookies';
import axios from 'axios';
import {
  Header, Card, Container, Icon, Step, Button
} from 'semantic-ui-react';


function ResidentialData(props) {
  const [homeDistrict, setHomeDistrict] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [residentialPlace, setResidentialPlace] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [homeDivision, setHomeDivision] = useState('');
  const [options] = useState(countryList().getData());
  const [nationality, setNationality] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);

  const nationalityHandler = (newValue) => {
    setNationality(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    const data = new FormData();
    data.append('action', 'residential_data');
    data.append('user_token', cookie.load('user_token'));
    data.append('nationality', `${nationality.label}n`);
    data.append('home_district', homeDistrict);
    data.append('birth_place', birthPlace);
    data.append('residential_address', residentialPlace);
    data.append('home_division', homeDivision);
    data.append('home_location', homeLocation);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/bio_data.php', data)
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
                  <Step active >
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
              <div className="panel panel-success setup-content">
                <div className="panel-heading">
                  <h3 className="panel-title">Residence Details</h3>
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
                          <label className="control-label">Nationality</label>
                          <Select
                            options={options}
                            value={nationality}
                            onChange={nationalityHandler}
                            required={true}
                          />
                          {/* MAGIC */}
                          {!nationality && <input
                            tabIndex={-1}
                            autoComplete="off"
                            style={{ opacity: 0, height: 0 }}
                            required={true}
                          />
                          }
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Home District</label>
                          <input maxLength="100" type="text" required="required" className="form-control" value={homeDistrict} onChange={(e) => setHomeDistrict(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Home Division</label>
                          <input maxLength="100" type="text" required="required" className="form-control" value={homeDivision} onChange={(e) => setHomeDivision(e.target.value)} />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Birth Place</label>
                          <input maxLength="100" type="text" required="required" className="form-control" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Residential Place</label>
                          <input maxLength="100" type="text" required="required" className="form-control" value={residentialPlace} onChange={(e) => setResidentialPlace(e.target.value)}/>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className="form-group">
                          <label className="control-label">Home Location</label>
                          <input maxLength="100" type="text" required="required" className="form-control" value={homeLocation} onChange={(e) => setHomeLocation(e.target.value)}/>
                        </div>
                      </div>
                    </div>
                    { spinner
                      ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
                      : <button className="btn btn-success pull-right" onClick={props.nextStep} type="submit">Save</button>
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

export default ResidentialData;
