const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { json } = require('express');
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "Hussainisagoodboy"

let success = false
let user_name;

//ROUTE:1 Create a User POST "/api/auth/createuser"

router.post('/createuser', [
    body('name', 'Enter valid name of minimum 3 characters').isLength({ min: 5 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter a password with atleat 7 characters').isLength({ min: 7 })
], async (req, res) => {
    // If error occurs then return bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success=false
        return res.status(400).json({ errors: errors.array() })
    }
    // Check if email already exist
    try {
        let user = await User.findOne({ success,email: req.body.email })
        if (user) {
            success=false
            return res.status(400).json({ success,error: "Sorry a user with this email already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        
        success=true
        user_name=user.name
        res.json({ success,authToken,user_name })
    } catch (error) {
        success=false
        console.error(error.message)
        res.status(500).send("Some Error Occured")
    }
})
//ROUTE:2 Authenticate a user using POST /api/auth/login

router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({success,errors: "Please enter correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success,errors: "Please enter correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        user_name=user.name
        success = true
        res.json({ success, authToken,user_name })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured")
    }
})

//ROUTE:3 Get loggedin user details using POST: api/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        success=true
        res.json({user,success})
    } catch (error) {
        console.error(error.message)
        success=false
       return res.status(500).send("Internal Server Error Occured")
    }
})



module.exports = router