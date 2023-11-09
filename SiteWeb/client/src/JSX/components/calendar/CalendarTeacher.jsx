import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../../actions/loginActions';
import { useDispatch, useSelector } from "react-redux";
import CalendarTeaBySemester from './CalendarTeaBySemester';
export default function CalendarTeacher() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const [semestre, setSemestre] = useState("1")

    useEffect(() => {
        dispatch(isUserLoggedIn());
    }, []);

    const [condition, setcondition] = useState(true);

    const switchsem1 = () => {
        setSemestre("1")
        setcondition(true)
      };
      const switchsem2 = () => {
        setSemestre("2")
        setcondition(false)
      };
    return (
        <div className='settings-container'>
            <h1>Calendar</h1>
            <div>
                <ul className='settings-nav'>
                    <li ><a onClick={switchsem1} className={condition ? 'link-open' : 'link'}>Semester 1</a></li>

                    <li ><a onClick={switchsem2} className={condition ? 'link' : 'link-open'}>Semester 2</a></li>
                </ul>
            </div>
            <div className='info-container'>{condition  ? <CalendarTeaBySemester
    
                semestre={semestre} />
                : <CalendarTeaBySemester   
                semestre={semestre}  />}
            </div>
        </div>
    )
}
