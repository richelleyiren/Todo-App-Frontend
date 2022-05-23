import React,{useState, useEffect} from 'react'
import Todos from './Todos'
import Todo from './Todo'
import Reset from './components/Reset'
import { Navigate, useNavigate, NavLink } from "react-router-dom"
import axios from "axios"
import './styling/taskpage.scss'




export default function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([]);
  const [fin, setFin] = useState(0)
  const [loading, setLoading] = useState(false)
  
  let navigate = useNavigate()
  
  const id = JSON.parse(localStorage.getItem("userId"))
  const newTodo = async(event) =>{
    try{
      event.preventDefault()
      //posting with axios
      setLoading(true)


      const addTodo = await axios.post(`http:localhost:3010/todos/${id}`, {
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
            const getTodo = await axios.post(`http:localhost:3010/todo-user/${id}`)

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
              navigate("/");
              localStorage.removeItem("userId");
              localStorage.removeItem("email");
            }
          } catch (error) {
            console.log(error.message);
          }
        };



  const date = new Date()
  const month = date.getMonth() 
  const day = date.getDate()
  const year = date.getFullYear()
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const mont = months[month]
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dayss = date.getDay()
  const eday = days[dayss]

  const nth = day === 1 || 21 || 31 ? "st" : "th"



  const fullDate = eday +", " + day + nth + " " +  mont + " " + year

  const time = date.getHours()
  const min = date.getMinutes()

  const ampm = time >= 12 ? " pm" : "am"

  const zero = min < 10 ? `0${min}`: min

  const timey = time +":"+zero + ampm
  const shit = date.toLocaleString()

   
  
  return (
    <div className=" main-body">
      <div className=" header">
        <div className="logo"> tickyTasky </div>

        <div>
          <NavLink className="reset" to="/reset/:resetToken">
            Reset Password
          </NavLink>
          <button onClick={logout} className="logout">
            Log Out
          </button>
        </div>
      </div>

      <div className=" time-space">

        <div className="dnt">
          <span> {fullDate} </span>
          <span> {timey} </span>
        </div>
        <hr></hr>

      </div>

      <div className="title">
        <div className="inputs">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

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
