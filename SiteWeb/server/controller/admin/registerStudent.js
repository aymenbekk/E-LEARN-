
const bcrypt = require('bcrypt');

//models
const Student = require("../../models/Student");
const User = require("../../models/User");
const Promo = require("../../models/Promo");


exports.registerStudent = (req, res) => {

    Student.find({})
        .exec((err, students) => {
            if (err) return res.status(400).json({err})

            console.log(students.length);

            if (students.length > 0) {  // Admin collection 

                students.forEach(student => {

                
                    Promo.findOne({name: student.year})
                        .exec((err, promo) => {
                            if (!promo) {   // not saved yet in promo collection

                                const promo = new Promo({
                                    name: student.year
                                });
                                promo.save((err, promo) => {

                                    if (promo) {  // new promo added to promo collection successfully

                                        Student.findOneAndUpdate({_id: student._id}, {yearID: promo._id}, (err, result) => {
                                           if (err) console.log("error findOneAndUpdate : %s", err)
                                           else console.log("yearID %s", result);
                                       });
                                    }

                                })

                            } else {  // promo already exists in promo collection

                                Student.findOneAndUpdate({_id: student._id}, {yearID: promo._id}, (err, result) => {
                                    if (err) console.log("error findOneAndUpdate : %s", err)
                                    else console.log("yearID %s", result);
                                });
                            }
                        })

                    const user = new User({
                        email: student.email,
                        password: Math.random().toString(),
                        user: student._id,
                        userModel: 'student'
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

                res.status(200).json({message: "students registred"})
            } else return res.status(400).json({message: "student DB not found"})
    });

 }

