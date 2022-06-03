import React, {useState} from 'react'
import Header from './Header'
import {storage} from "../config/firebase-config";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {ToastContainer, toast} from "react-toastify";
import SuspectDataService from "../config/Suspect.service"

export default function AddEmployee() {
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
    const storageRef = ref(storage, `employees/${file.name}`);
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
    const data = {
      firstName,
      lastName,
      cin,
      informations,
      photo
    }
    SuspectDataService.create(data).then(()=> {
      toast.success("New Employee created !")
    })
    .catch(err=>{
      toast.error(err);
    })
  }
  
  return (
    <div className='add-employee'>
    <ToastContainer/>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>Add new employee</p>
        </div>
        <div className='col-md-6 mx-auto mt-3'>
          <form onSubmit={handleSubmit}>
              <label className='text-light' for="Photo">Photo</label>
              <input type="file" className='form-control' onChange={upload} />
              <br/>
              <label className='text-light' for="first-name">First Name</label>
              <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" placeholder='Fisrt Name' className='form-control'/>
              <br/>
              <label className='text-light' for="last-name">Last Name</label>
              <input onChange={(e)=>{setLastName(e.target.value)}}  type="text" placeholder='Last Name' className='form-control'/>
              <br/>
              <label className='text-light' for="cin">Cin</label>
              <input onChange={(e)=>{setCin(e.target.value)}}  type="text" placeholder='cin' className='form-control'/>
              <br/>
              <label className='text-light' for="infos">Informations</label>
              <textarea onChange={(e)=>{setInformations(e.target.value)}}  className='form-control'></textarea>
              <br/>
              <input type={"submit"} value="ADD" className='btn btn-primary mb-5'/>
          </form>
        </div>
    </div>
  )
}
