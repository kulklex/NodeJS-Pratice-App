const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 50}
}); 

const Genre =  mongoose.model('Genre', genreSchema); 




function validateGenres(genre) {
    const schema = {name: Joi.string().required().min(3)
    };
    return Joi.validate(genre, schema)
};


module.exports.Genre = Genre;
module.exports.validateGenres = validateGenres;
