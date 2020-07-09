import React from 'react';
import SettingsProvider from './context/todo-context';
import LoginProvider from './context/auth-context';
import ToDo from './components/todo/todo-connected.js';
import Login from './components/auth/login.js';
import SignUp from './components/auth/signup.js';
import Auth from './components/auth/auth.js';

export default class App extends React.Component {
  render() {
    return (
      <>
        <LoginProvider>

          <Login />
          <SignUp />

          <Auth capability="read">
            <SettingsProvider>
              <ToDo />
            </SettingsProvider>
          </Auth>

        </LoginProvider>

      </>
    );
  }
}
