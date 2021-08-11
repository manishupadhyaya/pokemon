const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/keys')

const getSignedToken = (userName, name, id)=>{
    return jwt.sign({userName, name, id}, JWT_SECRET, {expiresIn: "1hr"})
}

module.exports = getSignedToken