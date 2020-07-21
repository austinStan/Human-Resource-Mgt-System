import React from 'react';

export default class TermsOfEmployment extends React.Component {
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
    const { terms } = this.props;
    const filteredTerm = terms.filter((term) => term.term_name === event.target.value);
    if (filteredTerm[0]) {
      const id = filteredTerm[0].term_id;
      this.props.onSet('term_id', id);
    } else {
      this.props.onSet('term_id', null);
    }
    // console.log(id);
    this.setState({
      selectValue: event.target.value,
      error: ''
    });
  }

  render() {
    const { terms } = this.props;
    const { selectValue } = this.state;
    const { error } = this.state;
    // console.log(sections);
    // console.log(selectValue);
    return (
      <div className="col-md-6">
        <div className="form-group">
          {error
            && <div className="alert alert-danger" role="alert">{error}</div>
          }
          <label>Terms of Employment</label>
          <select onChange={this.onChange} value={selectValue} className="form-control select2 select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
            <option key="563" value="select a designation">
                 select terms of employement
            </option>
            {
              terms.map((item) => (
                <option key={item.term_id}>
                  {item.term_name}
                </option>
              ))
            }
          </select>
        </div>
      </div>
    );
  }
}
