import React from 'react'

export default function Header() {
    const logout = (e)=> {
        localStorage.removeItem("token")
        window.location.assign("/")
    }
    return (
        <div className='col-md-10 mx-auto mt-2'>
            <header>
                <nav className='nav-bar bg-light ml-auto p-1'>
                    <button className='btn btn-danger invisible'>Logout</button>
                    <button onClick={logout} className='btn btn-danger float-right ml-2'>Logout</button>
                    <button onClick={()=>{window.location.assign("/employees")}} className='btn btn-secondary float-right'>Home</button>
                </nav>
            </header>
        </div>
    )
}
