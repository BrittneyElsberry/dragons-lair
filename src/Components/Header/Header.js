import React, { Component } from 'react';
import './Header.css';
import axios from 'axios'

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isAdmin: false,
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleUsernameInput(value) {
    this.setState({ username: value });
  }

  handlePasswordInput(value) {
    this.setState({ password: value });
  }

  toggleAdmin() {
    const { isAdmin } = this.state;
    this.setState({ isAdmin: !isAdmin });
  }


  /**Open src/Components/Header/Header.js
Our login() method is connected to the login button's onClick event handler, we just need to complete the logic that will make the POST request to our server's login endpoint.





In your browser, enter a username and password that you have already registered, or register a new user with a memorable username and password.
Click the Log In button. You should now see the welcome message.
Since the logout button doesn't work yet, refresh your browser to get the input boxes back. Try logging in with a username that hasn't been used yet. You should get an alert that says 'User not found. Please register as a new user before logging in.'
Now try logging in with a registered user, but use an incorrect password. You should see 'Incorrect password' alerted. */

  login() {
    // axios POST to /auth/login here
    const {username, password} = this.state
    axios.post(`/auth/login`, {username, password})
    .then( user =>{
      this.props.updateUser(user.data)
      this.setState({
        username: '',
        password: ''
      })
    }).catch(err => alert(err.response.request.response))
  }

  register() { 
    // axios POST to /auth/register here

    const {username, password, isAdmin} = this.state
    axios.post('/auth/register', {username, password, isAdmin}).then( user => {
      this.setState({ username: '', password: ''})
      this.props.updateUser(user.data)

    }).catch(err => {
      this.setState({
        username: '',
        password: ''})
        alert(err.response.request.response) 
    }) 
    

  }

  logout() {
    // axios GET to /auth/logout here
  }

  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    return (
      <div className="Header">
        <div className="title">Dragon's Lair</div>
        {user.username ? (
          <div className="welcomeMessage">
            <h4>{user.username}, welcome to the dragon's lair</h4>
            <button type="submit" onClick={this.logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="loginContainer">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => this.handleUsernameInput(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => this.handlePasswordInput(e.target.value)}
            />
            <div className="adminCheck">
              <input type="checkbox" id="adminCheckbox" onChange={() => this.toggleAdmin()} /> <span> Admin </span>
            </div>
            <button onClick={this.login}>Log In</button>
            <button onClick={this.register} id="reg">
              Register
            </button>
          </div>
        )}
      </div>
    );
  }
}

