
const Subject = require("../../../models/Subject");
const Teacher = require("../../../models/Teacher")

exports.getSubjects = (req, res) => {

    const semestre = req.body.semestre
    const promoID = req.query.promoID

    Subject.find({$and: [{semestre: semestre}, {promoID: promoID}]})
        .populate('teachers.teacherID')
        .exec((err, subjects) => {
            if (err) return res.status(400).json({error: err})
            if (subjects) return res.status(200).json({subjects: subjects})
        })
}

exports.getAllSubjects = (req, res) => {

    Subject.find({})
        .populate('teachers.teacherID')
        .populate('promoID')
        .then((subjects) => {
            if (subjects) res.status(200).json({subjects: subjects})
            else res.status(400).json({error: "No Subject Found"})
        })
        .catch((err) => res.status(400).json({error: err}))

}


exports.createSubject = (req, res) => {

    const {name, semestre} = req.body
    const promoID = req.query.promoID

    if (!name || !semestre) return res.status(400).json({error: "Empty filed"})
    else if (!promoID) return res.status(400).json({error: "il faut choisir une année"})
    else if (semestre != "1" && semestre != "2") return res.status(400).json({error: "Semestre doit etre [1,2]"})

    Subject.findOne({$and: [{name: name}, {semestre: semestre}, {promoID: promoID}]})
        .populate('teachers.teacherID')
        .populate('promoID')
        .exec((err, Subjectt) => {
            if (err)  return res.status(400).json({error: err})
            else if (Subjectt) return res.status(400).json({error: "Subject already exists"})
            else {
                const subject = new Subject({
                    name: name,
                    semestre: semestre,
                    promoID: promoID
                })
                subject.save()
                    .then(async (subject) => {
                        await subject.populate('promoID')
                        res.status(200).json({subject: subject})
                    })
                    .catch((err) => res.status(400).json({error: err}))
            }
        })

}

exports.updateSubject = (req, res) => {
    
    const {name, semestre} = req.body
    if (!name || !semestre) return res.status(400).json({error: "Empty filed"})
    else {
        Subject.findOneAndUpdate({_id: req.query.subjectID}, {$set:{name: name, semestre: semestre}}, {
            new: true   //to get updated subject
        })
            .exec((err, subject) => {
                if (err)  return res.status(400).json({error: err})
                else if (subject) return res.status(200).josn({subject: subject})

            })
    }
}

exports.deleteSubject = async (req, res) => {

    const subjectID = req.body.subjectID   // student object

    Subject.findOneAndRemove({_id: subjectID})
        .then(() => {
            //for (let teacherIDandType of subject.teachers) {

            //    const teacher = teacherIDandType.teacherID

                Teacher.updateMany({"subjects.subjectID": subjectID}, {$pull:{"subjects": {"subjectID": subjectID}}})
                .then(() => res.status(200).json({result: "subject Deleted"}))
                .catch((err) => res.status(400).json({error: err}))


           // }
        })
        .catch((err) => res.status(400).json({error: err}))
}


exports.getStudentSubjects = (req, res) => {

    Subject.find({promoID: req.query.promoID})
        .exec((err, subjects) => {
            if (err) return res.status(400).json({error: err})
            if (subjects) return res.status(200).json({subjects: subjects})
        })

    
}

exports.getSubjectByID = (req, res) => {

    Subject.find({subjectID: req.query.subjectID})
        .populate('teachers.teacherID')
        .exec((err, subject) => {
            if (err) return res.status(400).json({error: err})
            if (subject) return res.status(200).json({subject: subject})
        })
}
