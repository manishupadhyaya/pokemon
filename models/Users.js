const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true   
    },
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    }
})
module.exports = mongoose.model("Users", UserSchema)