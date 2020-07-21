
import React, { useState } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

function QualificationTable(props) {
  // const fileInput = React.createRef();
  // const [fileError, setFileError] = useState('');
  // const [checkboxError, setCheckboxError] = useState('');
  // const [file, setFile] = useState('');
  const [QualificationObj, setQualificationObj] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const insertComma = (professional, technical) => {
    if (professional === '1' && technical === '1') {
      return 'professional, technical';
    }

    if (professional === '1' && technical === '0') {
      return 'professional';
    }

    if (professional === '0' && technical === '1') {
      return 'technical';
    }

    return '';
  };
  const handleClick = (event, index, doc, pro, tec) => {
    event.preventDefault();
    const qualification = {
      id: index,
      document: doc,
      professional: pro,
      technical: tec
    };
    setQualificationObj(qualification);
    console.log(QualificationObj);
    // const splitDocument = qualification.document.split('/');
    // const indexedDocument = splitDocument.pop();
    // console.log(indexedDocument);
    // setFile(qualification.document);
  };
  const handleDelete = (event, id) => {
    event.preventDefault();
    const data = new FormData();
    data.append('action', 'delete_document');
    data.append('user_token', cookie.load('user_token'));
    data.append('id', id);
    axios.post('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/qualifications.php', data)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 1) {
          setSuccessMessage('deleted');
        } else {
          setErrorMessage(`${res.data.message ? res.data.message : 'error'}`);
        }
      })
      .catch((submitError) => {
        if (submitError && submitError.response && submitError.response.data
         && submitError.response.data.message) {
          const serverError = `${submitError.response.data.code}: ${submitError.response.data.message}`;
          setErrorMessage(serverError);
        } else if (submitError && submitError.response && submitError.response.data) {
          setErrorMessage(submitError.response.data);
        } else {
          setErrorMessage(submitError);
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
                  <p className="heading">Edit Qualification Document
                  </p>

                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" className="white-text">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className='col-md-6'>
                      <div className="form-group">
                        <label>Choose Document Screenshot</label>
                        {/* {
                          fileError && <div className="alert alert-danger" role="alert">
                            { fileError }
                          </div>
                        } */}
                        <input
                          type="file"
                          required ='required'
                          accept='image/png, image/jpeg'
                        />
                      </div>
                      <br />
                      <label>Choose Qualification Category</label>
                      {/* {
                        checkboxError && <div className="alert alert-danger" role="alert">
                          { checkboxError }
                        </div>
                      } */}
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name='technical'
                          />
                    Technical
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name='professional'
                          />
                   Professional
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <a type="button" className="btn btn-success" data-dismiss="modal">Save Changes</a>
                  <a type="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      <div className="box">
        <div className="box-header">
          {errorMessage
            && <div className="alert alert-danger" role="alert">{errorMessage}</div>
          }
          {successMessage
            && <div className="alert alert-success" role="alert">{successMessage}</div>
          }
          <h3 className="box-title">List of Employee&apos;s Qualifications</h3>
        </div>
        <div className="box-body table-responsive no-padding">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>No.</th>
                <th>Document Uploaded</th>
                <th>Qualification Category</th>
                <th>Actions</th>
              </tr>
              {
                props.qualifications.map((qual, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><img style={{ height: 30, width: 100 }} src={`https://hrims.redtokens.ug${qual.document}`}/></td>
                    <td>
                      {
                        insertComma(qual.professional, qual.technical)
                      }
                    </td>
                    <td>
                      <button className='btn btn-success' onClick={(event) => handleClick(event, index, qual.document, qual.professional, qual.technical)} data-toggle="modal" data-target="#modalAbandonedCart">Edit</button>
                      <button className='btn btn-danger' onClick ={(event) => handleDelete(event, qual.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody></table>
        </div>
      </div>
    </>
  );
}

export default QualificationTable;
