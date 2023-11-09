import React, { useState, useEffect } from 'react'
import './eventcard.css'
import ClearIcon from '@mui/icons-material/Clear';
import Modal from 'react-modal';
import { fontSize } from '@mui/system';
import Notification from '../notification/notification'

export default function EventCard(props) {

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [modalIsOpen, setIsOpen] = useState(false);
    function handledelete() {
        setNotify({
            isOpen: true, message: 'Class deleted successffuly', type: 'success'
        });
        props.deleteClass(props.id, props.semestre)
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    function openModal() {
        setIsOpen(true);
        console.log("clicked")
    }

    const [startt, setStartt] = useState()
    const [endd, setEndd] = useState()

    function closeModal() {
        setIsOpen(false);
    }

    const points = (start, end) => {
        if (start.length == 3) setStartt(start.substring(0,1)+ ":" + start.substring(1))
        else setStartt(start.substring(0,2)+ ":" + start.substring(2))

        if (end.length == 3) setEndd(end.substring(0,1)+ ":" + end.substring(1))
        else setEndd(end.substring(0,2)+ ":" + end.substring(2))
    }

    useEffect(()=> {
        points(props.start, props.end)
    }, [])

     


    return (


        <div className="event-card">
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <div className="event-card-body">
                <div className="left-part">
                    <div className="event-card-starttiming"> {startt}</div>
                    <div className="event-card-endtiming"> {endd} </div>
                </div>
                <div className="somespace-div"></div>
                <div className="center-part">
                    <div className="ligne1">
                        <div className="event-card-type"> {props.type}</div>

                    </div>
                    <div className="ligne2">

                        <div className="event-card-title"> {props.title} </div>
                    </div>
                    <div className="ligne3">
                        <div className="event-card-prof"> {props.prof} </div>
                        <div className="event-card-group"> {props.group} </div>
                        <div className="event-card-salle"> {props.salle.type} {props.salle.name}</div>
                    </div>
                </div>
                <div className="right-part">
                    <button className="button-delete-container"
                        onClick={() => openModal()}
                    >
                        <ClearIcon
                            sx={{ fontSize: 20 }}
                            className="button-delete"
                        />

                    </button>
                </div>




            </div>





            <Modal
                className="Modal"
                overlayClassName="Overlay"
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel={props.contentLabel}
                style={customStyles}
            >


                <div className="modal-content">
                    <h3 style={{
                        color: "#d11a2a"
                    }}>Delete confirmation </h3>
                    <br />
                    Are you sure that you want to delete this Class
                    <div className="modal-btn">
                        <button onClick={closeModal}
                            style={{
                                margin: '4px',
                                padding: "3px",
                                margin: '4px',
                                fontSize: '15px',
                                fontWeight: "bold",
                                backgroundColor: "#F5F5F5",
                            }}
                        >Close</button>
                        <button onClick={handledelete}
                            style={{
                                borderStyle: "solid",
                                borderWidth: "2px",
                                borderColor: "#d11a2a",
                                borderRadius: "3px",
                                color: "white",
                                padding: "3px",
                                backgroundColor: "#d11a2a",
                                margin: '4px',
                                fontSize: '15px',
                            }}
                        >Delete</button>
                    </div>
                </div>

            </Modal>


            {/* <DeleteConfirmation
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            /> */}

        </div>

    )

}