import React from 'react'
import Todo from './Todo'


export default function Todos({todos, deleteTodo,update}) {
   
    return (
      <div>

        { todos.length ? (
            todos.map(todo =>(
                 <Todo todo={todo} key={todo.id} del={deleteTodo} update={update}/>
    ))) : console.log("nothing")
        }
      </div>
    );
}
