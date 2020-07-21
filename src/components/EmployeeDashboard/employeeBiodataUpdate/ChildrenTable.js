import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function ChildrenTable(props) {
  const [DOBObject, setDOBObject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [childName, setChildName] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [Gender, setGender] = useState('');
  const [checked, setChecked] = useState(false);
  const [childrenObject, setChildrenObject] = useState([]);
  const birthDateChange = (date) => {
    setDOBObject(date);
  };
  const handleClick = (event, index, child_name, gender, birth_date) => {
    event.preventDefault();
    const children = {
      child_id: index,
      birth_date,
      child_name,
      gender
    };
    setChildrenObject(children);
    setChildName(children.child_name);
    setDOBObject(new Date(children.birth_date));
    if (children.gender === 'male') {
      setGender('male');
      setChecked(true);
    } else {
      setChecked(false);
      setGender('female');
    }
  };
  const SaveChanges = (event) => {
    event.preventDefault();
    const clonedObj = {
      ...childrenObject,
      birth_date: `${DOBObject.getFullYear()}-${DOBObject.getMonth() + 1}-${DOBObject.getDate()}`,
      child_name: childName,
      gender: Gender
    };
    const List = props.childrenList;
    List.map((element, index) => {
      if (index === clonedObj.child_id) {
        List[index] = clonedObj;
      }
      return null;
    });
    setChildrenObject(clonedObj);
  };
  const Clicked = () => {
    const resultArray = props.childrenList.map((elm, index) => ({
      id: index + 1, date: elm.birth_date, name: elm.child_name, gender: elm.gender
    }));
    const data = new FormData();
    data.append('children', JSON.stringify(resultArray));

    data.append('user_token', cookie.load('user_token'));
    data.append('action', 'save_children');
    setSpinner(true);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/children.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          setSuccessMessage('Children information has been saved successfully updated');
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
                        <label className="control-label">Name</label>
                        <input name='name' maxLength="100" type="text" className="form-control" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Enter Child's Name" />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className="control-label">Gender</label>
                      <div className="form-group">
                        <div className='radio'>
                          { checked
                            && <>
                              <label>
                                <input type="radio" name="gender" value='female' onChange={(e) => setGender(e.target.value)}/>
                                       Female
                              </label>
                              <br/>
                              <label>
                                <input type="radio" name="gender" value='male' onChange={(e) => setGender(e.target.value)} checked/>
                                       Male
                              </label>
                            </>
                          }     {!checked
                            && <>
                              <label>
                                <input type="radio" name="gender" value='female' onChange={(e) => setGender(e.target.value)} checked/>
                                       Female
                              </label>
                              <br/>
                              <label>
                                <input type="radio" name="gender" value='male' onChange={(e) => setGender(e.target.value)}/>
                                       Male
                              </label>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-6'>
                      <label className="control-label">Date of Birth</label>
                      <div className="form-group">
                        <DatePicker
                          onChange={birthDateChange}
                          value={DOBObject}
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
          <h3 className="box-title">List of Employee&apos;s Children</h3>
        </div>
        {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
        }
        {successMessage
            && <div className="alert alert-success" role="alert">{successMessage}</div>
        }
        <div className="box-body table-responsive no-padding">
          <table className="table table-hover">
            <tbody><tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Action</th>
            </tr>
            {props.childrenList.map((chil, index) => (
              <tr key={index}>
                <td>{chil.child_name}</td>
                <td>{chil.gender}</td>
                <td>{chil.birth_date}</td>
                <td><button className='btn btn-success' onClick={(event) => handleClick(event, index, chil.child_name, chil.gender, chil.birth_date)} data-toggle="modal" data-target="#modalAbandonedCart">Edit</button>
                </td>
              </tr>
            ))
            }
            </tbody></table>
          <button className="btn btn-elegant pull-right " onClick={props.nextStep} type="button">Next</button>
          { spinner
            ? <button className="btn btn-success pull-right " type="button"><i className='fa fa-refresh fa-spin'></i>processing</button>
            : <button className="btn btn-success pull-right " onClick={Clicked} type="button">Update</button>
          }
          <Button onClick={props.prevStep}>Back</Button>
        </div>
      </div>
    </>
  );
}

export default ChildrenTable;
