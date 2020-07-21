import React, { Component } from 'react';

export class FullNames extends Component {
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
        this.props.onSet('fullname', event.target.value);
        this.setState({
          selectValue: event.target.value,
          error: ''
        });
      }

      render() {
        const { error } = this.state;
        return (
          <>
            <div className='col-md-6'>
              <div className="form-group">
                {error
            && <div className="alert alert-danger" role="alert">{error}</div>
                }
                <label className="control-label">Employee Full Name</label>
                <input maxLength="100" onChange={this.onChange} value={this.state.selectValue} type="text" required="required" className="form-control" placeholder="eg John Doe" />
              </div>

            </div>
          </>
        );
      }
}

export default FullNames;
