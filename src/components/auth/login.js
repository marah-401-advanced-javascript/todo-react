import React from 'react';
import { LoginContext } from '../../context/auth-context';
import Show from '../show/show';

class Login extends React.Component {

  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <>
        <Show condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log out</button>
        </Show>
        <Show condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit} >
            <input
              type="text"
              placeholder="userName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <button>Login</button>
          </form>
        </Show>
      </>
    );
  }

}

export default Login;