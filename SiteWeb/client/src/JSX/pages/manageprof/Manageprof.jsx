import React, { Component, useState,useEffect } from 'react';
import ReactFlexyTable from 'react-flexy-table'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../actions/loginActions';
import showmore from '../../../assets/showmore.svg'
import deleteIcon from '../../../assets/delete-button.svg'
import editIcon from '../../../assets/edit-button.svg'
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import {ImSearch} from "react-icons/im"
import "../managegroup/managegroup.css"
import "./manageprof.css"
import axios from '../../../helpers/axios';
import Notification from '../../components/notification/notification';

function Manageprof(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [nom,setnom]=useState("");
const [prenom,setprenom]=useState("");
const [selectedmoduleID, setselectedmoduleID]=useState("");
const[selectedtype, setselectedtype]=useState("");
const [selectedprofID,setselectedprofID]=useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
const [value,setvalue]=useState("");
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(isUserLoggedIn())
    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }

  const [profs,setprofs]=useState([])

  const [lesmodules,setlesmodules]=useState([])
    //popup states
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const [editedTeacher, setEditedTeacher] = useState("")
  const [index, setIndex] = useState("")

  const [filter,setfilter]=useState("");
  useEffect(() => {

    axios.get('/teacher/get_allTeachers')
      .then((res) => {
        setprofs(res.data.teachers)
      })
      .catch((err) => console.log(err.response.data.error))

    axios.get('/subject/get_allSubjects')
      .then((res) => setlesmodules(res.data.subjects))
      .catch((err) => console.log(err.response.data.error))   

  }, [])

//info states


//functions
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const togglePopup2 = (teacherID) => {
    setIsOpen2(!isOpen2);
    setselectedprofID(teacherID)
  }

const handlemodulechange = (e) => {
  setselectedmoduleID(e.target.value);}

const handletypechange=(e)=>{
  setselectedtype(e.target.value)
}
const addprof=()=>{

  const arr = [...profs]

  axios.post('/teacher/create_teacher', {
    firstName: nom,
    lastName: prenom,
    email: email,
    password: password
  })
  .then((res) => {
    console.log(res.data.teacher)
    console.log(res.data.teacher.firstName + ' ' + res.data.teacher.lastName + " is added")
    arr.push(res.data.teacher)
    setprofs(arr)
    setNotify({
      isOpen: true, message:"Prof ajouté", type: 'success'})
  })
  .catch((err) => setNotify({
    isOpen: true, message: err.response.data.error, type: 'error'
}))
setnom("");
setprenom("");
setEmail("");
setPassword("");
  togglePopup();
}

const deleteTeacher = (teacher, index) => {

  const arr = [...profs]

  axios.post('/teacher/delete_teacher', {
    teacher: teacher
  })
  .then((res) => {
    if (res.status == 200) {
      console.log(teacher.firstName + ' ' + teacher.lastName + ' ' + "is deleted")
      arr.splice(index, 1)
      setprofs(arr)
      setNotify({
        isOpen: true, message:"Prof supprimé", type: 'success'})
    }
  })
  .catch((err) => setNotify({
    isOpen: true, message: err.response.data.error, type: 'error'
}))

}
const addmodule = () => {

  axios.post('/teacher/affect_subjectTeacher', {
    teacherID: selectedprofID,
    subjectID: selectedmoduleID,
    type: selectedtype
  })
  .then((res) => {
    if (res.status == 200) setNotify({
      isOpen: true, message: "Module est affecté succussflly", type: 'success'
  })
  })
  .catch((err) => setNotify({
    isOpen: true, message: err.response.data.error, type: 'error'
}))
setselectedmoduleID("");
setselectedtype("");
togglePopup2();
}
  
