import React from 'react';
import { useState } from "react";
import Calendar from '../../components/calendar/calendar';
import "./promos.css";

export default function BlocTabs(props) {


    function DisplayCalendarTab(props) {
        return (<div>
            {/* <h2>{props.promo.name} {props.promo.speciality}</h2> */}
            <hr style={{
                height: "2px",
                backgroundColor: "#44cb81",
                border: "none",
            }} />
            <br />
            <Calendar
                promoID={props.promoID}
                promo={props.promo}
                semestre={props.semestre}
            />
        </div>)
    }


    return (

        <div className="containerpromo">
            <div className="bloc-tabs">
                <button
                    className={props.toggleState === props.promoID.concat(props.semestre) ? "tabs active-tabs" : "tabs"}
                    onClick={() => props.toggleTab(props.promoID.concat(props.semestre))}
                >
                    {props.promo.name} {props.promo.speciality}
                </button>
            </div>
            <div className="content-tabs">
                <div
                    className={props.toggleState === props.promoID.concat(props.semestre) ? "content  active-content" : "content"}
                >
                    {props.toggleState === props.promoID.concat(props.semestre) ? (
                        DisplayCalendarTab(props)
                    ) : (<div></div>)}
                </div>
            </div>
        </div>
    )
}
