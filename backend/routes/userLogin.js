const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userLogin')


router.post('/signup', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    } else {
        const user = await User.findOne({email})
        if(user) {
            res.status(400);
            throw new Error("User already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({name, email, password: hashedPassword})
        res.status(200).json({message: "Successfully added the user"})
    }
}))

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        res.status(404)
        throw new Error("All fields are mandatory")
    } 
    const user = await User.findOne({email})
    if(!user) {
        res.status(404)
        throw new Error("User not found")
    }
    await bcrypt.compare(password, user.hashedPassword)
    res.status(200).json({message: "Logged in succesfully"})

}))

module.exports = router
