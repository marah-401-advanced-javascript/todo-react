import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import superagent from 'superagent';
dotenv.config();

const API = process.env.API_SERVER || 'https://auth-server-401.herokuapp.com' ;

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      login: this.login,
      signup: this.signup,
      logout: this.logout,
      user: {},
    };
  }


  signup = async(username, password,email,role) => {
    let obj = {
      username,
      password,
      email,
      role,
    };
    try {
      const response = await fetch(`${API}/signup`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(obj),
      });
      let res = await response.json();
      this.validateToken(res.token);
    } catch(err) {
      console.log('SIGN UP ERROR');
    }
  };


  login = (username, password) => {
    superagent
      .post(`${API}/signin`)
      .set('authorization', `Basic ${btoa(`${username}:${password}`)}`)
      .then((response) => {
        this.validateToken(response.body.token);
      })
      .catch(console.error);
  };


  logout = () => {
    this.setLoginState(false, null, {});
  };


  setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user });
  };


  validateToken = (token) => {
    try {
      const u = jwt.decode(token);
      console.log('DECODED', u);
      const user = jwt.verify(token, SECRET);
      console.log('VERIFIED', user);
      this.setLoginState(true, token, user);
    } catch (e) {
      this.setLoginState(false, null, {});
      console.log('Token validation Error', e.message);
    }
  };


  componentDidMount() {
    const cookieToken = cookie.load('auth');
    const token = cookieToken || null;
    this.validateToken(token);
  }


  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }

}

export default LoginProvider;
