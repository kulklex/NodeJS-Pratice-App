const mongoose = require('mongoose');
const Joi = require('joi');




const customerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String, 
        required: true, 
        minlength: 10, 
        maxlength: 50
    }
}); 

const Customer =  mongoose.model('Customer', customerSchema); 


function validateCustomers(customer) {
    const schema = {
        name: Joi.string().required().min(3).max(50),
        isGold: Joi.boolean(),
        phone: Joi.string().required().min(9).max(12)
    };
    return Joi.validate(customer, schema)
};


module.exports.Customer = Customer;
module.exports.validateCustomers = validateCustomers;