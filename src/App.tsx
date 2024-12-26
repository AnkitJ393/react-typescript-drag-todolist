import React, {  useReducer, useState } from 'react'
import './App.css'
import InputField from './component/InputField'
import { Todo } from './model';
import TodoList from './component/TodoList';


type State = {
  todos: Todo[];
  editMode: boolean;
  editTodo: string;
};

export type Actions =
  | { type: 'update_edit_todo'; payload: {editTodo:string ; id:number  } }
  | { type: 'done'; payload: number }
  | { type: 'delete'; payload: number }
  | {type :'add' ,payload:Todo}


  const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
      case 'add':
        return {
          ...state,
          todos:[...state.todos,action.payload]
        };
      case 'update_edit_todo':
        return { ...state,
           todos:state.todos.map((todo)=>{
            return todo.id===action.payload.id ? {...todo,todo:action.payload.editTodo} :todo; 
          })
           };
      case 'done':
        return {
          ...state,
          todos: state.todos.map((todo) =>{
           return  todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo}
          ),
        };
      case 'delete':
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      default:
        return state;
    }
  };

function App() {

  const [todo,setTodo]=useState<string>("");

  const initialState: State = {
    todos:[],
    editMode: false,
    editTodo: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  

  const handleAdd=(e:React.FormEvent)=>{
    e.preventDefault();

    if(todo){
      dispatch({ type: 'add', payload: { id: Date.now(), todo, isDone: false } });
      setTodo('');
    }
  }
    return <div className='App'>
           <span className="heading">Tasker</span>
              <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
              <TodoList todos={state.todos} dispatch={dispatch}/>
    </div>
  
}

export default App
