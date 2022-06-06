import React, {useState, useEffect} from 'react'
import { useHistory, Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import { getDatabase, ref, onValue, remove } from "firebase/database";

export default function Header(props) {

    const [notifs, setNotifs] = useState(null);

    const history = useHistory();
    
    const logout = (e)=> {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        history.push("/");
    }

    useEffect(()=>{
        try {
            const db = getDatabase();
            const starCountRef = ref(db, "captured/");
            onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();
              if(data){
                setNotifs(Object.values(data));  
                console.log("Notifs loaded !")
              }
            });
          } catch (e) {
              console.log(e)
          }
    }, []);

    const view = notifs && notifs.length ? (
        notifs.filter(notif=>{
            return notif.seen == false
        }).length
    ) : "";

    if(parseInt(view) > 0) {
        toast.info("New Notifications !!");
    }

    return (
        <div className='col-md-10 mx-auto mt-2'>
        <ToastContainer/>
            <header>
                <nav className='nav-bar bg-light ml-auto p-1'>
                    <button className='btn btn-danger invisible'>Logout</button>
                    <button onClick={logout} className='btn btn-danger float-right ml-2'>Logout</button>
                    {/*<Link to="/home" className='btn btn-secondary float-right'>Home</Link>*/}
                    <Link to="/notifications" type="button" className='btn btn-info float-right mr-2'>
                        Notifications&nbsp;
                        <span className='badge badge-danger'>{view}</span>
                    </Link>
                    <Link to="/employees" className='btn btn-primary float-right mr-3'>Employees</Link>
                    <Link to="/suspects" className='btn btn-primary float-right mr-3'>Suspects</Link>
                    <Link to="/users" className='btn btn-primary float-right mr-3'>Users</Link>
                </nav>
            </header>
        </div>
    )
}
