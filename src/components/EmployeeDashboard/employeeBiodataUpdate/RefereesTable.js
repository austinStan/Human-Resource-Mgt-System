import React, { useState } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function RefereesTable(props) {
  const [refereeObject, setRefereeObject] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [id, setID] = useState('');
  const handleClick = (event, index, refname, refaddress) => {
    event.preventDefault();
    const referee = {
      id: index,
      name: refname,
      address: refaddress
    };
    setID(index);
    setName(refname);
    setAddress(refaddress);
    setRefereeObject(referee);
  };
  const SaveChanges = () => {
    const clonedObj = {
      ...refereeObject,
      id,
      name,
      address
    };
    const List = props.RefereesList;
    List.map((element, index) => {
      if (index === clonedObj.id) {
        List[index] = clonedObj;
      }
      return null;
    });
    setRefereeObject(clonedObj);
  };
  const Clicked = (event) => {
    setSpinner(true);
    event.preventDefault();
    const resultArray = props.RefereesList.map((elm, index) => ({
      id: index + 1, name: elm.name, address: elm.address
    }));
    const data = new FormData();
    data.append('user_token', cookie.load('user_token'));
    data.append('action', 'save_referee');
    data.append('referees', JSON.stringify(resultArray));
    setSpinner(true);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/referee.php', data)
      .then((res) => {
        if (res.data.code === 1) {
          setSuccessMessage('Referee information has been successfully updated');
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
                  <p className="heading">Edit Refereee Information
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
                        <input name='name' maxLength="100" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}placeholder="" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label className="control-label">Address</label>
                        <input name='name' maxLength="100" type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}placeholder="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <a type="button" className="btn btn-success" data-dismiss="modal" onClick ={SaveChanges}>Save Changes</a>
                  <a type="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">List of Referees</h3>
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
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {
                props.RefereesList.map((refer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{refer.name}</td>
                    <td>{refer.address}</td>
                    <td> <button className='btn btn-success' onClick={(event) => handleClick(event, index, refer.name, refer.address)} data-toggle="modal" data-target="#modalAbandonedCart">Edit</button></td>
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

export default RefereesTable;
