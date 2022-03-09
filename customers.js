const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const string = require('joi/lib/types/string');
const router = express.Router();
const {Customer, validateCustomers} = require('./models/customer');

mongoose.connect('mongodb://localhost/playground');


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
});


router.get('/:id', async (req, res) => {
    const customer =  await Customer.findById(req.params.id); 
    if(!customer) {return res.status(404).send('The Customer with the given ID was not found')};
    res.send(customer);
});

router.post('/',  async (req, res) => {
 const {error} = validateCustomers(req.params);
 if (error) {return res.status(400).send(error.details[0].message)};
 let customer = new Customer({ 
     name: req.params.name,
     isGold: req.params.isGold,
     phone: req.params.phone
    });
 customer = await customer.save();
 res.send(customer);
});

router.put('/:id', async (req, res) => {
    const{error} = validateCustomers(req.params);
    if(error) {return res.status(400).send(error.details[0].message)};
    const customer = await Genre.findByIdAndUpdate(req.params.id, {name: req.params.name}, {new: true})
    if(!customer) { return res.status(404).send("The Customer with the given ID was not found")};
     res.send(customer)
});


router.delete('/:id', async (req, res) => {
   const customer = await Genre.findByIdAndRemove(req.params.id)
    if(!customer) { return res.status(404).send("The Customer with the given ID was not found")};
    res.send(customer);
})






module.exports = router;