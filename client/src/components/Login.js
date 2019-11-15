import React, {useState, useEffect} from "react";
import Axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username:'Lambda School',
    password:'i<3Lambd4'
  })
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const handleChange = e => {
    console.log(e.target.value)
    setUser(e.target.value)
  }
  const login = e => {
    e.preventDefault();
    Axios.post('http://localhost:5000/api/login',user)
    .then(res => {
      const red = res.data
      console.log(red)
      sessionStorage.setItem('token', red.payload)
      setIsLoggedIn(true)        
    })
    .catch(err => console.log(err))  
  }

  useEffect(() =>{
    if(sessionStorage.getItem('token')) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  },[])


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h2>{isLoggedIn ? "You are Logged in" : "plz log in"}</h2>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
    </>
  );
};

export default Login;
