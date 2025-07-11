const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

if(!secret){
    throw new Error("JWT_SECRET is not defined in the .env file");
}

function setUser(user){
    return jwt.sign({
        _id: user.id,
        email: user.email,
    }, 
    secret);
}

function getUser(token){
    if(!token)return null;
    try{
        return jwt.verify(token, secret);
    }catch (error){
        console.error("JWT Verification Error!");
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}