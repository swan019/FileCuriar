import { useState } from 'react'
import './App.css'
import Upload from './components/upload/Upload'
import NavBar from './components/navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavBar/>
        <Upload/> 
      </div>
    </>
  )
}

export default App
