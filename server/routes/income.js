const express = require("express");
const router = express.Router();
const passport = require("passport");

const Income = require("../models/Income");

// npm i jwt jsonwebtoken
// npm i passport passport-jwt


// creating a new income obj in mongo
// api/income/add-income
router.post("/add-income", passport.authenticate("jwt", {session: false})  , async (req, res) => {

    try{
        // create a new instance of income model
        const {title, amount, date, category, description} = req.body;
        const userId = req.user._id;
        console.log(userId);
        
        if(!title || !amount || !date || !category || !description){
            return res.status(403).json({err:"invalid data"});
        }
        if(amount < 0){
            return res.status(403).json({err:"invalid data"});
        } 
        const incomeDetails = {title, amount, date, category, description, owner:userId};
        const incomeObject = await Income.create(incomeDetails);

        return res.status(200).json(incomeObject);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({err:"can't create new income object"});
    }
})


// getting all the income objects of logged in user (reversely sorted by creation time i.e latest creations first)
// api/income/my-incomes
router.get("/my-incomes", passport.authenticate("jwt" , {session:false}) ,async (req, res) => {
    try{
        const userId = req.user._id;
        // fetch all the incomes of logged in user from mongo
        
        const incomes = await Income.find({owner: userId}).sort({createdAt:-1}); // by default the newest added income is at end of the mongodb so last index is -1, so it will be sorted in reversed
        // return res.status(200).json(incomes);
        return res.status(200).json(incomes);
    }
    catch(error){
        return res.status(500).json({err:"server error"});
    }
})


// getting all the income objects of logged in user (sorted by objects date property i.e latest date last)
// api/income/my-incomes/date-sorted
router.get("/my-incomes/date-sorted", passport.authenticate("jwt" , {session:false}) ,async (req, res) => {
    try{
        const userId = req.user._id;
        // fetch all the incomes of logged in user from mongo
        
        const incomes = await Income.find({owner: userId}).sort({date:1}); // by default the newest added income is at end of the mongodb so last index is -1, so it will be sorted in reversed
        // return res.status(200).json(incomes);
        return res.status(200).json(incomes);
    }
    catch(error){
        return res.status(500).json({err:"server error"});
    }
})

// delete an income by its id (a particular income obj can be only deleted by its owner only)
// /api/income/delete-income/:id
router.post("/delete-income/:incomeId",passport.authenticate("jwt",{session:false}) ,async (req, res) => {

    const incomeId = req.params.incomeId;
    const userId = req.user._id;
      
    const incomeObj = await Income.findOne({_id:incomeId});// fetch the income by its id
    if(!incomeObj)//if no such income exists
        return res.status(403).json({err: "invalid income id"});

    // if logged user is not the owner of that income then he can not delete ite
    if(incomeObj.owner.equals(userId) === false) // use .equals() to compare value of 2 strings
        return res.status(403).json({err: "only owner can delete the income"});
    
    await Income.findByIdAndDelete(incomeId)
    .then(()=>{ // when id is deleted
        return res.status(200).json("income deleted");  
    })
    .catch(()=>{ // did not delete
        return res.status(500).json({err:"server error"});
    })

})

module.exports = router; 