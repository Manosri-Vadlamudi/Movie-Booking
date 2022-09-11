var express = require('express');
var router = express.Router();
var userData = require('../data/users.json')
const fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(userData);
});

router.post('/:userId', function(req, res, next) {
  let obj = {
      table: []
  };
  let modifiedObj, bookedSeats ={}
  let {movie_id} = req.body
  const {userId}=req.params 
  fs.readFile('./data/users.json','utf8', function readFileCallback(err, data) {
      if (err) {
          console.log(err);
      } else {
          obj = JSON.parse(data);
          newObj = obj.map((user)=> {
              if (user.user_id!== userId){
                  return user
              }else {
                for (let [key, value] of Object.entries(user.bookedSeats) ){
                  if (key === movie_id){
                    bookedSeats[key]=[...value,...req.body.selectedSeats]
                  }
                }
                if (Object.keys(bookedSeats).length === 0) {bookedSeats[movie_id] =   [...req.body.selectedSeats] }
                  modifiedObj = {bookedSeats : Object.assign(user.bookedSeats, bookedSeats)}
                  return Object.assign(user, modifiedObj)
              }
          })
          let json = JSON.stringify(newObj);
          fs.writeFile('./data/users.json', json, 'utf8', (err, data)=>{
              if (err) {
                  console.log(err);
              }
          });
      }
  })
  res.send(userData)
});
module.exports = router;
