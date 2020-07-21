import React from 'react';

function PreviousJobTable(props) {
  return (
    <>
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Previous Employment</h3>
        </div>
        <div className="box-body table-responsive no-padding">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>No.</th>
                <th>institution</th>
                <th>Address</th>
                <th>Position</th>
                <th>salary</th>
                <th>start date</th>
                <th>end date</th>
                <th>Leaving Reason</th>
              </tr>{
                props.previousCompany.map((previous, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{previous.institution}</td>
                    <td>{previous.address}</td>
                    <td>{previous.position}</td>
                    <td>{previous.salary}</td>
                    <td>{previous.start}</td>
                    <td>{previous.end}</td>
                    <td>{previous.leaving_reasons}</td>
                  </tr>
                ))
              }
            </tbody></table>
        </div>
      </div>
    </>
  );
}

export default PreviousJobTable;
