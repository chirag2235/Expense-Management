const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors"); // npm i cors
const db = require("./db/db.js");
const bodyParser = require("body-parser"); // npm i body-parser  // very imp for using req.body


const incomeRoutes = require("./routes/income.js");
const expenseRoutes = require("./routes/expense.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const AdminRoutes=require("./routes/admin.js");
const User = require("./models/User.js");

var JwtStrategy = require('passport-jwt').Strategy, // npm i passport passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");

// Use body-parser middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());    // imp for using req.body
app.use(bodyParser.urlencoded({ extended: true }));
// adding middle ware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

// setting up passwort jwt for user authentication
let opts = {} 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_JWT_SECRETKEY;  // better to use from env variable (.env)
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try{
        const user = await User.findOne({_id: jwt_payload.identifier});

        // in login
        // done(error, isUserExists)
        if(user){
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }catch(error){
        return done(error, false);
    }
})); 

// adding middle ware
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin",AdminRoutes);

db(); // connecting to db

app.get("/", (req,res) => {
    res.send("This is Finance tracker backend server ")
})
app.listen(PORT, () => {
    console.log("listening to PORT : " + PORT);
})

app.post("/test", (req, res) => {
    console.log("YOOOO");
    res.send("YOOOO");
})