import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
 const [user, setUser] = useState(null);
 useEffect(()=>{
  const friendId= conversation.members.find(m=>m  !== currentUser._id);
  const getUser = async ()=>{
    try{

    
    const res = await axios.get("http://localhost:8000/api/users?userId=" + friendId);
   setUser(res.data);
// console.log(res.data);
    }catch(err){
      console.log(err);
    }
  };
  getUser();
 },[currentUser,conversation])
 
//  if (!user) return null;
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture? "assets/person/" + user?.profilePicture : "assets/heart.png"}
        alt=""
      />
  
 <span className="conversationName">{user?.username}</span>
    
    </div>
  );
}