import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import {ToastContainer, toast} from "react-toastify";

export default function Employees() {
  
  

  return (
    <div className='employees'>
        <ToastContainer/>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>List of employees</p>
        </div>
        <div className='col-md-10 mx-auto mt-3' style={{textAlign: "center"}}>
          <Link className='btn btn-primary' to="add-employee">New Employee</Link>
        </div>
        <div className='col-md-10 mx-auto mt-3'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Photo</th>
                <th>First name</th>
                <th>Last name</th>
                <th>CIN</th>
                <th>Informations</th>
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
