import React, { Component,useEffect } from "react";
import '../CSS/teacherdashbord.css'
import { IoAddCircleOutline } from "react-icons/io5";


class UploadAction extends Component {


    constructor(props) {
        super(props)

        this.state = {
            isEnseignant: true
        }
    }


    render() {
       

        return this.state.isEnseignant ? <form action='/api/upload' encType='multipart/form-data' method='GET'>

            
            
        </form> : <></>

    }

}
/*   <div className="file-card">

                <div className="file-inputs">

                    <button className="mainbutton">
                        
                        <i>
                            <IoAddCircleOutline className="test"/>
                        </i>
                        Upload
                    </button>
                    
                </div>
                <div class="box">
                <select>
                <option>1CPI</option>
                <option>2CPI</option>
                <option>1CS</option>
                <option>2CS</option>
                <option>3CS</option>
                </select>
                </div>
 
                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>

            </div>  */

export default UploadAction 