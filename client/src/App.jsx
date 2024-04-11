import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

const BASE_URL = 'http://localhost:3000';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const [messageFromServer, setMessageFromServer] = useState('');

  const handleClick = async () =>{
    try {
      const res = await axios.get('http://localhost:3000');
      setData(res.data.data);
      console.log(res.data)
    } 
    catch(err) {
      console.log(err)
    }
  }

  const makePostRequest = async ()=>{
    try{
      const res = await axios.post(BASE_URL + '/post', {message:`${inputMsg}`});
      console.log(res.data)    
      const resMessageFromServer = await axios.get(BASE_URL+'/post')
      console.log(resMessageFromServer)
      setMessageFromServer(resMessageFromServer.data);

      }catch(err){
            console.log(err)
          }
        }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input value={inputMsg} onChange={(e)=>{setInputMsg(e.target.value)}}/>
        <button onClick={handleClick}>
          count is {count} 
        </button>
        <button onClick={makePostRequest}>
          make post request  
        </button>
        <br />
          data is: {data&&data.length>0 ? JSON.stringify(data[0]): 'empty'}
        <br />
        messageFromServer is : {messageFromServer}
                <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
