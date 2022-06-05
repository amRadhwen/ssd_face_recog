import React, { useState, useEffect } from 'react'
import { app } from "../config/firebase-config";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import {ToastContainer, toast} from "react-toastify";


const Signin = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async (e, id) => {
        e.preventDefault();

        const authentification = getAuth();
        try {
            const user = await signInWithEmailAndPassword(authentification, email, password);
            if(user.user.email === "admin@ssdrfc.com") {
                localStorage.setItem("admin", true);
            }
            localStorage.setItem("token", user._tokenResponse.refreshToken);
            history.push("/notifications");
        }
        catch(error) {
            if(error.code === "auth/wrong-password") {
                toast.error("Please check password !");
            }
            if(error.code === "auth/user-not-found") {
                toast.error("Please check the email !");
            }
            console.log(error.code)
        }
        
    }


    return (
        <div className='signin'>
            <ToastContainer/>
            <div className='col-md-12'>
                <form onSubmit={(e)=>{handleSignin(e, 2)}}>
                    <h1>Login</h1>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className='form-control' type={"email"} id="email" placeholder='Enter your email'/>
                    <input onChange={(e)=>{setPassword(e.target.value)}} className='form-control' type={"password"} id="password" placeholder='Password'/>
                    <p>
                        <a href='/reset-password'>Forgot Password ?</a>
                    </p>
                    <input className="btn btn-primary" type="submit" value="Login" />
                </form>
                <div className='alert alert-danger text-center invisible' id="alert"/>
            </div>
        </div>
    )
}

export default Signin