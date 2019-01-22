import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
// now we are using uuid library from npm to generate uuid
// import uuid from 'uuid';

// Controlled Component with onchange

class EditContact extends Component {
  signal = axios.CancelToken.source();

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {

    }
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  async componentDidMount() {
    // take the params from get url params
    const { id } = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
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
  async onSubmit(value, e) {
    e.preventDefault();

    const { id } = this.props.match.params; 
    const { name, email, phone, errors } = this.state;
    const { dispatch } = value;

    const updateContact = {
      id,
      name, 
      email,
      phone
    };

    let errorObj = {...errors, name: false, email: false, phone: false};

    // check for errors
    // form validation
    if (!name.trim()){
      errorObj = {...errorObj, name: true};
    }

    if (!email.trim()){
      errorObj = {...errorObj, email: true};
    }

    if (!phone.trim()){
      errorObj = {...errorObj, phone: true};
    }
    this.setState({errors: errorObj});

    // redirect should be after all the state has been change or check 
    // otherwise it can cause memory leak warning
    if (name.trim() && email.trim() && phone.trim()) {
      const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);

      if(res.status === 200){
        dispatch({type: 'UPDATE_CONTACT', payload: res.data });
        this.clearState();
        this.props.history.push('/');
      }
    }

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
              <div className="card-header">Edit Contact</div>
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
                  <input type="submit" value="Update Contact" className="btn btn-primary btn-block"/>
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

export default EditContact;