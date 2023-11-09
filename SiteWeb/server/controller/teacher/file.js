
const File = require('../../models/File')
const multer = require("multer");
const path = require("path")


const upload = multer({

    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './storage/ressources');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    })
    /* 
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|ppt|pptx)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }

    */
  });



const uploadFile = async (req, res) => {

    try {
        const { title, type, chapterID, subjectID } = req.body;
        const { path, mimetype } = req.file;

        console.log(req.body)
        console.log(req.file)

        console.log(title)

        const file = new File({
            title: title,
            type: type,
            chapterID: chapterID,
            subjectID: subjectID,
            file_path: path,
            file_mimetype: mimetype
        })

        await file.save().then((file) => {

          res.status(200).json({file: file})

        })
        .catch((err) => res.status(400).json({error: err}))
        
    } catch (err) {
        res.status(400).json({error: "Error while uploading the file"})
    }

}

const getSubjectFiles = (req, res) => {

    File.find({subjectID: req.query.subjectID})
        .exec((err, files) => {
            if (err) return res.status(400).json({error: err})
            else if (files) return res.status(200).json({files: files})
        })


}

const downloadFile = async (req, res) => {

    const fileID = req.query.fileID;

    try {
      const file = await File.findById(fileID);
      res.set({
        'Content-Type': file.file_mimetype
      });
      console.log(__dirname)
      console.log(file.file_path)
      res.sendFile(path.join(__dirname, '../..', file.file_path));
    } catch (error) {
      res.status(400).json({error: error});
    }

}

module.exports = {upload, uploadFile, getSubjectFiles, downloadFile}

