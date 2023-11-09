import React, { Component, useState, useEffect } from 'react';

import Promos from './Promos'
import axios from '../../../helpers/axios'

import { isUserLoggedIn } from '../../../actions/loginActions';
import { useDispatch, useSelector } from "react-redux";
export default function PromosCalendar() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isUserLoggedIn());
    }, []);
    const [condition, setcondition] = useState(true);

    const [semestre, setSemestre] = useState("1")

    const switchsem1 = () => {
        setSemestre("1")
        setcondition(true)
    };
    const switchsem2 = () => {
        setSemestre("2")
        setcondition(false)
    };

    console.log("semestrePromosCalendar ", semestre)

    console.log(condition);


    return (
        <div>

            <div>
                <ul className='settings-nav'>
                    <li ><a onClick={switchsem1} className={condition ? 'link-open' : 'link'}>Semestre 1</a></li>

                    <li ><a onClick={switchsem2} className={condition ? 'link' : 'link-open'}>Semestre 2</a></li>
                </ul>
            </div>
            <div className='info-container'>{condition ?

                <Promos semestre={semestre} /> :

                <Promos semestre={semestre} />

            }</div>


        </div>


    )
}
