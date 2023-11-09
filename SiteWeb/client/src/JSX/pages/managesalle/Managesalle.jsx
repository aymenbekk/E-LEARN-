import React, { Component, useState,useEffect } from 'react';
import ReactFlexyTable from 'react-flexy-table'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../actions/loginActions';
import {ImSearch} from "react-icons/im"
import deleteIcon from '../../../assets/delete-button.svg'
import editIcon from '../../../assets/edit-button.svg'
import showmore from '../../../assets/showmore.svg'
import "../managegroup/managegroup.css"
import axios from '../../../helpers/axios'
import Notification from '../../components/notification/notification';

function Managesalle(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value,setvalue]=useState("");
    const [isOpen, setIsOpen] = useState(false);
   const[name,setname]=useState("");
   const[selectedtype, setselectedtype]=useState("");
   const [filter,setfilter]=useState("");
   const[types,settypes]=useState([
       {type:"Salle TD"},{type:"Salle TP"},{type:"Amphi"}
   ])
   const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const auth = useSelector(state => state.auth)
    useEffect(() => {

        dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }
const [salles,setsalles]=useState([])


    useEffect(() => {

      axios.get('/salle/get_salles')
        .then((res) => {
          setsalles(res.data.salles)
        })
        .catch((err) => console.log(err.response.data.error))


    })

const addsalle =() => {

    const array=[...salles];

    axios.post('salle/create_salle', {
      name: name,
      type: selectedtype
    })
    .then((res) => {
      if (res.status == 200) {
        array.push(res.data.salle)
        setsalles(array)
        setNotify({
          isOpen: true, message: "Salle ajoutée", type: 'success'
      })
      }
    })
    .catch((err) => setNotify({
      isOpen: true, message: err.response.data.error, type: 'error'
  }))
    setname("");
    setselectedtype("");
 togglePopup();
}

const deleteSalle = (salleID, index) => {

  const arr = [...salles]

  axios.post(`salle/delete_salle?salleID=${salleID}`)
    .then((res) => {
      if (res.status == 200) {
        arr.splice(index, 1)
        setsalles(arr)
        setNotify({
          isOpen: true, message: "Salle supprimée", type: 'success'
      })
      }
    })
    .catch((err) => setNotify({
      isOpen: true, message: err.response.data.error, type: 'error'
  }))

}
const handleChange = (e) => {
    setselectedtype(e.target.value);
  };


  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const v=value.toLowerCase()
  const search=()=>{
    let x = false;
    let array=[];
    if(value!="")
  salles.forEach(element => {
    
    if (element.name.toLowerCase()==v && filter=="Salle"){
      array.push(element)
      x=true;
    }
     if( element.type.toLowerCase() == v && filter =="Type") {
      array.push(element)
      x=true;
     }
  
   
  });
  if(value=="" || filter =="" )
  array=[...salles];
  if(value!=""&& filter=="")
  array=[...salles];
  if(x==false && value!="")
  array=[];
  return array;
   }
   const array=search();
   const handlefilterchange=(e)=>{
    setfilter(e.target.value)
    }
    return(
    <div className='tab-container'>
        <Notification
                notify={notify}
                setNotify={setNotify}
            />
<h1>Gestion des Salles</h1>
<div className='search-container'>
<input className='fetch-input' placeholder='Rechercher'  onChange={(e)=>setvalue(e.target.value)} />
<select onChange={handlefilterchange}>
      <option value="">- - Select - -</option>
      <option>Salle</option>
      <option>Type</option>
    </select>
<span onClick={search(value)}>  <ImSearch/></span>
<button  onClick={togglePopup}>Add Salle</button>
</div>
{isOpen &&<div className="popup-box">
      <div className="box-module">
        <span className="close-icon-mod" onClick={togglePopup}>x</span>
        <div className='sous-box'>
        <input className='' placeholder='Enter Salle'  onChange={(e)=>setname(e.target.value)} />
        <select className='selection'  onChange={handleChange}  >
          <option> - - Select Type - - </option>
   {types.map((item)=><option>{item.type}</option>)}
        </select>
<button className='add-student' onClick={()=>addsalle()}>Add</button>
        </div> 
      </div>
    </div>}

    <div className='modulestable_container'>
<table>
  <thead>
    <tr>
      <th>Salle</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
   {array.map((item)=>{
     return(<tr>
       <td>{item.name}</td>
       <td>{item.type}</td>
       <td className='actions_buttons'>
       <img
              src={deleteIcon}
              width='30'
              height='20'
              onClick={() => deleteSalle(item._id, array.indexOf(item))}
              
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
export default Managesalle;