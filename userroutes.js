const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validateUser} = require('./models/user');
const auth = require('./auth');
const admin = require('./models/admin');
const bcrypt = require('bcrypt');

router.get('/me', async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})



router.post('/', auth, async (req, res) => {
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await  User.findOne({email: req.body.name});
    if (user) return res.status(400).send("User already Exists");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
     
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        name: user.name,
        email: user.email
    });
});

 router.delete('/me', [auth, admin], async (req, res) => {
     const user = await User.findByIdAndRemove(req.user._id);
     if(!user) { return res.status(404).send("User was not found")};
    res.send(user);
 })


module.exports = router;  