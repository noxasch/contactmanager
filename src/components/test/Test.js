import React, { Component } from 'react'

class Test extends Component {

  state = {
    title:'',
    body:''
  }

  // run whenever the component mounted
  componentDidMount(){
    // use cases:
    // this is where to make http call to api backend
    // fetching data from backend
    console.log('componentDidMount...');

    // making http request using fetch API
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    // .then(json => console.log(json));
    .then(
      data => this.setState({
        title: data.title,
        body: data.body
      })
    );
  }

  render() {
    const { title, body } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    )
  }
}

export default Test;


