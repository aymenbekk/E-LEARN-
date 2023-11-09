import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../actions/loginActions';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import {ImSearch} from "react-icons/im"
import { Link } from "react-router-dom";
import "./database.css"
import deleteIcon from '../../../assets/delete-button.svg'
import editIcon from '../../../assets/edit-button.svg'
import axios from '../../../helpers/axios'
import Notification from '../../components/notification/notification';
import Modal from 'react-modal';
export default function Database() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [IsOpendelete,setIsOpendelete] =useState(false);
  const[name,setname]=useState("");
  const[prenom,setprenom]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[selectedyear, setselectedyear]=useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("")
  const [years, setyears] = useState([])
  const [students,setstudents]=useState([]);
  const [index, setIndex] = useState("")
  const [editedStd, setEditedStd] = useState("")

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [filter,setfilter]=useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
  
    useEffect(() => {

        dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }
        const addstudent=()=>{

            const array=[...students];

            axios.post('student/create_student', {
              firstName: name,
              lastName: prenom,
              email: email,
              password: password,
              promo: selectedyear,
              group: selectedGroup
            })
            .then((res) => {
              if (res.status == 200) {
                array.push(res.data.student)
                setstudents(array)
                setNotify({
                  isOpen: true, message:"Etudiant ajouté", type: 'success'})
              }
            }).catch(err =>    setNotify({
              isOpen: true, message: err.response.data.error, type: 'error'
          }))
          setEmail("");
          setname("");
          setprenom("");
          setPassword("");
          togglePopup();
        }
        const handleYearChange = (e) => {
          const yearItem = JSON.parse(e.target.value)
            setselectedyear(yearItem);
            console.log(yearItem)
            setGroups(yearItem.groupList)
            console.log(yearItem.groupList)
        };

        const handleGroupChange = (e) => {
          const groupItem = JSON.parse(e.target.value)
          console.log(groupItem)
          setSelectedGroup(groupItem);
        };
        const [value,setvalue]=useState("");
        const togglePopup = async () => {

          //await getYears();

          setIsOpen(!isOpen);
        }
       
        

          useEffect(() => {
            axios.get('student/get_students')
            .then((res) => {
              if (res.status == 400) setError("Error get Students")
              else if (res.data.students) setstudents(res.data.students)
              else setError("Aucun etudiant exist")
            })
            axios.get('/promo/get_promos')
            .then((res) => {

                if (res.status == 400) setError("Erreur get Years")
                if (res.status == 200) {
                    if (res.data.promos) {
                        setyears(res.data.promos)
                        console.log(res.data.promos)
                    } else setError("Aucune année exist")
                }
            })
            .catch((err) => console.log(err.response.data.error))

          }, [])


          const deleteStudent = (email, groupID, groupStudentNumber, index) => {

            const arr = [...students]
            

            axios.post('/student/delete_student', {
              email: email,
              groupStudentNumber: groupStudentNumber,
              groupID: groupID
            })
            .then((res) => {
              if (res.status ==200) {
                console.log(res.data.result)
                arr.splice(index, 1)
                setstudents(arr)
                setNotify({
                  isOpen: true, message: "etudiant supprimé", type: 'success'
              })
              }
            }).catch((err) =>    setNotify({
              isOpen: true, message: err.response.data.error, type: 'success'
          }))
          }

          const v=value.toLowerCase();
        const search=()=>{
            let x = false;
            let array=[];
            if(value!="")
           
          students.forEach(element => {
            
            if (element.firstName.toLowerCase()==v && filter=="Nom"){
              array.push(element)
              x=true;
            }
            if( element.lastName.toLowerCase()==v && filter=="Prenom")
            {
              array.push(element)
              x=true;
            }
            if( element.email.toLowerCase()==v && filter=="Email"){
              array.push(element)
              x=true;
            }  
            if( element.year.toLowerCase()==v && filter=="Année"){
              array.push(element)
              x=true;
            }
             if( element.speciality.toLowerCase()==v && filter=="Specialité"){
              array.push(element)
              x=true;
            }
           
          });
           if(value=="" || filter =="" )
          array=[...students];
          if(value!=""&& filter=="")
          array=[...students];
          if(x==false && value!="")
          array=[];
          return array;
           }
           const array=search();


  
function editstudent(){

  const arr = [...students]

  axios.post(`/student/update_student?studentID=${editedStd}`, {
    firstName: name,
    lastName: prenom,
    email: email
  })
  .then((res) => {
    if (res.status == 200) {

      arr[index] = res.data.student;
      setstudents(arr)
      console.log("Etudiant est modifié")

    }
  })
  .catch((err) => console.log(err.response.data.error))


  setIsOpen2(!isOpen2);
}
const togglePopup2=(item, index)=>{
  setEditedStd(item._id)
  setname(item.firstName);
  setprenom(item.lastName);
  setEmail(item.email)
  setIndex(index)
  setIsOpen2(!isOpen2);
}
const handlefilterchange=(e)=>{
setfilter(e.target.value)
}
return (
<div className='tab-container'>
<Notification
                notify={notify}
                setNotify={setNotify}
            />
<h1>Gestion des Etudiants</h1>
<div className='search-container-student'>
    <div>
    <input className='fetch-input' placeholder='Rechercher '  onChange={(e)=>setvalue(e.target.value)} />
    <select onChange={handlefilterchange}>
      <option value="">- - Select - -</option>
      <option>Nom</option>
      <option>Prenom</option>
      <option>Email</option>
      <option>Année</option>
      <option>Specialité</option>
    </select>
<span onClick={search(value)}>  <ImSearch/></span>

    </div>
 
<button  onClick={togglePopup}>Ajouter Etudiant</button>
</div>
{isOpen &&
<div className="popup-box">
      <div className="box-student">
        <span className="close-icon-stud" onClick={togglePopup}>x</span>
        <div >
          <div className='info-perso'>
          <input value={name} className='' placeholder='Entrer  nom'  onChange={(e)=>setname(e.target.value)} />
        <input value={prenom} className='' placeholder='Entrer prenom'  onChange={(e)=>setprenom(e.target.value)} />
            </div>
        <div className='email-pass-form'>
        <input value={email} className='' placeholder='Entrer Email'  onChange={(e)=>setEmail(e.target.value)} />
        <input value={password} className='' placeholder='Entrer mot de pass'  onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <select className='select-year'  onChange={handleYearChange}  >
          <option> - - Select Specialité - -</option>
          {years.map((item)=><option value={JSON.stringify(item)}>{item.name} {item.speciality}</option>)}
        </select>
        <select className='select-year'  onChange={handleGroupChange}  >
        <option> - - Select Groupe - -</option>
          {groups.map((item)=><option value={JSON.stringify(item.groupID)}>{item.groupID.name}</option>)}
        </select>
<button className='add-student' onClick={()=> addstudent() }>Ajouter</button>
        </div> 
      </div>
    </div>}
    {isOpen2 && <div className="popup-box">
      <div className="edit-student">
        <span className="close-icon-stud" onClick={togglePopup2}>x</span>
        <div >
          <div className='info-perso'>
          <input value={name} className='' placeholder='Entrer  nom'  onChange={(e)=>setname(e.target.value)} />
        <input value={prenom} className='' placeholder='Entrer prenom'  onChange={(e)=>setprenom(e.target.value)} />
            </div>
        <div className='email-pass-form'>
        <input value={email} className='' placeholder='Entrer Email'  onChange={(e)=>setEmail(e.target.value)} />
      
        </div>
       
<button  onClick={()=> editstudent() }>Editer</button>
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
      <th>Année</th>
      <th>Specialité</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
   {array.map((item)=>{
     return(<tr>
       <td>{item.firstName}</td>
       <td>{item.lastName}</td>
       <td>{item.email}</td>
       <td>{item.year}</td>
       <td>{item.speciality}</td>
       <td className='actions_buttons'>
       <img
              src={deleteIcon}
              width='30'
              height='20'
              onClick={() =>  deleteStudent(item.email, item.groupID._id, item.groupID.studentNumber, array.indexOf(item))   }          
/>
            <img
              src={editIcon}
              width='30'
              height='20'
              onClick={() => togglePopup2(item, array.indexOf(item))
              }/>
       </td>
       
      
     </tr>
     
     )
   })}
  </tbody>
</table>
</div>


    </div>
    )
}
