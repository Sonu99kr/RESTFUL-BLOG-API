const jwt = require("jsonwebtoken");
const { getUser } = require("../services/userAuth");

async function checkAuthorization(req, res, next){
    const tokenCookie = req.cookies.token;
    req.user = null;
    if(!tokenCookie) 
        return next();

    const token = tokenCookie;
    const user = await getUser(token);

    req.user = user;
    return next();
}

async function rquireAuth(req, res, next){
    const token = req.cookies.token;
    if(!token)return res.redirect("/login");

    const user = await getUser(token);
    if(!user)return res.redirect("/login");

    req.user = user;
    next();
}

function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user)return res.redirect("/login");

        if(!roles.includes(req.user.role))return res.status(403).end("unAuthorized");

        return next();
    }
}

module.exports = {
    checkAuthorization,
    rquireAuth,
    restrictTo
}