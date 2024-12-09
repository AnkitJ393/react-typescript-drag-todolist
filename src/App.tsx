import React, { useState } from 'react'
import './App.css'
import InputField from './component/InputField'
import { Todo } from './model';
import TodoList from './component/TodoList';

function App() {

  const [todo,setTodo]=useState<string>("");
  const [todos,setTodos]=useState<Todo[]>([]);

  const handleAdd=(e:React.FormEvent)=>{
    e.preventDefault();

    if(todo){
      setTodos([...todos,{id:Date.now() , todo , isDone:false}]);
      setTodo('');
      }
  }
    return <div className='App'>
           <span className="heading">Tasker</span>
              <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
              <TodoList setTodos={setTodos} todos={todos}/>
    </div>
  
}

export default App
