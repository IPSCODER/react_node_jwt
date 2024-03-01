import { useState } from 'react';
import './App.css';
import axios from "axios"

function App() {

  const [username,setUsername] = useState('')


  axios.defaults.withCredentials = true;

  const send = async () =>{
    await axios.post("http://localhost:5000/post",{username}).then(resp =>{
      console.log(resp);
      setUsername("")
    }).catch((err) => {
      console.log(err);
    })
  }

  const logout = async () =>{
    await axios.get("http://localhost:5000/logout").then(resp =>{
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    })
  }





  return (
    <>
    <input type='text' placeholder='text' value={username} onChange={(e) => {setUsername(e.target.value)}} />
    <button onClick={send} >Send</button>
    <button onClick={logout} >logout</button>
    </>
  );
}

export default App;
