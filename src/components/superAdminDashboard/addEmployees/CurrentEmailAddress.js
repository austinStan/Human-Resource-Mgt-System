import React from 'react';

export default class CurrentEmailAddress extends React.Component {
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
    this.props.onSet('current_email', event.target.value);
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
          <label className="control-label">Current Email Address </label>
          <input maxLength="100" type="text" onChange={this.onChange} value={this.state.selectValue} required="required" className="form-control" placeholder="current email address"/>
        </div>
      </div>
    );
  }
}
