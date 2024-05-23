const mongoose = require("mongoose");

const Expense = new mongoose.Schema({

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
        default: "expense"
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
        type: mongoose.Types.ObjectId, // owner of any expense will have the user's id as value
        ref: "User",
    }
}, {timestamps:true}); // saving the time any instance from this model is created

const ExpenseModel = mongoose.model("Expense",Expense)

module.exports = ExpenseModel;