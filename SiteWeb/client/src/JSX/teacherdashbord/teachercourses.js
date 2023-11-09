import React, { Component, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import english from "../../assets/english.jpg";
import software from "../../assets/softwareengin.png";
import { useDispatch, useSelector } from "react-redux";
import { login, isUserLoggedIn } from "../../actions/loginActions";
import axios from "../../helpers/axios";
const Teachercourses = (props) => {
  const auth = useSelector((state) => state.auth);
  const role = auth.user.role;
  const navigate = useNavigate();
  //   const handleClick = () => {
  //     navigate("/api" + "/" + role + "/upload");
  //   };
  const toCourse = (subjectID) => {
    navigate("/api" + "/" + role + "/upload", { state: { subjectID } });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);
  const [modules, setmodules] = useState([]);

  useEffect(() => {
    axios
      .get(`/teacher/get_teacherSubjects?teacherEmail=${auth.user.email}`)
      .then((res) => {
        if (res.status == 200) {
          setmodules(res.data.teacherSubjects);
          console.log(res.data.teacherSubjects);
        }
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  return (
    <div>
      <h1 className="teacher-module-title">Mes Modules</h1>
      <div className="modules-teacher">
        {modules.map((item) => {
          return (
            <div className="module">
              <a
                onClick={() => {
                  toCourse(item.subjectID._id);
                }}
              >
                <button>Acceder</button>
              </a>
              <img src={software} />

              <div className="text">
                <h1>{item.subjectID.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Teachercourses;
