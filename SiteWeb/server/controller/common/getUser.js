
const Student = require("../../models/Student");
const Admin = require("../../models/Admin");
const Teacher = require("../../models/Teacher");
const User = require("../../models/User")

exports.getStudent = (req, res) => {
    
    const email = req.query.email;

    Student.findOne({email: email})
        .exec((err, student) => {
            if (err) return res.status(400).json({error: err})
            return res.status(200).json({student: student})
        })
}
