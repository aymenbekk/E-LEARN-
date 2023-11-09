
const Grade = require('../../models/Grade')
const multer = require("multer");
const path = require("path")


const uploadG = multer({

    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './storage/ressources');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(xlsx|xls)$/)) {
        return cb(
          new Error(
            'only upload files with xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });



const uploadGrade = async (req, res) => {

    try {
        const {subjectID, title}  = req.body;
        const { path, mimetype } = req.file;

        Grade.findOne({subjectID: subjectID})
          .then( async (grade) => {
            if (grade) return res.status(400).json({error: "Vous a avez disposer les notes dejà"})
            else {

              const grade = new Grade({
                title: title,
                subjectID: subjectID,
                file_path: path,
                file_mimetype: mimetype
            })
    
            await grade.save().then((grade) => {
    
              res.status(200).json({grade: grade})
    
            })
            .catch((err) => res.status(400).json({error: err}))

            }
          })
        
    } catch (err) {
        res.status(400).json({error: "Error while uploading the file"})
    }

}

const getSubjectGrade = (req, res) => {

    Grade.findOne({subjectID: req.query.subjectID})
        .exec((err, grade) => {
            if (err) return res.status(400).json({error: err})
            else if (grade) return res.status(200).json({grade: grade})
        })


}

const downloadGrade = async (req, res) => {

    const subjectID = req.query.subjectID;

    try {
      const grade = await Grade.findOne({subjectID: subjectID});
      if (grade) {
        res.set({
          'Content-Type': grade.file_mimetype
        });
        res.sendFile(path.join(__dirname, '../..', grade.file_path));

      } else return res.status(400).json({error: 'Les Notes ne sont pas disponibles pour le moment'})
      
    } catch (error) {
      res.status(400).json({error: error});
    }

}

module.exports = {uploadG, uploadGrade, getSubjectGrade, downloadGrade}

