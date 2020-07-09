import React from 'react';
import { LoginContext } from '../../context/auth-context';
import Show from '../show/show';

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }
    static contextType = LoginContext;

    render() {
      let okToRender = false;

      try {
        okToRender = this.context.loggedIn && (
          this.props.capability ?
            this.context.user.capabilities.includes(this.props.capability)
            : true
        );
      } catch (e) {
        console.log('NOT AUTHORIZED');
      }

      return (
        <Show condition={okToRender}>
          {this.props.children}
        </Show>
      );
    }
}

export default Auth;