
import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";

export default function ChatOnline({onlineUsers , currentId , setCurrentChat}) {
  const [friends,setFriends] = useState([]);
  const [onlineFriends,setOnlineFriends] = useState([]);
useEffect(()=>{
  const getFriends = async ()=>{
    const res = await axios.get("http://localhost:8000/api/users/friends/"+currentId )
    setFriends(res.data); 
  }
  getFriends();
},[currentId]);

useEffect(()=>{
  setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)));
},[friends, onlineUsers])
// console.log(currentId);
// console.log(onlineUsers);
async function handleClick (o) {
  const uSer = {
    senderId: currentId,
    receiverId: o._id
  }
  try {
    const res = await axios.get(`http://localhost:8000/api/conversations/find/${currentId}/${o._id}`);
    setCurrentChat(res.data);
    if(res.data == null){
      const res = await axios.post("http://localhost:8000/api/conversations/", uSer);
      setCurrentChat(res.data);
    }
    
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="chatOnline">
    {onlineFriends.map((o) =>(
      
      
      <div  key={o._id} className="chatOnlineFriend"   onClick={() => handleClick(o)} >
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={o?.profilePicture? "assets/person/" + o.profilePicture : "assets/heart.png"}
          
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.username}</span>
      </div>
  
  
    ))}
    </div>
   
  );
}