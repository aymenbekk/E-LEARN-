
//models
const ScholarYear = require("../../models/ScholarYear")

exports.createScholarYear = (req, res) => {

    const start = req.body.scholarStart;
    const end = req.body.scholarEnd;

    console.log(start)
    console.log(end)

    if (!start || !end) return res.status(400).json({error: "All field are required"});
    
    const startInt = parseInt(start);
    const endInt = parseInt(end);
    if (!(endInt-startInt == 1)) return res.status(400).json({error: "Wrong inputs"});

    const scholaryearInput = start.concat("/", end);

    ScholarYear.findOne({name: scholaryearInput})
        .exec((err, scholaryear) => {

            if (err) return res.status(400).json({error: err});
            if (scholaryear) return res.status(400).json({error: "Scholar year already exists ..."});

            const newScholaryear = new ScholarYear({
                name: scholaryearInput
            });

            newScholaryear.save((err, scholaryear) => {
                if (err) return res.status(400).json({error: err});
                if (scholaryear) return res.status(200).json({
                    message: "Scholar year created successflly ...",
                    name: scholaryear.name
                    })
            })
        })
   
}