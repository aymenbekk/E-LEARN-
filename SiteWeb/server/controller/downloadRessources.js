const path = require("path");
const Ressource = require("../models/Ressources")
const {Subject} = require('../models/Subject')
const mongoose = require('mongoose')


const downloadSubject = async (req, res, next) => {

    if(!req.body.filename) {
        res.status(400)
        throw new Error("Didn't know the file name")
    }else {
        console.log(req.body.filename)
    }

    // filePath = path.resolve(__dirname, '../storage/ressources/', 'Profile.pdf')
    // res.sendFile(filePath)
}


const showRessources = (req, res) => {


    Ressource.find({subjectID: req.query.subjectID})
        .exec((err, files) => {
            if (err) return res.status(400).json({error: err})
            if (files) return res.status(200).json({files: files})
            else return res.status(400).json({error: "No Subject"})
        })

    
}

module.exports = {downloadSubject, showRessources}