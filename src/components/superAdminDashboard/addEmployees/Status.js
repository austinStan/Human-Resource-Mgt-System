import React from 'react';

export default class TermsOfEmployment extends React.Component {
  state={
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

  onChange=(event) => {
    event.preventDefault();
    if (event.target.value === 'Select status') {
      this.props.onSet('user_status', null);
    } else {
      this.props.onSet('user_status', event.target.value);
    }
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
          <label>Status</label>
          <select onChange={this.onChange} value={this.state.selectValue} className="form-control select2 select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
            <option>Select status</option>
            <option value='1'>Active</option>
            <option value='0'>Inactive</option>
          </select>
        </div>
      </div>
    );
  }
}
