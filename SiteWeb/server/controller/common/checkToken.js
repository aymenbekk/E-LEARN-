
const jwt = require("jsonwebtoken");
const config = require("config");

const requireSignin = (req, res, next) => {

    if (req.headers.authorization) {

        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, config.get("tokenSECRET"));
        req.user = user;  // here we have just id and role (passed from jwt)
        next();
    } else return res.status(400).json({message: "Authorization required"});
}

const isAdmin = (req, res, next) => {

    if (req.user.role != "admin") {
        return res.status(400).json({message: "Access denied"});
    } else next();
}

module.exports = {requireSignin, isAdmin}