import React from 'react';

function ChildrenTable(props) {
  const handleDelete = (event, value) => {
    event.preventDefault();
    console.log(value);
    // const newArray = props.childrenList.filter((person, index) => {
    //   console.log(newArray);
    // });
  };
  return (
    <div className="box">
      <div className="box-header">
        <h3 className="box-title">List of Employee&apos;s Children</h3>
      </div>
      <div className="box-body table-responsive no-padding">
        <table className="table table-hover">
          <tbody><tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
          {
            props.childrenList.map((child, index) => (
              <tr key={index}>
                <td>{child.name}</td>
                <td>{child.gender}</td>
                <td>{child.date}</td>
                <td><button className='btn btn-danger' onClick={(event) => handleDelete(event, index)}>Delete</button></td>
              </tr>
            ))
          }
          </tbody></table>
      </div>
    </div>
  );
}

export default ChildrenTable;
