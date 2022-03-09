const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const admin = require('./models/admin');
const { Movie, validateMovies } = require('./models/moviemodel');


router.get('/api/movies', async (req, res) => {
    const movies = await Movie.find().sort('name')
    res.send(movies)
});

router.get('/api/movies/:id', async (req, res) => {
    const { error } = validateMovies(req.body)
    if (error) return res.staus(400).send(error.details[0].message);
    const movie = await Movie.findById(req.params.id);
    if (!movie) res.status(404).send('The Movie with the given ID cannot be found');
    res.send(movie)
});

router.post('/api/movies', auth, async (req, res) => {
    const { error } = validateMovies(req.body);
    if( error ) return res.status(400).send(error.details[0].message);
    //const  movie = await Movie.findById(req.params.id);
    //if (!movie) return res.status(404).send('The Movie with the given ID cannot be found');
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie)
});

router.put('/api/movies/:id', async(req, res) => {
    const { error } = validateMovies(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id, {/*what ever you want to update e.g name: req.body.name*/})
    if(!movie) return res.status(404).send('The Movie with the given ID cannot be found');
    res.send(movie)
});

router.delete('/api/movies/:id', [auth, admin], async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status('404').send('The Movie with the given ID cannot be found');
    res.send(movie)
})



module.exports = router







 