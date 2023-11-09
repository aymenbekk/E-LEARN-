import { useDispatch, useSelector } from "react-redux";
import { login, isUserLoggedIn } from "../../actions/loginActions";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../helpers/axios";
import download from "downloadjs";
import { FaFilePdf } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Notification from "../components/notification/notification";
const Teacherupload = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);
  const [titlee, settitlee] = useState("");
  const [courtitle, setcourtitle] = useState("");
  const [type, settype] = useState("");
  const [chapters, setchapters] = useState([]);
  const [selectedChapterID, setSelectedChapterID] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [affiachageTitle, setAffichageTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [gradee, setGradee] = useState();

  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [courses, setCourses] = useState([]);

  const location = useLocation();
  /* location.state.subjectID */

  console.log(location.state);
  console.log(location.state.subjectID);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    axios
      .post(
        `/chapter/get_subjectChapters?subjectID=${location.state.subjectID}`
      )
      .then((res) => {
        if (res.status == 200) {
          setchapters(res.data.chapters);
          console.log(res.data.chapters);
        }
      })
      .catch((err) => console.log(err.response.data.error));

    axios
      .post(`/file/get_subjectFiles?subjectID=${location.state.subjectID}`)
      .then((res) => {
        if (res.status == 200) {
          setCourses(res.data.files);
        }
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  function addchapter() {
    axios
      .post(`/chapter/create_chapter?subjectID=${location.state.subjectID}`, {
        chapterName: titlee,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("chapter added");
          setchapters((oldlist) => [...oldlist, res.data.chapter]);
          settitlee("");
        }
      });
  }

  function addcour() {
    if (courtitle.trim() != "" && type.trim() != "") {
      if (file) {
        const arr = [...courses];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", courtitle);
        formData.append("type", type);
        formData.append("subjectID", location.state.subjectID);
        formData.append("chapterID", selectedChapterID);

        axios
          .post("/file/upload_file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status == 200) {
              arr.push(res.data.file);
              setCourses(arr);
            }
          })
          .catch((err) => console.log(err.response.data.error));

        setErrorMsg("");
      } else setErrorMsg("Please Select a file to add");
    } else setErrorMsg("Please Enter all fields");

    setcourtitle("");
    setFile();
    settype("");
    togglePopup();
  }

  function uploadnotes() {

    if (affiachageTitle.trim() != "") {
      if (grade) {

        const formData = new FormData();
        formData.append("file", grade);
        formData.append("title", affiachageTitle);
        formData.append("subjectID", location.state.subjectID);

        axios
          .post("/grade/upload_grade", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status == 200) {
              setGradee(res.data.grade);
            }
          })
          .catch((err) => console.log(err.response.data.error));

        setErrorMsg("");
      } else setErrorMsg("Please Select a file to add");
    } else setErrorMsg("Please Enter all fields");

    setGrade();
    setAffichageTitle("");
    togglePopup2();

  }

  const downloadCourse = async (file) => {
    try {
      const result = await axios.get(`/file/download_file?fileID=${file._id}`, {
        responseType: "blob",
      });
      const split = file.file_path.split("/");
      const filename = split[split.length - 1];
      console.log(result);
      setErrorMsg("");
      return download(result.data, filename, file.file_mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error while downloading file");
      }
    }
  };

  function togglePopup(item) {
    setIsOpen(!isOpen);
    setSelectedChapterID(item);
  }
  function togglePopup2() {
    setIsOpen2(!isOpen2);
  }

  return (
    <div className="upload-container">
      <Notification notify={notify} setNotify={setNotify} />
      <div className="title">Upload Chapitres</div>
      <div className="addchapter">
        <input
          className="addchapterinput"
          placeholder="Entrer le Titre de Chapitre"
          value={titlee}
          onChange={(e) => settitlee(e.target.value)}
        />{" "}
        <button className="mainbutton" onClick={() => addchapter()}>
          {" "}
          Ajouter Chapitre
        </button>
        <button onClick={togglePopup2} className="download-notes">
          Upload les notes
        </button>
      </div>
      <br></br>

      {isOpen && (
        <div className="popup-box">
          <div className="box-course">
            <span className="close-icon" onClick={togglePopup}>
              x
            </span>
            <div className="form-course">
              <input
                value={courtitle}
                placeholder="Entrer le nom de Cours"
                onChange={(e) => setcourtitle(e.target.value)}
              />
              <select
                className="selection"
                onChange={(e) => settype(e.target.value)}
              >
                {" "}
                <option value=""> - - Select - - </option>
                <option>TD</option>
                <option>TP</option>
                <option>Cours</option>
              </select>

              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button className="add" onClick={() => addcour()}>
                {" "}
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpen2 && (
        <div className="popup-box">
          <div className="box-grades">
            <span className="close-icon" onClick={togglePopup2}>
              x
            </span>
            <div className="form-course">
              <input
                value={affiachageTitle}
                placeholder="Entrer le nom de Cours"
                onChange={(e) => setAffichageTitle(e.target.value)}
              />
              <input type="file" onChange={(e) => setGrade(e.target.files[0])} />
              <button className="add" onClick={() => uploadnotes()}>
                {" "}
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      {chapters.map((item, index) => {
        return (
          <div className="courses">
            <div className="courses-head">
              <h3>
                Chapter {index + 1}: {item.name}
              </h3>
              <button onClick={() => togglePopup(item._id)}>
                Ajouter Cours
              </button>
            </div>
            <br></br>
            {courses.map((itemm) => {
              if (itemm.chapterID == item._id) {
                return (
                  <div className="courr">
                    <div onClick={() => downloadCourse(itemm)}>
                      <span className="pdf-icon">
                        {" "}
                        <FaFilePdf />
                      </span>
                      <h4>
                        {itemm.type} - {itemm.title}
                      </h4>
                    </div>
                    <span className="pdf-delete">
                      <AiOutlineDelete />
                    </span>
                  </div>
                );
              }
            })}
            <br></br>
          </div>
        );
      })}
    </div>
  );
};
export default Teacherupload;
