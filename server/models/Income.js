const mongoose = require("mongoose");
// const User = require("./User");

const Income = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxLength:50,
    },
    amount:{
        type: Number,
        required: true,
        trim: true,
        maxLength:20,
    },
    type:{  // type of income -> salary,invertment,etc (this will be in dropdown of income section)
        type: String,
        default: "income"
    },   
    date:{ 
        type: Date,
        required: true,
        trim: true,
    },
    category:{
        type: String,
        required: true,
        maxLength:20,
        trim: true,
    },
    description:{ 
        type: String,
        required: true, 
        maxLength:50,
        trim: true, 
    },
    owner:{
        type: mongoose.Types.ObjectId, // owner of any income will have the user's id as value
        ref: "User"
    }
}, {timestamps:true}); // saving the time any instance from this model is created

const IncomeModel = mongoose.model("Income",Income)

module.exports = IncomeModel;