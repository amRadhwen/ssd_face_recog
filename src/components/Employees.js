import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import {ToastContainer, toast} from "react-toastify";
import { getDatabase, ref, onValue, remove } from "firebase/database";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "employees/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if(data){
          setEmployees(Object.values(data));  
          toast.success("Employees loaded !")
        }
      });
    } catch (e) {
      toast.error(e)
    }
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Delete Employees ?")) {try {
      const db = getDatabase();
      const removed = remove(ref(db, "employees/"+id));
      const new_employees_list = employees.filter(employee=>{
        return employee._id !== id;
      })
      setEmployees(new_employees_list);
      toast.success("Employee Removed")
    }
    catch(error) {
      toast.error(error);
    }}
  }
  
  const view = employees.length ? (
    employees.map(employee=> {
      const key = new Date().getTime().toString();
      return (
        <tr key={key} className="text-white">
          <td><img width={"50"} src={employee.photo} /></td>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.cin}</td>
          <td>{employee.informations}</td>
          <td><button onClick={(e)=>{handleDelete(e, employee._id)}} className="btn btn-danger">Delete</button></td>
          <td><Link to={`employees/${employee._id}`} className="btn btn-primary">Update</Link></td>
        </tr>
      )
    })
  ) : <tr><td className="text-center text-danger h4 text-uppercase" colSpan={7}>No Employee !</td></tr>;
  

  return (
    <div className='employees'>
        <ToastContainer/>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>List of employees</p>
        </div>
        <div className='col-md-10 mx-auto mt-3' style={{textAlign: "center"}}>
          <Link className='btn btn-primary' to="add-employee">New Employee</Link>
        </div>
        <div className='col-md-10 mx-auto mt-3'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Photo</th>
                <th>First name</th>
                <th>Last name</th>
                <th>CIN</th>
                <th>Informations</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {view}
            </tbody>
          </table>
        </div>
    </div>
  )
}
