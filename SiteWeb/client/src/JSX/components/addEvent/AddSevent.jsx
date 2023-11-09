import React, { useEffect, useState } from 'react'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './addeventmodal.css'
import eventitems from '../calendar/calendar'
import setItems from '../calendar/calendar'
import axios from '../../../helpers/axios';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

import Notification from '../notification/notification'

export default function AddSevent(props) {

    async function validateTheForm(subject,
        teacher,
        type,
        group,
        salle,
        startH,
        startM,
        endH,
        endM) {
        return new Promise(async (resolve) => {  
        if (!subject) {
            setNotify({ isOpen: true, message: 'Module est requis', type: 'error' })
            resolve(false)
        } else if (!teacher) {
            setNotify({ isOpen: true, message: 'Enseignant est requis', type: 'error' })
            resolve(false)
        }
        else if (!startH) {
             setNotify({ isOpen: true, message: 'Le temps Debut Heure est requis', type: 'error' })
             resolve(false)
         }
         else if (parseInt(startH) < 0 || parseInt(startH) > 23) {
            setNotify({ isOpen: true, message: 'Enter une Heure Valide', type: 'error' })
            resolve(false)
         }
         else if (!startM) {
             setNotify({ isOpen: true, message: 'Le temps Debut Minute est requis', type: 'error' })
             resolve(false)
         }else if (parseInt(startM) < 0 || parseInt(startM) > 59 || startM.length == 1) {
            setNotify({ isOpen: true, message: 'Enter une Minute Valide', type: 'error' })
            resolve(false)
         }
         else if (!endH) {
             setNotify({ isOpen: true, message: 'Le temps Fin Heure est requis', type: 'error' })
             resolve(false)
         }
         else if (parseInt(endH) < 0 || parseInt(endH) > 23) {
            setNotify({ isOpen: true, message: 'Enter une Heure Valide', type: 'error' })
            resolve(false)
         }
         else if (!endM) {
             setNotify({ isOpen: true, message: 'Le temps Fin Minute est requis', type: 'error' })
             resolve(false)
         }
         else if (parseInt(endM) < 0 || parseInt(endM) > 59 || endM.length == 1) {
            setNotify({ isOpen: true, message: 'Enter une Minute Valide', type: 'error' })
            resolve(false)
         }
        else if (group = "") {
            setNotify({ isOpen: true, message: 'Le Groupe est requis', type: 'error' })
            resolve(false)
        }
        else if (!salle) {
            setNotify({ isOpen: true, message: 'La salle est requis', type: 'error' })
            resolve(false)
        } else resolve(true)
    })
    }

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const Groups = [
        'G 1',
        'G 2',
        'G 3',
        'G 4',
        'G 5',
        'G 6',
        'G 7',
        'G 8',
        'G 9',
    ];

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);


    const [subjects, setSubjects] = useState([]);
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [salles, setSalles] = useState([]);

    const [day, setDay] = useState(props.day)
    const [promoName, setPromoName] = useState(props.promo.name)
    const [promoSpeciality, setPromoSpeciality] = useState(props.promo.speciality)
    const [semestre, setSemestre] = useState(props.semestre)
    const [subject, setSubject] = useState("");
    const [subjectt, setSubjectt] = useState();
    const [teacher, setTeacher] = useState();
    const [type, setType] = useState("");
    const [salle, setSalle] = useState();
    const [group, setGroup] = useState();
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [startH, setStartH] = useState("");
    const [startM, setStartM] = useState("");
    const [endH, setEndH] = useState("");
    const [endM, setEndM] = useState("");



    useEffect(() => {

        axios.post(`/subject/get_subjects?promoID=${props.promo._id}`, {
            semestre: props.semestre
        }).then((res) => {
            if (res.status == 400) console.log(res.data.error)
            else if (res.data.subjects) {
                setSubjects(res.data.subjects)
                //console.log(res.data.subjects)
            }
        })

        console.log("promo", props.promo)
        console.log("semestreee", props.semestre)

        axios.get(`/group/get_promo_groups?promoID=${props.promo._id}`).then((res) => {
            if (res.status == 400) console.log(res.data.error)
            else if (res.data.groups) {
                setGroups(res.data.groups)
                console.log(res.data.groups)
            }
        })

        axios.get(`/salle/get_salles`).then((res) => {
            if (res.status == 400) console.log(res.data.error)
            else if (res.data.salles) {
                setSalles(res.data.salles)
                //console.log(res.data.salles)
            }
        })



    }, [])



    function getTeachers(subject) {

        {/* 

        axios.get(`/teacher/get_teachers?subjectID=${subject._id}`)
            .then((res) => {
                if (res.status == 400) console.log(res.data.error)
                else if (res.data.teachers) {
                    setTeachers(res.data.teachers)
                }
            })

            */}

    }

    {/* 
    
    function getSubject(subject) {

        console.log("suiui", subject)
        
        axios.get(`/subject/get_subject_by_id?subjectID=${subject._id}`)
            .then((res) => {
                if (res.status == 400) console.log(res.data.error)
                else if (res.data.subject) {
                    setSubjectt(res.data.subject)
                    setTeachers(res.data.subject.teachers)
                    console.log(res.data.subject)
                }
            })
    }
    */}



    const handleModuleChange = (event) => {

        //getSubject(JSON.parse(event.target.value))

        setSubject(JSON.parse(event.target.value));
        setTeachers((JSON.parse(event.target.value)).teachers)
        //getTeachers(JSON.parse(event.target.value))

    };

    const handleTeacherChange = (event) => {
        setTeacher((JSON.parse(event.target.value)).teacherID)
        setType((JSON.parse(event.target.value)).type)
    }

    const handleSalleChange = (event) => {
        setSalle(JSON.parse(event.target.value))
    }

    const handleGChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setGroup(JSON.parse(event.target.value))
    };

    const handleStartH = (event) => {
        setStartH(event.target.value)
        setStart(event.target.value.concat(startM))
    }
    const handleStartM = (event) => {
        setStartM(event.target.value)
        setStart(startH.concat(event.target.value))
    }
    const handleEndH = (event) => { 
        setEndH(event.target.value)
        setEnd(event.target.value.concat(endM))

     }
    const handleEndM = (event) => {
        setEndM(event.target.value)
        setEnd(endH.concat(event.target.value))
    }


    const handleGroupChange = (event) => {
        setGroup(JSON.parse(event.target.value))
    }

    const [value, setvalue] = useState('')

    const handleOnchange = val => {
        setvalue(val)
    }

    // const Groups = [
    //     { label: 'Group1', value: '1' },
    //     { label: '2', value: '2' },
    //     { label: '3', value: '3' },
    //     { label: '4', value: '4' },
    // ]

    const paperStyle = { padding: '0 15px 40px 15px', width: 400, }
    const btnStyle = {
        marginTop: 10,
        borderRadius: 25,
        color: "#4CAF50",
        borderColor: "#4CAF50",
    }
    // const phoneRegExp = /^[2-9]{2}[0-9]{8}/
    // const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const [eventValue, seteventValue] = useState()





    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().min(3, "It's too short").required("Required"),
    //     email: Yup.string().email("Enter valid email").required("Required"),
    //     // phoneNumber: Yup.number().typeError("Enter valid Phone number").required("Required"),
    //     phoneNumber: Yup.string().matches(phoneRegExp, "Enter valid Phone number").required("Required"),
    //     password: Yup.string().min(8, "Minimum characters should be 8")
    //         .matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol").required('Required'),
    //     confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matches").required('Required')
    // })


    const onSubmit = (e) => {
        e.preventDefault()

        setStart(startH.concat(startM))
        setEnd(endH.concat(endM))

        seteventValue(subject, teacher, type, group, salle, start, end)



        props.addClass(eventValue)

        //alert(JSON.stringify(eventValue))
        // addToList(eventValue)
        //e.resetForm()

        {/*   

            axios.post(`/schedule/addClass?promoID=${props.promo._id}`, {
                day: eventValue.day,
                subject: eventValue.subject,
                teacher: eventValue.teacher,
                type: eventValue.type,
                group: eventValue.group,
                salle: eventValue.salle,
                start: eventValue.start,
                end: eventValue.end,
                semestre: eventValue.semestre,
                promoName: eventValue.promoName,
                promoSpeciality: eventValue.promoSpeciality
            })
            .then(async (res) => {

                if (res.status == 400) alert(res.data.error)
                else if (res.data) {
                    console.log(res.data)
                
                }
                else alert("Erroooor")
            })

            */}

    }
    return (
        <div >
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <form className="Form-container" onSubmit={async (e) => {
                e.preventDefault();
                const valid = await validateTheForm(subject,
                    teacher,
                    type,
                    group,
                    salle,
                    startH,
                    startM,
                    endH,
                    endM)
                // setNotify({
                //     isOpen: true, message: 'Class added successffuly', type: 'success'
                // });
                // props.resetForm() 

                if (valid) {
                    console.log("staaaaarrt", start)
                    console.log("eeeennnnd", end)
                    props.addClass(
                        day,
                        subject,
                        teacher,
                        type,
                        group,
                        salle,
                        start,
                        end,
                        semestre,
                        promoName,
                        promoSpeciality);

                } else console.log("eaeaaeea")
                //props.resetForm() 
                // we have to reset form 

            }}>

                <div className="top-part-form">
                    <div className="left-part-form">
                        <FormControl sx={{ m: 1, minWidth: 200, }} size="small">
                            <InputLabel id="">Module</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                //value={subject.name}
                                label="Module"
                                onChange={handleModuleChange}
                            >


                                {subjects.map((item) =>

                                    <MenuItem value={JSON.stringify(item)}><em>{item.name}</em></MenuItem>

                                )}
                            </Select>
                        </FormControl>


                        <div className="timing">
                            <InputLabel id="demo-select-small">Temps Debut (Heures)</InputLabel>
                            <TextField
                            onKeyDown={(event) => {
                                event.preventDefault();
                            }}
                                id="outlined-number"
                                label=""
                                size="small"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleStartH}
                            /> </div>



                        <div className="timing">
                            <InputLabel id="demo-select-small">Temps Fin (Heures)</InputLabel>
                            <TextField
                            onKeyDown={(event) => {
                                event.preventDefault();
                            }}
                                id="outlined-number"
                                label=""
                                size="small"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleEndH}
                            /> </div>


                        {/* 

                         <FormControl sx={{ m: 1, minWidth: 200, }} size="small">
                            <InputLabel id="demo-select-small">Type</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                //value={}
                                label="Module"
                                //onChange={}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Archi</MenuItem>
                                <MenuItem value={20}>ACSI</MenuItem>
                                <MenuItem value={30}>Réseaux</MenuItem>
                            </Select>
                        </FormControl>
                        
                        
                        */}

                        <FormControl sx={{ m: 1, width: 200, marginBottom: 4 }}>
                            <InputLabel id="demo-multiple-name-label">Groupe</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={personName}
                                onChange={handleGChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {groups.map((item) => (
                                    <MenuItem
                                        //key={name}
                                        value={JSON.stringify(item)}
                                        style={getStyles(item.name, personName, theme)}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="right-part-form">

                        <FormControl sx={{ m: 1, minWidth: 200, }} size="small">
                            <InputLabel id="demo-select-small">Enseignant</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                //value={teacher.firstName}
                                label="Module"
                                onChange={handleTeacherChange}
                            >

                                {teachers.map((item) =>

                                    <MenuItem value={JSON.stringify(item)}><em>{item.teacherID.firstName} {item.teacherID.lastName} {item.type}</em></MenuItem>

                                )}

                            </Select>
                        </FormControl>


                        {/* <div id="timing-points">:</div> */}
                        <div className="timing">
                            <InputLabel id="demo-select-small">Temps Debut (min)</InputLabel>
                            <TextField

                                id="outlined-number"
                                label=""
                                size="small"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleStartM}
                            /> </div>


                        <div className="timing">
                            <InputLabel id="demo-select-small">Temps Fin (min)</InputLabel>

                            <TextField

                                id="outlined-number"
                                label=""
                                size="small"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleEndM}
                            /> </div>


                        <FormControl sx={{ m: 1, minWidth: 200, height: 60 }} size="small">
                            <InputLabel id="demo-select-small">Salle</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                //value={salle.name}
                                label="Salle"
                                onChange={handleSalleChange}
                            >


                                {salles.map((item) =>

                                    <MenuItem value={JSON.stringify(item)}><em>{item.type} {item.name}</em></MenuItem>

                                )}
                            </Select>
                        </FormControl>





                    </div>

                </div>
                <div className="bot-part-form">







                    {/* <MultiSelect
                        placeholder="Select Groups ..."
                        style={{
                            width: "400px"
                        }}
                        className="my-input"
                        onChange={handleOnchange}
                        options={Groups}
                    />
                    {value} */}

                </div>




                <button className="addbtn" type="submit"

                > Ajouter cette séance  </button>
                {/* <Button type="submit"> Add event </Button> */}
            </form >

        </div >

    )
}



