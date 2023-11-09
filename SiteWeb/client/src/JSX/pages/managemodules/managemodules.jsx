import React, { Component, useState,useEffect } from 'react';
import ReactFlexyTable from 'react-flexy-table'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../actions/loginActions';
import './managemodules.css'
import deleteIcon from '../../../assets/delete-button.svg'
import editIcon from '../../../assets/edit-button.svg'
import showmore from '../../../assets/showmore.svg'
import "../managegroup/managegroup.css"
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import {ImSearch} from "react-icons/im"
import axios from '../../../helpers/axios';
import Notification from '../../components/notification/notification';
function ManageModules(){
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [value,setvalue]=useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const[name,setName]=useState("");
    const [semestre, setSemestre] = useState("")
    const[selectedYearID, setSelectedyearID]=useState("");
    const [filter,setfilter]=useState("");
    const auth = useSelector(state => state.auth)
    useEffect(() => {

        dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }

const [modules,setModules]=useState([]);
const[years,setyears]=useState([])

 useEffect(() => {

  axios.get('/subject/get_allSubjects')
    .then((res) => {
      if (res.status == 200) {
        setModules(res.data.subjects)
        console.log(res.data.subjects)
      }
    }).catch((err) => console.log(err.response.data.error))

    axios.get('/promo/get_promos')
            .then((res) => {

                if (res.status == 200) {
                    if (res.data.promos) {
                        setyears(res.data.promos)
                        console.log(res.data.promos)
                    } 
                }
            })
            .catch((err) => console.log(err.response.data.error))

 }, [])

  const handleChange = (e) => {
    setSelectedyearID(e.target.value);
  };

  const addModule = () => {

    const array=[...modules];

    axios.post(`/subject/create_subject?promoID=${selectedYearID}`,{
      name: name,
      semestre: semestre
    })
    .then((res) => {
      if (res.status == 200) {
        array.push(res.data.subject)
        setModules(array)
        setNotify({
          isOpen: true, message:"Module ajouté", type: 'success'})
      }
    }).catch((err) => setNotify({
      isOpen: true, message: err.response.data.error, type: 'error'
  }))
  setName("");
  setSemestre("")
  setSelectedyearID("");
    togglePopup()

  }

  const deleteModule = (subjectID, index) => {
    axios.post('/subject/delete_subject', {
      subjectID: subjectID
    })
    .then((res) => {
      if (res.status == 200) {

        const arr = [...modules]
        arr.splice(index, 1)
        setModules(arr)
        setNotify({
          isOpen: true, message:"Module Supprimé", type: 'success'})
      }
    }).catch(err => setNotify({
      isOpen: true, message: err.response.data.error, type: 'error'
  })) 
  }




 

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
const v=value.toLowerCase()
 const search=()=>{
  let x = false;
  let array=[];
  if(value!="")
modules.forEach(element => {
  
  if (element.name.toLowerCase()==v && filter=="Module"){
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
  if(element.semestre.toLowerCase()==v && filter=="Semestre"){
    array.push(element)
    x=true;
  }
 
});
if(value=="" || filter =="" )
array=[...modules];
if(value!=""&& filter=="")
array=[...modules];
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
<h1>Gestion des Modules</h1>
<div className='search-container'>
<input className='fetch-input' placeholder='Rechercher'  onChange={(e)=>setvalue(e.target.value)} />

<select onChange={handlefilterchange}>
      <option value="">- - Select - -</option>
      <option>Module</option>
      <option>Année</option>
      <option>Specialité</option>
      <option>Semestre</option>
    </select>
    <span onClick={search(value)}>  <ImSearch/></span>
<button  onClick={togglePopup}>Ajouter module</button>
</div>

{isOpen &&<div className="popup-box">
      <div className="box-module">
        
        <span className="close-icon-mod" onClick={togglePopup}>x</span>
        <div className='sous-box'>
        <input value={name} className='' placeholder='Entrer Module'  onChange={(e)=>setName(e.target.value)} />
        <input value={semestre} className='' placeholder='Entrer Semestre'  onChange={(e)=>setSemestre(e.target.value)} />
        <select className='selection'   onChange={handleChange}  >
<option> - - Select Speciality - - </option>
   {years.map((item)=><option value={item._id}>{item.name} {item.speciality}</option>)}
        </select>
<button className='add-student' onClick={()=>addModule()}>Ajouter</button>
</div>
        </div> 
      </div>
 }
<div className='modulestable_container'>
<table>
  <thead>
    <tr>
      <th>Module</th>
      <th>Année</th>
      <th>Specialité</th>
      <th>Semestre</th>
      <th>Enseignants</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
   {array.map((item)=>{
     return(<tr>
       <td>{item.name}</td>
       <td>{item.promoID.name}</td>
       <td>{item.promoID.speciality}</td>
       <td>{item.semestre}</td>
       <td>
       <div className='teachersdrop_container'>
        
          <a href="#">Hover</a>
          <MdOutlineKeyboardArrowDown className='arrow--down'/>
          <div className='teachersdrop'>
           {item.teachers.map((itemm)=><li>{itemm.teacherID.firstName} {itemm.teacherID.firstName} {itemm.type}</li>)}
          </div>
       
      </div>
       </td>
       <td className='actions_buttons'>
       <img
              src={deleteIcon}
              width='30'
              height='20'
              onClick={() => deleteModule(item._id, array.indexOf(item))}
              
            />
            <img
              src={editIcon}
              width='30'
              height='20'
              onClick={() => console.log()
              }/>
       </td>
     </tr>)
   })}
  </tbody>
</table>
</div>
    </div>);
}
export default ManageModules;