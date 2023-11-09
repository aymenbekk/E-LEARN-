import React, { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../actions/loginActions';
import "./promos.css"
import Modal from 'react-modal';
import Calendar from '../../components/calendar/calendar';
// import "react-datetime/css/react-datetime.css";
import axios from '../../../helpers/axios'
import BlocTabs from './BlocTabs'
import Loading from '../../components/Loading/Loading';
// import Notification from '../../components/notification/notification';



Modal.setAppElement('#root');


export default function Promos(props) {




    function DisplayCalendarTab(item) {
        return (<div>
            <h2>{item.name} {item.speciality}</h2>
            <hr />
            {/* <p>
                this is {item.name} PAGE
            </p> */}
            <Calendar
                promoID={item._id}
                promo={item}
            />

        </div>)
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth)
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(props.semestre)

    useEffect(() => {

        dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }

    const [toggleState, setToggleState] = useState("");

    const toggleTab = (index) => {
        setToggleState(index);

    };

    const [promos, setPromos] = useState([])

    const [semestre, setSemestre] = useState(props.semestre)


    useEffect(() => {

        setSemestre(props.semestre)

        axios.get('/promo/get_promos')
            .then((res) => {

                if (res.status == 400) alert("Promo Error")
                if (res.status == 200) {
                    if (res.data.promos) {
                        setPromos(res.data.promos)
                        console.log(res.data.promos)
                    } else alert("No promo found")
                }
            })
            .catch((err) => console.log(err))
    }, [props.semestre])

    return (

        <div className="container-promo">

            {promos.length > 0 ? (
                promos.map((item) =>
                    <BlocTabs
                        promo={item}
                        promoID={item._id}
                        toggleTab={toggleTab}
                        toggleState={toggleState}
                        semestre={semestre}
                    />
                )

            ) : (
                <Loading />

                // <h3>Retreiving Promos ...</h3>
            )
            }
        </div>
    );






}




