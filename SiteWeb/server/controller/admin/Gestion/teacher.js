
const Teacher = require("../../../models/Teacher");
const User = require("../../../models/User");
const Subject = require("../../../models/Subject");
const bcrypt = require("bcrypt")


exports.getAllTeachers = (req, res) => {
    Teacher.find({})
        .populate('subjects.subjectID')
        .then((teachers) => res.status(200).json({teachers: teachers}))
        .catch((err) => res.status(400).json({error: err}))
}

exports.getTeacherSubjects = (req, res) => {

    Teacher.findOne({email: req.query.teacherEmail})
        .populate('subjects.subjectID')
        .then((teacher) => {
            res.status(200).json({teacherSubjects: teacher.subjects})
        })
        .catch((err) => res.status(400).json({error: err}))
}

exports.getSubjectTeachers = (req, res) => {

    Teacher.find({"subjects": {$elemMatch: {subjectID: req.query.subjectID}}})
        .populate('subjects.subjectID')
        .exec((err, teachers) => {
            if (err) return res.status(400).json({error: err})
            if (teachers) return res.status(200).json({teachers: teachers})
        })
}


exports.createTeacher = (req, res) => {

    const {firstName, lastName, email, password} = req.body
    //const {subjects} = req.body   //promo object and group object not just names or id

    if (!firstName || !lastName || !password || !email) return res.status(400).json({error: "Empty filed"})

    Teacher.findOne({email: email})
        .exec((err, teacher) => {
            if (err)  return res.status(400).json({error: err})
            else if (teacher) return res.status(400).json({error: "Teacher already exists"})
            else {
                const teacher = new Teacher({
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                })
                teacher.save()
                    .then((teacher) => {
                        //auth this teacher
                        const userTeacher = new User({
                            email: email,
                            password: password,
                            user: teacher._id,
                            userModel: "teacher"
                        })
        
                        User.findOne({email: teacher.email})  // check if uploaded student already registreded (admin upload same student twice)
                        .exec((err, user) => {
        
                            if (!user) {
        
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(userTeacher.password, salt, (err, hash) => {
        
                                        if (err) throw err;
                                        userTeacher.password = hash;
                                        userTeacher.save(userTeacher)
                                            .then(() => res.status(200).json({teacher: teacher}))
                                            .catch(err => console.log(err));
                                    }
                                    )
                                })
        
                            }
                        }) 
                        
                        // update subject by this teacher (teachers)
                       // if (subjects.length > 0) {
                        //    subjects.array.forEach(element => {
                        //        Subject.updateOne({_id: element._id}, {$push: {teachers: {teacherID: teacher._id, type: element.type}}})
                       //         .catch((err) => res.status(400).json({error: err}))
                       //     });
                       // }


                    })
                    .catch((err) => res.status(400).json({error: err}))
            }
        })

}

exports.updateTeacher = (req, res) => {
    
    const {firstName, lastName, email} = req.body

    if (!firstName || !lastName || !email) return res.status(400).json({error: "Empty filed"})
    
    else {
        console.log(req.query.teacherID)
        Teacher.findOneAndUpdate({_id: req.query.teacherID}, {$set:{firstName: firstName, lastName: lastName,
            email: email}}, {
            new: true   //to get updated subject
        })
            .exec((err, teacher) => {

                console.log(teacher)
                
                if (err)  return res.status(400).json({error: err})
                else {
                    User.findOneAndUpdate({user: teacher._id}, {$set:{email: email}})
                        .then(() => {
                            res.status(200).json({teacher: teacher})
                        })
                        .catch((err) => res.status(400).json({error: err}))
                }

            })
    }
}

exports.deleteTeacher = (req, res) => {

    const teacher = req.body.teacher    // teacher object
    const left = []

    Teacher.findOneAndRemove({email: teacher.email})
        .then(() => {
            User.findOneAndRemove({email: teacher.email})
                .then(() => {

                    // also we remove this teacher from subject teachers
                    const teacherSubjects = teacher.subjects;
                    if (teacherSubjects.length > 0) {
                    teacherSubjects.forEach(function(element, i)  {
                        Subject.findOneAndUpdate({_id: element.subjectID._id}, {$pull:{"teachers": {"teacherID": teacher._id}}})
                        .then(() => {
                            // to avoid sending more than response
                            if (i == teacherSubjects.length - 1) res.status(200).json({result: "Teacher is deleted"})
                        })
                        .catch((err) => res.status(400).json({error: err}))    
                    })
                    } else res.status(200).json({result: "teacher Deleted"})
                })
                .catch((err) => res.status(400).json({error: err}))
        })
        .catch((err) => res.status(400).json({error: err}))
}

exports.affectSubjectToTeacher = (req, res) => {

    const subjectID = req.body.subjectID
    const teacherID = req.body.teacherID
    const type = req.body.type

    Teacher.findOne({$and: [{_id: teacherID}, {"subjects": {subjectID: subjectID, type: type}}]})
        .then((result) => {
            if (result) return res.status(400).json({error: "Module est affecté dejà !!"})
            else {
                Teacher.updateOne({_id: teacherID}, {$push: {subjects: {subjectID: subjectID, type: type}}})
                    .then(() => {
                        Subject.updateOne({_id: subjectID}, {$push: {teachers: {teacherID: teacherID, type: type}}})
                            .then(() => res.status(200).json({result: "Module est affecté"}))
                            .catch((err) => res.status(400).json({error: err}))
                    })
                    .catch((err) => res.status(400).json({error: err}))
            }
        })
        .catch((err) => res.status(400).json({error: err}))
}

function getLefted(array, teacher) {

    return new Promise((resolve) => {

        const arr = []
        for (var i = 0; i < array.length; i++) {
            if (array[i].teacherID != teacher._id) arr.push(array[i])
            if (i == array.length) resolve(arr)
        }

    })

}

