import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'semantic-ui-react';


function SpouseData(props) {
  const nameInput = React.createRef();
  const contactInput = React.createRef();
  const idInput = React.createRef();

  /** form values */
  const [DOB, setDOB] = useState(new Date());
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [idNo, setIdNo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);


  const [disableDOB, setDisableDOB] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/bio_data.php?action=get_bio_data&user_token=${cookie.load('user_token')}`)
      .then((res) => {
        const {
          marital_status, spouse_contact, spouse_id_no, spouse_birth_date, spouse_name
        } = res.data;
        setContact(spouse_contact);
        setIdNo(spouse_id_no);
        if (marital_status === 'single') {
          nameInput.current.disabled = true;
          setName('');
          contactInput.current.disabled = true;
          setContact('');
          idInput.current.disabled = true;
          setIdNo('');
          setDisableDOB(true);
          setDOB(DOB);
          setStatus(marital_status);
        } else {
          setStatus(marital_status);
        }
        setDOB(new Date(spouse_birth_date));
        setName(spouse_name);
        return () => ac.abort();
      });
  }, []);

  const pickStatus = (event) => {
    const { value } = event.target;
    if (value === 'single') {
      nameInput.current.disabled = true;
      setName('');

      contactInput.current.disabled = true;
      setContact('');

      idInput.current.disabled = true;
      setIdNo('');

      setDisableDOB(true);
      setDOB(DOB);
    } else {
      nameInput.current.disabled = false;
      contactInput.current.disabled = false;
      idInput.current.disabled = false;
      setDisableDOB(false);
    }
    setStatus(value);
  };

  const pickDate = (date) => {
    setDOB(date);
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    const data = new FormData();
    data.append('action', 'spouse_data');
    data.append('user_token', cookie.load('user_token'));
    data.append('marital_status', status);
    data.append('name', name);
    data.append('contact', contact);
    const dateToSend = `${DOB.getFullYear()}-${DOB.getMonth() + 1}-${DOB.getDate()}`;
    data.append('date', dateToSend);
    data.append('id_no', idNo);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/bio_data.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          setSuccessMessage('Employee spouse information has been updated successfully');
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
      <div className="panel panel-success setup-content" id="step-4">
        <div className="panel-heading">
          <h3 className="panel-title">Spouse details</h3>
        </div>
        <div className="panel-body">
          {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
          }
          {successMessage
            && <div className="alert alert-success" role="alert">{successMessage}</div>
          }
          <form onSubmit={handlesubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <label>Marital Status</label>
                  <select value={status} onChange={pickStatus} className="form-control" name="selectStatus" required="required">
                    <option value="">select marital status</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-group">
                  <label className="control-label">Spouse&apos;s name </label>
                  <input ref={nameInput} value={name} onChange={(e) => setName(e.target.value)} maxLength="100" type="text" required="required" className="form-control"/>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <label className="control-label">spouse&apos;s phone contact </label>
                  <input ref={contactInput} value={contact} onChange={(e) => setContact(e.target.value)} maxLength="100" type="text" required="required" className="form-control"/>
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-group">
                  <label className="control-label">spouse&apos;s ID number</label>
                  <input ref={idInput} value={idNo} onChange={(e) => setIdNo(e.target.value)} maxLength="100" type="text" required="required" className="form-control" placeholder="Spouse's Passport no or national ID No" />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <label className="control-label">Spouse&apos;s Date of Birth</label><br/>
                  <DatePicker
                    onChange={pickDate}
                    value={DOB}
                    disabled={disableDOB}
                    isOpen={true}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-elegant pull-right" onClick={props.nextStep} type="button">Next</button>
            { spinner
              ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
              : <button className="btn btn-success pull-right" type="submit">Update</button>
            }
            <Button onClick={props.prevStep}>Back</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SpouseData;
