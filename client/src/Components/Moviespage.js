import React, { useState, useEffect } from "react";
import './Moviespage.css'
import SeatSelection from './SeatSelection'
import BookedTicktes from "./BookedTickets";

function Movies({user,setIsSubmitted, setUsers, users}){
    const [movies, setMovies]= useState([])
    const [selectedMovie, setSelectedMovie] = useState()
    const [showBookedTicktes, setShowBookedTicktes] = useState(false)
    useEffect(()=>{
        fetch('http://localhost:8000/movies',)
        .then((response)=> response.json())
        .then((data)=>  setMovies(data))
        fetch('http://localhost:8000/users',)
        .then((response)=> response.json())
        .then((data)=>  setUsers(data))
    },[showBookedTicktes, selectedMovie])

    return(
        <>
        <ul className='menu-options'>
            <li onClick={()=> {
                setSelectedMovie()
                setShowBookedTicktes(true)}}>View Booked Tickets</li>
            <li onClick={()=>setIsSubmitted(false)}>Logout</li>
        </ul>
        {!selectedMovie ? 
        (<div className="movies-list">
        { movies.map((movie, index)=>
            <button onClick={()=>setSelectedMovie(movie)} key={index} className='movie'>{movie.movieName}</button>
        )}
        </div>) : <SeatSelection movie={selectedMovie} setSelectedMovie={setSelectedMovie} user={user}/> }
        {showBookedTicktes && !selectedMovie? <BookedTicktes user={user} movies={movies} users={users} 
        setShowBookedTicktes={setShowBookedTicktes}/> : ''}
        </>
        
    )
}

export default Movies;