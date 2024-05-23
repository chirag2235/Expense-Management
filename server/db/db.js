const mongoose = require("mongoose");

require("dotenv").config();

const db = async() => {
    try{ // trying to connect to our mongo data base
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongoDB"); 
    }
    catch(error){
        console.log("mongodb connection ERROR")
    }
}

module.exports = db;