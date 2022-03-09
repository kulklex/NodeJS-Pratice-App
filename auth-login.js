const express = require('express');
const router = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const {User} = require('./models/user');
const bcrypt = require('bcrypt');
 


router.post('/', async (req, res) => {
    const {error} = validateAuth(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await  User.findOne({email: req.body.name});
    if (!user) return res.status(400).send("Invalid email or password.");

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send("Invalid email or password.");

   const token = user.generateAuthToken();
   res.send(token);
});

function validateAuth(auth) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(auth, schema)
}

module.exports = router;  