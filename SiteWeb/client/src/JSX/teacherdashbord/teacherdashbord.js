import React, { useEffect } from "react";
import "../../CSS/stylesLogin.css";
import { useNavigate } from "react-router-dom";
import english from "../../assets/english.jpg";
import settings from "../../assets/settings.jpg";
import courses from "../../assets/courses.jpg";
import anouncement from "../../assets/anouncement.jpg";
import upload from "../../assets/upload.jpg";

//import jwt from "jsonwebtoken"
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../../actions/loginActions";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const role = auth.user.role;

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/api" + "/" + role + "/courses");
  };
  const handleClick2 = () => {
    navigate("/api" + "/" + role + "/anouncements");
  };
  const handleClick3 = () => {
    navigate("/api" + "/" + role + "/grades");
  };
  const handleClick4 = () => {
    navigate("/api" + "/" + role + "/settings");
  };

  // UploadAction only shows up in enseignant dashboard

  return (
    <div>
      <div className="title">Tableau de Bord</div>
      <br></br>
      <div className="subtitle">M./Mme {auth.user.firstName} </div>

      <div className="student-dashboard">
        <div className="modules">
          <div className="card">
            <img src={upload} />
            <div className="text">
              <br></br>
              <h1>Upload les Cours</h1>
              <br></br>
              <button onClick={handleClick1}> Upload</button>
            </div>
          </div>
          <div className="card">
            <img src={anouncement} />
            <div className="text">
              <br></br>
              <h1>Journal</h1>
              <br></br>
              <button onClick={handleClick2}>Acceder</button>
            </div>
          </div>
          <div className="card">
            <img src={settings} />
            <div className="text">
              <br></br>
              <h1>Vers Settings</h1>
              <br></br>
              <button onClick={handleClick4}>Acceder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
