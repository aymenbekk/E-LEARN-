


const multer = require('multer')
const uploadRessources = require('../models/Ressources')
const mongoose = require("mongoose")


const storage = multer.diskStorage(
    {
        destination: (req,file,cb) => {
            cb(null, "storage/ressources")
        },
        filename: function(req, file, cb) {
         cb(null, file.originalname)
     } 
    }
)

const upload = multer({storage: storage})

const uploader = async (req, res, next) => {

    //const subject = req.params.subject

    try {


        const file = await new uploadRessources({
            chapter: "chapter 1",
            filename: req.file.filename,
            filePath: req.file.path,
            fileSize: req.file.size,
            subjectID: "628d79b60491234f87246190"
        })



        file.save(file)
            .then((file) => {
                //createAndSetSubject(subject,file)
                res.status(200).json({file: file})
            })
            .catch(err => res.status(400).json({error: err}))


        //res.sendStatus(201)

    } catch (error) {
        console.log(error.message)
        return;
    }
}

//

// check for subject if exist else create and give ID to file

const createAndSetSubject = (subjectName, file) => {

    Subject.findOne({ name: subjectName })
        .exec((err, subject) => {

            if (!subject) {   // not saved yet in promo collection

                const newSubject = new Subject({
                    name: subjectName,
                    semestre: '1',
                    ressources: [file]
                });
                newSubject.save(newSubject)
                .then((subject) => {
                    uploadRessources.findOneAndUpdate({ _id: file._id }, { subject: subject._id }, (err, result) => {
                            if (err) console.log("error findOneAndUpdate : %s", err)
                            else console.log("subejectID %s", result);
                        });
                })

            } else {  // promo already exists in promo collection

                uploadRessources.findOneAndUpdate({ _id: file._id }, { subject: subject._id }, (err, result) => {
                    if (err) console.log("error findOneAndUpdate : %s", err)
                    else console.log("subjectID %s", result);
                });
            }
        })
}





module.exports = {upload, uploader}