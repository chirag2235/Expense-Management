const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:50,
        trim:true
    },
    role:{
        type:String,
        default:"user",
    },
    lastName:{
        type: String,
        required:true,
        maxLength:50,
        trim:true,
    },
    email:{
        type: String,
        require: true,
        maxLength: 50,
        trim: true 
    },
    password:{
        type: String,
        required:true,
        private: true,
        trim: true
    }
})

const UserModel = mongoose.model("User",User);

module.exports = UserModel;