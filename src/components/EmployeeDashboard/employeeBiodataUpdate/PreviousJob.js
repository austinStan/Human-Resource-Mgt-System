/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';


import PreviousJobTable from './PreviousJobTable';

function PreviousJob(props) {
  const [previousCompany, setPreviousCompany] = useState([]);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/previous_jobs.php?action=get_previous_jobs&user_token=${cookie.load('user_token')}`)
      .then((res) => {
        if (res.data.code === 0) {
          setServerMessage(res.data.message);
        } else {
          res.data.background.map((item, index) => {
            setPreviousCompany([...previousCompany, {
              id: index + 1,
              institution: item.institution,
              address: item.address,
              end_date: item.end_date,
              start_date: item.start_date,
              position: item.position,
              salary: item.salary,
              leaving_reasons: item.leaving_reasons
            }]);
            return null;
          });
        }
      });
    return () => ac.abort();
  }, []);
  return (
    <>
      <PreviousJobTable previousCompany={previousCompany} prevStep={props.prevStep}
        serverMessage={serverMessage}/>
    </>
  );
}

export default PreviousJob;
