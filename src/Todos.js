import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { supabase } from './utils/supabase';

function useTodos(props) {
  const [todos, setTodos] = useState([
    {
      content: 'Pickup dry cleaning',
      isCompleted: true,
    }, {
      content: 'Get Haircut',
      isCompleted: false,
    },
    {
      content: 'Build a todo app in React',
      isCompleted: false,
    }
  ])

  function handleKeyDown(e, i) {
    if (e.key == 'Enter') {
      createTodoAtIndex(e, i)
    }
    if (e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }

  function createTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false
    });

    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }
  function updateTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos)
  }

  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus()
    }, 0);
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos)
  }

  async function getTodo() {
    let { data: list, error } = await supabase
      .from('list')
      .select('*')
      .eq('id', props.id) //gets array with object
      .maybeSingle() //gets object or null
    // console.log(list, error)
    if (list !== null) { setTodos(list.todos) }
  }

  useEffect(() => {
    getTodo()
  }, [props.id])

  async function saveList() {
    const { data, error } = await supabase
      .from('list')
      .update({ todos: todos })
      .eq('id', props.id)
  }
  //hook returns an object
  return {
    todos,
    saveList,
    toggleTodoCompleteAtIndex,
    handleKeyDown,
    updateTodoAtIndex
  }
}

export function Todos(props) {
  //component receives the return values of the hook 
  const {
    todos,
    saveList,
    toggleTodoCompleteAtIndex,
    handleKeyDown,
    updateTodoAtIndex
  } = useTodos(props);

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div
              key={i}
              className={`todo ${todo.isCompleted && 'todo-is-completed'}`}
            >
              <div className={`checkbox`} onClick={() => toggleTodoCompleteAtIndex(i)} >
                {todo.isCompleted && (<span>&#x2714;</span>)}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>

          ))}
        </ul>
      </form>
      <button onClick={() => saveList(todos)}>save</button>
    </div>
  );
}

