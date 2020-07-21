import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import cookie from 'react-cookies';
import axios from 'axios';
import { Button } from 'semantic-ui-react';


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


  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/bio_data.php?action=get_bio_data&user_token=${cookie.load('user_token')}`)
      .then((res) => {
        const {
          home_district, home_location, residential_address, birth_place, home_division
        } = res.data;
        const str = res.data.nationality;
        const xstr = str.replace(/"/g, '');
        const nxstr = xstr.slice(0, -1);
        const countries = countryList().getData();
        countries.map((element) => {
          if (element.label === nxstr) {
            setNationality({ value: element.value, label: element.label });
          }
          return null;
        });
        setResidentialPlace(residential_address);
        setHomeDistrict(home_district);
        setHomeDivision(home_division);
        setHomeLocation(home_location);
        setBirthPlace(birth_place);
        return () => ac.abort();
      });
  }, []);


  const nationalityHandler = (newValue) => {
    setNationality({ value: newValue.value, label: newValue.label });
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
          setSuccessMessage('Residential information has been successfully updated');
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
      <div className="panel panel-success setup-content" id="step-3">
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

export default ResidentialData;
