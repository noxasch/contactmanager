import React, { Component } from 'react';

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
      {
        id: 1,
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        phone: '555-555-5555'
      },
      {
        id: 2,
        name: 'James McAvoy',
        email: 'james@gmail.com',
        phone: '222-222-2222'
      },
      {
        id: 3,
        name: 'Henry Carvil',
        email: 'henry@gmail.com',
        phone: '666-666-6666'
      }
    ],

    dispatch: (action) => {
      this.setState((state) => reducer(state, action))
    }
  };

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