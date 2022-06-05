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

export default function EmployeeDetails(props) {
  const [employee, setEmployee] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cin, setCin] = useState("");
  const [informations, setInformations] = useState("");

  const handleUpdate = async (e, employeeId) => {
    e.preventDefault();
    try {
      const db = getDatabase();
      const newEmployee = {
        photo: photo ? photo : employee.photo,
        firstName: firstName ? firstName : employee.firstName,
        lastName: lastName ? lastName : employee.lastName,
        cin: cin ? cin : employee.cin,
        informations: informations ? informations : employee.informations,
      };
      const updates = {};
      //updates["/employees" + employeeId] = newEmployee;
      const updated = await update(ref(db, `employees/${employeeId}`), newEmployee);
      toast.success("Employee updated !")
      setTimeout(()=> {
        window.location.assign("/employees");
      }, 700)
    } catch (error) {
      toast.error(error);
    }
  };

  const upload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;
    const storageRef = reference(storage, `employees/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        toast.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setPhoto(downloadUrl);
          toast.success("Photo uploaded !");
        });
      }
    );
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const employeeId = props.match.params.id;
    get(child(dbRef, `employees/${employeeId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEmployee(snapshot.val());
          toast.success("Employee Loaded !");
        } else {
          toast.error("Employee does not exists !");
          window.location.assign("/employees");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const _photo = employee ? employee.photo : "";
  const _firstName = employee ? employee.firstName : "";
  const _lastName = employee ? employee.lastName : "";
  const _cin = employee ? employee.cin : "";
  const _informations = employee ? employee.informations : "";
  return (
    <div className='add-employee'>
      <ToastContainer/>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>Edit employee</p>
        </div>
        <div className='col-md-6 mx-auto mt-3'>
          <form onSubmit={(e)=>{handleUpdate(e, employee._id)}}>
              <label className='text-light' for="Photo">Photo</label>
              <input type="file" className='form-control' onChange={(e)=>{upload(e)}}/>
              <br/>
              <label className='text-light' for="first-name">First Name</label>
              <input defaultValue={_firstName} type="text" placeholder='Fisrt Name' className='form-control' onChange={(e)=>{setFirstName(e.target.value)}}/>
              <br/>
              <label className='text-light' for="last-name">Last Name</label>
              <input defaultValue={_lastName} type="text" placeholder='Last Name' className='form-control' onChange={(e)=>{setLastName(e.target.value)}}/>
              <br/>
              <label className='text-light' for="cin">Cin</label>
              <input defaultValue={_cin} type="text" placeholder='cin' className='form-control' onChange={(e)=>{setCin(e.target.value)}}/>
              <br/>
              <label className='text-light' for="infos">Informations</label>
              <textarea defaultValue={_informations} className='form-control'  onChange={(e)=>{setInformations(e.target.value)}}></textarea>
              <br/>
              <input type={"submit"} value="Save" className='btn btn-primary mb-5'/>
          </form>
        </div>
    </div>
  )
}
