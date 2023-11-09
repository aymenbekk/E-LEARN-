
const Student = require("../../../models/Student");
const User = require("../../../models/User");
const Group = require("../../../models/Group")
const bcrypt = require("bcrypt");

exports.getStudents = (req, res) => {

    Student.find({})
        .populate('promoID')
        .populate('groupID')
        .exec((err, students) => {
            if (err) return res.status(400).json({error: err})
            if (students) return res.status(200).json({students: students})
        })
}


exports.createStudent = (req, res) => {

    const {firstName, lastName, email, password} = req.body
    const {promo, group} = req.body   //promo object and group object not just names or id

    console.log(firstName, lastName, email, password, promo, group)

    if (!firstName || !lastName || !password || !email) return res.status(400).json({error: "Empty filed"})
    else if (!promo) return res.status(400).json({error: "Select a Promo"})
    else if (!group) return res.status(400).json({error: "Select a Group"})

    Student.findOne({email: email})
        .exec((err, student) => {
            if (err)  return res.status(400).json({error: err})
            else if (student) return res.status(400).json({error: "Student already exists"})
            else {
                const student = new Student({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    year: promo.name,
                    group: group.name,
                    speciality: promo.speciality,
                    promoID: promo._id,
                    groupID: group._id
                })
                student.save()
                    .then((student) => {
                        //auth that student
                        const userStudent = new User({
                            email: email,
                            password: password,
                            user: student._id,
                            userModel: "student"
                        })
        
                        User.findOne({email: student.email})  // check if uploaded student already registreded (admin upload same student twice)
                        .exec((err, user) => {
        
                            if (!user) {
        
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(userStudent.password, salt, (err, hash) => {
        
                                        if (err) throw err;
                                        userStudent.password = hash;
                                        userStudent.save(userStudent)
                                            .then(() => {

                                                // update group's students number
                                                Group.findByIdAndUpdate({_id: group._id}, {studentNumber: group.studentNumber + 1}) 
                                                .then( async () => {

                                                    await student.populate('promoID')
                                                    await student.populate('groupID')
                                                    res.status(200).json({student: student})
                                                    
                                                })
                                            })
                                            .catch(err => console.log(err));
                                    }
                                    )
                                })
        
                            }
                        })    

                    })
                    .catch((err) => res.status(400).json({error: err}))
            }
        })

}

exports.updateStudent = (req, res) => {
    
    const {firstName, lastName, email} = req.body

    if (!firstName || !lastName || !email) return res.status(400).json({error: "Empty filed"})
    
    else {
        Student.findOneAndUpdate({_id: req.query.studentID}, {$set:{firstName: firstName, lastName: lastName,
            email: email}}, {
            new: true   //to get updated subject
        })
            .exec((err, student) => {
                console.log(student)
                if (err)  return res.status(400).json({error: err})
                else {
                    User.findOneAndUpdate({user: student._id}, {$set:{email: email}})
                        .then(() => {
                            res.status(200).json({student: student})
                        })
                        .catch((err) => res.status(400).json({error: err}))
                }

            })
    }
}

exports.deleteStudent = (req, res) => {

    const email = req.body.email   // student object
    const oldGroupStudentNumber = req.body.groupStudentNumber
    const groupID = req.body.groupID

    console.log(groupID)
    console.log(oldGroupStudentNumber)

    Student.findOneAndRemove({email: email})
        .then(() => {
            User.findOneAndRemove({email: email})
                .then(() => {

                    Group.findByIdAndUpdate({_id: groupID}, {studentNumber: oldGroupStudentNumber - 1})  // update group's students number
                    .then(() => {
                        res.status(200).json({result: "Student Deleted"})
                    })
                   
                })
                .catch((err) => res.status(400).json({error: err}))
        })
        .catch((err) => res.status(400).json({error: err}))
}

