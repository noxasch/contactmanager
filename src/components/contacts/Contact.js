import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    showContactInfo: false
  };
 
  onShowClick(e) {
    this.setState({ showContactInfo: !this.state.showContactInfo}); 
  };

  async onDeleteClick(id, dispatch) {
    console.log('clicked');

    const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    res.status === 200 && dispatch({type: 'DELETE_CONTACT', payload: id});
  }

  // async arrow function 
  /* 
  onDeleteClick = async (id, dispatch) => {
    ...
  }
  */

  render() {
    // destructring the props
    const {id, name, email, phone} = this.props;
    const { showContactInfo } = this.state
    let display = {
      display: showContactInfo ? 'block':'none'
    }
    // console.log(this.props);
    // console.log(this);

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return(
            <div className="card card-body mb-3">
            <h4>{name} 
              <i onClick={this.onShowClick.bind(this, id)} className="fas fa-sort-down" style={{cursor: 'pointer'}}></i>
              <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}} onClick={this.onDeleteClick.bind(this, id, dispatch)}></i>
              <Link to={`contact/edit/${id}`}>
                <i className="fas fa-pencil-alt" 
                style={{
                  // this should be in css in js property
                  cursor: 'pointer',
                  float: 'right',
                  color: 'black',
                  marginRight: '1rem'

                }}></i>
              </Link>
            </h4>
            <ul className="list-group" style={display}>
              <li className="list-group-item">Email: {email}</li>
              <li className="list-group-item">Phone: {phone}</li>
            </ul>
          </div>
          )
        }}
      </Consumer>
    )
  };
}

Contact.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};


export default Contact;


