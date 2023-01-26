const MovieController = require("../controllers/movie.controller");
module.exports = function(app){
    app.get("/api/movies", MovieController.getMovies);
    app.post("/api/movies", MovieController.createMovie);
    app.get("/api/movie/:_id", MovieController.findOneMovie);
    app.put('/api/movie/:_id', MovieController.updateOne);
    app.delete('/api/movie/:_id', MovieController.deleteMovie);
    app.put('/api/addReview/:_id', MovieController.addReview)
}