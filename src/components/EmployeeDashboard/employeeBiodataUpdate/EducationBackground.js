/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';


import EmployeeBackgroundTable from './EducationBackgroundTable';


function EducationBackground(props) {
  const [EducationArray, setEducationArray] = useState([]);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/education.php?action=get_education_background&user_token=${cookie.load('user_token')}`)
      .then((res) => {
        if (res.data.code === 0) {
          setServerMessage(res.data.message);
        } else {
          setEducationArray(res.data.background);
        }
      });
    return () => ac.abort();
  }, []);
  return (
    <>

      <EmployeeBackgroundTable EducationArray ={EducationArray} nextStep={props.nextStep}
        prevStep={props.prevStep} serverMessage={serverMessage}/>
    </>
  );
}

export default EducationBackground;
