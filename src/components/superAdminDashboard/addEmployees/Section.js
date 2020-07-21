import React from 'react';

export default class Section extends React.Component {
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
  const { sections } = this.props;
  const filteredSec = sections.filter((sec) => sec.section_name === event.target.value);
  if (filteredSec[0]) {
    const id = filteredSec[0].section_id;
    this.props.onSet('section_id', id);
  } else {
    this.props.onSet('section_id', null);
  }
  // console.log(id);
  this.setState({
    selectValue: event.target.value,
    error: ''
  });
}

render() {
  const { sections } = this.props;
  const { selectValue, error } = this.state;
  // console.log(sections);
  console.log(selectValue);
  return (
    <div className="col-md-6">
      <div className="form-group">
        {error
            && <div className="alert alert-danger" role="alert">{error}</div>
        }
        <label>Section</label>
        <select onChange={this.onChange} value={selectValue} className="form-control select2 select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
          <option key="563" value="select a section">
                 select a section
          </option>
          {
            sections.map((item) => (
              <option key={item.section_id} value={item.section_name}>
                {item.section_name}
              </option>
            ))

          }
        </select>
      </div>
    </div>
  );
}
}
