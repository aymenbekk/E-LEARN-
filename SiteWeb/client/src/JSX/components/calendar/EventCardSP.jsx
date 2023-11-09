import React, { useState, useEffect } from 'react'
import './eventCardSPstyles.css'
import { fontSize } from '@mui/system';

export default function EventCardSP(props) {

    const [startt, setStartt] = useState()
    const [endd, setEndd] = useState()


    const points = (start, end) => {
        if (start.length == 3) setStartt(start.substring(0,1)+ ":" + start.substring(1))
        else setStartt(start.substring(0,2)+ ":" + start.substring(2))

        if (end.length == 3) setEndd(end.substring(0,1)+ ":" + end.substring(1))
        else setEndd(end.substring(0,2)+ ":" + end.substring(2))
    }

    useEffect(()=> {
        points(props.start, props.end)
    }, [])




    return (
        <div className="event-card">
            <div className="event-card-body">
                <div className="left-part">
                    <div className="event-card-starttiming"> {startt} </div>
                    <div className="event-card-endtiming"> {endd} </div>
                </div>
                <div className="somespace-div"></div>
                <div className="center-part">
                    <div className="ligne1">
                        <div className="event-card-type"> {props.type}</div>

                    </div>
                    <div className="ligne2">

                        <div className="event-card-title"> {props.title} </div>
                    </div>
                    <div className="ligne3">
                        <div className="event-card-prof"> {props.prof} </div>
                        <div className="event-card-group"> {props.group} </div>
                        <div className="event-card-salle"> {props.salle}</div>
                    </div>
                </div>
                <div className="right-part">
                    <button className="button-delete-container"

                    // onClick={ }
                    >
                        {/* <ClearIcon
                            sx={{ fontSize: 20 }}
                            className="button-delete"
                        /> */}

                    </button>

                </div>




            </div>

        </div>

    )

}