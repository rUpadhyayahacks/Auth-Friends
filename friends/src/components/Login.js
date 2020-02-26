import React, { Component } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(res => {
        
        window.localStorage.setItem("token", res.data.payload);
        console.log(res.data.payload)
        this.props.history.push("/protected");
      })
      .catch(err => console.log(err));
      console.log('credentials', this.state.credentials);
  };

  render() {
    return (
      <div className="form-container">
       <h2>Login Form:</h2>
        <form className="login-form" onSubmit={this.login}>
          <label htmlFor="username ">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="password">Password:</label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            required
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;