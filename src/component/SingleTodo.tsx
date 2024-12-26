import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { Actions } from '../App';

type Props = {
  todo: Todo;
  dispatch: React.Dispatch<Actions>; // Correct type
};

const SingleTodo = ({ todo, dispatch }: Props) => {

  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);


  const handleEdit = (e: React.FormEvent ,id:number) => {
    e.preventDefault();
    if (editMode) {
      dispatch({
        type: 'update_edit_todo',
        payload: { id, editTodo }, 
      });
    }
    setEditMode(prev=>!prev);
    setEditTodo('');
  };

  return (
    <form
      className="todos_single"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      {editMode ? (
        <input
          type="text"
          className="todos_single--text"
          value={editTodo}
          onChange={(e) =>
            setEditTodo(e.target.value)
          }
          ref={inputRef}
        />
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!todo.isDone) setEditMode(!editMode);
            inputRef.current?.focus();
          }}
        >
          {!todo.isDone ? <AiFillEdit /> : null}
        </span>
        <span className="icon" onClick={() =>  dispatch({ type: 'delete', payload: todo.id })}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() =>  dispatch({ type: 'done', payload: todo.id })}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
