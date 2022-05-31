import React from 'react'
import Header from './Header'

export default function Suspects() {
  return (
    <div className='suspects'>
        <Header/>
        <div className='col-md-10 mx-auto mt-3'>
          <p className='text-center h1 text-info text-uppercase'>List of suspects</p>
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