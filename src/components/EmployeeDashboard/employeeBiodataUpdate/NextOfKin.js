import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function NextOfKin(props) {
  const [FullName, setFullName] = useState('');
  const [Relationship, setRelationship] = useState('');
  const [Address, setAddress] = useState('');
  const [PostalAddress, setPostalAddress] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);


  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/next_of_kin.php?action=get_next_of_kin&user_token=${cookie.load('user_token')}`)
      .then((res) => {
        const {
          contact_no, kin_name, kin_relationship, physical_address, postal_address
        } = res.data;
        setFullName(kin_name);
        setRelationship(kin_relationship);
        setAddress(physical_address);
        setPostalAddress(postal_address);
        setContactNumber(contact_no);
        return () => ac.abort();
      });
  }, []);
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
          setSuccessMessage('Next of kin successfully updated');
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
  };
  return (
    <>
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
            <button className="btn btn-elegant pull-right" onClick={props.nextStep} type="button">Next</button>
            { spinner
              ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
              : <button className="btn btn-success pull-right" type="submit">Update</button>
            }
          </form>
          <Button onClick={props.prevStep}>Back</Button>
        </div>
      </div>
    </>
  );
}

export default NextOfKin;
