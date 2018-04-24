
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next()
    else res.sendStatus(401)
}

const isUser = (req, res, next) => {
    if (req.user) next()
    else res.sendStatus(401)    
}

const SelforAdmin = function(userId) {
    return (req, res, next) => {
        if ((req.user && req.user.isAdmin) || (req.user.id && req.user.id == userId))  next()
        else res.sendStatus(401)
    }
}
const isSelforAdmin = (req, res, next) => {
    if ((req.user && req.user.isAdmin) || (req.user.id && req.user.id == req.params.userId))  next()
    else res.sendStatus(401)
}
module.exports = {
    isAdmin,
    isUser,
    isSelforAdmin,
    SelforAdmin,
}