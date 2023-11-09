const multer = require('multer')
const xlsx = require('xlsx')
const path = require('path')
const Student = require('../models/Student')
const User = require('../models/User')
const Promo = require('../models/Promo')
const Teacher = require('../models/Teacher')
const Group = require('../models/Group')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const { createStudent,createAndSetYearIdStudent, createAndSetYearIdGroupIdStudent } = require('../controller/admin/manageUser')
const { waitForDebugger } = require('inspector')


const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "storage/users")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
)

const upload = multer({ storage: storage })


//Upload a ressource into ressourceDB
const createStudents = async (req, res, next) => {


    try {

        var studentXSL = xlsx.readFile(path.resolve(__dirname, '../storage/users/students.xlsx'))

        const studentsJSON = Object.keys(studentXSL.Sheets).map((name) => ({
            name,
            data: xlsx.utils.sheet_to_json(studentXSL.Sheets[name])
        }))
        

        studentsJSON.forEach(async (element) => {


             for (let i = 0; i < element.data.length; i++) {

                let field = element.data[i] 

                console.log(field)

                //await createAndSetYearIdStudent(field)
                const student = await createAndSetYearIdGroupIdStudent(field)

                console.log(student)

                const userStudent = new User({
                    email: field.email,
                    password: field.password,
                    user: student._id,
                    userModel: "student"
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(userStudent.password, salt, (err, hash) => {

                        if (err) throw err;
                        userStudent.password = hash;
                        userStudent.save(userStudent)
                        
                            .catch(err => console.log(err));
                    }
                    )
                }) 

                }

        })


        res.send({ studentsJSON })


    } catch (error) {
        console.log(error.message)
        return;
    }
}


const createTeachers = async (req, res, next) => {



    try {

        var teacherXSL = xlsx.readFile(path.resolve(__dirname, '../storage/users/teachers.xlsx'))


        const teachersJSON = Object.keys(teacherXSL.Sheets).map((name) => ({
            name,
            data: xlsx.utils.sheet_to_json(teacherXSL.Sheets[name])
        }))


        teachersJSON.forEach((element) => {

            element.data.forEach((field) => {

                const teacher = new Teacher({
                    firstName: field.firstName,
                    lastName: field.lastName,
                    email: field.email,
                    password: field.password

                })

                teacher.save(teacher).then(() => {

                    const userTeacher = new User({
                            email: field.email,
                            password: field.password,
                            user: teacher._id,
                            userModel: "teacher"
                        })
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(userTeacher.password, salt, (err, hash) => {

                                if (err) throw err;
                                userTeacher.password = hash;
                                userTeacher.save(userTeacher)
                                    .catch(err => console.log(err));
                            }
                            )
                        })    
                })
            })
        })

        res.send({ teachersJSON })


    } catch (error) {
        console.log(error.message)
        return;
    }
}



module.exports = { upload, createStudents, createTeachers }