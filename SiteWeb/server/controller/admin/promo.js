
const Promo = require("../../models/Promo");


exports.createPromo = (req, res) => {

    {/* 
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

        */}

}

exports.getPromos = (req, res) => {
    
    Promo.find({})
        .populate('groupList.groupID')
        .exec((err, promos) => {
            if (err) return res.status(400).json({error: err})
            if (promos) return res.status(200).json({promos: promos})
        })
}

exports.getPromoByID = (req, res) => {

    Promo.findById(req.query.promoID)
        .populate('groupList.groupID')
        .then((promo) => res.status(200).json({promo:promo}))
        .catch((err) => res.status(400).json({error: err}))
}

