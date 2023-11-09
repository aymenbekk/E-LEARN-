import React, { Component } from 'react';
import './profilestyle.css'
function Editpass(){
    return(<div >
<form className='editpass-form'>
  <label for="fname">Mot de pass Actuel</label>
  <input type="text" id="fname" name="fname" />
  <label for="lname">Nouveau Mot de Pass</label>
  <input type="text" id="lname" name="lname" />
  <label for="lname">Confirmer Mot de Pass</label>
  <input type="text" id="lname" name="lname" />
</form>
<div className='buttons'>
<button class="button button1">Annuler</button>
<button class="button button2">Confirmer</button>
</div>

    </div>);
}
export default Editpass;