import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoList(props){
  return (
    <>
      <h6>Click to see the assignee </h6>
      <Accordion defaultActiveKey="0">
        {props.list.map(item => (
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={item._id} onClick={() => props.handleComplete(item._id)}>
                {item.text} 
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={item._id}>
              <Card.Body> {item.assignee}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ) )}
      </Accordion>
    </>

  );
}

export default TodoList;
