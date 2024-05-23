
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Expense = require("../models/Expense");

// npm i jwt jsonwebtoken
// npm i passport passport-jwt


// creating a new expense obj in mongo by a user
// api/expense/add-expense
router.post("/add-expense", passport.authenticate("jwt", {session: false})  , async (req, res) => {

    try{
        // create a new instance of income model
        const {title, amount, date, category, description} = req.body;
        const userId = req.user._id;
        
        if(!title || !amount || !date || !category || !description){
            return res.status(403).json({err:"invalid data"});
        }
        if(amount < 0){
            return res.status(403).json({err:"invalid data"});
        }
        const expenseDetails = {title, amount, date, category, description, owner:userId};
        const expenseObject = await Expense.create(expenseDetails);

        return res.status(200).json(expenseObject);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({err:"can't create new expense object"});
    }
})


// getting all the expense objects of logged in user (reversely sorted by creation time i.e latest creations first)
// api/expense/my-expenses
router.get("/my-expenses", passport.authenticate("jwt" , {session:false}) ,async (req, res) => {
    try{
        const userId = req.user._id;
        // fetch all the expenses of logged in user from mongo
        
        const expenses = await Expense.find({owner: userId}).sort({createdAt:-1}); // by default the newest added income is at end of the mongodb so last index is -1, so it will be sorted in reversed
        return res.status(200).json(expenses);
    }
    catch(error){
        return res.status(500).json({err:"server error"});
    }
})


// getting all the expense objects of logged in user (sorted by objects date property i.e latest date last)
// api/expense/my-expenses/date-sorted
router.get("/my-expenses/date-sorted", passport.authenticate("jwt" , {session:false}) ,async (req, res) => {
    try{
        const userId = req.user._id;
        // fetch all the expenses of logged in user from mongo
        
        const expenses = await Expense.find({owner: userId}).sort({date:1}); // by default the newest added income is at end of the mongodb so last index is -1, so it will be sorted in reversed
        return res.status(200).json(expenses);
    }
    catch(error){
        return res.status(500).json({err:"server error"});
    }
})



// delete an expense by its id (a particular expense obj can be only deleted by its owner only)
// /api/expense/delete-expense/:id
router.post("/delete-expense/:expenseId",passport.authenticate("jwt",{session:false}) ,async (req, res) => {

    const expenseId = req.params.expenseId; 
    const userId = req.user._id;
    
    const expenseObj = await Expense.findOne({_id:expenseId});// fetch the expense by its id
    if(!expenseObj)//if no such income exists
        return res.status(403).json({err: "invalid expense id"});

    // if logged user is not the owner of that expense then he can not delete ite
    if(expenseObj.owner.equals(userId) === false) // use .equals() to compare value of 2 strings
        return res.status(403).json({err: "only owner can delete the expense"});
    
    await Expense.findByIdAndDelete(expenseId)
    .then(()=>{ // when id is deleted
        return res.status(200).json("expense deleted");  
    })
    .catch(()=>{ // did not delete
        return res.status(500).json({err:"server error"});
    })

})

module.exports = router; 