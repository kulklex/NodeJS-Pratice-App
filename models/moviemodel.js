const mongoose = require('mongoose');
const Joi = require('joi');






const Genre =  mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 50
     } 
 }));
 
const moviesSchema =  new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 10
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Genre
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    }
});



const Movie =  mongoose.model('Movie', moviesSchema);




function validateMovies(movie) {
    const schema = {
        title: Joi.string().required().min(3).max(50),
        genre: Joi.string().required(),
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0)
    };
    return  Joi.validate(movie, schema); 
};

module.exports.Movie = Movie;
module.exports.validateMovies = validateMovies;