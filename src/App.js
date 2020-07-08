import React from 'react';
import SettingsProvider from './context/todo-context';
// import ToDo from './components/todo/todo.js';
import ToDo from './components/todo/todo-connected.js';

export default class App extends React.Component {
  render() {
    return (
      <>
        <SettingsProvider>
          <ToDo />
        </SettingsProvider>
        
      </>
    );
  }
}
