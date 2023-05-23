const express = require('express');
const routes = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Jwt_secret = process.env.REACT_APP_JWT_SECRET;


//code to signUp the user
routes.post('/Createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'please set a valid password').isLength({ min: 5 })], async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: "true" }));

        } catch (error) {
            console.log(error);
            res.json({ success: "false" });
        }
    });
//Code to login the user
routes.post('/loginUser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'please set a valid password').isLength({ min: 5 })], async (req, res) => {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        let user = req.body.email;
        try {
            let User_Data = await User.findOne({ email: user });
            if (!User_Data)
                return res.status(400).json({ success, error: "User Not found" });

            const comPass = await bcrypt.compare(req.body.password, User_Data.password);
            if (!comPass) {
                return res.status(400).json({ error: "Try logging with Correct details" });

            }

            const data = {
                user: {
                    id: User_Data.id
                }
            }
            const authToken = jwt.sign(data, Jwt_secret);
            return res.json({ success: true, authToken: authToken });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });
module.exports = routes;