
const Teacher = require("../../models/Teacher");
const User = require("../../models/User");
const bcrypt = require('bcrypt');

exports.registerTeacher = (req, res) => {

    Teacher.find({})
        .exec((err, teachers) => {
            if (err) return res.status(400).json({err})

            if (teachers.length > 0) {  // Admin collection 

                teachers.forEach(teacher => {
                    const user = new User({
                        email: teacher.email,
                        password: Math.random().toString(),
                        user: teacher._id,
                        userModel: 'teacher'
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {

                            if (err) throw err;
                            user.password = hash;
                            user.save()
                                .catch(err => console.log(err));
                        }
                     ) });

                })

                return res.status(200).json({message: "teachers added"})

            } else return res.status(400).json({message: "teacher DB not found"})
    });
 
 }

