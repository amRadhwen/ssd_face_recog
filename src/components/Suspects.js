import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";

export default function Suspects() {
  const [suspects, setSuspects] = useState([]);
  useEffect(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "suspects/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
          setSuspects(Object.values(data));
          toast.success("Suspects loaded !")
        }
      });
    } catch (e) {
      toast.error(e)
    }
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Delete Suspects ?")) {try {
      const db = getDatabase();
      const removed = remove(ref(db, "suspects/"+id));
      const new_suspects_list = suspects.filter(suspect=>{
        return suspect._id !== id;
      })
      setSuspects(new_suspects_list);
      toast.success("Suspect Removed")
    }
    catch(error) {
      toast.error(error);
    }}
  }
  
  const view = suspects.length ? (
    suspects.map(suspect=> {
      const key = new Date().getTime().toString();
      return (
        <tr key={key} className="text-white">
          <td><img width={"50"} src={suspect.photo} /></td>
          <td>{suspect.firstName}</td>
          <td>{suspect.lastName}</td>
          <td>{suspect.cin}</td>
          <td>{suspect.informations}</td>
          <td><button onClick={(e)=>{handleDelete(e, suspect._id)}} className="btn btn-danger">Delete</button></td>
          <td><Link to={`suspects/${suspect._id}`} className="btn btn-primary">Update</Link></td>
        </tr>
      )
    })
  ) : <tr><td className="text-center text-danger h4 text-uppercase" colSpan={7}>No Suspect !</td></tr>;

  return (
    <div className="suspects">
      <ToastContainer/>
      <Header/>
      <div className="col-md-10 mx-auto mt-3">
        <p className="text-center h1 text-info text-uppercase">
          List of suspects
        </p>
      </div>
      <div className="col-md-10 mx-auto mt-3" style={{ textAlign: "center" }}>
        <Link className="btn btn-primary" to="add-suspect">
          New Suspect
        </Link>
      </div>
      <div className="col-md-10 mx-auto mt-3">
        <table className="table">
          <thead className="thead-dark">
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
           {view}
          </tbody>
        </table>
      </div>
    </div>
  );
}
