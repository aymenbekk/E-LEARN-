import React, { Component, useEffect } from 'react';
import profile from '../../assets/profile.png'
import './profilestyle.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../actions/loginActions';
import axios from '../../helpers/axios'
import { useState } from 'react';

function Profil(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth)

    const [promo, setPromo] = useState()

    useEffect(() => {

      dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }

    useEffect(() => {

      axios.get(`/promo/get_promoByID?promoID=${user.user.promoID}`)
        .then((res) => {
          if (res.status == 200) {
            setPromo(res.data.promo)
            console.log(res.data.promo)
          }
        })
        .catch((err) => console.log(err.response.data.error))


    },[])

    const user = JSON.parse(localStorage.getItem('user'))

return(
<div>
  <div className='top-info'>
    <img src={profile} className='profile-pic'/>
    <div className='first-info'>
        <h2>{auth.user.firstName} {auth.user.lastName}</h2>

         <span>{auth.user.role}</span>
    </div>
  </div>
  < div className='bottom-info'>

    <div className='second-info'>
      <h1>Date de Naissance</h1> 
      <span>1900/06/06</span>
      </div>
      <div className='second-info'>
      <h1>Email</h1> 
      <span>{user.email}</span>
      </div>
      {auth.user.role=="student"&&
      
         <div className='second-info'>
      <h1>Année/Specialié</h1> 
      <span>{promo?.name} {promo?.speciality}</span>
      </div>
      }
    

  </div>
</div>
    )
}
export default Profil;