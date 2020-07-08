import React, {useState} from 'react';

//Creating context
export const SettingsContext = React.createContext();

function SettingsProvider(props){
  
  const [displayCompleted, setDisplayCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [sortField, setSortField] = useState('difficulty');

  const state = {
    displayCompleted,
    currentPage,
    totalPages,
    itemsPerPage,
    sortField,
    changeDisplayCompleted: setDisplayCompleted,
    changeItemsPerPage: setItemsPerPage,
    changeCurrentPage: setCurrentPage,
    changeSortField: setSortField,
    changeTotalPages: setTotalPages,
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
  
}
  
export default SettingsProvider;
