import React, { useState, useRef, useEffect } from 'react'
import "react-datetime/css/react-datetime.css";
import "./styles.css"
import axios from '../../../helpers/axios';
import Loading from '../Loading/Loading';
import EventCardSP from './EventCardSP';


export default function CalendarTeaBySemester(props) {

    const [semestre, setSemestre] = useState(props.semestre)

    const [classess, setClassess] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {

        setClassess(null)

        setSemestre(props.semestre)

        axios.post(`/schedule/get_teacherClasses`, {
            teacherID: user.userID,
            semestre: props.semestre
        })
            .then(async (res) => {

                if (res.status == 201) {
                    setClassess([])
                    console.log("No Class")
                }

                else if (res.status == 200) {

                    if (res.data.teacherClasses) {
                    
                        //const ordred = await res.data.teacherClasses.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));
                        setClassess(res.data.teacherClasses)
                    }

                }
               
            }).catch((err) => console.log(err.response.data.error))

    }, [props.semestre])
    


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
                     return <EventCardSP
                         id={item._id}
                         group={item.groupID.name}
                         title={item.subjectID.name}
                         start={item.start}
                         end={item.end}
                         salle={item.salleID.name}
                         type={item.type}
                         prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                     />

                 }

             })}

         </div>





     </div>

     <div class="flex-child green">
         <div className="day-title">

             <h2>Monday</h2>

         </div>

         <div className="event-list">

             {ordredClasses.map((item, index) => {

                 if (item.day == "lundi") {

                     return <EventCardSP
                         id={item._id}
                         group={item.groupID.name}
                         title={item.subjectID.name}
                         start={item.start}
                         end={item.end}
                         salle={item.salleID.name}
                         type={item.type}
                         prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                     />

                 }

             })}


         </div>

     </div>

     <div class="flex-child green">
         <div className="day-title">

             <h2>Tuesday</h2>

         </div>
         <div className="event-list">
             {ordredClasses.map((item, index) => {

                 if (item.day == "mardi") {

                     return <EventCardSP
                         id={item._id}
                         group={item.groupID.name}
                         title={item.subjectID.name}
                         start={item.start}
                         end={item.end}
                         salle={item.salleID.name}
                         type={item.type}
                         prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                 
                     />

                 }

             })}
         </div>




     </div>

     <div class="flex-child green">
         <div className="day-title">

             <h2>Wednesday</h2>

         </div>

         {ordredClasses.map((item, index) => {

             if (item.day == "mercredi") {

                 return <EventCardSP
                     id={item._id}
                     group={item.groupID.name}
                     title={item.subjectID.name}
                     start={item.start}
                     end={item.end}
                     salle={item.salleID.name}
                     type={item.type}
                     prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                   
                 />
             }
         })}
     </div>

     <div className="flex-child green">
         <div className="day-title">

             <h2>Thursday</h2>

         </div>

         {ordredClasses.map((item, index) => {

             if (item.day == "jeudi") {

                 return <EventCardSP
                     id={item._id}
                     group={item.groupID.name}
                     title={item.subjectID.name}
                     start={item.start}
                     end={item.end}
                     salle={item.salleID.name}
                     type={item.type}
                     prof={item.teacherID.firstName + ' ' + item.teacherID.lastName}
                     

                 //nzido hiden={ role=prof or role=student inside EventCard}
                 />

             }

         })}



     </div>
 </div > : <Loading/>
            }
</div>

        //loading component ... 
        //   <Loading/>
    )
}
