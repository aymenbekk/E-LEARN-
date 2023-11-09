import React, { Component, useState,useEffect } from 'react';
import { login, isUserLoggedIn } from "../../../actions/loginActions";
import { useDispatch, useSelector, useStore  } from "react-redux";
import {useLocation,Link} from 'react-router-dom';
import './coursestyle.css'
import download from 'downloadjs';
import axios from '../../../helpers/axios';
import { FaFilePdf } from "react-icons/fa";
function Course(){
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(isUserLoggedIn());
      }, []);
    const location = useLocation();
    const [chapters,setchapters]=useState([]);
    const [courses, setCourses] = useState([]);
    const [grade, setGrade] = useState()
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(()=>{

        axios.post(`/chapter/get_subjectChapters?subjectID=${location.state.moduleID}`)
        .then((res) => {
        if (res.status == 200) {
          setchapters(res.data.chapters)
        }
        })
        .catch((err) => console.log(err.response.data.error)) 
        
        axios.post(`/file/get_subjectFiles?subjectID=${location.state.moduleID}`)  
        .then((res) => {
        if (res.status == 200) {
          setCourses(res.data.files)
        }
        })
        .catch((err) => console.log(err.response.data.error))

        axios.post(`/grade/get_subjectGrades?subjectID=${location.state.moduleID}`)  
        .then((res) => {
        if (res.status == 200) {
          setGrade(res.data.grade)
        }
        })
        .catch((err) => console.log(err.response.data.error))
  
    },[]);

    const downloadCourse = async (file) => {

        

        try {
          const result = await axios.get(`/file/download_file?fileID=${file._id}`, {
            responseType: 'blob'
          });
          const split = file.file_path.split('/');
          const filename = split[split.length - 1];
          console.log(result)
          setErrorMsg('');
          return download(result.data, filename, file.file_mimetype);
        } catch (error) {
          if (error.response && error.response.status === 400) {
            console.log('Error while downloading file');
          }
        }
        
      }

      const downloadNotes = async () => {

        if (!grade) return console.log('Les Notes ne sont pas disponibles pour le moment')
        else {

          try {
            const result = await axios.get(`/grade/download_grade?subjectID=${location.state.moduleID}`, {
              responseType: 'blob'
            });
            //const split = file.file_path.split('/');
            //const filename = split[split.length - 1];
            console.log(result)
            setErrorMsg('');
            return download(result.data, grade.title, grade.file_mimetype);
          } catch (error) {
            if (error.response && error.response.status === 400) {
              console.log('Error while downloading file');
            }
          }

        }
        
      }
  
    return(
   <div className='course-container'>
<h1 className='course-title'>{location.state.modulename}</h1>
{chapters.length=="0" && <h2 className='pas-cour'>Pas de Cours pour le moment</h2>}
{
 chapters.length!="0" && <button className='download-notes'>Telecharger les notes</button>
}

<div className='chapters'>
{chapters.map((item,index)=>{
    return(
        <div className='chapter'>
    <h2>Chapter :{index+1} {item.name}</h2>
    <div>
        { courses.map((itemm)=> {

            if (itemm.chapterID == item._id) {

                return(
                    <div className='courr'>

                 <div onClick={() => downloadCourse(itemm)}>
                      <span className="pdf-icon">
                        {" "}
                        <FaFilePdf />
                      </span>
                      <h4>
                        {itemm.type} - {itemm.title}
                      </h4>
                    </div>

                        {/* <button onClick={() => downloadCourse(itemm)}>
                      Download
                        </button>
                  
                      <h3>{itemm.type} - {itemm.title}</h3> */}
                    </div>
                    
                )

            }
        })}
        </div>
 </div>
    );
   })}
   </div>
   </div>     
    );
}
export default Course;