function editprof(){

  const arr = [...profs]

  console.log(editedTeacher)
  console.log(nom)
  console.log(email)
  console.log(prenom)

  axios.post(`/teacher/update_teacher?teacherID=${editedTeacher}`, {
    firstName: nom,
    lastName: prenom,
    email: email
  })
  .then((res) => {
    if (res.status == 200) {

      console.log(res.data.teacher)

      arr[index] = res.data.teacher;
      setprofs(arr)
      console.log("Enseignant est modifié")

    }
  })
  .catch((err) => console.log(err.response.data.error))


  setIsOpen3(!isOpen3);
}
const togglePopup3=(item, index)=>{
  setEditedTeacher(item._id)
  setnom(item.firstName);
  setprenom(item.lastName);
  setEmail(item.email)
  setIndex(index)
  setIsOpen3(!isOpen3);
}
const v=value.toLowerCase()
 const search=()=>{
  let x = false;
  let array=[];
  if(value!="")
profs.forEach(element => {
  
  if (element.firstName.toLowerCase()==v && filter=="Nom"){
    array.push(element)
    x=true;
  }
   if( element.lastName.toLowerCase() == v && filter =="Prenom") {
    array.push(element)
    x=true;
   }

   if( element.email.toLowerCase()==v && filter=="Email"){
    array.push(element)
    x=true;
  }

 
});
if(value=="" || filter =="" )
array=[...profs];
if(value!=""&& filter=="")
array=[...profs];
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
<h1>Gestion des Enseignants</h1>
<div className='search-container'>
<input className='fetch-input' placeholder='Rechercher'  onChange={(e)=>setvalue(e.target.value)} />
<select onChange={handlefilterchange}>
      <option value="">- - Select - -</option>
      <option>Nom</option>
      <option>Prenom</option>
      <option>Email</option>
    </select>
    <span onClick={search(value)}>  <ImSearch/></span>
<button class="ajouter-prof" onClick={togglePopup}>Ajouter Prof
</button>
</div>
{/* //Add Prof Pop Up */}
{isOpen &&<div className="popup-box">
      <div className="box-student">
        <span className="close-icon-prof" onClick={togglePopup}>x</span>
        <div className='sous-box'>
        <div className='info-perso-prof'>
        <input className='' placeholder='Entrer Prof nom'  onChange={(e)=>setnom(e.target.value)} />
        <input className='' placeholder='Entrer Prof prenom'  onChange={(e)=>setprenom(e.target.value)} />
        </div>
        <div className='email-pass-form'>
        <input className='' placeholder='Entrer Email'  onChange={(e)=>setEmail(e.target.value)} />
        <input className='' placeholder='Entrer password'  onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button className='add-prof' onClick={addprof} >Submit</button>
        </div> 
      </div>
    </div>}  
    {/* //Affecter module a prof */}
{isOpen2 &&
 <div className="popup-box">
  <div className='box-module'>
  <span className="close-icon-mod" onClick={togglePopup2}>x</span>
  <div className='sous-box' >

        <select className='selection'  onChange={handlemodulechange}  >
        <option>- - Select  Module  - -</option>
           {lesmodules.map((item)=><option value={item._id}>{item.name}</option>)}
        </select>
        <select className='selection'  onChange={handletypechange}  >
          <option>- - Select  Type  - -</option>
          <option>TD</option>
          <option>TP</option>
          <option>Cours</option>
        </select>
        <button className="add-student" onClick={addmodule} >Add</button>
        </div>
        </div>
  </div>}
  {isOpen3 && <div className="popup-box">
      <div className="edit-student">
        <span className="close-icon-stud" onClick={togglePopup3}>x</span>
        <div >
          <div className='info-perso'>
          <input value={nom} className='' placeholder='Entrer  nom'  onChange={(e)=>setnom(e.target.value)} />
        <input value={prenom} className='' placeholder='Entrer prenom'  onChange={(e)=>setprenom(e.target.value)} />
            </div>
        <div className='email-pass-form'>
        <input value={email} className='' placeholder='Entrer Email'  onChange={(e)=>setEmail(e.target.value)} />
      
        </div>
       
<button  onClick={()=> editprof() }>Editer</button>
        </div> 
      </div>
    </div>}
    <div className='modulestable_container'>
<table>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Prenom</th>
      <th>Email</th>
      <th>Modules</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
   {array.map((item,index)=>{
     return(<tr>
       <td>{item.firstName}</td>
       <td>{item.lastName}</td>
       <td>{item.email}</td>
       <td>
   
        
       <div className='teachersdrop_container'>
        
        <a href="#">Hover</a>
        <MdOutlineKeyboardArrowDown className='arrow--down'/>
        <div className='teachersdrop'>
         {item.subjects.map((itemm)=><li>{itemm.subjectID.name} {itemm.type}</li>)}
        </div>
     
    </div>

       </td>
       <td className='actions_buttons'>
       <img
              src={showmore}
              width='30'
              height='20'
              onClick={()=>togglePopup2(item._id)}
              
            />
          <img
              src={deleteIcon}
              width='30'
              height='20'
              onClick={() => deleteTeacher(item, index)}
              
            />
            <img
              src={editIcon}
              width='30'
              height='20'
              onClick={() =>  togglePopup3(item, profs.indexOf(item))
              }/>
       </td>
     </tr>)
   })}
  </tbody>
</table>
</div>


    </div>);
}
export default Manageprof;