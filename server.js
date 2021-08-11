//3rd party library
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
//Local
const path = require("path")
const {url} = require('./config/db.config')
const authRouter = require('./router/auth')

//middlewares
const {isAuthenticated} = require('./middlewares/auth')
//App
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "client", "build")))
//Db
mongoose.Promise = global.Promise
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected To DB")
})
.catch((err)=>{
    console.log("Error:", err)
    process.exit()
})

//Models
const Pokemons = require('./models/Pokemons')

//Auth Routes
app.use("/", authRouter)

//get
// app.get("/userProfile", isAuthenticated, userProfileController)

// app.get("/pokemons", isAuthenticated, pokemonController)
// //post
// app.post("/favorites", isAuthenticated, favoritesController)

//Listening

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(process.env.PORT || 8000, ()=>{
    console.log("App is listening at port 8000")
})