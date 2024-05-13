import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "../../Context/AuthContext";
import {logincall} from "../../../apiCalls" 
export default function Login() {
  const email = useRef();
  const password = useRef();
const {user, isFetching, error, dispatch} = useContext(AuthContext);
const handleClick = (e) =>{
  e.preventDefault();
 logincall({email: email.current.value , password: password.current.value},dispatch)
}
console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input placeholder="Email" type="email" className="loginInput" ref={email} required />
            <input placeholder="Password" type="password" className="loginInput" ref = {password} required />
            <button className="loginButton">{isFetching? "loading" : "Log in"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
