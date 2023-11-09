import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login, isUserLoggedIn } from "../../actions/loginActions";
import './courses.css';
import { Link, useNavigate } from 'react-router-dom';
import { ModulesOne } from "./modulesone";
import { ModulesTwo } from "./modulestwo";
import SemTwo from './semtwo';
import axios from '../../helpers/axios';
import software from "../../assets/softwareengin.png";

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);
  const [condition, setcondition] = useState(true);
  const enabled = useState(false);
  const switchsem1 = () => {
    setSemestre("1")
    setcondition(true)
  };
  const switchsem2 = () => {
    setSemestre("2")
    setcondition(false)
  };
  const role = auth.user.role;

  const user = JSON.parse(localStorage.getItem('user'));
  const [semestre, setSemestre] = useState("1")
  const [subjects, setSubjects] = useState([])


  useEffect(() => {

    console.log(semestre)

    axios.post(`/subject/get_subjects?promoID=${user.user.promoID}`, {
      semestre: semestre
    })
    .then((res) => {
      if (res.status == 200) {
        setSubjects(res.data.subjects)
      }
    })
    .catch((err) => console.log(err.response.data.error))

  },[semestre])
  

  useEffect(() => {

    axios.post(`/subject/get_subjects?promoID=${user.user.promoID}`, {
      semestre: semestre
    })
    .then((res) => {
      if (res.status == 200) {
        setSubjects(res.data.subjects)
      }
    })
    .catch((err) => console.log(err.response.data.error))

  }, [])

  const toCourse = (moduleID,modulename) => {
    navigate('/api' + '/' + role + '/course', { state: { moduleID,modulename } });
  }

  return (
    <div className='courses-container'>
      <div className='top-courses'>
        <h1 className='courses-title'>Courses</h1>
        <div className='courses-nav'>

          <a onClick={switchsem1} className={condition ? 'link-open' : 'link'}>Semestre 1</a>

          <a onClick={switchsem2} className={condition ? 'link' : 'link-open'}>Semestre 2</a>

        </div>
      </div>



      <div className='modules'>{subjects.map((item, key) => {
        return (

          <div className='module' key={key}>
            <a onClick={() => { toCourse(item._id,item.name
              ) }}><button>Access</button></a>
            <img src={software} />

            <div className='text'>
              <h1>{item.name}</h1>

            </div>
          </div>

        );
      })}</div>



    </div>);
}
export default Courses;