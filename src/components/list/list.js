import React, { useContext } from 'react';
import { Button,Toast,ToastHeader } from 'react-bootstrap';
import { SettingsContext } from '../../context/todo-context';
import Pagination from './pagination.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function TodoList(props){

  // WILL BE USED TO CONSUME THE CONTEXT
  const todoContext = useContext(SettingsContext);
  
  // FUNCTION TO HANDLE THE SHOWING OR HIDING COMPLETED TASKS
  function hideCheckedItem(){
    todoContext.changeDisplayCompleted(!todoContext.displayCompleted);
    if (todoContext.displayCompleted === false){
      props.handleShowCompleted();
    }else{
      props.handleHideCompleted();
    }
  }

  return (
    <>
      <div>
        {
          props.list.map(item => {
            let stat;
            !item.complete ? stat = 'success' : stat = 'danger';
            let word;
            !item.complete ? word = 'Pending' : word = 'Complete';
 
            return( 
              <Toast key={item._id} >
                <ToastHeader closeButton={false} >
      
                  <Button className='complete' onClick={() => props.handleComplete(item._id)} variant={`${stat}`} > {word} </Button>{' '}
      
                  <strong className="mr-auto assign" > {item.assignee} </strong>
      
                  <Button className='closedel' variant="outline-dark" onClick={() => props.handleDelete(item._id)}> X </Button>
      
                </ToastHeader>
      
                <Toast.Body className='assign'>{item.text}</Toast.Body>
      
                <small className='difficult'>Difficulty: {item.difficulty}</small>
              </Toast>
            );
          })}
      </div>
      <div>
        <button onClick={() => hideCheckedItem()}> Toggle completed tasks </button>
        <Pagination list={props.list} listAll={props.listAll} itemsHandler={props.handleHideCompleted}/>
      </div>
    
    </>  
  );
  
}

export default TodoList;

