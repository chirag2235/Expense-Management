const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // npm i bcryptjs
const {getToken} = require("../utils/helpers");

// signup route - post 
// /api/auth/signup
router.post("/signup", async (req, res) => {
    try{
        const {email, password, firstName, lastName} = req.body;
        if(!email || !password || !firstName || !lastName){
            return res.status(403).json({err: "all fields are required"});
        }
        // checking if user with this email already exists
        const user = await User.findOne({email:email});
        if(user){
            return res.status(403).json({err: "user already exists"});
        }

        // converting pass into hashcode
        const hashedPass = await bcrypt.hash(password, 10);
        const userData = {email, password:hashedPass, firstName, lastName};
        const newUser = await User.create(userData); 

        // creating token for new user
        const token = await getToken(email, newUser);
        const userAndToken = {...newUser.toJSON(), token, role: 'user'}; // Set a default role for new users


        return res.status(200).json(userAndToken);
    }
    catch(error){
        // console.log(error);
        return res.status(500).json({err: "server error"});
    }
})

// login route - post 
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(403).json({err: "all fields are required"});
        }
        // checking if user with this email doesn't exists
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(403).json({err: "invalid email"});
        }
        const isPassMatched = await bcrypt.compare(password, user.password);
        if(!isPassMatched){ // compare user entererd pass with hash 1
            return res.status(403).json({err: "invalid password"});
        }

        // email,pass both are correct, so return the user with token
        const token = await getToken(email, user);
        const userAndToken =  {...user.toJSON(), token, role: user.role};
        return res.status(200).json(userAndToken);
    } 
    catch(error){
        // console.log(error);
        return res.status(500).json({err: "server error"});
    }
})

module.exports = router;