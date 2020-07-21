import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function EducationBackgroundTable(props) {
  const [institution, setInstitution] = useState('');
  const [award, setAward] = useState('');
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [Education, setEducation] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const startDateChange = (date) => {
    setStartDate(date);
  };
  const endDateChange = (date) => {
    setEndDate(date);
  };
  const handleClick = (event, index, institutionname, startDate, endDate, Award) => {
    event.preventDefault();
    const education = {
      id: index,
      institution_name: institutionname,
      start_date: startDate,
      end_date: endDate,
      award: Award
    };
    setInstitution(education.institution_name);
    setAward(education.award);
    setStartDate(new Date(education.start_date));
    setEducation(education);
  };
  const SaveChanges = (event) => {
    event.preventDefault();
    const clonedObj = {
      ...Education,
      start_date: `${startdate.getFullYear()}-${startdate.getMonth() + 1}-${startdate.getDate()}`,
      end_date: `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate()}`,
      institution_name: institution,
      award
    };
    const List = props.EducationArray;
    List.map((element, index) => {
      if (index === clonedObj.id) {
        List[index] = clonedObj;
      }
      return null;
    });
    setEducation(clonedObj);
  };
  const Clicked = () => {
    const resultArray = props.EducationArray.map((elm, index) => ({
      id: index + 1,
      institution: elm.institution_name,
      start: elm.start_date,
      end: elm.end_date,
      award: elm.award
    }));
    const data = new FormData();
    console.log(resultArray);
    debugger;
    data.append('education', JSON.stringify(resultArray));
    data.append('user_token', cookie.load('user_token'));
    data.append('action', 'save_education');
    setSpinner(true);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/education.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          setSuccessMessage('Education information has been successfully updated');
          setSpinner(false);
        } else {
          setErrorMessage(`${res.data.code} : ${res.data.message ? res.data.message : 'error'}`);
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
                  <p className="heading">Edit Education Background
                  </p>

                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" className="white-text">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label className="control-label">Institution Name</label>
                        <input name='name' maxLength="100" type="text" className="form-control"value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="" />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label className="control-label">Award</label>
                        <input name='name' maxLength="100" type="text" className="form-control" value={award} onChange={(e) => setAward(e.target.value)} placeholder="" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-6'>
                      <label className="control-label">Start date</label>
                      <div className="form-group">
                        <DatePicker
                          onChange={startDateChange}
                          value={startdate}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className="control-label">Start date</label>
                      <div className="form-group">
                        <DatePicker
                          onChange={endDateChange}
                          value={enddate}
                        />
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
          <h3 className="box-title">Education Background</h3>
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
                <th>Institution</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Award</th>
                <th>Action</th>
              </tr>
              {
                props.EducationArray.map((educ, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{educ.institution_name}</td>
                    <td>{educ.start_date}</td>
                    <td>{educ.end_date}</td>
                    <td>{educ.award}</td>
                    <td><button className='btn btn-success'onClick={(event) => handleClick(event, index, educ.institution_name, educ.start_date, educ.end_date, educ.award)} data-toggle="modal" data-target="#modalAbandonedCart">Edit</button></td>
                  </tr>
                ))
              }
            </tbody></table>
          <button className="btn btn-elegant pull-right" onClick={props.nextStep} type="button">Next</button>
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

export default EducationBackgroundTable;
