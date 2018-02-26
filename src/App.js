import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import connect to connect your component with the store
import { connect } from 'react-redux';
// import action creators from reducer for use in mapDispatchToProps down below
import { getUsers } from './ducks/reducer';

class App extends Component {
  componentDidMount() {
    // access action creators from props
    // these MUST be accessed from props in order to be connected to the store
    this.props.getUsers()
  }
  render() {
    return (
      <div className="App">
        {
          // access data from the store through props
          this.props.users.map(user => (
            <div className="user">
              <h1>{user.first_name} {user.last_name}</h1>
              <h2>{user.username}</h2>
              <img src={user.imgurl} />
            </div>
          ))
        }
      </div>
    )
  }
}

// this function takes in state from the store and returns an object with the properties (data) needed in this app
function mapStateToProps({ users }) {
  // we could simply return state (function mapStateToProps(state) { return state }) or (const mapStateToProps = state => state)
  // but for performance we want to only return the properties that this component needs
  return {
    users
  }
}

// this object contains all the methods that this component needs
// this is why we import { getUsers } above
const mapDispatchToProps = {
  getUsers
}

// here we connect our component to redux
// connect will take our mapStateToProps and mapDispatchToProps so the app has access to the necessary information from state and action builders
export default connect(mapStateToProps, mapDispatchToProps)(App)
