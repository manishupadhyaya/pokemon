// Make sure the user can access only his/her data
module.exports = uniqueUserMiddleware = (req, res, next) => {
    console.log("params",req.params)
    const id = req.params.id
    console.log("id", id)
    console.log("type of req.user._id", typeof req.user)
    if (req.user === id) {
        next()
    } else {
        return res.status(401).send("You are authorized to access only your account details")
    }
}