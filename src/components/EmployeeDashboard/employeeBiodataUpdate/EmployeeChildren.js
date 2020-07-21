import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';


import ChildrenTable from './ChildrenTable';

function EmployeeChildren(props) {
  const [childrenList, setChildrenList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/employee/info/children.php?user_token=${cookie.load('user_token')}&action=get_children`)
      .then((res) => setChildrenList(res.data.children));
    return () => ac.abort();
  }, []);
  return (
    <>
      <div>
        <ChildrenTable childrenList={childrenList} nextStep={props.nextStep}
          prevStep={props.prevStep}/>
      </div>
    </>
  );
}

export default EmployeeChildren;
