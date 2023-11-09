import React, { Component,useState } from 'react';
import './notestyle.css';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
const Note=(props)=>{
    const setDate = (value) => {
        if (!value) return "";
    console.log(value);
        const date = new Date(value);
        const monthNames = [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];
    
        let hrs = date.getHours();
        let amPm = hrs >= 12 ? "PM" : "AM";
        hrs = hrs ? hrs : "12";
        hrs = hrs > 12 ? (hrs = hrs-12) : hrs;
    
        let min = date.getMinutes();
        min = min < 10 ? "0" + min : min;
    
        let day = date.getDate();
        const month = monthNames[date.getMonth()];
    
        return `${hrs}:${min} ${amPm} ${day} ${month}`;
      };
  const [titlee, settitlee] = useState("");
  const [bodyy, setbodyy] = useState("");
    return(
        <div className='noty' style={{ backgroundColor: props.note.color }}>
            <div className='note-input'>
            <input className='note-title' placeholder='Enter Title' defaultValue={props.note.title} onChange={(e)=>settitlee(e.target.value)} />
            <textarea className='note-bod' placeholder='Body' defaultValue={props.note.content} onChange={(event)=>setbodyy(event.target.value)}/>
            </div>
            <div className='note-footer'>
                <p>{props.note.date.substring(0, 10)}</p>
                <div className='note-icons'>
                <BsFillCheckSquareFill className='save' onClick={() => props.updateText(titlee,bodyy,props.note._id)}/>
                <AiFillDelete className='delete' onClick={() => props.deleteNote(props.note._id)} />
                </div>
            
            </div>
            
             
        </div>
    );
}
export default Note;