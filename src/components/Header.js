import React from 'react'
import { useHistory, Link } from "react-router-dom";

export default function Header(props) {

    const history = useHistory();
    
    const logout = (e)=> {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        history.push("/");
    }
    return (
        <div className='col-md-10 mx-auto mt-2'>
            <header>
                <nav className='nav-bar bg-light ml-auto p-1'>
                    <button className='btn btn-danger invisible'>Logout</button>
                    <button onClick={logout} className='btn btn-danger float-right ml-2'>Logout</button>
                    {/*<Link to="/home" className='btn btn-secondary float-right'>Home</Link>*/}
                    <Link to="/notifications" type="button" className='btn btn-info float-right mr-2'>
                        Notifications&nbsp;
                        <span className='badge badge-danger d-none'>0</span>
                    </Link>
                    <Link to="/employees" className='btn btn-primary float-right mr-3'>Employees</Link>
                    <Link to="/suspects" className='btn btn-primary float-right mr-3'>Suspects</Link>
                    <Link to="/users" className='btn btn-primary float-right mr-3'>Users</Link>
                </nav>
            </header>
        </div>
    )
}
