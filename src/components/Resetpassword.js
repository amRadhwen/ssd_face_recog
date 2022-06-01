import React, {useState} from 'react'
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import {ToastContainer, toast} from "react-toastify";

const Resetpassword = () => {
  const [email, setEmail] = useState("");

  const pwdReset = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(()=> {
      toast.success("Reset Password Link sent !")
    })
    .catch(err=>{
      if( err.code === "auth/user-not-found") {
        toast.error("Please verify Email address !");
      }
    })
  }

  return (
      <div className='reset-password'>
      <ToastContainer/>
        <div className='col-md-12'>
                <form onSubmit={pwdReset}>
                    <h1>Reset Password</h1>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className='form-control' type={"email"} id="email" placeholder='Enter your email'/>
                    <input className="btn btn-primary" type="submit" value="Send E-mail" />
                </form>
            </div>
      </div>
  )
}

export default Resetpassword;
