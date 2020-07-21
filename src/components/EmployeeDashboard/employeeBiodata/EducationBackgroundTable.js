import React from 'react';

function EducationBackgroundTable(props) {
  return (
    <>
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Education BackGround</h3>
        </div>
        <div className="box-body table-responsive no-padding">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>No.</th>
                <th>Institution</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Award</th>
              </tr>
              {
                props.EducationArray.map((educ, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{educ.institution}</td>
                    <td>{educ.start}</td>
                    <td>{educ.end}</td>
                    <td>{educ.award}</td>
                  </tr>
                ))
              }
            </tbody></table>
        </div>
      </div>
    </>
  );
}

export default EducationBackgroundTable;
