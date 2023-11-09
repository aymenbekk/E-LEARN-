const Chapter = require('../../models/Chapter')


exports.createChapter = (req, res) => {

    const subjectID = req.query.subjectID;
    const chapterName = req.body.chapterName;

    const chapter = new Chapter({
        name: chapterName,
        subjectID: subjectID
    })

    chapter.save()
        .then((chapter) => res.status(200).json({chapter: chapter}))
        .catch((err) => res.status(400).json({error: err}))
    
}

exports.renameChapter = async (req, res) => {

    const chapterID = req.query.chapterID;
    const newName = req.body.name;

    try {

        let updatedChapter = await Chapter.findOneAndUpdate({_id: chapterID}, {name: newName}, {
            new: true  // to get the updated chapter
        })
    
        res.status(200).json({chapter: updatedChapter})

    } catch(err) {
        res.status(400).send("Error while renaming the chapter")
    }
}


exports.getSubjectChapters = (req, res) => {

    Chapter.find({subjectID: req.query.subjectID})
        .exec((err, chapters) => {
            if (err) return res.status(400).json({error: err})
            else if (chapters) return res.status(200).json({chapters: chapters})
        })
}