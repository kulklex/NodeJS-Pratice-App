const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = require('./router');
const app = express();


app.use(express.json());
app.use('/api/movies', router);



mongoose.connect('mongodb://localhost/movies')
.then(() => {console.log("Connected to mongoDB")})
.catch(err => {console.error('Failed to connect to mongoDB', err)});






const port = process.env.PORT || 3000;
app.listen( () => console.log(`Listening at port ${port}....`));

