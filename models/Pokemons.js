const mongoose = require('mongoose')

const PokemonSchema = new mongoose.Schema({
    name:{
        type:"String",
        required: true
    },
    height:{
        type:"String",
        required: true
    },
    weight:{
        type:"String",
        required: true
    },
    front_default:{
        type:"String",
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }   
})

module.exports = mongoose.model('Pokemons', PokemonSchema)