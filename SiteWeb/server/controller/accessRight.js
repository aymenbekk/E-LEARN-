const subject=require("../models/Subject");
const teacher = require("../models/Teacher");
const { default: mongoose } = require('mongoose');



module.exports.assignTeacherToSubject = function (req, res) {
    var subjects = subject.get('subjects').value().filter(function (subject) {
      return subject;
    });

    res.render('admin/assignTeacherToSubject', {
        subjects: subjects,
      });
}
      var listeOfTeacher=[];
      module.exports.searchTeacher = function (req, res) {
         listeOfTeacher = mongoose.get('users').value().filter(function (user) {
          return user.userModel === 'Teacher';
        });
    var subjects = subject.get('subjects').value();
    var selectedSubject = JSON.parse(req.body.subjects);


        res.render('admin/assignTeacherToSubject', {
          subjects: subjects,
          teachers: listOfTeacher,
          selectedSubject: selectedSubject,
        })
      }


      module.exports.assignTeacherNOWToSubject = function (req, res) {
        var subjects = subject.get('subjects').value();
        var selectedSubject = subject.get('subjects').find({id_sub: parseInt(req.body.chooseThisSubjectID)}).value();
        var selectThis = JSON.parse(req.body.selectThis);
        var chooseThis = JSON.parse(req.body.chooseThis);
       

        var tdTeacher=[];
        for (let t = 0; t < req.body.selectThis; t++) {
            tdTeacher.push(selectThis[1]++);
          }
        
        var courseTeacher=[];
          for (let t = 0; t < req.body.chooseThis; t++) {
              courseTeacher.push(chooseThis[1]++);
            }
            subject.get('subjects')
               .find({id_sub: parseInt(req.body.chooseThisSubjectID)})
               .assign({lecturer: req.body.chooseThisTeacherName, lecturerID: req.body.chooseThisTeacherID})
               .write();
         var selectedTeacher = mongoose.get('users').find({id: req.body.chooseThisTeacherID}).value();


         res.render('school/assignTeacherToSubject', {
            subjects: subjects,
            selectedSubject: selectedSubject,
            teachers: Q.length > 0 ? Q : db.get('users').value().filter(function (user) {
              return user.userModel === 'Teacher';
            }),},)
    }

