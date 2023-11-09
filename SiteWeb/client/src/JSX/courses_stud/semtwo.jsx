import React, { Component, useState } from 'react';
import './courses.css'
import { ModulesTwo} from "./modulestwo";
import {GiPadlock}from 'react-icons/gi'
function SemTwo(props){
    const [enabled,setenabled]=useState(true);
    return(
    <div className='modules'>
        {enabled ? ModulesTwo.map((item, key) => {
            return (
                <div className='module' key={key}>
               <a onClick={()=>props.toCourse(item.modul)}><button>Access</button></a>
                <img src={item.img}/>
                
                <div className='text'>
                <h1>{item.modul}</h1>
                </div>
            </div>
            );
            
          }):<div className='locked'>
                <h2>Locked at the Moment</h2>
                <span className='lock'> <GiPadlock /></span>
              </div> }
    </div>)
}
export default SemTwo;