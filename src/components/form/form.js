import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import useForm from '../../hooks/use-form.js';
// import { useState, useEffect } from 'react';

function TodoForm (props){
  
  // MOVED THE STATE AND THE FUNCTIONS TO THE CUSTOM HOOK
  /////////////////////////////////////////////////////////
  // const [item, setItem] = useState({});
  
  // const handleInputChange = e => {
  //   setItem( {...item, [e.target.name]: e.target.value , complete : false });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   e.target.reset();
  //   props.handleSubmit(item);
  //   const emptyItem = {};
  //   setItem(emptyItem);
  //   // item && setItem({ ...item, item });
  // };
  ////////////////////////////////////////////////////////
  const [item , handleInputChange, handleSubmit] = useForm(props);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>To Do Item</Form.Label>
          <Form.Control type="text" placeholder="Add To Do List Item"  name="text"  onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control type="range" custom defaultValue="1" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
         Add Item
        </Button>
      </Form>

      
    </>
  );
}   

export default TodoForm;
