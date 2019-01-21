import React, { Component } from 'react';
// 3 things to import from react router
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import './App.css';

import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';


import { Provider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                {/* this will route as the main page (address)  */}
                <Route exact path="/" component={Contacts} />
                {/* this will route as localhost/contact/add  */}
                <Route exact path="/contact/add" component={AddContact} />
                {/* this will route as localhost/about  */}
                <Route exact path="/about" component={About} />
                {/* Route withoud path will be treated as default redirect */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;