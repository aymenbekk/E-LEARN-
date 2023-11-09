
const { json } = require("body-parser");
const Group = require("../../models/Group");
const Schedule = require("../../models/Schedule");
const Subject = require("../../models/Subject")
const Teacher = require("../../models/Teacher")
const Salle = require("../../models/Salle")

exports.createSchedule = (req, res) => {

    const promoID = req.query.promoID;

    const dimanche = {
        name: req.body.days.dimanche.name,
        classList: req.body.days.dimache.classList
    }
    const lundi = {
        name: req.body.days.lundi.name,
        classList: req.body.days.lundi.classList
    }
    const mardi = {
        name: req.body.days.mardi.name,
        classList: req.body.days.mardi.classList
    }
    const mercredi = {
        name: req.body.days.mercredi.name,
        classList: req.body.days.mercredi.classList
    }
    const jeudi = {
        name: req.body.days.jeudi.name,
        classList: req.body.days.jeudi.classList
    }

    const schedule = new Schedule({
        promo: promoID,
        dimanche: dimanche,
        lundi: lundi,
        mardi: mardi,
        mercredi: mercredi,
        jeudi: jeudi
    })

    schedule.save()
        .then(schedule => {
            return res.status(200).json({schedule: schedule})
        })
        .catch(err => {
            return res.status(400).json({err: error})
        })
}

