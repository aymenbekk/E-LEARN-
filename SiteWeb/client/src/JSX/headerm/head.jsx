import React, { Component, useState, useEffect } from 'react';
import {IoNotificationsOutline} from "react-icons/io"; 
import profile from '../../assets/profile.png'
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import {BsJournals} from "react-icons/bs"
import './headstyle.css'
import {Drpdwnitems} from './drpdwnitems'
import { NavLink } from 'react-router-dom';
import {RiLogoutBoxLine} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {isUserLoggedIn} from "../../actions/loginActions"


import {CgProfile} from "react-icons/cg"

    function Head(props){    
        const [state,setstate]=useState(false);
       const showdrop=()=>{
            setstate(true)
        }
        const  hidedrop=()=>{
            setstate(false)
        }

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const auth = useSelector(state => state.auth)

        useEffect(() => {

          dispatch(isUserLoggedIn())

        }, []);

        if (!auth.authenticated) {
            navigate('/login')
        }

        const role = auth.user.role

        async function logoutClicked(e) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            dispatch(isUserLoggedIn())  // just to clear user data state
            
           navigate('/login')

        }

        return ( 
        // <div className={props.sbar ? 'headbar' : 'headbar flou'}>
           
            <div className='dropdown' onClick={showdrop} onMouseLeave={hidedrop}>
                <div className='assets'>
                <img src={profile} className='profile--icon'/>
               <div className='arrow-down'> <MdOutlineKeyboardArrowDown/></div>
           </div>
        <div className={state ? 'dropdown-menu active' : 'dropdown-menu'}>
        <NavLink className="element-drop"   to={'api/'+ role +'/settings'}  >            
                              <div><CgProfile/></div>
                               <span className='dropicons'>{auth.user.firstName} {auth.user.lastName}</span>
                           </NavLink>
                           {auth.user.role=="admin"&&<NavLink className="element-drop"   to={'api/'+ role + '/journalad'}  >            
                              <div><BsJournals/></div>
                               <span className='dropicons'>Journal</span>
                             
                           </NavLink>}
        {Drpdwnitems.map((item,key)=>{
                       return(<NavLink className="element-drop"  key={key} to={'api/'+ role + item.path}  >            
                              <div>{item.icon}</div>
                               <span className='dropicons'>{item.title}</span>
                             
                           </NavLink>
                         
                    )
                   })}
                           <NavLink className="element-drop" to={'/login'} onClick={logoutClicked} >            
                               <div><RiLogoutBoxLine/></div>
                               <span className='dropicons'>Deconnexion</span>
                             
                           </NavLink>
         </div>
        </div>
        // </div>
            
  
                );
    
    
    }
   
export default Head;
    