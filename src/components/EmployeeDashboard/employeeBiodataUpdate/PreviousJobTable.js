/* eslint-disable no-restricted-syntax */

import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import cookie from 'react-cookies';
import { Button } from 'semantic-ui-react';

function PreviousJobTable(props) {
  const [PrevJob, setPrevJob] = useState([]);
  const [Institution, setInstitution] = useState('');
  const [Address, setAddress] = useState('');
  const [Start, setStart] = useState(new Date());
  const [End, setEnd] = useState(new Date());
  const [Position, setPosition] = useState('');
  const [Salary, setSalary] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [Leaving_reasons, setLeavingReasons] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const startDateChange = (date) => {
    setStart(date);
  };
  const endDateChange = (date) => {
    setEnd(date);
  };
  const handleClick = (event, index, institution, address, start_date, end_date,
    leaving_reasons, position, salary) => {
    event.preventDefault();
    const prevjob = {
      id: index,
      institution,
      address,
      start_date,
      end_date,
      leaving_reasons,
      position,
      salary
    };
    setPrevJob(prevjob);
    setInstitution(institution);
    setLeavingReasons(leaving_reasons);
    setPosition(position);
    setStart(new Date(start_date));
    setEnd(new Date(end_date));
    setSalary(salary);
    setAddress(address);
  };
  const SaveChanges = () => {
    const clonedObj = {
      ...PrevJob,
      start_date: `${Start.getFullYear()}-${Start.getMonth() + 1}-${Start.getDate()}`,
      end_date: `${End.getFullYear()}-${End.getMonth() + 1}-${End.getDate()}`,
      institution: Institution,
      address: Address,
      salary: Salary,
      leaving_reasons: Leaving_reasons,
      position: Position
    };
    const List = props.previousCompany;
    List.map((element, index) => {
      if (index === clonedObj.id) {
        List[index] = clonedObj;
      }
      return null;
    });
    setPrevJob(clonedObj);
  };
  const Clicked = (event) => {
    const resultArray = props.previousCompany.map((elm, index) => ({
      id: index + 1,
      institution: elm.institution,
      start: elm.start_date,
      end: elm.end_date,
      address: elm.address,
      salary: elm.salary,
      position: elm.position,
      leaving_reasons: elm.leaving_reasons
    }));
    event.preventDefault();
    setSpinner(true);
    const data = new FormData();
    data.append('user_token', cookie.load('user_token'));
    data.append('action', 'save_previous_jobs');
    data.append('jobs', JSON.stringify(resultArray));
    const obj = {};
    // eslint-disable-next-line prefer-destructuring
    for (const prop of data) { obj[prop[0]] = prop[1]; }
    const arrObj = Object.values(obj);
    if (arrObj[2].length === 2) {
      setSpinner(false);
      setErrorMessage('No table entries available....');
      return;
    }
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/previous_jobs.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          setSuccessMessage('Previous employment information has been successfully saved');
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
      {
        <>
          <div className="modal right" id="modalAbandonedCart" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true" data-backdrop="false">
            <div className="modal-dialog modal-side modal-top- modal-notify modal-success" role="document">

              <div className="modal-content">

                <div className="modal-header">
                  <p className="heading">Edit Child
                  </p>

                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" className="white-text">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label className="control-label">Company</label>
                        <input name='name' maxLength="100" type="text" className="form-control" value={Institution} onChange={(e) => setInstitution(e.target.value)} placeholder="" />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label className="control-label">Address</label>
                        <input name='name' maxLength="100" type="text" className="form-control" value={Address} onChange={(e) => setAddress(e.target.value)} placeholder="" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label className="control-label">Position</label>
                        <input name='name' maxLength="100" type="text" className="form-control" value={Position} onChange={(e) => setPosition(e.target.value)} placeholder="" />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label className="control-label">Salary</label>
                        <input name='name' maxLength="100" type="text" className="form-control" value={Salary} onChange={(e) => setSalary(e.target.value)}placeholder="" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-6'>
                      <label className="control-label">Start Date</label>
                      <div className="form-group">
                        <DatePicker
                          onChange={startDateChange}
                          value={Start}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className="control-label">End Date</label>
                      <div className="form-group">
                        <DatePicker
                          onChange={endDateChange}
                          value={End}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className="form-group">
                        <textarea className="form-control" rows="3" placeholder="Enter ..." value={Leaving_reasons} onChange={(e) => setLeavingReasons(e.target.value)}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <a type="button" className="btn btn-success" data-dismiss="modal" onClick={SaveChanges}>Save Changes</a>
                  <a type="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Previous Employment</h3>
        </div>
        {props.serverMessage
            && <div className="alert alert-danger" role="alert">{props.serverMessage}</div>
        }
        {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
        }
        {successMessage
            && <div className="alert alert-success" role="alert">{successMessage}</div>
        }
        <div className="box-body table-responsive no-padding">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>No.</th>
                <th>institution</th>
                <th>Address</th>
                <th>Position</th>
                <th>salary</th>
                <th>start date</th>
                <th>end date</th>
                <th>Leaving Reason</th>
                <th>Actions</th>
              </tr>{
                props.previousCompany.map((previous, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{previous.institution}</td>
                    <td>{previous.address}</td>
                    <td>{previous.position}</td>
                    <td>{previous.salary}</td>
                    <td>{previous.start_date}</td>
                    <td>{previous.end_date}</td>
                    <td>{previous.leaving_reasons}</td>
                    <td><button className='btn btn-success'onClick={(event) => handleClick(event, index, previous.institution, previous.address, previous.start_date, previous.end_date, previous.leaving_reasons, previous.position, previous.salary)}data-toggle="modal" data-target="#modalAbandonedCart">Edit</button></td>
                  </tr>
                ))
              }
            </tbody></table>
          { spinner
            ? <button className="btn btn-success pull-right" type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
            : <button className="btn btn-success pull-right" onClick={Clicked} type="button">Update</button>
          }
          <Button onClick={props.prevStep}>Back</Button>
        </div>
      </div>
    </>
  );
}

export default PreviousJobTable;
