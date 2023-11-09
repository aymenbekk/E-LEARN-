import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../actions/loginActions';
import Note from './note';
import axios from '../../helpers/axios'
import './notestyle.css'
import Notification from '../components/notification/notification';
function NotesPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const auth = useSelector(state => state.auth)

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }

    const [notes, setNotes] = useState([]);

    useEffect(() => {

        axios.get(`/note/notes_by_user_id?userId=${user.id}&type=single`)
            .then(res => {

                if (res.status == 200) setNotes(res.data.notes)
                else if (res.status == 400) console.log(res.data.error)

            })

    }, []);

    const addNote = (color) => {

        const array = [...notes];

        axios.post('/note/create', {
            title: "",
            content: "",
            color: color,
            userID: user.id
        }).then(res => {
            array.push(res.data.note)
            setNotes(array)
        })
    }

    const deleteNote = (id) => {

        const array = [...notes];
        const i = array.findIndex((item) => item._id === id);//fetch for index ta3 note ta3na fe array
        if (i < 0) return;
        array.splice(i, 1);//at position i remove 1 element
        setNotes(array);

        axios.post('/note/deleteNote', {
            id
        }).then(res => {
            if (res.status == 200) setNotify({
                isOpen: true, message: "Note supprimée", type: 'success'
            })
            else console.log(res.data.error)
        })
    };

    function updateText(title, body, id) {

        axios.post('/note/updateNote', {
            id,
            title,
            body
        }).then(res => {
            if (res.status == 200)
                setNotify({
                    isOpen: true, message: "Note Updated", type: 'success'
                })
        })
    };

    const reversNotes = (arr) => {
        const array = [];
        for (let i = arr.length - 1; i >= 0; --i) {
            array.push(arr[i]);
            //    console.log(arr[i])
        }
        return array;
    };

    const revnotes = reversNotes(notes);
    const colors = ["#44cb81", "#aeb6c1", " #4694BE", "#7C9E97", "#D1B587"];

    const [listOpen, setListOpen] = useState(false);
    const changecolor = () => {
        setListOpen(!listOpen);

    }

    return (<div className='notes-page'>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        <div className='top-part'>
            <h1 className='title-notes'>Notes</h1>
            <button className='add-note' onClick={changecolor}>Ajouter Note</button>

            <ul className={listOpen ? 'list' : 'list-closed'}>
                {colors.map((item, index) => (
                    <li
                        key={index}
                        className="color"

                        style={{ backgroundColor: item }}
                        onClick={() => addNote(item)}
                    />
                ))}
            </ul>
        </div>

        <div className='notes-container'>
            {notes.length > 0 ? (

                revnotes.map((item) => (
                    <Note key={item._id}
                        note={item}
                        deleteNote={deleteNote}
                        updateText={updateText} />
                ))
            ) : (<h3>Il n'y a aucune note à afficher</h3>)}

        </div>

    </div>);
}
export default NotesPage;