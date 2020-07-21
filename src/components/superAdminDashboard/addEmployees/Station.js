import React from 'react';

export default class Station extends React.Component {
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
    const { stations } = this.props;
    const filteredSta = stations.filter((sta) => sta.station_name === event.target.value);
    if (filteredSta[0]) {
      const id = filteredSta[0].station_id;
      this.props.onSet('station_id', id);
    } else {
      this.props.onSet('station_id', null);
    }

    this.setState({
      selectValue: event.target.value,
      error: ''
    });
  }

  render() {
    const { stations } = this.props;
    const { selectValue, error } = this.state;
    // console.log(sections);
    // console.log(selectValue);
    return (
      <div className="col-md-6">
        <div className="form-group">
          {error
            && <div className="alert alert-danger" role="alert">{error}</div>
          }
          <label>Station</label>
          <select onChange={this.onChange} value={selectValue} className="form-control select2 select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
            <option key="563" value="select a designation">
                 select a station
            </option>
            {
              stations.map((item) => (
                <option key={item.station_id} value={item.designation_name}>
                  {item.station_name}
                </option>
              ))

            }
          </select>
        </div>
      </div>
    );
  }
}
