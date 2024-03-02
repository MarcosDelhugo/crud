import { useState } from 'react'
import './App.css'

const initialData = {
  Name:"",
  Age:"",
  Country:"",
  Charge:"",
  Years:""
}
function App() {
  const [data,SetData] = useState(initialData)

   const onHanldeChange = (e) =>{
    SetData({...data,[e.target.name]:e.target.value})
   }
  
  return (
    <>
    <div className="App">
      <div className="data">
        <label>Name:<input  name='Name' onChange={onHanldeChange} value={data.Name} type='text'></input></label>
        <label>Age:<input name='Age' onChange={onHanldeChange} value={data.Age}  type='number'></input></label>
        <label>Country:<input name='Country' onChange={onHanldeChange} value={data.Country}  type='text'></input></label>
        <label>Charge:<input name='Charge' onChange={onHanldeChange} value={data.Charge}  type='text'></input></label>
        <label>Years:<input name='Years' onChange={onHanldeChange} value={data.Years}  type='number'></input></label>
        <button>to register</button>
      </div>
    </div>
    </>
  )
}

export default App
