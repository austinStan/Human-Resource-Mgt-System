/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Header, Card, Container, Icon, Step, Button
} from 'semantic-ui-react';
import cookie from 'react-cookies';


import QualificationTable from './QualificationTable';

function Qualifications(props) {
  const fileInput = React.createRef();

  const [technical, setTechnical] = useState(false);
  const [professional, setProfessional] = useState(false);
  const [fileError, setFileError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');
  const [qualifications, setQualifications] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
  const [successMessage, setsuccessMessage] = useState('');
  const [spinner, setSpinner] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setFileError('');
    setCheckboxError('');
    seterrorMessage('');
    if (!fileInput.current.files > 0) {
      setFileError('Please select a screenshot');
      return;
    }

    if (!professional && !technical) {
      setCheckboxError('Please select atleast a category');
      return;
    }

    // Add to array to render in table
    if (qualifications.length > 20) {
      errorMessage('Number of  documents must not be more than 20');
      return;
    }
    setQualifications([...qualifications, {
      file: fileInput.current.files[0],
      category: {
        id: 0,
        technical,
        professional
      }
    }]);
    // clear
    setProfessional(false);
    setTechnical(false);
    // this.fileInput.current.files[0].name
  //  console.log(fileInput.current.files);
  };
  const handleChange = (event) => {
    seterrorMessage('');
    const { name, checked } = event.target;
    setCheckboxError('');
    if (name === 'technical') {
      setTechnical(checked);
    } else if (name === 'professional') {
      setProfessional(checked);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    setSpinner(true);
    const data = new FormData();
    data.append('action', 'save_qualification');
    data.append('user_token', cookie.load('user_token'));

    const arrayToSend = [];

    qualifications.forEach((qualification, index) => {
      data.append(`document_${index + 1}`, qualification.file);
      let technicalHolder = qualification.category.technical;
      let professionalHolder = qualification.category.professional;

      if (technicalHolder) {
        technicalHolder = 1;
      } else {
        technicalHolder = 0;
      }

      if (professionalHolder) {
        professionalHolder = 1;
      } else {
        professionalHolder = 0;
      }

      const details = {
        id: 0,
        technical: technicalHolder,
        professional: professionalHolder
      };

      arrayToSend.push(details);
    });
    data.append('qualifications', JSON.stringify(arrayToSend));
    const obj = {};
    // eslint-disable-next-line prefer-destructuring
    for (const prop of data) { obj[prop[0]] = prop[1]; }
    const arrObj = Object.values(obj);
    if (arrObj[2].length === 2) {
      setSpinner(false);
      seterrorMessage('No entry available....');
      return;
    }
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/qualifications.php?', data)
      .then((res) => {
        if (res.data.code === 1) {
          setsuccessMessage(res.data.message);
          setSpinner(false);
        } else {
          seterrorMessage(`${res.data.message ? res.data.message : 'error'}`);
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

                  <Step active>
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
              <div className="panel panel-success setup-content" id="step-5">
                <div className="panel-heading">
                  <h3 className="panel-title">Qualifications</h3>
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
                          <label>Choose Document Screenshot</label>
                          {
                            fileError && <div className="alert alert-danger" role="alert">
                              { fileError }
                            </div>
                          }
                          <input
                            type="file"
                            ref={fileInput}
                            required='required'
                            accept='image/png, image/jpeg'
                          />
                        </div>
                        <br />
                        <label>Choose Qualification Category</label>
                        {
                          checkboxError && <div className="alert alert-danger" role="alert">
                            { checkboxError }
                          </div>
                        }
                        <div className="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name='technical'
                              checked={technical}
                              onChange={handleChange}
                            />
                    Technical
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name='professional'
                              checked={professional}
                              onChange={handleChange}
                            />
                   Professional
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className='col-md-6'>
                        <button className="btn btn-dark pull-left" type="submit">Add Document</button>
                      </div>
                    </div>
                    <br/>
                    <QualificationTable
                      qualifications={qualifications} document ={document}
                    />
                    <div>
                      { spinner
                        ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
                        : <button className="btn btn-success pull-right" onClick={handleClick} type="button">Save</button>
                      }
                    </div>
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

export default Qualifications;
