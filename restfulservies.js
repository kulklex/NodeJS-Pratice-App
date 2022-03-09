const Joi = require('joi');
const express = require('express');
const app = express();

const customers = [
    {id: 1, name: "Hassan1"},
    {id: 2, name: "Hassan2"},
    {id: 3, name: "Hassan3"},
    {id: 4, name: "Hassan4"},
    {id: 5, name: "Hassan5"}
];

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.get('/api/customers/:id', (req, res) => {
   const course = customers.find(c => c.id === parseInt(req.params.id))
   if(!course) {return res.status(404).send('The given ID was not found')};
    res.send(course);
});

app.post('/api/customers', (req,res) => {
    const {error} = validateCustomers(req.body);
    if(error) {return res.status(400).send(error.details[0].message)};

    const course = {id: customers.length + 1, name: req.body.name};
    customers.push(course);
    res.send(course);
});

 
app.put('/api/customers/:id', (req, res) => {
    
    const {error} = validateCustomers(req.body);
    if (error) { return res.status(400).send(error.details[0].message)};

    const course = customers.find(c => c.id === parseInt(req.params.id))
    if (!course) {return res.status(404).send('The Customer with the given ID was not found')}
    customers.name = req.body.name;
    res.send(course);
});







function validateCustomers(course) {
    const schema = {name: Joi.string().min(3).required()}; 
    return Joi.validate(course,schema);
};

const port = process.env.PORT || 3000;
app.listen(port, ()=> {console.log(`Listening on port ${port}....`)});