const mongoose = require("mongoose");
require('dotenv').config();

const connectToDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
        });
        console.log("MongoDb connected!");
    }
    catch (error){
        console.log("Database connection Error", error);
        process.exit(1);
    }

}

module.exports = {
    connectToDB,
}