import "./rightbar.css";
// import { Users } from "../../../dummyData";
import Online from "../online/Online";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import{AuthContext} from "../../Context/AuthContext"
import axios from "axios"
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import ChatOnline from "../chatOnline/ChatOnline";
 function Rightbar({ userr }) {
  const[friends , setFriends] = useState([]);
  const [onlineUsers , setOnlineUsers] = useState([]);
  const {user} = useContext(AuthContext);
useEffect(()=>{
  async function getFriends(){
    try{
      const friendList = await axios.get("http://localhost:8000/api/users/friends/"+userr._id)
      setFriends(friendList.data);
      // console.log(friendList.data);
    }catch(err){
      console.log(err);
    }
  }
  getFriends();
 },[userr])

 const socket = useRef();


useEffect(() => {
  socket.current = io("ws://localhost:4000");
  socket.current.on("getUsers", (users) => {
    // console.log(users);
  });
}, [user]); 

useEffect(()=>{
  socket.current.emit("addUser" , user._id)
  socket.current.on("getUsers", users =>{
    setOnlineUsers(user.followings.filter((f) => users.some((u) =>u.userId === f )));
  })
},[user])

// console.log(onlineUsers);
  const HomeRightbar = () => {
   
    return (
      <>
        <div className="birthdayContainer">
          {/* <img className="birthdayImg" src="assets/gift.png" alt="" /> */}
          <span className="birthdayText">
            {/* <b>devi</b> and <b>3 other friends</b> have a birhday today. */}
          </span>
        </div>
        {/* <img className="rightbarAd" src="assets/post/3.jpeg" alt="" /> */}
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
        {onlineUsers.length === 0 ? <h1>No online users</h1> : (
  <ChatOnline
    onlineUsers={onlineUsers}
    currentId={user._id}
  />
)}

        
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>


        <h4 className="rightbarTitle">User friends</h4>
        {friends.map((friend, index) => (
           <div key={index} >
            <Link to={"/profile/"+friend.username} style={{textDecoration: "none" , color: " black"} }>
              <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                  <img
                  src={friend.profilePicture ? "/assets/person/"+friend.profilePicture : "/public/assets/heart.png"} 
                  alt=""
                  className="rightbarFollowingImg"/>
                  <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                  </div>
                  </Link>
                  </div>
                ))}
                </>
                );
              };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {userr ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}


export default Rightbar;