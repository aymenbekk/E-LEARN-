import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import english from '../../../assets/english.jpg'
import software from '../../../assets/softwareengin.png'
import './dashboardstyle.css'
import '../../../index.css';
import profile from '../../../assets/profile.png'
import { MdLooksOne } from "react-icons/md"
import { HiArrowNarrowRight } from 'react-icons/hi'
import { login, isUserLoggedIn } from "../../../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../../helpers/axios'
import { red } from '@material-ui/core/colors';


function Dashboardst() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [subjects, setSubjects] = useState([]);
    const auth = useSelector(state => state.auth)
    const [notes, setNotes] = useState([])
    const [receivedJournals, setReceivedJournals] = useState([])

    const user = JSON.parse(localStorage.getItem('user'));



    useEffect(() => {

        //?email=${auth.user.email}&type=single

        axios.get(`/note/notes_by_user_id?userId=${user.id}&type=single`)
            .then(res => {

                if (res.status == 200) setNotes(res.data.notes)
                else if (res.status == 400) console.log(res.data.error)

            })

        axios.get(`/subject/get_student_subjects?promoID=${user.user.promoID}`)
            .then((res) => {
                if (res.status == 200) {
                    setSubjects(res.data.subjects)
                }
            })
            .catch((err) => console.log(err.response.data.error))

        console.log(user.user.groupID)

        axios.get(`/journal/get_receivedJournals?groupID=${user.user.groupID}`)
            .then((res) => {
                if (res.status == 200) {
                    setReceivedJournals(res.data.journals)
                }
            })
            .catch((err) => console.log(err.response.data.error))

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }


    const reversNotes = (arr) => {
        const array = [];
        for (let i = arr.length - 1; i >= 0; --i) {
            array.push(arr[i]);
        }
        return array;
    };
    const revnotes = reversNotes(notes);
    let note1 = null;
    let note2 = null;
    let note3 = null;
    note1 = revnotes[0]?.title;
    note2 = revnotes[1]?.title;
    note3 = revnotes[2]?.title;


    let color1;
    let color2;
    let color3;
    if (note1 != null)
        color1 = revnotes[0]?.color;
    if (note2 != null)
        color2 = revnotes[1]?.color;
    if (note3 != null)
        color3 = revnotes[2]?.color;

    const toCourse = (moduleID) => {
        navigate('/api' + '/' + role + '/course', { state: { moduleID } });
    }



    const role = auth.user.role;
    return (<div className='student-dashboard'>
        <h1 className='title-dash'>Dashboard</h1>
        <div className='main-content'>
            <div className='modules'>

                {subjects.map((item, index) => {
                    if (index <= 4)
                        return (
                            <div className='module'>
                                <a onClick={() => { toCourse(item._id) }}>
                                    <button>Access</button></a>
                                <img src={software} />

                                <div className='text'>
                                    <h1>{item.name}</h1>

                                </div>
                                {/* <img src={software} />
                 <div className='text'>
                <h1>{item.name}
                </h1>
                <a onClick={() => { toCourse(item._id) }}><button>Access</button></a> */}
                                {/* </div> */}
                            </div>);
                })}


                <div className='see-courses'>

                    <Link to={'/api' + '/' + role + '/courses'} className='text'><span>Afficher</span> <span className='arrow-show'><HiArrowNarrowRight /></span> <br />  <span>Tous Les modules </span></Link>
                </div>
            </div>
            <div className='right-side'>
                <div className='recent-updates'>
                    <h2>Les nouvelles</h2>
                    <div className='updates'>
                        {receivedJournals.length == "0" && <h2>Pas d'annonces</h2>}
                        {receivedJournals.map((item) => {
                            return (<div className='update'>
                                <div className='profile-photo'>
                                    <img src={profile} />
                                </div>
                                <div>
                                    <p><b>{item.senderID.firstName} {item.senderID.lastName} : {item.title}</b>
                                        <br></br>
                                        <span>{item.body}</span>
                                    </p>
                                    <small className='text-muted'>{item.createdAt.substring(0., 10)}{" "}/{" "}{item.createdAt.substring(11, 16)}</small>
                                </div>
                            </div>);
                        })}


                    </div>
                </div>
                <div className='notes'>
                    <h2>Rappelez-vous ...</h2>
                    {notes.length == "0" && <h4>No Notes at the moment</h4>}
                    {note1 != null &&
                        <div className='note' style={{ background: color1 }} >
                            <div className='icon'>
                                <MdLooksOne />
                            </div>
                            <div className='right'>
                                <div className='info'>
                                    <h3>{note1}</h3>
                                    <small className='text-muted'>{revnotes[0]?.date.substring(0, 10)}</small>
                                </div>
                            </div>

                        </div>}
                    {note2 != null &&
                        <div className='note' style={{ background: color2 }}>
                            <div className='icon'>
                                <MdLooksOne />
                            </div>
                            <div className='right'>
                                <div className='info'>
                                    <h3>{note2}</h3>
                                    <small className='text-muted'>{revnotes[1]?.date.substring(0, 10)}</small>
                                </div>
                            </div>
                        </div>}
                    {note3 != null &&
                        <div className='note' style={{ background: color3 }}>
                            <div className='icon'>
                                <MdLooksOne />
                            </div>
                            <div className='right'>
                                <div className='info'>
                                    <h3>{note3}</h3>
                                    <small className='text-muted'>{revnotes[2]?.date.substring(0, 10)}</small>
                                </div>
                            </div>
                        </div>}
                    <div className='check-notes'>
                        <Link to={'/api' + '/' + role + '/notes'} className='text'>
                            <p>Consulter Tous</p>
                            <div className='last-arrow'>
                                <HiArrowNarrowRight />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}




export default Dashboardst;