import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import App from './App'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Signup from './components/Signup'
import Login from "./components/Login";
import Reset from "./components/Reset";

axios.defaults.baseURL = "http://localhost:3010/";
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<App />} />
        <Route path="/reset" element={<Reset/>} />
      </Routes>
    </BrowserRouter>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

