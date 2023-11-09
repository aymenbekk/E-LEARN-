
const Salle = require("../../../models/Salle");

exports.getSalles = (req, res) => {

    Salle.find({})
        .exec((err, salles) => {
            if (err) return res.status(400).json({error: err})
            if (salles) return res.status(200).json({salles: salles})
        })
}


exports.createSalle = (req, res) => {

   const {name, type} = req.body

    if (!name || !type) return res.status(400).json({error: "Empty filed"})

    Salle.findOne({$and: [{name: name}, {type: type}]})
        .exec((err, salle) => {
            if (err)  return res.status(400).json({error: err})
            else if (salle) return res.status(400).json({error: "Salle already exists"})
            else {
                const salle = new Salle({
                    name: name,
                    type: type
                })
                salle.save()
                    .then((salle) => res.status(200).json({salle: salle}))
                    .catch((err) => res.status(400).json({error: err}))
            }
        })

}

exports.deleteSalle = (req,res) => {

    const salleID = req.query.salleID

    Salle.findByIdAndRemove({_id: salleID})
        .then(() => res.status(200).json({result: "Salle deleted"}))
        .catch((err) => res.status(400).json({error: err}))

}
