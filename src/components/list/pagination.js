import React from 'react';
import { useContext } from 'react';
import {SettingsContext} from '../../context/todo-context';

function Pagination(props){

  const todoContext = useContext(SettingsContext);
  
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(todoContext.totalPages); i++){
    pageNumbers.push(i);
  }

  return(
    <>
      <div>Total items: {props.listAll.length}</div>
      <div>Current page is {todoContext.currentPage}</div>
      <div>Total pages:{Math.ceil(props.listAll.length / todoContext.itemsPerPage)}</div>
      
      <div>
        {pageNumbers.map(number => (
          <span key={number}>
            <button onClick={() => todoContext.changeCurrentPage(number)} > 
              {number}  
            </button>
          </span>
        ))}
      </div>
    </>
  );

}

export default Pagination;

