import React, {useState} from 'react'
import Header from './Header'
import { getDatabase } from 'firebase/database';
import {storage} from "../config/firebase-config";
import {ref as reference, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {ref, set, push} from "firebase/database";
import {ToastContainer, toast} from "react-toastify";

export default function AddSuspect() {

  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cin, setCin] = useState("");
  const [informations, setInformations] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const upload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if(!file) return;
    const storageRef = reference(storage, `suspects/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot)=> {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgresspercent(progress);
    },
    (error)=> {
      toast.error(error);
    },
    ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=> {
        setImgUrl(downloadUrl);
        setPhoto(downloadUrl);
        toast.success("Photo uploaded !");
      })
    }
    )
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    const db = getDatabase();
    const userId = new Date().getTime().toString();
    try {
      set(ref(db, "suspects/"+userId), {
        _id: userId,
        photo: photo,
        firstName: firstName,
        cin: cin,
        lastName: lastName,
        informations: informations
      })
      toast.success("New Suspect added !")
      setTimeout(()=>{
        window.location.assign("/suspects");
      }, 700)
    }
    catch(e) {
      toast.error(e);
    }
  }

  return (
    <div className='add-suspect'>
        <Header/>
        <ToastContainer/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>Add new suspect</p>
        </div>
        <div className='col-md-6 mx-auto mt-3'>
          <form onSubmit={handleSubmit}>
              <label className='text-light' htmlFor="Photo">Photo</label>
              <input type="file" className='form-control' onChange={(e)=>{upload(e)}}/>
              <br/>
              <label className='text-light' htmlFor="first-name">First Name</label>
              <input type="text" placeholder='Fisrt Name' className='form-control' onChange={(e)=>{setFirstName(e.target.value)}}/>
              <br/>
              <label className='text-light' htmlFor="last-name">Last Name</label>
              <input type="text" placeholder='Last Name' className='form-control' onChange={(e)=>{setLastName(e.target.value)}}/>
              <br/>
              <label className='text-light' htmlFor="cin">Cin</label>
              <input type="text" placeholder='cin' className='form-control' onChange={(e)=>{setCin(e.target.value)}}/>
              <br/>
              <label className='text-light' htmlFor="infos">Informations</label>
              <textarea className='form-control'  onChange={(e)=>{setInformations(e.target.value)}}></textarea>
              <br/>
              <input type={"submit"} value="ADD" className='btn btn-primary mb-5'/>
          </form>
        </div>
    </div>
  )
}
