import React, { Component } from 'react';

export default class Department extends Component {
    state = {
      selectValue: '',
      error: this.props.error
    };

    UNSAFE_componentWillReceiveProps(props) {
      if (props.refreshComponents) {
        this.setState({
          error: props.error,
          selectValue: ''
        });
      } else {
        this.setState({ error: props.error });
      }
    }

  onChange = (event) => {
    event.preventDefault();
    const { departments } = this.props;
    const filteredDept = departments.filter((dept) => dept.department_name === event.target.value);

    if (filteredDept[0]) {
      const id = filteredDept[0].department_id;
      this.props.onSet('department_id', id);
    } else {
      this.props.onSet('department_id', null);
    }
    this.setState({
      selectValue: event.target.value,
      error: ''
    });
  }

  render() {
    const { departments } = this.props;
    const { selectValue, error } = this.state;

    return (
      <>
        <div className="col-md-6">
          <div className="form-group">
            {error
            && <div className="alert alert-danger" role="alert">{error}</div>
            }
            <label>Department</label>

            <select onChange={this.onChange} value={selectValue} className="form-control select2 select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
              <option key="563" value="select a section">
                 select a Department
              </option>
              {
                departments.map((item) => (
                  <option key={item.department_id} value={item.department_name}>
                    {item.department_name}
                  </option>
                ))

              }
            </select>
          </div>
        </div>
      </>
    );
  }
}
