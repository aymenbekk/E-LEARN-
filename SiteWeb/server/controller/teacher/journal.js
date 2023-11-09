const Journal = require('../../models/journal');


exports.sendJournal = (req, res) => {

    const senderID = req.body.senderID;
    const senderRole = req.body.senderRole;
    const promoID = req.body.promoID;
    const groupID = req.body.groupID;
    const title = req.body.title;
    const body = req.body.body

    const journal = new Journal({
        title: title,
        body: body,
        senderID: senderID,
        userModel: senderRole,
        promoID: promoID,
        groupID: groupID
    })

    journal.save()
        .then(async (journal) => {

            await journal.populate('promoID')
            await journal.populate('groupID')
            res.status(200).json({journal: journal})
        })
        .catch((err) => res.status(400).json({error: err}))
    
}

exports.getSentJournals = async (req, res) => {

    const senderID = req.query.senderID

   Journal.find({senderID: senderID}).sort({"createdAt": -1})
    .populate('promoID')
    .populate('groupID')
    .then((journals) => res.status(200).json({journals: journals}))
    .catch((err) => res.status(400).json({error: err}))
}


exports.getReceivedJournals = (req, res) => {

    const groupID = req.query.groupID;

    Journal.find({groupID: groupID}).sort({"createdAt": -1})
        .populate('senderID')
        .then((journals) => res.status(200).json({journals: journals}))
        .catch((err) => res.status(400).json({error: err}))

}