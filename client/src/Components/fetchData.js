export function fetchUser(){
    fetch('http://localhost:8000/users',)
        .then((response)=> response.json())
        .then((data)=>  data)
} 