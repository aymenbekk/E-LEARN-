
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("config");

// models
const User = require("../models/User");
const Admin = require("../models/Admin");
const { default: mongoose } = require('mongoose');
//const { use } = require('../routes/auth');

exports.login = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if(!email) return res.status(400).json({error: "Empty email ..."});
    if (!password) return res.status(400).json({error: "Empty password ..."});

    // check if user is an admin (to save him for the first time)
    
    if (email == config.get("adminEMAIL") && password == config.get("adminPASSWORD")) {  // user is an admin
        // check if admin logged in for the first time (so we have to save him in admins and users)
        User.findOne({email: config.get("adminEMAIL")})
            .exec((err, user) => {
                if (err) return res.status(400).json({error_message: err})
                if (user) return loginUser(res, email, password);
                else registerAdmin(res);
            })
    } else loginUser(res, email, password); 
}

function loginUser(res, email, password) {

    User.findOne({email: email})
        .populate('user')
        .exec((err, user) => {
            if (err) {
                console.log(err)
                return res.status(400).json({error: err});

            } 
            if (!user) return res.status(400).json({error: "user not found "})
            else {
                bcrypt.compare(password, user.password, (err, result) => {

                    if (err) return res.status(400).json({error: err});
                    if (!result) return res.status(400).json({error: "Invalide password"});

                    const payload = {
                        id: user.userID,   // id of (admin,studnet,teacher)
                        role: user.userModel
                      };
                  
                      const token = jwt.sign(payload, config.get("tokenSECRET"), { expiresIn: config.get("tokenTIME") });
    
                      res.status(200).json({
                          token,
                          user: {
                              id: user._id,
                              userID: user.user._id,
                              user: user.user,
                              email: user.email,
                              role: user.userModel,
                              firstName: user.user.firstName,
                              lastName: user.user.lastName,
                          }
                      })
                });

            }
        })
}

function registerAdmin(res) {

    // save admin in admins collection
    const admin = new Admin({
        firstName: "Admin",
        lastName: "1",
        email: config.get("adminEMAIL")
    });

    admin.save((err, admin) => {

         // save admin in users collection
         if (err) return res.status(400).json({err_msg: err});
         const user = new User({
            email: config.get("adminEMAIL"),
            password: config.get("adminPASSWORD"),
            user: admin._id,
            userModel: 'admin'
        });
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
    
                if (err) throw err;
                const noHashPassword = user.password;
                user.password = hash;
                user.save()
                    .then(user=> loginUser(res, user.email, noHashPassword))

                    }
            )
    })
    })
}   