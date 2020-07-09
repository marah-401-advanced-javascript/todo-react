import React from 'react';
import { LoginContext } from '../../context/auth-context';
import Show from '../show/show';


class SignUP extends React.Component {

  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      role: 'user',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.signup(this.state.username, this.state.password, this.state.email, this.state.role);
  }

  render() {
    return (
      <>
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

            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={this.handleChange}
            />

            <input
              type="text"
              placeholder="role"
              name="role"
              onChange={this.handleChange}
            />

            <button>Sign UP</button>
          </form>
        </Show>
      </>
    );
  }

}

export default SignUP;