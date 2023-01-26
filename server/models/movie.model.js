const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({

    title: {
        type:String,
    required: [true, "Movie {PATH} is required."]
    },
    name: {
        type: String,
        required: [true, "Your {PATH} is required."],  
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]},
    review: {
        type: String,
        required: [true, "Review is required."],
        minlength: [10, "Review cannot be less than 10 characters long."]
    },
    allReviews: {
        type: [],
        default: []
    }
}, {timestamps: true});

module.exports.Movie = mongoose.model('Movie', MovieSchema)