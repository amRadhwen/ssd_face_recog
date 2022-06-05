import React, { useState, useEffect } from "react";
import Header from "./Header";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import { storage } from "../config/firebase-config";
import {
  ref as reference,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export default function UserDetails(props) {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cin, setCin] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
  
    const handleUpdate = async (e, userId) => {
      e.preventDefault();
      try {
        const db = getDatabase();
        const newUser = {
          firstName: firstName ? firstName : user.firstName,
          lastName: lastName ? lastName : user.lastName,
          cin: cin ? cin : user.cin,
          email: email ? email : user.email,
        };
        const updates = {};
        //updates["/users" + userId] = newUser;
        const updated = await update(ref(db, `users/${userId}`), newUser);
        toast.success("User updated !")
        setTimeout(()=> {
          window.location.assign("/users");
        }, 700)
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      const dbRef = ref(getDatabase());
      const userId = props.match.params.id;
      get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
            toast.success("User Loaded !");
          } else {
            toast.error("User does not exists !");
            window.location.assign("/users");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }, []);
  
    const _firstName = user ? user.firstName : "";
    const _lastName = user ? user.lastName : "";
    const _cin = user ? user.cin : "";
    const _email = user ? user.email : "";
    const _phone = user ? user.phone : "";
  
  return (
    <div className='user-details'>
    <ToastContainer/>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>Update User</p>
        </div>
        <div className='col-md-6 mx-auto mt-3'>
          <form onSubmit={handleUpdate}>
              <label className='text-light' for="first-name">First Name</label>
              <input defaultValue={_firstName} onChange={(e)=>{setFirstName(e.target.value)}} type="text" placeholder='Fisrt Name' className='form-control'/>
              <br/>
              <label className='text-light' for="last-name">Last Name</label>
              <input defaultValue={_lastName} onChange={(e)=>{setLastName(e.target.value)}} type="text" placeholder='Last Name' className='form-control'/>
              <br/>
              <label className='text-light' for="phone">Phone</label>
              <input defaultValue={_phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder='phone' className='form-control'/>
              <br/>
              <label className='text-light' for="cin">Cin</label>
              <input defaultValue={_cin} onChange={(e)=>{setCin(e.target.value)}} type="text" placeholder='cin' className='form-control'/>
              <br/>
              <label className='text-light' for="email">Email</label>
              <input  defaultValue={_email} onChange={(e)=>{setEmail(e.target.value)}} type={"email"} placeholder="Email" className='form-control'/>
              <br/>
              <input type={"submit"} value="Save" className='btn btn-primary mb-5'/>
          </form>
        </div>
    </div>
  )
}
