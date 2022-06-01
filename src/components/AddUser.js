import React from 'react'
import Header from './Header'

export default function AddUser() {
  return (
    <div className='add-user'>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>Add new user</p>
        </div>
        <div className='col-md-6 mx-auto mt-3'>
          <form>
              <label className='text-light' for="first-name">First Name</label>
              <input type="text" placeholder='Fisrt Name' className='form-control'/>
              <br/>
              <label className='text-light' for="last-name">Last Name</label>
              <input type="text" placeholder='Last Name' className='form-control'/>
              <br/>
              <label className='text-light' for="phone">Phone</label>
              <input type="text" placeholder='phone' className='form-control'/>
              <br/>
              <label className='text-light' for="cin">Cin</label>
              <input type="text" placeholder='cin' className='form-control'/>
              <br/>
              <label className='text-light' for="email">Email</label>
              <input type={"email"} placeholder="Email" className='form-control'/>
              <br/>
              <input type={"submit"} value="ADD" className='btn btn-primary mb-5'/>
          </form>
        </div>
    </div>
  )
}
