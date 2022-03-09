const express = require('express');
const mongoose = require('mongoose');
const app = express();
const user = require('./userroutes');
const auth = require('./auth-login');
const config = require('config');


if (config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
     process.exit(1);
}

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB'))
.catch( err => console.error('Failed to connect to MongoDB', err));




app.use(express.json());
app.use('/api/users', user);
app.use('/api/auth', auth);






const port = process.env.PORT  || 3000;
app.listen(port, () => console.log(`Listening at port ${port}.....`));
