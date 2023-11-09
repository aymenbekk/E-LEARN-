import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../../actions/loginActions';
import { useDispatch, useSelector } from "react-redux";
import axios from '../../../helpers/axios'
import "./styles.css"
import CalendarStBySemester from './calendarStBySemester';
import Loading from '../Loading/Loading';
export default function CalendarSt() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const user = JSON.parse(localStorage.getItem('user'))

    const [promo, setPromo] = useState()
    const [semestre, setSemestre] = useState("1")

    useEffect(() => {
        dispatch(isUserLoggedIn());
    }, []);

    useEffect(() => {

        axios.get(`/promo/get_promoByID?promoID=${user.user.promoID}`)
            .then((res) => {
                if (res.status == 200) {
                    setPromo(res.data.promo)
                    console.log(res.data.promo)
                }
            })
            .catch((err) => console.log(err.response.data.error))

    }, [])
    const [condition, setcondition] = useState(true);

    const switchsem1 = () => {
        setSemestre("1")
        setcondition(true)
    };
    const switchsem2 = () => {
        setSemestre("2")
        setcondition(false)
    };

    console.log("calenderSt ", semestre)
    return (
        <div className='settings-container'>
            <h1 > Emploi de temps</h1>
            <div>
                <ul className='settings-nav'>
                    <li ><a onClick={switchsem1} className={condition ? 'link-open' : 'link'}>Semestre 1</a></li>

                    <li ><a onClick={switchsem2} className={condition ? 'link' : 'link-open'}>Semestre 2</a></li>
                </ul>
            </div>

            {promo != null ? <div className='info-container'>

                {condition ? <CalendarStBySemester

                    promoID={promo._id}
                    promo={promo}
                    semestre={semestre} />
                    : <CalendarStBySemester

                        promoID={promo._id}
                        promo={promo}
                        semestre={semestre} />}
            </div> : <Loading />}

        </div>
        // <div>calendarStudent</div>
    )


}
