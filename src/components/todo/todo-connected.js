import React, { useEffect, useState, useContext } from 'react';
import TodoForm from '../form/form.js';
import TodoList from '../list/list.js';
import useAjax from '../../hooks/use-ajax.js';
import { TodoContext } from '../../context/todo-context';
import './todo.scss';
const axios = require('axios').default;

const todoAPI = 'https://todo-app-server-lab32.herokuapp.com/api/v1/todo';
// const todoAPI = 'https://lab-32.herokuapp.com/todo';

const ToDo = () => {

  const [list, setList] = useState([]);
  ///////////////////////////
  const todoContext = useContext(TodoContext);
  /////////////////////////////

  //ADDIND NOTE >>> POST 
  const _addItem = (item) => {
    item.due = new Date();
   
    // axios({
    //   method: 'post',
    //   url: todoAPI,
    //   headers: { 'Content-Type': 'application/json' },
    //   data: JSON.stringify(item),
    // })
    let url = todoAPI;
    let method = 'post';
    useAjax(url, method, item)

      .then(response => response.data)
      .then(savedItem => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  //COMPLETED >>> PUT
  const _toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    // if (item._id) {
    const itemComplete = JSON.parse(item.complete);
    item.complete = !((itemComplete));
     
    // axios({
    //   method: 'put',
    //   url: `${todoAPI}/${id}`,
    //   headers: { 'Content-Type': 'application/json' },
    //   data: JSON.stringify(item),
    // })
    let url = `${todoAPI}/${id}`;
    let method = 'put';
    useAjax(url,method, item, item._id)

      .then(response => response.data)
      .then(savedItem => {
        setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        console.log(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
      })
      .catch(console.error);
    // }
  };

  //DELETE NOTE >>> DELETE
  const _deleteItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    // if (item._id) {
     
    // axios({
    //   method: 'delete',
    //   url: `${todoAPI}/${id}`,
    //   headers: { 'Content-Type': 'application/json' },
    // })
    let url = `${todoAPI}/${id}`;
    let  method= 'delete';
    useAjax(url, method, item, item._id)

      .then(response => response.data)
      .then(deletedItem => {
        console.log(deletedItem);
        // setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        _getTodoItems();
      })
      .catch(console.error);
    // }
  };
  

  //NOTES LIST >>> GET
  const _getTodoItems = () => {
 
    // axios({
    //   method: 'get',
    //   url: todoAPI,
    //   headers: { 'Content-Type': 'application/json' },
    // })
    let url = todoAPI;
    let method = 'get';
    useAjax(url, method)

      .then(response => response.data)
      .then(data => {
        setList(data);
        console.log(data);
      })
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <header>
        <h1>TO DO APP </h1>
      </header>

      <main>

        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>

        <section className="todo">

          <div>
            <TodoForm handleSubmit={_addItem} />
          </div>

          <div>
            <TodoList list={list} handleComplete={_toggleComplete} handleDelete={_deleteItem} />
          </div>

        </section>

      </main>
       
    </>
  );
 
  
};

export default ToDo;
