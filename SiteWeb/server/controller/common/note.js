
const Note = require("../../models/Note");


exports.createNote = (req, res) => {

    const {title, content, date, color, userID} = req.body;

    const note = new Note({
        title,
        content,
        date,
        color,
        userID
    });
    
    note.save()
        .then(note => {
            return res.status(200).json({note: note})
        })
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.getNotes = (req, res) => {
    let type = req.query.type;
    
    Note.find({userID: req.query.userId})
        .exec((err, notes) => {
            if (err) return res.status(400).json({error: err})
            return res.status(200).json({notes: notes})
        })

}

exports.getNote = (req, res) => {
    let type = req.query.type;

    Note.findOne({id: req.query.id})
        .exec((err, note) => {
            if (err) return res.status(400).json({error: err})
            return res.status(200).json({note: note})
        })
}

exports.updateNote = (req, res) => {
    
    Note.findByIdAndUpdate({_id: req.body.id}, {
        title: req.body.title,
        content: req.body.body
    }, {
        new: true,
      }).exec((err, note) => {
        if (err) return res.status(400).json({error: err})
        return res.status(200).json({note: note})
    })
}

exports.deleteNote = (req, res) => {

    Note.findByIdAndDelete(req.body.id)
        .exec((err, note) => {
            if (err) return res.status(400).json({error: err})
            return res.status(200).json({note: note})
        })
        
        
}