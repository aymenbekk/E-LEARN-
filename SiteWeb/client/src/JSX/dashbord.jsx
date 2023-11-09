import React, { useEffect } from "react";
import "../CSS/stylesLogin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../actions/loginActions";
//import jwt from "jsonwebtoken"
import UploadAction from "../actions/uploadActions";
import { UploadStudents, UploadTeachers } from "../JSX/upload";
import DownloadAction from "../actions/downloadActions";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "../CSS/dashad.css";
import { Chart, registerables } from "chart.js";
import './upload.css';
import { useState } from "react";
import axios from '../helpers/axios'
Chart.register(...registerables);

const Dashboard = (props) => {
  const navigate = useNavigate();


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);
  const auth = useSelector((state) => state.auth);
  const data = {
    labels: [
      "sept",
      "oct",
      "nov",
      "dec",
      "jan",
      "febr",
      "march",
      "april",
      "may",
      "june",
    ],
    datasets: [
      {
        data: [50, 120, 80, 10, 30, 15, 5, 75],
        fill: false,
        backgroundColor: "white",
        borderColor: "#44cb81",
        pointBorderColor: "#aeb6c1",
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };
  const options = {
    plugins: { legend: { display: false } },

    scales: {
      y: {
        ticks: {
          color: "#aeb6c1",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#aeb6c1",
        },
      },
      x: {
        ticks: {
          color: "#aeb6c1",
          font: {
            size: 13,
          },
        },
      },
    },
  };
  const [studentnb, setStudentnb] = useState(0)
  const [teachernb, setTeachernb] = useState(0)  
  const data2 = {
    labels: ["Etudiants", "Enseignants"],
    datasets: [
      {
        data: [studentnb, teachernb],
        backgroundColor: ["#44cb81", "#e4b12f"],
      },
    ],
  };
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  if (!auth.authenticated) {
    navigate("/login");
  }

 


  useEffect(() => {

    axios.get('student/get_students')
            .then((res) => {
              if (res.status == 400) console.log("Error get Students")
              else if (res.data.students) setStudentnb(res.data.students.length)
              else console.log("Aucun etudiant exist")
            })
    axios.get('/teacher/get_allTeachers')
        .then((res) => {
              setTeachernb(res.data.teachers.length)
         })
        .catch((err) => console.log(err.response.data.error))        

  })




  // UploadAction only shows up in enseignant dashboard

  return (
    <div className="dashad-container">
      <h1 className="title-dash">Tableau de Bord</h1>
      <div className="roles"></div>
      <div className="charts">
        <div className="chart-line">
          <h3>Assiduité OverView</h3>
          <Line data={data} options={options} />
        </div>
        <div className="chart-cercle">
          <Doughnut data={data2} />
        </div>
        <div className="values">
          <div className="val-box">
            <span className="first-icon" style={{ background: "#44cb81" }}>
              <FaUserGraduate />
            </span>
            <div>
              <h3>Etudiants</h3>
              <span className="number">{studentnb}</span>
            </div>
          </div>
          <div className="val-box">
            <span className="first-icon" style={{ background: "#e4b12f" }}>
              <FaChalkboardTeacher />
            </span>
            <div>
              <h3>Enseignants</h3>
              <span className="number">{teachernb}</span>
            </div>
          </div>
        </div>
      </div>

      {/* <UploadAction props="enseignant" /> */}
      <br></br>
     
      {/* <DownloadAction />
      <DownloadAction /> */}

      <div className="uploadSection">
        <div className="studentSection" id="uploadSec">
          <h3 style={{
            margin: "5px",
          }}>  Upload Etudiants </h3>
          <UploadStudents />
        </div>
        <div className="teacherSection" id="uploadSec">
          <h3 style={{
            margin: "5px",
          }}>  Upload Enseignants </h3>
          <UploadTeachers />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
