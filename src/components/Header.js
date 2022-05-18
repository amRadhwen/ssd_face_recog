import React from 'react'

export default function Header() {
    return (
        <div className='col-md-10 mx-auto mt-2'>
            <header>
                <nav className='nav-bar bg-light'>
                    <button className='btn btn-danger'>Logout</button>
                </nav>
            </header>
        </div>
    )
}
