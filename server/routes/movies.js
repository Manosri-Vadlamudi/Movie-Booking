var express = require('express');
var router = express.Router();
var movies = require('../data/movies.json')
const fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(movies);
});
router.post('/:movieId', function(req, res, next) {
    let obj = {
        table: []
    };
    const modifiedObj = {bookedSeats : [...req.body.bookedSeats,...req.body.selectedSeats]}
    const {movieId}=req.params
    fs.readFile('./data/movies.json','utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            newObj = obj.map((movie)=> {
                if (movie.movie_id!== movieId){
                    return movie
                }else {
                    return Object.assign(movie, modifiedObj)
                }
            })
            let json = JSON.stringify(newObj);
            fs.writeFile('./data/movies.json', json, 'utf8', (err, data)=>{
                if (err) {
                    console.log(err);
                }
            });
        }
    })
  });

module.exports = router;
