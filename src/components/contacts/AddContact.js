import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// now we are using uuid library from npm to generate uuid
// import uuid from 'uuid';

// Controlled Component with onchange

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {

    }
  }

  // handling input
  // because we are changing state of the Components
  // when using Redux it will be different
  onChange(e) {
    this.setState({
      // this will take name from of the input
      // and the then value input
      // and set to appropriate state according to the name
      [e.target.name]: e.target.value
    })
  }

  // handling submit event
  // so if we are passing parameters with the event, 
  // event should be the last params
  onSubmit(value, e) {
    e.preventDefault();
    // console.log(this.state);

    const { name, email, phone, errors } = this.state;
    const { dispatch, contacts } = value;

    const newContact = {
      id: Object.keys(contacts).length + 1,
      // if the key and value variable have the same
      // we dont have to put it as a pair in ES6
      name, 
      email,
      phone
    };

    let errorObj = {...errors, name: false, email: false, phone: false};

    // check for errors
    // form validation
    if (name && email && phone) {
      dispatch({type: 'ADD_CONTACT', payload: newContact });
      this.clearState();
      // redirect back to home
      // this will not refresh the page
      // so the state is preserved
      this.props.history.push('/'); 
    }
 
    if (name.trim() === ''){
      errorObj = {...errorObj, name: true};
      // this.setState({errors: newObj});
    }

    if (email.trim() === ''){
      errorObj = {...errorObj, email: true};
      // this.setState({errors: newObj});
    }

    if (phone.trim() === ''){
      errorObj = {...errorObj, phone: true};
      // this.setState({errors: newObj});
    }
    this.setState({errors: errorObj});

  }

  clearState() {
    // clear input and clear error message
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
  }

  render() {
    // const { name, email, phone, errors } = this.state;
    const { errors } = this.state;
    // so to use anything from the context, we must declare it as consumer
    // so that we can access anything inside the context such as state
    // consumer take the props passed by Provider
    return (
      <Consumer>
        {
          value => { // js in jsx should be in curly braces {}
            // const { dispatch } = value; // this is from the context state
            return (
              // when we bind value to  a state
              // the input field is unmutable
              // to change this behavior we must bind it to onchange event
              <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                {/* using onSubmit() handler */}
                <form onSubmit={this.onSubmit.bind(this, value)}>
                  { // we can also call it in more simpler form like this
                    // this is much more efficient because we iterate only once
                    Object.keys(this.state)
                      .filter((key) => key!== 'errors')
                      .map((key) => { // map the filtered object
                          return (
                            <TextInputGroup
                              // When rendering an array of React elements, a key on each element is needed for React to know how to update each element.
                              key={key} // React iterables should have this props
                              label={key.replace(/\w/,(c) => c.toUpperCase())}
                              type={key === 'email' ? 'email' : 'text'}
                              name={key}
                              placeholder={`Enter ${key}...`}
                              value={this.state[key]}
                              onChange={this.onChange.bind(this)}
                              error={errors[key]}
                            />
                          );
                        }
                      )
                  }
                  <input type="submit" value="Add Contact" className="btn btn-primary btn-block"/>
                </form>
              </div>
            </div>
            )
          } 
        }
      </Consumer>
    );
  }
}

export default AddContact;