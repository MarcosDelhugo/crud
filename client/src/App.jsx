import { useState } from 'react'
import './App.css'
import { httpRequest }  from './service/HttpService'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialData = {
  Name:"",
  Age:"",
  Country:"",
  Charge:"",
  Years:""
}
function App() {
  const [data,setData] = useState(initialData);
  const [listEmployes,setListEmployes] = useState([]);
  const [editemploye,setEditEmploye] = useState(false);

  useEffect(() => {
    fetchGet()
 }, [data])

  const onHanldeChange = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }
  
  const fetchAdd = async () => {
      let headers = {
          Accept: '*/*', 
      }
      let dataSend ={
        Name:data.Name,
        Age:data.Age,
        Country:data.Country,
        Charge:data.Charge,
        Years:data.Years
      }
      try 
      {
        const data = await httpRequest(
          { method: 'POST',headers:headers, service: 'create',payload:dataSend});
          console.log(data)
      } 
      catch (error) {
        console.log(error);
      }
    fetchGet();
    clearFields();
  }

  const fetchGet = async () => {
    try 
    {
      const data = await httpRequest({ method: 'GET',service: 'employees'});
      setListEmployes(data)
    } 
    catch (error) {
      console.log(error);
    }
  }

  const editEmploye = (e) => {
    setEditEmploye(true);
    setData({
      "employe_id":e.employe_id,
      "Age":e.age,
      "Name":e.name,
      "Country":e.country,
      "Charge":e.charge,
      "Years":e.years});
  }
const fetchUpdate= async () => {
      let headers = {
          Accept: '*/*', 
      }
      let dataSend ={
        employe_id:data.employe_id,
        Name:data.Name,
        Age:data.Age,
        Country:data.Country,
        Charge:data.Charge,
        Years:data.Years
      }
      try 
      {
        const res= await httpRequest(
          { method: 'PUT',headers:headers, service: 'update',payload:dataSend});
          console.log(res)
          fetchGet();
          clearFields();
      } 
      catch (error) {
        console.log(error);
      }
  }

  const clearFields =()=>{
    setEditEmploye(false);
    setData(initialData)
  }
  return (
    <>
      <div className="container">
          <div className="card text-center">
            <div className="card-header">
              Employee management
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Name</span>
                <input type="text" name='Name' onChange={onHanldeChange} value={data.Name} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Age</span>
                <input type="number" name='Age' onChange={onHanldeChange} value={data.Age} className="form-control" placeholder="Age" aria-label="Username" aria-describedby="basic-addon1"></input>
              </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Country</span>
                <input type="text" name='Country' onChange={onHanldeChange} value={data.Country} className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"></input>
              </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Charge</span>
                <input type="text" name='Charge' onChange={onHanldeChange} value={data.Charge} className="form-control" placeholder="Charge" aria-label="Charge" aria-describedby="basic-addon1"></input>
              </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Years</span>
                <input type="text" name='Years' onChange={onHanldeChange} value={data.Years} className="form-control" placeholder="Years" aria-label="Years" aria-describedby="basic-addon1"></input>
              </div>
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            {
              editemploye?
              <div>
              <button className='btn btn-warning m-2' onClick={fetchUpdate}>to update</button>
              <button className='btn btn-info m-2' onClick={clearFields}>cancel</button>
              </div>
              :<button className='btn btn-success' onClick={fetchAdd}>to register</button>
            }
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Country</th>
              <th scope="col">Charge</th>
              <th scope="col">Exp</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {
              listEmployes.map((val,key)=>{
                return <tr key={val.employe_id}>
                        <th scope="row">{val.employe_id}</th>
                        <td>{val.name}</td>
                        <td>{val.age}</td>
                        <td>{val.country}</td>
                        <td>{val.charge}</td>
                        <td>{val.years}</td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-info" onClick={()=>{editEmploye(val)}}>Edit</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                          </div></td>                  
                      </tr>
              })
            }    
          </tbody>
        </table>
      </div>
    </>
  )
}
export default App
