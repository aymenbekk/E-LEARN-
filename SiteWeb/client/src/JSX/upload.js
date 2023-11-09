import React, { useEffect } from "react";
import "../CSS/stylesLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../actions/loginActions";
import "./upload.css";
import link from "../assets/link-svgrepo-com.svg";
export const UploadRessource = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  if (!auth.authenticated) {
    navigate("/login");
  }

  return (
    <div>
      <form
        action="/api/upload_file"
        encType="multipart/form-data"
        method="POST"
      >
        <input type="file" name="file"></input>
        <button>Submitt</button>
      </form>
    </div>
  );
};

export const UploadStudents = (props) => {
  return (
    <div>
      <form
        className="formUpload"
        action="/api/add/students"
        encType="multipart/form-data"
        method="POST"
      >
        <label for="padd1" className="form-label">
          <input
            className="input-upload"
            id="padd1"
            type="file"
            name="students"
          ></input>
          <img className="form-icon" src={link} height="25px" />

          <span className="form-text"> Choisir un fichier </span>
          <button className="btn-upload" id="padd">
            Upload Etudiants
          </button>
        </label>
      </form>
    </div>
  );
};

export const UploadTeachers = (props) => {
  return (
    <div>
      <form
        className="formUpload"
        action="/api/add/teachers"
        encType="multipart/form-data"
        method="POST"
      >
        <label for="padd2" className="form-label">
          <input
            className="input-upload"
            id="padd2"
            type="file"
            name="teachers"
          ></input>
          <img className="form-icon" src={link} height="25px" />

          <span className="form-text"> Choisir un fichier </span>
          <button className="btn-upload" id="padd">
            Upload Enseignants
          </button>
        </label>
      </form>
    </div>
  );
};
