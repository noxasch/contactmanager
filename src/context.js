import React, { Component } from 'react';
import axios from 'axios';

// Application State Provider or Storage

const Context = React.createContext();

function reducer(state, action) {
  // the state is from Provider property
  // as we are actually calling it using this.setState((state) => reducer(state, action))
  console.log(state);
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) => 
            contact.id === action.payload.id ? (contact = action.payload) : contact
        )
      };
    default:
      return state;
  }
}

export class Provider extends Component {
  // this is where we gonna have our state
  state = {
    // in this example we just gonna have an array object
    // but it can be anything from a database or backend
    // this is just dummy or test data
    contacts: [
      // replaced with jsonplaceholderapi
    ],

    dispatch: (action) => {
      this.setState((state) => reducer(state, action))
    }
  }

  async componentDidMount(){
    // using axios
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({contacts: res.data});
  }

  render() {
    // we pass in what we want to be available troughout our app
    // in a property named value
    // so the state provider is available from any other Components
    // the value will be available to the Consumer
    return (
      <Context.Provider value={this.state}>
        {this.props.children}{/* what this do ? */}
      </Context.Provider>
    )
  }
  
}

export const Consumer = Context.Consumer;
// <Consumer >
// can also pass the context
// export const Context = Context;
// then you'll use it like this
// <Context.Consumer>
// export default Provider;