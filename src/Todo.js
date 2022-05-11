import React,{useState} from 'react'
import todo from './todo.css'

export default function Todo({todo,del,update}) {
  const[strike, setStrike] = useState(false);

  const check = () => {
    setStrike(!strike);
  };
  console.log(strike);
  return (
    <div
      className="main"
      style={
        strike === false
          ? { backgroundColor: "white" }
          : { backgroundColor: "black", textDecoration: "line-through", color:"white" }
      }
      // strike === "true" ? { backgroundColor: "blue" }: { backgroundColor: "pink" }
    >
      <div className="inputss">
        <input
          type="checkbox"
          name="check"
          checked={strike}
          value="food"
          onChange={check}
        ></input>
        <p> {todo.todo}</p>
      </div>
      <div className="buttons">
        <button className="btn btn1" onClick={() => update(todo.id)}>
          {" "}
          {todo.status}
        </button>

        <button className="btn btn2" onClick={() => del(todo.id)}>
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
}
