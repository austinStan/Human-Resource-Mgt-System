import React from 'react';

export default class Designation extends React.Component {
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
    const { designations } = this.props;
    const filteredDes = designations.filter((des) => des.designation_name === event.target.value);
    if (filteredDes[0]) {
      const id = filteredDes[0].designation_id;
      this.props.onSet('designation_id', id);
    } else {
      this.props.onSet('designation_id', null);
    }
    // console.log(id);
    this.setState({
      selectValue: event.target.value,
      error: ''
    });
  }

  render() {
    const { designations } = this.props;
    const { selectValue, error } = this.state;
    // console.log(sections);
    // console.log(selectValue);
    return (
      <div className="col-md-6">
        <div className="form-group">
          {error
            && <div className="alert alert-danger" role="alert">{error}</div>
          }
          <label>Designation</label>
          <select onChange={this.onChange} value={selectValue} className="form-control select2 select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
            <option key="563" value="select a designation">
                 select a designation
            </option>
            {
              designations.map((item) => (
                <option key={item.designation_id} value={item.designation_name}>
                  {item.designation_name}
                </option>
              ))

            }

          </select>
        </div>
      </div>
    );
  }
}
