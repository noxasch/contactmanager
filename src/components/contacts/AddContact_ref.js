import React, { Component } from 'react';

// This is the uncontrolled Component

class AddContact extends Component {
  constructor(props){
    super(props);
    // we need assign input ref to react.createRef
    // so that we can use ref
    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
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
  onSubmit(e) {
    e.preventDefault();
    // and this how to access ref
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
    }

    console.log(contact);
  }

  static defaultProps = {
    name: 'Fred Smith',
    email: 'fred@mail.com',
    phone: '777-777-7777'
  }

  render() {

    const { name, email, phone } = this.props;

    return(
      // when we bind value to  a state
      // the input field is unmutable
      // to change this behavior we must bind it to onchange event
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          {/* using onSubmit() handler */}
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input 
                name="name"
                type="text"
                defaultValue={name} //if we just bind value to the state, we cant change the input so we use defaultValue
                ref={this.nameInput}
                className="form-control form-control-lg" placeholder="Enter Name..."  />
            </div>
            <div className="form-group">
              <label htmlFor="name">Email:</label>
              <input 
                name="email"
                type="email"
                defaultValue={email}
                ref={this.emailInput}
                className="form-control form-control-lg" placeholder="Enter Email..." />
            </div>
            <div className="form-group">
              <label htmlFor="name">Phone:</label>
              <input 
                name="phone"
                type="text" 
                defaultValue={phone}
                ref={this.phoneInput}
                className="form-control form-control-lg" placeholder="Enter Phone..."  />
            </div>
            <input type="submit" value="Add Contact" className="btn btn-primary btn-block"/>
          </form>
        </div>
      </div>
    )
  }
}

export default AddContact;