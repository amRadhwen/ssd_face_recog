import React, {useState, useEffect} from 'react'
import Header from './Header'
import { getDatabase } from 'firebase/database';
import {storage} from "../config/firebase-config";
//import {ref as reference, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {ref, set} from "firebase/database";
import {ToastContainer, toast} from "react-toastify";

export default function AddUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cin, setCin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e)=> {
    e.preventDefault();
    const db = getDatabase();
    const userId = new Date().getTime().toString();
    try {
      set(ref(db, "users/"+userId), {
        _id: userId,
        firstName: firstName,
        cin: cin,
        lastName: lastName,
        email: email,
        phone: phone
      })
      toast.success("New User added !")
      setTimeout(()=>{
        window.location.assign("/users");
      }, 700)
    }
    catch(e) {
      toast.error(e);
    }
  }
  
  return (
    <div className='add-user'>
    <ToastContainer/>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>Add new user</p>
        </div>
        <div className='col-md-6 mx-auto mt-3'>
          <form onSubmit={handleSubmit}>
              <label className='text-light' for="first-name">First Name</label>
              <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" placeholder='Fisrt Name' className='form-control'/>
              <br/>
              <label className='text-light' for="last-name">Last Name</label>
              <input onChange={(e)=>{setLastName(e.target.value)}} type="text" placeholder='Last Name' className='form-control'/>
              <br/>
              <label className='text-light' for="phone">Phone</label>
              <input onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder='phone' className='form-control'/>
              <br/>
              <label className='text-light' for="cin">Cin</label>
              <input onChange={(e)=>{setCin(e.target.value)}} type="text" placeholder='cin' className='form-control'/>
              <br/>
              <label className='text-light' for="email">Email</label>
              <input onChange={(e)=>{setEmail(e.target.value)}} type={"email"} placeholder="Email" className='form-control'/>
              <br/>
              <input type={"submit"} value="ADD" className='btn btn-primary mb-5'/>
          </form>
        </div>
    </div>
  )
}
