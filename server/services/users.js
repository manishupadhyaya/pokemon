const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Users = require('../models/Users')
const Pokemons = require('../models/Pokemons')
const getSignedToken = require('../utils/signedToken')

const handleError = (err)=>
{
    throw new Error(err)
}

async function createUser(payload){
    let {name, password, userName} = payload
    let [user] = await Users.find({userName}).exec().catch(err=>{
        err.message = "DB Finding Error"
        return handleError(err.message)
    })
    console.log("User", user)
    if(user)
    {
        const message = "User Already exists"
        return handleError(message)
    }
    let hashed = await bcrypt.hash(password, 10).catch((err)=>{
        err.message = "Hashing Failed"
        return handleError(err)
    })
    let newUser = new Users({
        name: name,
        userName: userName,
        password: hashed
    })
    newUser.save()
}   

async function signInUser(payload)
{
    let {userName, password} = payload
    let [user] = await Users.find({userName}).exec().catch(err=>{
        err.message = "DB Finding Error"
        return handleError(err)
    })
    console.log("signIn", user)
    if(user.length<=0){
        const message = "User Not Found"
        return handleError(message)
    }
    const res = await bcrypt.compare(password, user.password).catch((err)=>{
        err.message = "Password Comparing Error"
        return handleError(err)
    })
    if(res)
    {
        const {userName, name, _id} = user
        const token = getSignedToken(userName, name, _id)
        return token
    }
}

async function fetchPokemonService(_id)
{
    try{
        const data = await Pokemons.find({user: mongoose.Types.ObjectId(_id)}).exec()
        console.log(data)
        return data
    }
    catch(err){
        err.message = "Pokemons Fetching Error"
        handleError(err)
    }
}

async function savePokemonService(id, payload)
{
    const body = payload
    body.user = mongoose.Types.ObjectId(id)
    console.log("INside savee pokmon service", body)
    const pokemon = new Pokemons(body)
    return pokemon.save()
}

module.exports = {createUser, signInUser, fetchPokemonService, savePokemonService}