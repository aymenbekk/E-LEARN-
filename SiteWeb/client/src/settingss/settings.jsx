import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './settingsstyle.css';
import Profil from "../settingss/Profile/profil";
import Editpass from '../settingss/Profile/editpass';
import { login, isUserLoggedIn } from "../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
function Settings() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isUserLoggedIn());
    }, []);
    const [condition, setcondition] = useState(true);
    const switchprofil = () => setcondition(true);
    const switcheditpass = () => setcondition(false);
    console.log(condition);
    return (

        <div className='settings-container'>
            <h1 > Settings</h1>
            <div>
                <ul className='settings-nav'>
                    <li ><a onClick={switchprofil} className={condition ? 'link-open' : 'link'}>Profile</a></li>

                    <li ><a onClick={switcheditpass} className={condition ? 'link' : 'link-open'}>Changer Mot de Passe</a></li>
                </ul>
            </div>
            <div className='info-container'>{condition ? <Profil /> : <Editpass />}</div>

        </div>)
}
export default Settings;