import React, { useState } from 'react';
import { Count } from './Count';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
  const [inputVal, setInputVal] = useState('');
  const [editTodos, setEditTodos] = useState(["", ""])

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setEditTodos((todo) => [...todo, inputVal]);
    setInputVal('');
  };

  const handleDeleteItem = (e, item) => {
    e.preventDefault();
    setTodos(
      todos.filter(task => task !== item)
    );
  }

  const handleEdit = (e, item) => {
    e.preventDefault();
    setTodos(
      todos.map(task => {
        if (task === item)
          return null;
        return task;
      })
    )
  }

  const handleEditChange = (e, index) => {
    e.preventDefault();
    setEditTodos(
      editTodos.map((task, i) => {
        if (i === index)
          return e.target.value;
        return task;
      })
    )
  }

  const handleResubmit = (e, index) => {
    e.preventDefault();
    setTodos(
      todos.map((task, i) => {
        if (i === index) {
          return editTodos[index];
        }
        return task;
      })
    )
  }

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo, index) => {
          if (todo) {
            return (<li key={todo}>{todo}
            <button onClick={e => handleEdit(e, todo)} >Edit</button>
            <button onClick={e => handleDeleteItem(e, todo)}>Remove</button></li>
          )}
         else {
          return (
            <li key={index}>
              <input
                type='text'
                name={"task-" + index}
                value={editTodos[index]}
                onChange={e => handleEditChange(e, index)}
              />
              <button onClick={e => handleResubmit(e, index)}>Resubmit</button>
            </li>
            
          )
         }
        })}
      </ul>
      <Count count={todos.length} />
    </section>
  );
};

export default FunctionalInput;
