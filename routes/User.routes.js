const express = require('express');
const { UserModel } = require('../model/User.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { email, password, name } = req.body
    try {

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already registered" });
        }


        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash })
            await user.save()
            res.status(200).send({ "msg": "New user has been registered successfully" })
        });

    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, "webledger");
                    res.status(200).send({ "msg": "Login Succesfull", token, name: user.name })
                } else {
                    res.status(400).send({ "msg": "Wrong Credentials!!!" })
                }
            });

        } else {
            res.status(400).send({ "msg": "Wrong Credentials!!!" })
        }
    } catch (error) {
        res.status(400).send({ "err": err.message })
    }
})

module.exports = {
    userRouter
}