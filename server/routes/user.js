const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/User");

// getting user details 
//    /api/user/me
router.get('/me', passport.authenticate('jwt', {session: false}) , async(req, res) => {

    try{
        const userId = req.user._id; // fetch user id frmo json web token
        // fetch user with thid id
        const user = await User.findOne({_id:userId});
        if(!user){ // user obj fetched
            return res.status(403).json({err:"can not fectch user"});
        }
        return res.status(200).json(user);
    }
    catch(error){
        return res.status(500).json({err:"server error"});
    }
    
})


module.exports = router;