import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';


export default function ManageEmployees() {
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    const ac = new AbortController();
    axios
      .get('https://cors-anywhere.herokuapp.com/https://hrims.redtokens.ug/api/william/admin/users/get_user_info.php?action=fetch_users')
      .then((res) => {
        setStaff(res.data.staff);
        // console.log(res.data.staff);
        return () => ac.abort();
      });
  }, []);
  const data = {
    columns: [
      {
        label: 'FirstName',
        field: 'firstname',
        sort: 'asc',
        width: 200
      },
      {
        label: 'LastName',
        field: 'lastname',
        sort: 'asc',
        width: 200
      },
      {
        label: 'OtherName',
        field: 'othername',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Nationality',
        field: 'nationality',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Gender',
        field: 'gender',
        sort: 'asc',
        width: 200
      },
      {
        label: 'BirthDate',
        field: 'birthdate',
        sort: 'asc',
        width: 200
      },
      {
        label: 'BirthPlace',
        field: 'birthplace',
        sort: 'asc',
        width: 200
      },
      {
        label: 'IdNo',
        field: 'idno',
        sort: 'asc',
        width: 200
      },
      {
        label: 'NssfNo',
        field: 'nssfno',
        sort: 'asc',
        width: 200
      },
      {
        label: 'AccountNo',
        field: 'accountno',
        sort: 'asc',
        width: 200
      },
      {
        label: 'IssueDate',
        field: 'issuedate',
        sort: 'asc',
        width: 200
      },
      {
        label: 'HomeDivision',
        field: 'homedivision',
        sort: 'asc',
        width: 200
      },
      {
        label: 'HomeLocation',
        field: 'homelocation',
        sort: 'asc',
        width: 200
      },
      {
        label: 'ResidentialAddress',
        field: 'residentialaddress',
        sort: 'asc',
        width: 200
      },
      {
        label: 'MaritalStatus',
        field: 'maritalstatus',
        sort: 'asc',
        width: 200
      },
      {
        label: 'SpouseName',
        field: 'spousename',
        sort: 'asc',
        width: 200
      },
      {
        label: 'SpouseBirthDate',
        field: 'spousebirthdate',
        sort: 'asc',
        width: 200
      },
      {
        label: 'SpouseIdNo',
        field: 'spouseidno',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Passport',
        field: 'passport',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 300
      }
    ],
    rows: [...staff.map((element) => (
      {
        firstname: element.first_name,
        lastname: element.last_name,
        othername: element.other_name,
        nationality: element.nationality,
        gender: element.gender,
        birthdate: element.birth_date,
        birthplace: element.birth_place,
        idno: element.id_no,
        maritalstatus: element.marital_status,
        nssfno: element.nssf_no,
        accountno: element.account_no,
        issuedate: element.issue_date,
        homedivision: element.home_division,
        homelocation: element.home_location,
        passport: element.passport,
        spousename: element.spouse_name,
        spousebirthdate: element.spouse_birth_date,
        spouseidno: element.spouse_id_no,
        residentialaddress: element.residential_address,
        action: <><button className='btn btn-success'>Approve </button><button className='btn btn-warning'>view</button></>
      }
    ))]
  };

  return (
    <>
      <MDBDataTable
        scrollX
        bordered
        data={data}
      />
    </>
  );
}
