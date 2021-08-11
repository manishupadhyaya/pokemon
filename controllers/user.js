const {createUser, signInUser, fetchPokemonService, savePokemonService} = require('../services/users')

const signUp = async (req, res, next)=>{
    try{
        console.log("Requeest body", req.body)
        const newUser = req.body
        const savedUser = await createUser(newUser)

        res.status(200).json({
            success: true,
            data: savedUser
        })
    }
    catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    }
}

const signIn = async (req,res,next)=>{
    try{
        const payload = req.body
        const token = await signInUser(payload)
        res.status(200).json({
            success: true,
            token: token
        })
    }
    catch(err){
        console.log(err)
    }
}

const profile = async (req, res) => {
    try {
        const _id = req.user;
        console.log("inside profilee")
        const pokemons = await fetchPokemonService(_id)
        res.status(200).json(pokemons)
    } catch(err) {
        res.status(500).send(err.message ?? "Internal server error")
    }
}

const savePokemon = async (req, res) => {
    try {
        const _id = req.user
        const payload = req.body
        console.log("INside savee pokmon", payload)
        const pokemons = await savePokemonService(_id, payload)
        console.log(pokemons)
        res.status(200).json({
            success: true,
            data: pokemons
        })
    } catch(err) {
        res.status(500).send(err.message ?? "Internal server error")
    }
}

module.exports = {
    signUp, signIn, profile, savePokemon
}