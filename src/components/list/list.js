import React, { useContext } from 'react';
import { Button,Toast,ToastHeader } from 'react-bootstrap';
// import { Pagination } from 'react-bootstrap';
// import { TodoContext } from '../../context/todo-context';
import Pagination from '../list/pagination.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function TodoList(props){
  // const todoContext = useContext(TodoContext);

  return (
    <>
      <div>
        {props.list.map(item => {
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
        <Pagination list={props.list}/>
      </div>
    
    </>  
  );
  
}



export default TodoList;
