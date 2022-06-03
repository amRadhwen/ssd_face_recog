import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

export default function Users() {
  return (
    <div className='users'>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>List of users</p>
        </div>
        <div className='col-md-10 mx-auto mt-3' style={{textAlign: "center"}}>
          <Link className='btn btn-primary' to="add-user">New User</Link>
        </div>
        <div className='col-md-10 mx-auto mt-3'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Photo</th>
                <th>First name</th>
                <th>Last name</th>
                <th>CIN</th>
                <th>Email</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}
