
import React from 'react';

function QualificationTable(props) {
  const insertComma = (professional, technical) => {
    if (professional && technical) {
      return 'professional, technical';
    }

    if (professional && !technical) {
      return 'professional';
    }

    if (!professional && technical) {
      return 'technical';
    }

    return '';
  };

  return (
    <div className="box">
      <div className="box-header">
        <h3 className="box-title">List of Employee&apos;s Qualifications</h3>
      </div>
      <div className="box-body table-responsive no-padding">
        <table className="table table-hover">
          <tbody><tr>
            <th>No.</th>
            <th>Document Name</th>
            <th>Qualifications</th>
            <th>Actions</th>
          </tr>
          {
            props.qualifications.map((qual, index) => {
              const { technical, professional } = qual.category;
              // eslint-disable-next-line no-param-reassign
              qual.file.customName = `document_${index + 1}`;
              return (
                <tr key={index}>
                  <td> {index + 1} </td>
                  <td>{ qual.file.customName}</td>
                  <td>
                    {
                      insertComma(professional, technical)
                    }
                  </td>
                  <td><button type="button" className="btn btn-danger">Delete</button></td>
                </tr>
              );
            })
          }
          </tbody></table>
      </div>
    </div>
  );
}

export default QualificationTable;
