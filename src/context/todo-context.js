import React, { useState } from 'react';

//Creating context
export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [displayCompleted, setDisplayCompleted] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(3);
  const [sortField, setsortField] = useState('difficulty');

  const state = {
    displayCompleted,
    displayNumber,
    sortField,
    changeDisplayCompleted: setDisplayCompleted,
    changeDisplayNumber: setDisplayNumber,
    changSortField: setsortField,
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;

// Context  creating
// Provider value = {state}
// Consumer context.state
