import React from 'react';

function RefereesTable(props) {
  return (
    <>
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">List of Referees</h3>
        </div>
        <div className="box-body table-responsive no-padding">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
              </tr>
              {
                props.RefereesList.map((refer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{refer.name}</td>
                    <td>{refer.address}</td>
                  </tr>
                ))
              }
            </tbody></table>
        </div>
      </div>
    </>
  );
}

export default RefereesTable;
