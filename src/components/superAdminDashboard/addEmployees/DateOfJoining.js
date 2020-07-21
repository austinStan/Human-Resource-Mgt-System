import React from 'react';
import DatePicker from 'react-date-picker';

export default class DateOfJoining extends React.Component {
  state={
    error: this.props.error,
    DOB: ''
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.refreshComponents) {
      this.setState({
        error: props.error,
        DOB: new Date()
      });
    } else {
      this.setState({ error: props.error });
    }
  }

  pickDate = (value) => {
    this.setState({
      DOB: value
    }, () => {
      const date = `${this.state.DOB.getFullYear()}-${this.state.DOB.getMonth() + 1}-${this.state.DOB.getDate()}`;
      console.log(date);
      this.props.onSet('date_joined', date);
    });
  }

  render() {
    const { error, DOB } = this.state;
    return (
      <div className="col-md-6">
        <div className="form-group">
          {error
            && <div className="alert alert-danger" role="alert">{error}</div>
          }
          <label className="control-label">Date of Joining </label>
          <br />
          <DatePicker
            onChange={this.pickDate}
            showYearDropdown
            showMonthDropdown
            minDate={new Date()}
            value={DOB}
          />
        </div>
      </div>
    );
  }
}
