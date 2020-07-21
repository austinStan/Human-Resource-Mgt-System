/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';


import RefereesTable from './RefereesTable';


function Referees(props) {
  const [RefereesList, setRefereesList] = useState([]);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/referee.php?user_token=${cookie.load('user_token')}&action=get_referees`)
      .then((res) => {
        if (res.data.code === 0) {
          setServerMessage(res.data.message);
        } else {
          res.data.referees.map((referee, index) => {
            setRefereesList([...RefereesList, {
              id: index + 1,
              name: referee.referee_name,
              address: referee.referee_address
            }]);
            return null;
          });
        }
        return () => ac.abort();
      });
  }, []);

  return (
    <>
      <RefereesTable RefereesList ={RefereesList} nextStep={props.nextStep}
        serverMessage={serverMessage}
        prevStep={props.prevStep}/>

    </>
  );
}

export default Referees;
