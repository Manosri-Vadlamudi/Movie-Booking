import React, { useState, useEffect } from "react";

import "./Login.css";
import Movies from './Moviespage'

function LoginFrom() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [users, setUsers]= useState([])
  const [loggedInUser, setLoggedInUser]= useState([])
    useEffect(()=>{
        fetch('http://localhost:8000/users',)
        .then((response)=> response.json())
        .then((data)=>  setUsers(data))
    },[])

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = users.find((user) => user.user_id === uname.value);
    
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        setLoggedInUser(userData)
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
    <div className="main-title">Movie Booking Portal</div>
    {isSubmitted ? <Movies user={loggedInUser} setIsSubmitted={setIsSubmitted} users={users} setUsers={setUsers}/> :
      (<div className="login-form">
        <div className="title">Please Login to Continue</div>
        <div>{renderForm}</div>
      </div>)}
    </div>
  );
}

export default LoginFrom;