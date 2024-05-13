import { Link } from "react-router-dom";
import "./closeFriend.css";

function CloseFriend({user}) {
  return (
 
       <Link  to={`/profile/`+user.username} style={{textDecoration: "none" , color: "black"}}>
           <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture ? "/assets/person/"+user.profilePicture: "/assets/heart.png"} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
      </li>
      </Link>
   
  );
}

export default CloseFriend;