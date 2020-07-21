import React from 'react';

export default class BasicSalary extends React.Component {
  state={
    selectValue: '',
    error: this.props.error
  }

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

  onChange=(event) => {
    event.preventDefault();
    this.props.onSet('basic_salary', event.target.value);
    this.setState({
      selectValue: event.target.value,
      error: ''
    });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="col-md-6">
        <div className="form-group">
          {error
            && <div className="alert alert-danger" role="alert">{error}</div>
          }
          <label className="control-label">Basic Salary </label>
          <input maxLength="100"onChange={this.onChange} value={this.state.selectValue} type="number" required="required" className="form-control" placeholder="basic salary" />
        </div>
      </div>
    );
  }
}
