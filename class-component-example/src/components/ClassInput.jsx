/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Count } from './Count';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editTodos: ["", ""],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // task 1
    this.handleDeleteItem = this.handleDeleteItem.bind(this);

    // task 3
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      editTodos: state.editTodos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDeleteItem(e, item) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: state.todos.filter((task) => task !== item),
    }));
  }

  handleEdit(e, item) {
    e.preventDefault();
    this.setState(state => ({
      ...state,
      todos: state.todos.map(task => {
        if (task === item)
          return null;
        return task;
      }),
    }))
  }

  handleEditChange(e, index) {
    e.preventDefault();
    this.setState(state => ({
      ...state,
      editTodos: state.editTodos.map((task, i) => {
          if (i === index)
            return e.target.value;
          return task;
        })
    }))
  }

  handleResubmit(e, index) {
    e.preventDefault();
    this.setState(state => ({
      ...state,
      todos: state.todos.map((task, i) => {
        if (i === index) {
          return state.editTodos[index];
        }
        return task;
      })
    }))
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={todo ? todo : index}>{todo ? todo : ""}
              {
                todo && 
                <>
                  <button onClick={e => this.handleEdit(e, todo)}>Edit</button>
                  <button onClick={(e) => this.handleDeleteItem(e, todo)}>Remove</button>
                </>
              }
              {!todo &&
                <>
                  <input
                  type='text'
                  name={"task-" + index}
                  value={this.state.editTodos[index]}
                  onChange={e => this.handleEditChange(e, index)}
                  />
                  <button onClick={e => this.handleResubmit(e, index)}>Resubmit</button>
                </>}
            </li>
          ))}
        </ul>
        <Count count={this.state.todos.length} />
      </section>
    );
  }
}

export default ClassInput;