exports.createEmptySchedule = (req, res) => {
    
    const promoID = req.query.promoID
    const semestre = req.body.semestre

    const schedule = new Schedule({
        promoID: promoID,
        semestre: semestre
    })

    schedule.save()
        .then(schedule => {
            return res.status(200).json({schedule: schedule})
        })
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.getSchedule = (req, res) => {

    const promoID = req.query.promoID
    const semestre = req.body.semestre

    
    Schedule.findOne({$and:[{promoID: promoID}, {semestre: semestre}]})
        .populate('classList.subjectID')
        .populate('classList.groupID')
        .populate('classList.teacherID')
        .populate('classList.salleID')
        .exec((err, schedule) => {
            if (err) return res.status(400).json({error: err})
            if (!schedule) {  // schedule doesn't exist , we create it first (empty)

                const schedule = new Schedule({
                    promoID: promoID,
                    semestre: semestre
                })
            
                schedule.save()
                    .then(schedule => {
                        return res.status(200).json({schedule: schedule})
                    })
                    .catch(err => {
                        return res.status(400).json({error: err})
                    })


            } else return res.status(200).json({schedule: schedule})
        })
}

exports.addClass = async (req, res) => {

    const {day, subject, teacher, type, salle, start, end, semestre, group} = req.body
    const {promoName, promoSpeciality} = req.body

    console.log(day)
    console.log(subject)
    console.log(teacher)
    console.log(type)
    console.log(salle)
    console.log(start)
    console.log(end)
    console.log(semestre)
    console.log(group)
    console.log(promoName)
    console.log(promoSpeciality)


    if (!day || !subject || !teacher || !type || !salle || !start || !end || !semestre || !group || !promoName || !promoSpeciality) {
        return res.status(400).json({error: "Empty Inputs"})
    }

     //first check if teacher,group,salle available in that hour
     Schedule.find({})
     .populate('classList.teacherID')
     .populate('classList.groupID')
     .populate('classList.salleID')
     .populate('promoID')
     .exec(async (err, schedules) => {
         if (err) console.log(err)
         if (schedules) {

            if (schedules.length > 0) {


                console.log("here0")

                iterateSchedulesAndChek(req, res, schedules, start, end, day, teacher, group, salle, promoName, promoSpeciality, semestre)
                             

            } else  await finallyAddClass(req, res)

         } else {  // there's no schedules (no promo has schedule so we can add the first class without cheching )

            await finallyAddClass(req, res)

         }
     })
 
}

exports.deleteClass = (req, res) => {

    const classID = req.query.classID;

    Schedule.updateOne({$and: [{promoID: req.body.promoID}, {semestre: req.body.semestre}]}, {$pull: {classList: {_id: classID}}})
        .then((deletedClass) => res.status(200).json({deletedClass: deletedClass}))
        .catch((err) => res.status(400).json({error: err}))

}

exports.getLastClass = (req, res) => {
    
    Schedule.findOne({$and: [{promoID: req.query.promoID}, {semestre: req.body.semestre}]})
    .populate('classList.subjectID')
    .populate('classList.groupID')
    .populate('classList.teacherID')
    .populate('classList.salleID')
    .exec((err, schedule) => {
        if (err) return res.status(400).json({error: err})

        return res.status(200).json({class: schedule.classList[schedule.classList.length - 1]})
    })
}

exports.updateClass = (req, res) => {

    const {day, subject, teacher, type, salle, start, end, semestre} = req.body

    const promoID = req.query.promoID

    //Get teacher
    Teacher.findOne({email: teacher})
        .exec((err, teacher) => {
            if (err) return res.status(400).json({error: err})
            if (!teacher) return res.status(400).json({error: "teacher doesn't exist"})
            if (teacher) {


                Subject.findOne({name: subject})
                .exec((err, subject) => {
                    if (err) return res.status(400).json({error: err})

                    if (subject) {

                        var contains1 = subject.teachers.some(elem =>{
                            return JSON.stringify({teacherID: teacher._id, type: type}) === JSON.stringify(elem);
                          });  

                        if (!contains1) {

                           {/*  subject.teachers.push({teacherID: teacher._id, type: type})
                            const newSubj = new Subject({

                            name: req.body.subject,
                            semestre: req.body.semestre,
                            promoID: req.query.promoID,
                            teachers:  subject.teachers 

                            }) */}

                            const teacherID = teacher._id
                            Subject.updateOne({_id: subject._id}, {$push: {teachers: {teacherID, type: type}}})
                            .catch((err) => res.status(400).json({error: err}))

                        }

                        var contains2 = teacher.subjects.some(elem =>{
                            return JSON.stringify({subjectID: subject._id, type: type}) === JSON.stringify(elem);
                          });

                        if (!contains2) {

                            const subjectID = subject._id

                            Teacher.updateOne({_id: teacher._id}, {$push: {subjects: {subjectID, type: type}}})
                            .catch((err) => res.status(400).json({error: err}))

                        }

                        

                        Schedule.updateOne({classList: {$elemMatch: {_id: req.query.classID}}}, {$set: {"classList.$": {day, subject, teacher, type, salle, start, end}}},
                            { returnOriginal: false})
                                    .then((addedClass) => {
                                        console.log(addedClass)
                                        res.status(200).json(addedClass)
                                    })
                                    .catch((err) => console.log(err))
                        
                    }
                    else {
        
                        const teachers = []
                        teachers.push({teacherID: teacher._id, type: type})
        
                        const subject = new Subject({
                            name: req.body.subject,
                            semestre: req.body.semestre,
                            promoID: req.query.promoID,
                            teachers: teachers
                        })
                        //subject.teachers.push({teacherID: teacherID, type: type})
        
                        subject.save()
                            .then((subject) => {
                            console.log(subject)
                            const subjectID = subject._id
                            Teacher.updateOne({_id: teacher._id}, {$push: {subjects: {subjectID, type: type}}})
                                .then((result) =>  {

                                    //add Class to schedule
                                    Schedule.updateOne({classList: {$elemMatch: {_id: req.query.classID}}}, {$set: {"classList.$": {day, subject, teacher, type, salle, start, end}}},
                                        {returnOriginal: false})
                                    .then((addedClass) => {
                                        console.log(addedClass)
                                        res.status(200).json(addedClass)
                                    })
                                    .catch((err) =>  console.log(err))
                                    
                                })
                                .catch((err) => res.status(400).json({error: err}))
                            })
                            .catch((err) => {
                                console.log(err)
                                return res.status(400).json({error: err})
                            })
        
                    }
                })
            
                
            }
        })    
    

   

}

exports.getTeacherClasses = (req, res) => {

    const teacherID = req.body.teacherID;
    const semestre = req.body.semestre;

    Schedule.find({$and: [{semestre: semestre}, {"classList": {$elemMatch: {teacherID: teacherID}}}]})
    .populate('classList.subjectID')
    .populate('classList.groupID')
    .populate('classList.teacherID')
    .populate('classList.salleID')
    .then(async (schedules) => {
        if (schedules.length > 0) {


            const arr = await checkTeacherClasses(schedules, teacherID)

            return res.status(200).json({teacherClasses: arr})

            

        } else res.status(201).json({error: "No class"})
    })
    .catch((err) => res.status(400).json({error: err}))




}

async function checkTeacherClasses(schedules, teacherID) {

    return new Promise(async (resolve) => {

        const arr = []
        for (let i = 0; i < schedules.length; i++) {
        let scheduleClasses = schedules[i].classList
        
        for (let j = 0; j < scheduleClasses.length; j++) {
            let aclass = scheduleClasses[j];
            if (aclass.teacherID._id == teacherID) {
                arr.push(aclass)
            }
            if (i == schedules.length - 1 && j == scheduleClasses.length - 1) resolve(arr)
        }
    }

    })

}


function finallyAddClass(req, res) {

    return new Promise((resolve) => {

        const {day, subject, teacher, type, salle, start, end, semestre, group} = req.body
        //const {promoName, promoSpeciality} = req.body
        Schedule.updateOne({$and:[{promoID: req.query.promoID}, {semestre: semestre}]}, {$push: {classList: {day, subjectID: subject._id, teacherID: teacher._id, type, groupID: group._id, salleID: salle._id, start, end}}},
            { returnOriginal: false })
            .then((addedClass) => {
                console.log(addedClass)
                res.status(200).json(addedClass)
                return resolve("schedule updated, class added")
            })
            .catch((err) => res.status(400).json({result: err}))
    }) 
        
    }

async function iterateSchedulesAndChek(req, res, schedules, start, end, day, teacher, group, salle, promoName, promoSp, semestre) {

    for (i = 0; i < schedules.length; i++) {

        //get classes that can be in that hour

        let available = true;

   

  // console.log("available: ", available)

        if (schedules[i].semestre == semestre) {
            available = await testScheduleHours(res, schedules, schedules[i], i, start, end, day, teacher, group, salle, promoName, promoSp)
        }

         


        console.log("available", available)


        if ((available == true) && (i == schedules.length - 1)) {
            console.log("here5")
            await finallyAddClass(req, res)
        } 

        if (!available) {
            console.log("here6")
            return
        }
   
    }
}    

function testScheduleHours(res, schedules, schedule, i, start, end, day, teacher, group, salle, promoName, promoSp) {
    return new Promise((resolve) => {
        if (schedule.classList.length > 0) { //at least one class exists in schedule

            //console.log("13")

            
            for (index = 0; index < schedule.classList.length; index++) {
             
                var oneClass = schedule.classList[index]
                var startTime = parseInt(start)
                var endTime = parseInt(end)


                console.log("here1")

                //console.log(oneClass)
                //console.log(oneClass.teacherID.firstName)

                console.log("start time : ", startTime)
                console.log("end time : ", endTime)

                console.log("parseStart: ", parseInt(oneClass.start))
                console.log("parseStart: ", parseInt(oneClass.end))
                console.log("promoName", schedule.promoID.name)


                if ((parseInt(oneClass.start) > startTime && parseInt(oneClass.start) < endTime && parseInt(oneClass.end) > endTime) ||
                (parseInt(oneClass.start) < startTime && parseInt(oneClass.end) > endTime) || 
                (parseInt(oneClass.start) < startTime && parseInt(oneClass.end) > startTime && parseInt(oneClass.end) < endTime) ||
                (parseInt(oneClass.start) > startTime && parseInt(oneClass.end) < endTime) || 
                (parseInt(oneClass.start) == startTime && parseInt(oneClass.end) == endTime) ||
                (parseInt(oneClass.start) < startTime && parseInt(oneClass.end) == endTime) ||
                (parseInt(oneClass.start) == startTime && parseInt(oneClass.end) > endTime)) {

                    //console.log("inside parses2")

                    console.log("here2")

                    if (oneClass.teacherID.email == teacher.email && oneClass.day == day ) {
                        console.log("teacher is not available in this hour")
                        available = false;
                        res.status(400).json({error: "teacher is not available in this hour"})
                        return resolve(false)                                  
                    } else if (oneClass.groupID.name == group.name && oneClass.day == day &&
                        schedule.promoID.name == promoName && schedule.promoID.speciality == promoSp) {
                        console.log("group is not available in this hour")
                        res.status(400).json({error: "group is not available in this hour"})
                        return resolve(false) 
                    } else if (oneClass.salleID.name == salle.name && oneClass.day == day) {
                        console.log("salle is not available in this hour")
                        available = false;
                        res.status(400).json({error: "salle is not available in this hour"})
                        return resolve(false) 
                    } else {

                        console.log("here3")
                        if (index == schedule.classList.length-1) return resolve(true)

                        //await finallyAddClass(req, res)
                       //if ((i == schedules.length-1) && (index == schedule.classList.length-1)) await finallyAddClass(req, res)
                        // this condition made an error (group2 class duplicated + server down"sending two res")
                    } 

                } else {
                    console.log("here4")
                    if (index == schedule.classList.length-1) return resolve(true)
                    //if ((i == schedules.length-1) && (index == schedule.classList.length-1)) await finallyAddClass(req, res)
                }
            }

        } else return resolve(true)
    })
}    
            
            