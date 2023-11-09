const mongoose =  require("mongoose")


const schema = mongoose.Schema;


const uploadRessource = new schema(
    {
        chapter: {type: String, required: true},
        filename: {type: String, required: true},
        filePath: {type: String, required: true},
        fileSize: {type: String, required: true},
        subjectID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject'
        }
},
    {
        timestamp: true,      
}
);

exports.uploadRessources = new mongoose.model('Ressource', uploadRessource, 'RessourceDB');