import React, { Component, useState,useEffect } from 'react';
import ReactFlexyTable from 'react-flexy-table'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../actions/loginActions';

import deleteIcon from '../../../assets/delete-button.svg'
import editIcon from '../../../assets/edit-button.svg'
import "./managegroup.css"
import {ImSearch} from "react-icons/im"
import axios from "../../../helpers/axios"
import Notification from '../../components/notification/notification';

function ManageGroup2(){
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    useEffect(() => {

        dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }


  const [groups,setGroups]=useState([])
  const [value,setvalue]=useState("");
  const [isOpen, setIsOpen] = useState(false);
  const[name,setname]=useState("");
  const[selectedyearID, setselectedyearID]=useState("");
  const[years,setyears]=useState([])
  const [filter,setfilter]=useState("");

  useEffect(() => {

    axios.get('/group/get_all_groups')
      .then((res) => {
        if (res.status == 200) {
          setGroups(res.data.groups)
          console.log(res.data.groups)
        }
      })
      .catch((err) => console.log(err.response.data.error))

    axios.get('/promo/get_promos')
      .then((res) => {

          if (res.status == 400) console.log("Erreur get Years")
          if (res.status == 200) {
              if (res.data.promos) {
                  setyears(res.data.promos)
              } else console.log("Aucune année exist")
          }
      })
      .catch((err) => console.log(err.response.data.error))  

  }, [])

  const addGroup=()=>{

    const array=[...groups];

    axios.post(`/group/create_group?promoID=${selectedyearID}`, {
      name: name
    })
    .then((res) => {
      if (res.status == 200) {
        array.push(res.data.group)
        setGroups(array)
        setNotify({
          isOpen: true, message:"Groupe Ajouté", type: 'success'})
      }
    })
    .catch((err) => setNotify({
          isOpen: true, message:err.response.data.error, type: 'error'}))
          setname("");
          setselectedyearID("");
          
    togglePopup();

}

const deleteGroup = (group, index) => {
  
  if (group.studentNumber != 0) console.log("Vous pouvez supprimer ce group (nombre d'étudient > 0)")
  else {
    const arr = [...groups]

    axios.post(`/group/delete_group?groupID=${group._id}`, {
      promoID: group.promoID
    })
    .then((res) => {
        if (res.status ==200) {
          console.log(res.data.result)
          arr.splice(index, 1)
          setGroups(arr)
        }
        }).catch((err) => console.log(err.response.data.error))
  }
}

  const handleChange = (e) => {
    setselectedyearID(e.target.value);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const v=value.toLowerCase()
  const search=()=>{
    let x = false;
    let array=[];
    if(value!="")
  groups.forEach(element => {
    
    if (element.name.toLowerCase()==v && filter=="Groupe"){
      array.push(element)
      x=true;
    }
     if( element.promoID.name.toLowerCase() == v && filter =="Année") {
      array.push(element)
      x=true;
     }
  
     if( element.promoID.speciality.toLowerCase()==v && filter=="Specialité"){
      array.push(element)
      x=true;
    }

   
  });
  if(value=="" || filter =="" )
  array=[...groups];
  if(value!=""&& filter=="")
  array=[...groups];
  if(x==false && value!="")
  array=[];
  return array;
   }
   const array=search();
   const handlefilterchange=(e)=>{
    setfilter(e.target.value)
    }
    return(<div className='tab-container'>
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
<h1>Gestion des Groupes</h1>
<div className='search-container'>
<input className='fetch-input' placeholder='Rechercher'  onChange={(e)=>setvalue(e.target.value)} />
<select onChange={handlefilterchange}>
      <option value="">- - Select - -</option>
      <option>Groupe</option>
      <option>Année</option>
      <option>Specialité</option>
    </select>
<span onClick={search(value)}>  <ImSearch/></span>

<button  onClick={togglePopup}>Ajouter Groupe</button>
</div>
{isOpen &&<div className="popup-box">
      <div className="box-module">
        <span className="close-icon-mod" onClick={togglePopup}>x</span>
        <div className='sous-box'>
        <input className='' placeholder='Entrer Groupe'  onChange={(e)=>setname(e.target.value)} />
        <select className='selection'   onChange={handleChange}  >
          <option> - - Select Speciality - - </option>
   {years.map((item)=><option value={item._id}>{item.name} {item.speciality}</option>)}
        </select>
<button className='add-student' onClick={()=>addGroup()}>Ajouter</button>
        </div>     
      </div>
    </div>}
    <div className='modulestable_container'>
<table>
  <thead>
    <tr>
      <th>Groupe</th>
      <th>Année</th>
      <th>Specialité</th>
      <th>Total Etudiants</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
   {array.map((item)=>{
     return(<tr>
       <td>{item.name}</td>
       <td>{item.promoID.name}</td>
       <td>{item.promoID.speciality}</td>
       <td>{item.studentNumber}</td>
       <td className='actions_buttons'>
       <img
              src={deleteIcon}
              width='30'
              height='20'
              onClick={() => deleteGroup(item, array.indexOf(item))}
              
            />
            <img
              src={editIcon}
              width='30'
              height='20'
              onClick={() => console.log()}/>
       </td>
     </tr>)
   })}
  </tbody>
</table>
</div>

    </div>);
}
export default ManageGroup2;