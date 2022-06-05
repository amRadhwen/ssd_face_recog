import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import {ToastContainer, toast} from "react-toastify";
import { getDatabase, ref, onValue, remove } from "firebase/database";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "users/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if(data){
          setUsers(Object.values(data));  
          toast.success("Users loaded !")
        }
      });
    } catch (e) {
      toast.error(e)
    }
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Delete User ?")) {try {
      const db = getDatabase();
      const removed = remove(ref(db, "users/"+id));
      const new_users_list = users.filter(user=>{
        return user._id !== id;
      })
      setUsers(new_users_list);
      toast.success("User Removed")
    }
    catch(error) {
      toast.error(error);
    }}
  }
  
  const view = users.length ? (
    users.map(user=> {
      const key = new Date().getTime().toString();
      return (
        <tr key={key} className="text-white">
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.cin}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td><button onClick={(e)=>{handleDelete(e, user._id)}} className="btn btn-danger">Delete</button></td>
          <td><Link to={`users/${user._id}`} className="btn btn-primary">Update</Link></td>
        </tr>
      )
    })
  ) : <tr><td className="text-center text-danger h4 text-uppercase" colSpan={7}>No User !</td></tr>;
  return (
    <div className='users'>
    <ToastContainer/>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>List of users</p>
        </div>
        <div className='col-md-10 mx-auto mt-3' style={{textAlign: "center"}}>
          <Link className='btn btn-primary' to="add-user">New User</Link>
        </div>
        <div className='col-md-10 mx-auto mt-3'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>CIN</th>
                <th>Phone</th>
                <th>Email</th>
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
