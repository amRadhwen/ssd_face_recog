import React, { useState, useEffect } from "react";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Notifications() {
  const [notifs, setNotifs] = useState(null);

  useEffect(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "captured/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setNotifs(Object.values(data));
          toast.success("Notifications loaded !");
        }
      });
    } catch (e) {
      toast.error(e);
    }
  }, []);


  const view = notifs && notifs.length ? notifs.map(notif=>{
    const key = new Date().getTime().toString();
    return (
      <div className="image-card" key={key}>
        <span>New Face Detected !</span>
        <img src={notif.image} alt="Card image cap"/>
      </div>
    )
  }) : <p>Empty Notifications List !</p>

  return (
    <div className="notifications">
      <ToastContainer />
      <Header />
      <div className="col-md-10 mx-auto mt-3">
        <p className="text-center h1 text-info text-uppercase">Notifications</p>
      </div>
      <div className="col-md-10 mx-auto mt-3">
        {view}
      </div>
    </div>
  );
}
