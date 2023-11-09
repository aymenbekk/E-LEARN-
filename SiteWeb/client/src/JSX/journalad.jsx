import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../actions/loginActions';
import axios from "../helpers/axios";
import profile from "../assets/profile.png";
function Journalad() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = useSelector(state => state.auth)
  const [body, setbody] = useState("");
  const [title, settitle] = useState("");
  const [selectedYear, setselectedYear] = useState("");
  const [selectedgroupID, setselectedgroupID] = useState("");
  const [type, settype] = useState("");
  const [years, setyears] = useState([]);
  const [groups, setgroups] = useState([]);
  const [updates, setupdates] = useState([]);
  useEffect(() => {

    dispatch(isUserLoggedIn())

  }, []);

  if (!auth.authenticated) {
    navigate('/login')
  }
  useEffect(() => {
    axios
      .get("/promo/get_promos")
      .then((res) => {
        if (res.status == 200) {
          setyears(res.data.promos);
        }
      })
      .catch((err) => console.log(err.response.data.error));

    axios
      .get(`/journal/get_sentJournals?senderID=${user.userID}`)
      .then((res) => {
        if (res.status == 200) {
          setupdates(res.data.journals);
        }
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);


  const handleyearchange = (e) => {
    const selectedPromo = JSON.parse(e.target.value);
    setselectedYear(selectedPromo);
    setgroups(selectedPromo.groupList);
  };
  const handlegroupchange = (e) => {
    setselectedgroupID(e.target.value);
  };
  function addanouncement() {
    const arr = [...updates];

    if (title == "") return console.log("Please Enter a title");
    else if (body == "") return console.log("Please Enter a Body");
    else if (!selectedYear) return console.log("Please select a year");
    else if (!selectedgroupID) return console.log("Please select a group");
    else {
      axios
        .post("/journal/send_journal", {
          title: title,
          body: body,
          senderID: user.userID,
          senderRole: user.role,
          promoID: selectedYear._id,
          groupID: selectedgroupID,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("announcement sent successflly");
            arr.unshift(res.data.journal);
            setupdates(arr);
            settitle("");
            setbody("");
          }
        })
        .catch((err) => console.log(err.response.data.error));
    }
  }
  return (<div>
    <div className="title">Journal</div>
    <div className="anouncements-container">
      <div className="anouncements-form">
        <input
          placeholder="Titre de l'Evenement"
          required
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <textarea
          className="addcourtextarea"
          placeholder="Message"
          required
          value={body}
          onChange={(e) => setbody(e.target.value)}
        />

        <br></br>
        <div>
          <select className="years-selection" onChange={handleyearchange}>
            <option> - - Select - - </option>
            {years.map((item) => {
              return (
                <option value={JSON.stringify(item)}>
                  {item.name} {item.speciality}
                </option>
              );
            })}
          </select>
          <select className="groups-selection" onChange={handlegroupchange}>
            <option> - - Select - - </option>
            {groups.map((item) => {
              return (
                <option value={item.groupID._id}>{item.groupID.name}</option>
              );
            })}
          </select>
        </div>
        <button onClick={addanouncement}>Envoyer</button>
      </div>

      <div className="updates-prof">
        {updates.length == "0" && <h2>Pas d'annonces </h2>}
        {updates.map((item) => {
          return (
            <div className="update">
              <div className="profile-photo">
                <img src={profile} />
              </div>
              <div>
                <p>
                  <b>{item.title} </b>
                  {item.body}
                </p>
                <small className="text-muted">
                  {" "}
                  Promo : {item.promoID.name} {item.promoID.speciality} ||
                  Group : {item.groupID.name}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>);
}
export default Journalad;