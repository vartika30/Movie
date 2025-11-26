const express = require("express")
const app = express()
const {initializeDatabase} = require("./db/db.connect");
const fs = require("fs");
const Movie = require("./models/movie.models");

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initializeDatabase();




//const newMovie = {
    //title: "Dilwale Dulhania Le Jayenge",
   // releaseYear: 1995,
   // genre: ["Romance", "Drama"],
   // director: "Aditya Chopra",
   // actors: ["Shah Rukh Khan", "Kajol"],
   // language: "Hindi",
   // country: "India",
   // rating: 9.1,
   // plot: "A young man and woman fall in love on a Europe trip.",
   // awards: "Multiple Filmfare Awards",
   // posterUrl: "https://example.com/poster1.jpg",
   // trailerUrl: "https://example.com/trailer1.mp4"
 // }

  async function createMovie(newMovie){
     
    try{

        const movie = new Movie(newMovie)
        const saveMovie = await movie.save()
        console.log("New Movie data:", saveMovie)
        return saveMovie
    }catch(error){
        throw error

    }
  }

  app.post("/movies", async(req,res) => {
      try{
        const savedMovies = await createMovie(req.body);
        res.status(200).json({message:"Movie added", movies:savedMovies})
      }catch(error){
        res.status(500).json({error:"Failed to add movies"})
      }
  })

 // createMovie(newMovie);

//find a movie with a particular title

async function readMovieByTitle(movieTitle){
    try{

        const movie = await Movie.findOne({title:movieTitle})
        console.log(readMovieByTitle)
        return movie
    }catch(error){
        throw error
    }
}

app.get("/movies/:title", async(req,res) => {
    try{
        const movie = await readMovieByTitle(req.params.title)
         if(movie){
            res.json(movie)
         }else{
            res.status(404).json({error:"Movie not found."})
         }
    }catch(error){
        res.status(500).json({error:"Failed to fetch movie"})
    }
})
//readMovieByTitle("Dilwale Dulhania Le Jayenge")

//find all the movies in the database

async function readAllMovies(){
    try{

        const allMovies = await Movie.find()
        console.log(allMovies)
        return allMovies

    }catch(error){
        throw error
    }
}

app.get("/movies", async(req,res) => {
    const movie = await readAllMovies();
    res.send(movie);
})

//readAllMovies();

//get movie by director name

async function readMovieByDirector(directorname){
    try{

      const director = await Movie.findOne({director:directorname})
      console.log(director)
      return director
    }catch(error){
        throw error
    }
}

app.get("/movies/director/:directorName", async (req,res) => {
    try{
          const movies = await readMovieByDirector(req.params.directorName)
          if(movies.length != 0){
            res.json(movies)
          }else{
            res.status(404).json({error:"No movies found."})
          }
    }catch(error){
        res.status(500).json({error:"Failed to fetch movies."})
    }
})

async function readMovieByGenre(movieGenre){
    try{

        const MovieByGenre = await Movie.findOne({genre:movieGenre})
        console.log(MovieByGenre)
        return MovieByGenre
    }catch(error){
        throw error
    }
}

app.get("/movies/genres/:genreName", async (req,res) => {
    try{
          const movies = await readMovieByGenre(req.params.genreName)
          if(movies.length != 0){
            res.json(movies)
          }else{
            res.status(404).json({error:"No movies found."})
          }
    }catch(error){
        res.status(500).json({error:"Failed to fetch movies."})
    }
})

//readMovieByDirector("Kabir Khan")

async function updateMovie(movieId, dataUpdate){
    try{

        const updatedMovie = await Movie.findByIdAndUpdate(movieId,dataUpdate,{new:true});
        return updatedMovie
    }catch(error){
      console.log("Error in updating Movie rating", error)
    }
}

app.post("/movies/:movieId",async(req,res) => {
    try{
          const updatedMovies = await updateMovie(req.params.movieId, req.body)
          if(updatedMovies){
            res.status(200).json({message:"Movie updated"})
          }else{
            res.status(400).json({error:"Movie not found"})
          }
    }catch(error){
        res.status(500).json({error:"failed to update movie"})
           
    }
})

//updateMovie("68e6ad0fd668b8198001a18c",{rating:8.0})

//find one data and update

async function updateMovieDetail(movieTitle, dataToUpdate){
     try{
        const updatedMovie = await Movie.findOneAndUpdate({title:movieTitle},dataToUpdate,{new:true});
        console.log(updatedMovie);
    }catch(error){
      console.log("Error in updating Movie rating", error)
    }
}

//updateMovieDetail("Kabhi Khushi Kabhie Gham",{releaseYear:2001})

//find movie by id and delete from database

async function deleteMovie(movieId){
     try{
        const deleteMovie = await Movie.findByIdAndDelete(movieId);
        
    }catch(error){
      console.log("Error in deleting Movie", error)
    }
}

//deleteMovie("68e6ad0fd668b8198001a18c")

async function deleteMovieFrom(movieTitle){
    try{
        const deleteMovie = await Movie.findOneAndDelete({title:movieTitle});
        console.log("This movie deleted:", deleteMovie)
    }catch(error){
      console.log("Error in deleting Movie", error)
    }
}

//deleteMovieFrom("3 Idiots");

async function deleteMovies(movieId){
try{
 const deletedMovie = await Movie.findByIdAndDelete(movieId);
 return deletedMovie;

}catch(error){
    console.log(error)
}
}

app.delete("/movies/:movieId",async(req,res) => {
    try{
         const deleteMovie = await deleteMovies(req.params.movieId)
        if(deleteMovie){
          res.status(200).json({message:"Movie deleted"})
        }
        }catch(error){
        res.status(400).json({error:"Failed to delete movie"})
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})