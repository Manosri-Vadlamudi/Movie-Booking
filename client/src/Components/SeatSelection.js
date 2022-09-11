import React, { useState } from "react";
import './SeatSelection.css'

const SeatSelection = ({movie, user, setSelectedMovie}) => {
    const [selectedSeats, setSelectedSeats] = useState([])
    const handleClick = (isBlocked, number) =>{
        let newArray=[...selectedSeats]
        if (!isBlocked) {
          if (selectedSeats.includes(number)){
            newArray=newArray.filter(number1 => number!==number1)
        }
        else {
            newArray.push(number)
        }}
        setSelectedSeats(newArray)
    }
    const checkIsIncluded = (array, number) => {
        return array.includes(number) 
    }
    const RenderRow  = () => {
        return (
        <div className="row">
            {[...Array(10)].map((e, i) => 
            <span key={i}><RenderSeat number={i+1}/></span>)}
        </div>)
    }
    const RenderSeat =({number})=>{
        const isBlocked = checkIsIncluded(movie.bookedSeats, number)
        return (
        <div 
        disabled={isBlocked} 
        onClick={()=>handleClick(isBlocked, number)}
        className={`seat ${ isBlocked ? "disable": `${checkIsIncluded(selectedSeats, number) ? "selected" : ""}` }`} 
        >{number}</div>)
    }
    const handleBooking = () =>{
        const movieBody = {...movie, selectedSeats}
        const userBody = {movie_id: movie.movie_id, bookedSeats:user.bookedSeats, selectedSeats}
        
        fetch(`http://localhost:8000/movies/${movie.movie_id}`,{
            method:'POST',
            body: JSON.stringify(movieBody),
            headers: {
                'Content-type': 'application/json'
              }
        })
        .then((res) => res.json())
        .catch((err) => err);
        fetch(`http://localhost:8000/users/${user.user_id}`,{
            method:'POST',
            body: JSON.stringify(userBody),
            headers: {
                'Content-type': 'application/json'
              }
        })
        .then((res) => res.json())
        .catch((err) => err);
        alert('Tickets Booked Successfully')
        setSelectedMovie()
    }
    return(
        <>
        <button onClick={()=>setSelectedMovie('')}>GoBack to Movie Selection</button>
        <div>select seats for {movie.movieName}</div>
        <RenderRow/>
        <button disabled={selectedSeats.length===0} onClick={handleBooking}>Book Seats</button>
        </>
    )
}

export default SeatSelection;