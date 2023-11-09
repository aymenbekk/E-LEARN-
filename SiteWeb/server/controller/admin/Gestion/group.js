
const Group = require("../../../models/Group");
const Promo = require("../../../models/Promo")

exports.getAllGroups = (req, res) => {

    Group.find({})
        .populate('promoID')
        .exec((err, groups) => {
            if (err) return res.status(400).json({error: err})
            if (groups) return res.status(200).json({groups: groups})
        })
}

exports.getPromoGroups = (req, res) => {
    Group.find({promoID: req.query.promoID})
    .populate('promoID')
    .exec((err, groups) => {
        if (err) return res.status(400).json({error: err})
        if (groups) return res.status(200).json({groups: groups})
    })

}


exports.createGroup = (req, res) => {

    const promoID = req.query.promoID
    const name = req.body.name

    if (!name) return res.status(400).json({error: "Empty filed"})
    if (!promoID) return res.status(400).json({error: "Select a Promo"})

    Group.findOne({$and: [{name: name}, {promoID: promoID}]})
        .exec((err, group) => {
            if (err)  return res.status(400).json({error: err})
            else if (group) return res.status(400).json({error: "Group already exists"})
            else {
                const group = new Group({
                    name: name,
                    promoID: promoID,
                    studentNumber: 0
                })
                group.save()
                    .then((group) => {
                        Promo.updateOne({_id: promoID}, {$push: {groupList: {groupID: group._id}}})
                            .then(async () => {
                                await group.populate('promoID')
                                res.status(200).json({group: group})
                             })
                    })
                    .catch((err) => res.status(400).json({error: err}))
            }
        })

}

exports.updateGroup = (req, res) => {
    
    const name = req.body.name
    const promoID = req.body.promoID 
    if (!name) return res.status(400).json({error: "Empty filed"})
    if (!promoID) return res.status(400).json({error: "Select a Promo"})
    
    else {
        Group.findOneAndUpdate({_id: req.query.groupID}, {$set:{name: name, promoID: promoID}}, {
            new: true   //to get updated subject
        })
            .exec((err, group) => {
                if (err)  return res.status(400).json({error: err})
                else if (group) return res.status(200).josn({group: group})

            })
    }
}

exports.deleteGroup = (req,res) => {

    const groupID = req.query.groupID
    const promoID = req.body.promoID

    Group.findByIdAndRemove({_id: groupID})
        .then(() => {

            Promo.findOneAndUpdate({_id: promoID}, {$pull:{"groupList": {"groupID": groupID}}})
                .then(() => res.status(200).json({result: "subject Deleted"}))
                .catch((err) => res.status(400).json({error: err}))

            res.status(200).json({result: "Group deleted"})    
        })
        .catch((err) => res.status(400).json({error: err}))

}

