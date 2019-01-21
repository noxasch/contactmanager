// this is a class component because it gonna have state
import React, { Component } from 'react';
// import contact component - the singular
import Contact from './Contact'
// import the Consumer from context
import { Consumer } from '../../context';

class Contacts extends Component {


  render() {
    return(
      // we can access the value props that we pass in Context.Provider
      // Component in the App.js
      <Consumer>
        { value => {
          // destructuring the state
          const { contacts } = value;
          return (
            // <React.Fragment> because we don't want to enclosed it in any element
            <React.Fragment>
              <h1 className="display-4 mb-2">
              <span className="text-primary">Contact</span>List
              </h1>
              { contacts.map(contact => (
                <Contact 
                  key = {contact.id} 
                  // key is a unique key for map and not pass as a props hmmm
                  id = {contact.id}
                  name = {contact.name}
                  email = {contact.email}
                  phone = {contact.phone}
                />
              )) }
            </React.Fragment>
          )
        }}
      </Consumer>
    )
  };
}

export default Contacts;
