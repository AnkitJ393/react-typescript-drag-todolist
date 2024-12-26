import React, { useReducer } from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo'
import { Actions } from '../App';

type Props = {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>; // Correct type
};



const TodoList:React.FC<Props> = ({todos,dispatch}) => {


  return (
    <div className='todos'>
        {
            todos.map((todo)=> {
                return <SingleTodo key={todo.id} todo={todo} dispatch={dispatch}/>
            })  
        }
    </div>
  )
}

export default TodoList