const express = require('express')

const { signUp, signIn, profile, savePokemon } = require('../controllers/user')
const isAuthenticated = require('../middlewares/auth')
const uniqueUserMiddleware = require('../middlewares/user-auth')

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/profile/:id', isAuthenticated, uniqueUserMiddleware, profile)
router.post('/pokemon/:id', isAuthenticated, uniqueUserMiddleware, savePokemon)

module.exports = router
