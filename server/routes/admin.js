const express = require('express');
const router = express.Router();
const User = require("../models/User");
const passport = require('passport');
const Income = require('../models/Income');
const Expense = require("../models/Expense");

router.get('/users', async (req, res) => {
  try {
      const users = await User.find();

      // Map through each user to fetch their income and expense details
      const usersWithDetails = await Promise.all(users.map(async (user) => {
          const income = await Income.find({ owner: user._id });
          const expense = await Expense.find({ owner: user._id });
          
          // Construct an object with user details along with their income and expense
          return {
              user: user,
              income: income,
              expense: expense
          };
      }));

      return res.status(200).json(usersWithDetails);
  } catch (error) {
      // Handle errors
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

  router.delete('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // Implement your logic to delete the user from the database
        console.log("delete");
        await User.findByIdAndDelete(userId);
        await Income.deleteMany({ owner: userId });
        await Expense.deleteMany({ owner: userId });

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
