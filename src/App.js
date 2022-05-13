import React,{useState, useEffect} from 'react'
import Todos from './Todos'
import Todo from './Todo'
import app from './app.css'
import Reset from './components/Reset'
import { Navigate, useNavigate, NavLink } from "react-router-dom"
import axios from "axios"



export default function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([]);
  const [fin, setFin] = useState(0)
  const [loading, setLoading] = useState(false)
  
  let navigate = useNavigate()

  const newTodo = async(event) =>{
    try{
      event.preventDefault()
      //posting with axios
      setLoading(true)

      const addTodo = await axios.post("http:localhost:3010/todos", {
        todo:input
      })

      setInput("")
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }


      
      const deleteTodo = async(id) => {
        try{
          setLoading(true)
          const delTodo = await axios.delete(`http:localhost:3010/todo/${id}`, { withCredentials:true}
          )
          // setLoading(false)

        } catch(error){
          console.log(error)
        }
      }
  
        //update

        const update = async (id) =>{
          try{
            setLoading(true)
            const getOne = await axios.get(`http:localhost:3010/todo/${id} `)
            const {data} = getOne


            if(data.status === "pending"){
              let update = await axios.put(
                `http:localhost:3010/todo/${data._id} `,{ status:"done"},
                {withCredentials:true}
              )
            } else{
              let updat = await axios.put(
                "http:localhost:3010/todo/${data._id} ",{ status:"pending"},
                { withCredentials:true}
              ) 
              console.log(updat)
            }
            setLoading(false)
          }catch(error){
            console.log(error)
          }
        }

        useEffect(() => {
          const fetching = async () =>{
            const getTodo = await axios.get("http:localhost:3010/todos")

            setTodos(getTodo.data)
          }
          fetching()
        },[loading]);

//  logout
        const logout = async () => {
          try {
            const logs = await axios.get("/users/logout", {
              withCredentials: true,
            });

            console.log(logs);
            //navigating to homepage after loging out
            if (logs.data) {
              navigate("/signup");
              localStorage.removeItem("userId");
              localStorage.removeItem("email");
            }
          } catch (error) {
            console.log(error.message);
          }
        };


  
  return (
    <div>
      <button onClick={logout} className="logout"> Log Out</button>
      <button className="reset"> Reset Password</button>
      <NavLink to="/reset"> Reset Password</NavLink>
    

      <div className="inputs">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="inbs">
          <button disabled={!input} className="inb inb1" onClick={newTodo}>
            Add to list
          </button>
        </div>
      </div>

      <Todos todos={todos} deleteTodo={deleteTodo} update={update} />
    </div>
  );
}
