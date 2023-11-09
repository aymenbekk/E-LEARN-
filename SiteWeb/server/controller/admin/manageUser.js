
const bcrypt = require("bcrypt");
// models
const User = require("../../models/User");
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const Promo = require("../../models/Promo");
const Group = require("../../models/Group");

exports.createStudent = (req, res) => {

    if (!req.body) return res.status(400).json({message: "all filed are required"});

    User.findOne({email: req.body.email})
        .exec((err, user) => {
            if (err) return res.status(400).json({err});
            if (user) return res.status(400).json({message: "Student already exists"})
            // save new student
            const student = new Student(req.body)
            student.save()
                   .then(student => {

                       createAndSetYearIdStudent(student)

                       const user = new User({
                           email: student.email,
                           password: "student123",
                           user: student._id,
                           userModel: 'student'
                       })
                       
                      bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(user.password, salt, (err, hash) => {

                        if (err) throw err;
                        user.password = hash;
                        user.save()
                        .then(user => {
                            return res.status(200).json({message: "Student registred successflly ..."})
                        })
                       }
                       )});
                   })
        })
}

exports.createTeacher = (req, res) => {

    if (!req.body) return res.status(400).json({message: "all filed are required"});

    User.findOne({email: req.body.email})
    .exec((err, user) => {
        if (err) return res.status(400).json({err});
        if (user) return res.status(400).json({message: "Teacher already exists"})
        // save new student
        const teacher = new Teacher(req.body)
        teacher.save()
               .then(teacher => {

                   const user = new User({
                       email: teacher.email,
                       password: "teacher123",
                       user: teacher._id,
                       userModel: 'teacher'
                   });

                   bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {

                        if (err) throw err;
                        user.password = hash;
                        user.save()
                        .then(user => {
                            return res.status(200).json({message: "Teacher registred successflly ..."})
                        })
                    }
                 )});
               })
    })

}



function createAndSetYearIdGroupIdStudent(field) {

    return new Promise((resolve) => {

        const student = new Student({
            firstName: field.firstName,
            lastName: field.lastName,
            email: field.email,
            password: field.password,
            year: field.year,
            speciality: field.speciality,
            group: field.group
        })

        student.save(student).then(async (student) => {

            Promo.findOne({$and: [{name: student.year}, {speciality: student.speciality}]})
                        .exec(async (err, promo) => {
                            if (!promo) {   // not saved yet in promo collection

                                const group = new Group({
                                    name: student.group,
                                    studentNumber: 1
                                })                            

                                group.save()
                                    .then((group) => {
                                        
                                        const groups = []
                                        groups.push({groupID: group._id})   

                                        const promo = new Promo({
                                            name: student.year,
                                            speciality: student.speciality,
                                            groupList: groups
                                        });
                                        promo.save()
                                            .then((promo) => {

                                                Group.findOneAndUpdate({_id: group._id}, {promoID: promo._id}, {new: true})
                                                    .then((result) => {
                                                        Student.updateOne({_id: student._id}, {$set: {"promoID": promo._id, "groupID": group._id}})
                                                        .then((addedPromoGroup) => resolve(student))
                                                        .catch((err) => console.log(err))

                                                    })
                                            })
                                    })

                               

                            } else {  // promo already exists in promo collection

                                await Promo.findById(promo._id)
                                    .populate('groupList.groupID')
                                    .then((result) => {
                                    //console.log("pop groupList", result.groupList);

                                    const groupArray = result.groupList;    

                                    groupArray.forEach(function(item, i) {

                                        const group = item.groupID
                                        //console.log("group", group.name)
                                        if (group.name == student.group) {
                                            Student.updateOne({_id: student._id}, {$set: {"promoID": promo._id, "groupID": group._id}})
                                            .then((updated) => {
                                                // Increment student Number
                                                Group.findOneAndUpdate({_id: group._id}, {studentNumber: group.studentNumber + 1})
                                                    .then(() => {
                                                        resolve(student)
                                                    })
                                               
                                            })
                                            .catch((err) => console.log(err))
                                            return;

                                    } else if (i+1 == result.groupList.length) {  

                                        const group = new Group({
                                            name: student.group,
                                            promoID: promo._id,
                                            studentNumber: 1
                                        })
                                        group.save()
                                            .then((group) => {
                    
                                                Promo.updateOne({_id: promo._id}, {$push: {groupList: {groupID: group._id}}})
                                                    .then(() => {

                                                        Student.updateOne({_id: student._id}, {$set: {"promoID": promo._id, "groupID": group._id}})
                                                        .then((updated) => resolve(student))
                                                        .catch((err) => console.log(err))
    
                                                    })
                                                // then we update student by promoID and groupID
    
                                            })
                                        }        
                                    
                                });
                                    })
                                    .catch((err) => {console.log(err)})

                            }
                        })

        })

    })   
}

//remove user
exports.removeUser = (req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Can not remove user with id ${id},possibly id does not exist`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

module.exports = {createAndSetYearIdGroupIdStudent, createAndSetYearIdStudent}