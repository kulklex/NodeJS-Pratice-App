const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this._isAdmin}, config.get('jwtPrivateKey'));
    return token;
};
const User = mongoose.model('User', userSchema);
 


function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email().min(5).max(50),
        password: passwordComplexity(complexityOptions).required().validate("aPassword123!")
    };
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;

