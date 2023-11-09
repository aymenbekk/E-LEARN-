import React, { useState, useRef, useEffect } from 'react'
import "react-datetime/css/react-datetime.css";
import "./styles.css"
import axios from '../../../helpers/axios';
import Loading from '../Loading/Loading';
import EventCardSP from './EventCardSP';


export default function CalendarStBySemester(props) {

  const [promo, setPromo] = useState(props.promo)
  const [semestre, setSemestre] = useState(props.semestre)

  const [eventitems, setItems] = useState([]);
  const [schedule, setSchedule] = useState();
  const [classess, setClassess] = useState([])

  useEffect(() => {

    setSemestre(props.semestre)

        setClassess(null)

        axios.post(`/schedule/getSchedule?promoID=${promo._id}`, {
            semestre: props.semestre
        })
            .then(async (res) => {

                if (res.status == 200) {

                    if (res.data.schedule) {
                        console.log(res.data.schedule)
                        setSchedule(res.data.schedule)
                        //const ordred = await res.data.schedule.classList.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));
                        setClassess(res.data.schedule.classList)
                    }
                    else console.log("Schedule not found")

                }
               
            }).catch((err) => console.log(err.response.data.error))

  }, [props.semestre])



  const deleteClass = (classID) => {
    axios.post(`/schedule/deleteClass?classID=${classID}`, {
      promoID: props.promo._id
    })
      .then((res) => {
        if (res.status == 400) console.log(res.data.error)
        else {

          const array = [...classess]
          const i = array.findIndex((item) => item._id === classID);
          if (i < 0) return;
          array.splice(i, 1);
          setClassess(array);
        }
      })
  }


  const orderClasses = (array) => {
    if (array == null) return null
    return array.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));
  }

  const ordredClasses = orderClasses(classess)


  console.log("calendarSem", semestre);



  return (

    <div>

    {ordredClasses != null && classess != null ? 


    <div className="flex-container">
      <div className="flex-child magenta" >
        <div className="day-title">
          <h2>Dimanche</h2>
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

          <h2>Lundi</h2>

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
                deleteClass={deleteClass}
              />

            }

          })}


        </div>

      </div>

      <div class="flex-child green">
        <div className="day-title">

          <h2>Mardi</h2>

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
                deleteClass={deleteClass}
              />

            }

          })}
        </div>




      </div>

      <div class="flex-child green">
        <div className="day-title">

          <h2>Mercredi</h2>

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
              deleteClass={deleteClass}
            />
          }
        })}
      </div>

      <div className="flex-child green">
        <div className="day-title">

          <h2>Jeudi</h2>

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
              deleteClass={deleteClass}

            //nzido hiden={ role=prof or role=student inside EventCard}
            />

          }

        })}



      </div>
    </div > : <Loading/> }

    </div>
  )
}
