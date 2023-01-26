const {Movie} = require('../models/movie.model')

module.exports.getMovies = (req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json({message: "unable to get all movies", err}));
}

module.exports.createMovie = (req, res) => {
    const {title, name, rating, review, allReviews} = req.body;
    console.log(req.body)
    Movie.create(req.body)
    .then(newMovie => res.json(newMovie))
    .catch(err => res.status(400).json({message: "unable to create new movie", err}));
}

module.exports.findOneMovie = (req, res) => {
    Movie.findOne({_id: req.params._id})
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json({message: "unable to find that movie", err}));
}

module.exports.updateOne = (req, res) => {
    Movie.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators:true})
        .then(updatedMovie => res.json(updatedMovie))
        .catch(err => res.status(400).json({message: "unable to update movie", err}));
}

module.exports.deleteMovie = (req, res) => {
    Movie.deleteOne({ _id: req.params._id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.status(400).json({message: "unable to delete movie", err}));
}

module.exports.addReview = (req, res) => {
    Movie.updateOne({_id:req.params._id}, {$push:{allReviews:req.body}})
    .then(result => res.json(result))
    .catch(err => res.status(400).json({message: "unable to add review of movie", err}));
}