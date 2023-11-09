import React, {Component} from "react";

class DownloadAction extends Component {


    render(){
        return <form action='/api/admin/courses' encType='multipart/form-data' method='GET'>
            <button type='submit'>Download Ressources</button>
    </form>;
    
    }

}

export default DownloadAction 