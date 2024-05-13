import axios from "axios";
import "./register.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// import { useHistory } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigateTo = useNavigate();
  // const history = useHistory();
async function handleClick(e) {
  e.preventDefault();

if(passwordAgain.current.value !== password.current.value){
  passwordAgain.current.setCustomValidity("dont match");
  
}else{
  const user ={
    username : username.current.value,
    email : email.current.value,
    password :password.current.value
      }
      try{
      await axios.post("http://localhost:8000/api/auth/Register",user)
      navigateTo("/login"); 
      }catch(err){
        console.log(err);
      }
}
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on FaceBook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" type="text" className="loginInput" ref={username} required/>
            <input placeholder="Email" type="email" className="loginInput" ref={email} required />
            <input placeholder="Password"  className="loginInput" ref={password} required minLength={6}/>
            <input placeholder="Password Again"  className="loginInput" ref={passwordAgain} required minLength={6}/>
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
