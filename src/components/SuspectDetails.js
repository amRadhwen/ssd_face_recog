import React, { useState, useEffect } from "react";
import Header from "./Header";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import { storage } from "../config/firebase-config";
import {
  ref as reference,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export default function SuspectDetails(props) {
  const [suspect, setSuspect] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cin, setCin] = useState("");
  const [informations, setInformations] = useState("");

  const handleUpdate = async (e, suspectId) => {
    e.preventDefault();
    try {
      const db = getDatabase();
      const newSuspect = {
        photo: photo ? photo : suspect.photo,
        firstName: firstName ? firstName : suspect.firstName,
        lastName: lastName ? lastName : suspect.lastName,
        cin: cin ? cin : suspect.cin,
        informations: informations ? informations : suspect.informations,
      };
      const updates = {};
      //updates["/suspects" + suspectId] = newSuspect;
      const updated = await update(ref(db, `suspects/${suspectId}`), newSuspect);
      toast.success("Suspect updated !")
      setTimeout(()=> {
        window.location.assign("/suspects");
      }, 700)
    } catch (error) {
      toast.error(error);
    }
  };

  const upload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;
    const storageRef = reference(storage, `suspects/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        toast.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setPhoto(downloadUrl);
          toast.success("Photo uploaded !");
        });
      }
    );
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const suspectId = props.match.params.id;
    get(child(dbRef, `suspects/${suspectId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSuspect(snapshot.val());
          toast.success("Suspect Loaded !");
        } else {
          toast.error("Suspect does not exists !");
          window.location.assign("/suspects");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const _photo = suspect ? suspect.photo : "";
  const _firstName = suspect ? suspect.firstName : "";
  const _lastName = suspect ? suspect.lastName : "";
  const _cin = suspect ? suspect.cin : "";
  const _informations = suspect ? suspect.informations : "";

  return (
    <div className="add-suspect">
      <ToastContainer />
      <Header />
      <div className="col-md-10 mx-auto mt-3">
        <p className="text-center h1 text-info text-uppercase">Edit suspect</p>
      </div>
      <div className="col-md-6 mx-auto mt-3">
        <form
          onSubmit={(e) => {
            handleUpdate(e, suspect._id)
          }}
        >
          <label className="text-light" htmlFor="Photo">
            Photo
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              upload(e)
            }}
          />
          <br />
          <label className="text-light" htmlFor="first-name">
            First Name
          </label>
          <input
            type="text"
            placeholder="Fisrt Name"
            className="form-control"
            defaultValue={_firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <br />
          <label className="text-light" htmlFor="last-name">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="form-control"
            defaultValue={_lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <br />
          <label className="text-light" htmlFor="cin">
            Cin
          </label>
          <input
            type="text"
            placeholder="cin"
            className="form-control"
            defaultValue={_cin}
            onChange={(e) => {
              setCin(e.target.value);
            }}
          />
          <br />
          <label className="text-light" htmlFor="infos">
            Informations
          </label>
          <textarea
            className="form-control"
            onChange={(e) => {
              setInformations(e.target.value);
            }}
            defaultValue={_informations}
          ></textarea>
          <br />
          <input
            type={"submit"}
            value="Save"
            className="btn btn-primary mb-5"
          />
        </form>
      </div>
    </div>
  );
}
