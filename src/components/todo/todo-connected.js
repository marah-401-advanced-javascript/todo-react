import React, { useEffect, useState, useContext } from 'react';
import TodoForm from '../form/form.js';
import TodoList from '../list/list.js';
import useAjax from '../../hooks/use-ajax.js';
import { SettingsContext } from '../../context/todo-context';
import './todo.scss';

const todoAPI = 'https://todo-app-server-lab32.herokuapp.com/api/v1/todo';

const ToDo = () => {

  const [list, setList] = useState([]);
  const todoContext = useContext(SettingsContext);


  // POST new task
  const _addItem = (item) => {
    item.due = new Date();
    let url = todoAPI;
    let method = 'post';
    useAjax(url, method, item)

      .then(response => response.data)
      .then(savedItem => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };


  // PUT COMPLETED tasks
  const _toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    const itemComplete = JSON.parse(item.complete);
    item.complete = !((itemComplete));
    let url = `${todoAPI}/${id}`;
    let method = 'put';
    useAjax(url,method, item, item._id)

      .then(response => response.data)
      .then(savedItem => {
        setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        console.log(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        _getTodoItems();
      })
      .catch(console.error);
  };


  //DELETE tasks
  const _deleteItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    let url = `${todoAPI}/${id}`;
    let  method= 'delete';
    useAjax(url, method, item, item._id)

      .then(response => response.data)
      .then(deletedItem => {
        console.log(deletedItem);
        _getTodoItems();
      })
      .catch(console.error);
  };
  

  // GETTING only pending tasks
  const _getTodoItems = () => {
    let url = todoAPI;
    let method = 'get';
    let pendingArr=[];
    useAjax(url, method)
      .then(response => response.data)
      .then(data => {
        const pending = data.map(item =>{
          return item.complete === false? pendingArr.push(item) : {};
        });
        setList(pendingArr);
        console.log(pendingArr);
      })
      .catch(console.error);
  };


  // GETTING all tasks 
  const _getAllTodoItems = () => {
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

  // SORTING the list regarding the difficulty
  list.sort((a, b) => {
    return Number(a.difficulty) - Number(b.difficulty);
  });

  // FOR PAGINATION 
  const indexOfLastItem = todoContext.currentPage * todoContext.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - todoContext.itemsPerPage;
  const currentPagePosts = list.slice(indexOfFirstItem, indexOfLastItem);  //passing this var to the list component as a list 
  const numberOfPages = (list.length) / (todoContext.itemsPerPage);
  todoContext.changeTotalPages(numberOfPages);

  
  //After rendering get the tasks 
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
            <TodoList list={currentPagePosts} listAll={list} handleComplete={_toggleComplete} handleDelete={_deleteItem} handleShowCompleted={_getAllTodoItems} handleHideCompleted={_getTodoItems} />
          </div>

        </section>

      </main>
       
    </>
  );
 
 
};

export default ToDo;
