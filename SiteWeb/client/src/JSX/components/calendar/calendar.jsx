import React, { useState, useRef, useEffect } from 'react'
import "react-datetime/css/react-datetime.css";
import "./calendar.css"
import CustomizedDialogs from '../addEvent/AddEDialog';
import axios from '../../../helpers/axios';
import AddSevent from '../addEvent/AddSevent';
import EventCard from '../addEvent/EventCard';
import Loading from '../Loading/Loading';

export default function Calendar(props) {

    const [promo, setPromo] = useState(props.promo)
    const [semestre, setSemestre] = useState(props.semestre)

    const [eventitems, setItems] = useState([]);
    const [schedule, setSchedule] = useState();
    const [classess, setClassess] = useState([])

    const days = ["dimanche", "lundi"]

    useEffect(() => {

        setSemestre(props.semestre)

        setClassess(null)


        axios.post(`/schedule/getSchedule?promoID=${promo._id}`, {
            semestre: props.semestre
        })
            .then(async (res) => {

                if (res.status == 400) alert(res.data.error)
                else if (res.data.schedule) {
                    console.log(res.data.schedule)
                    setSchedule(res.data.schedule)
                    //const ordred = await res.data.schedule.classList.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));
                    setClassess(res.data.schedule.classList)
                }
                else alert("Schedule not found")
            })

    }, [props.semestre])

    const addClass = (day,
        subject,
        teacher,
        type,
        group,
        salle,
        start,
        end,
        semestre,
        promoName,
        promoSpeciality) => {

        const array = [...classess]

        console.log("day", day)
        console.log("subject", subject)


        axios.post(`/schedule/addClass?promoID=${props.promo._id}`, {
            day: day,
            subject: subject,
            teacher: teacher,
            type: type,
            group: group,
            salle: salle,
            start: start,
            end: end,
            semestre: semestre,
            promoName: promoName,
            promoSpeciality: promoSpeciality
        })

            .then(async (res) => {

                if (res.status == 400) alert(JSON.stringify(res.data.error))
                else if (res.data) {

                    axios.post(`/schedule/getLastClass?promoID=${props.promo._id}`, {
                        semestre: semestre
                    })  // we just need to get the last one in the ClassList (last pushed)
                        .then((res) => {
                            if (res.data) {

                                array.push(res.data.class)
                                setClassess(array)

                            } else alert("data error")

                        })
                        .catch((err) => console.log(err))

                }
                else alert("data Error")
            }).catch((err) => console.log(err.response.data.error))
    }

    const deleteClass = (classID, semestre) => {

        axios.post(`/schedule/deleteClass?classID=${classID}`, {
            promoID: props.promo._id,
            semestre: semestre
        })
            .then((res) => {
                if (res.status == 200) {

                    const array = [...classess]
                    const i = array.findIndex((item) => item._id === classID);
                    if (i < 0) return;
                    array.splice(i, 1);
                    setClassess(array);

                    console.log("class deleted")
                }
            }).catch((err) => console.log(err.response.data.error))

    }

    const orderClasses = (array) => {
        if (array == null) return null
        else return array.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));

    }

    const ordredClasses = orderClasses(classess)


    console.log("calendarSem", semestre);



    return (


        <div>
        {ordredClasses != null && classess != null ? 
             <div className="flex-container">
        
             <div className="flex-child magenta" >
                 <div className="day-title">
                     <h2>Sunday</h2>
                 </div>
                 <div className="event-list">
                     {ordredClasses.map((item, index) => {
                         if (item.day == "dimanche") {
                             return <EventCard
                                 id={item._id}
                                 group={item.groupID.name}
                                 title={item.subjectID.name}
                                 start={item.start}
                                 end={item.end}
                                 salle={item.salleID}
                                 type={item.type}
                                 prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                                 semestre= {semestre}
                                deleteClass={deleteClass}
                             />
        
                         }
        
                     })}
        
                 </div>
                 <div className="add-event-btn">

                    {schedule != undefined ? (

                        <CustomizedDialogs title="Ajouter Séance">
                            <AddSevent
                                promo={promo}
                                day="dimanche"
                                semestre={semestre}
                                addClass={addClass}
                            />
                        </CustomizedDialogs>

                    ) : (null)}
                </div>
        
        
        
        
        
             </div>
        
             <div class="flex-child green">
                 <div className="day-title">
        
                     <h2>Monday</h2>
        
                 </div>
        
                 <div className="event-list">
        
                     {ordredClasses.map((item, index) => {
        
                         if (item.day == "lundi") {
        
                             return <EventCard
                                 id={item._id}
                                 group={item.groupID.name}
                                 title={item.subjectID.name}
                                 start={item.start}
                                 end={item.end}
                                 salle={item.salleID}
                                 type={item.type}
                                 prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                                 semestre= {semestre}
                                deleteClass={deleteClass}
                             />
        
                         }
        
                     })}
        
        
                 </div>
                 <div className="add-event-btn">

                    {schedule != undefined ? (

                        <CustomizedDialogs title="Ajouter Séance">
                            <AddSevent
                                promo={promo}
                                day="lundi"
                                semestre={semestre}
                                addClass={addClass}
                            />
                        </CustomizedDialogs>

                    ) : (null)}
                </div>
        
             </div>
        
             <div class="flex-child green">
                 <div className="day-title">
        
                     <h2>Tuesday</h2>
        
                 </div>
                 <div className="event-list">
                     {ordredClasses.map((item, index) => {
        
                         if (item.day == "mardi") {
        
                             return <EventCard
                                 id={item._id}
                                 group={item.groupID.name}
                                 title={item.subjectID.name}
                                 start={item.start}
                                 end={item.end}
                                 salle={item.salleID}
                                 type={item.type}
                                 prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                                 semestre= {semestre}
                                deleteClass={deleteClass}
                         
                             />
        
                         }
        
                     })}
                 </div>
                 <div className="add-event-btn">

                    {schedule != undefined ? (

                        <CustomizedDialogs title="Ajouter Séance">
                            <AddSevent
                                promo={promo}
                                day="mardi"
                                semestre={semestre}
                                addClass={addClass}
                            />
                        </CustomizedDialogs>

                    ) : (null)}
                </div>
        
        
        
        
             </div>
        
             <div class="flex-child green">
                 <div className="day-title">
        
                     <h2>Wednesday</h2>
        
                 </div>
        
                 {ordredClasses.map((item, index) => {
        
                     if (item.day == "mercredi") {
        
                         return <EventCard
                             id={item._id}
                             group={item.groupID.name}
                             title={item.subjectID.name}
                             start={item.start}
                             end={item.end}
                             salle={item.salleID}
                             type={item.type}
                             prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                             semestre= {semestre}
                            deleteClass={deleteClass}
                           
                         />
                     }
                 })}
                 <div className="add-event-btn">

                        {schedule != undefined ? (

                            <CustomizedDialogs title="Ajouter Séance">
                                <AddSevent
                                    promo={promo}
                                    day="mercredi"
                                    semestre={semestre}
                                    addClass={addClass}
                                />
                            </CustomizedDialogs>

                        ) : (null)}
                        </div>
             </div>
             
        
             <div className="flex-child green">
                 <div className="day-title">
        
                     <h2>Thursday</h2>
        
                 </div>
        
                 {ordredClasses.map((item, index) => {
        
                     if (item.day == "jeudi") {
        
                         return <EventCard
                             id={item._id}
                             group={item.groupID.name}
                             title={item.subjectID.name}
                             start={item.start}
                             end={item.end}
                             salle={item.salleID}
                             type={item.type}
                             prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                             semestre= {semestre}
                            deleteClass={deleteClass}
                             
        
                         //nzido hiden={ role=prof or role=student inside EventCard}
                         />
        
                     }
        
                 })}

                        <div className="add-event-btn">

                        {schedule != undefined ? (

                            <CustomizedDialogs title="Ajouter Séance">
                                <AddSevent
                                    promo={promo}
                                    day="jeudi"
                                    semestre={semestre}
                                    addClass={addClass}
                                />
                            </CustomizedDialogs>

                        ) : (null)}
                        </div>
        
        
        
             </div>
             
         </div > : <Loading/>
                    }
        </div>
        // <section>
        //     <button className="addeventbtn" onClick={() => setModalOpen(true)}   >Add Event</button>
        //     <div style={{ position: "relative", zIndex: 0 }} >
        //         <FullCalendar
        //             ref={calendarRef}
        //             plugins={[dayGridPlugin, timeGridPlugin]}
        //             initialView="dayGridWeek"
        //             defaultView='timelineDay'



        //         />

        //     </div>
        //     <Addeventmodal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
        // </section>
    )
}
