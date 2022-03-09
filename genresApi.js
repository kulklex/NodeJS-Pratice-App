const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const router = require('./router');
const customers = require('./customers');
const home = require('./home');
 

mongoose.connect('mongodb://localhost/playground')
.then(() => {console.log('Connected to MongoDB')})
.catch(err => {console.error('Failed to connect to MongoDB', err)});

app.use(express.json());
app.use('/api/genres', router);
app.use('/', home);
app.use('/api/customers', customers);



const port = process.env.PORT || 5000;
app.listen(port, () => { return console.log(`Listening at port ${port}....`)})