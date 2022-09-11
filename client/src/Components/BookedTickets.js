import React from "react";
import './Moviespage.css'

const BookedTicktes = ({user, movies,setShowBookedTicktes, users})=>{
    const {bookedSeats} = users.find((_user)=> _user.user_id === user.user_id)
    const arr = Object.keys(bookedSeats)
    const getMoviename = (movieId) =>{
        const movie = movies.find((_movie)=> _movie.movie_id === movieId)
        return movie?.movieName
    }
    return (
        <>
            {arr.length>0 ? 
            <div> {arr.map((movieId, index)=>
            <div key={index}> Booked Seat NO: 
              {bookedSeats[movieId].map((number,idx)=>  <span key={idx}>{idx===0 ? number  : `, ${number} `} </span>)}
               for {getMoviename(movieId)}
              </div>
                )} </div> : 
            <div>No Ticktes Booked Yet. <button onClick={()=>setShowBookedTicktes(false)}>Click</button> to proceed to booking</div>}
        </>
    )
}

export default BookedTicktes;