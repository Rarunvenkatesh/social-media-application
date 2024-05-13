
import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School'
import CloseFriend from "../closeFriend/CloseFriend";
import EventIcon from '@mui/icons-material/Event';
import { useContext, useEffect, useState } from "react";
import{AuthContext} from "../../Context/AuthContext"
import axios from "axios";
import { Link } from "@mui/material";

function Sidebar() {
  const {user} = useContext(AuthContext);
  const [friends,setFriends] = useState([]);
// console.log(friends);
useEffect(()=>{
const getFriends = async ()=>{
  const res = await axios.get("http://localhost:8000/api/users/friends/"+user._id)
  setFriends(res.data); 
}
getFriends();
},[user]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <span className="friendss">Your Friends</span>
        
        {friends.map((u, index) => (

    <ul key={index} className="sidebarFriendList">
      <CloseFriend user={u} />
    </ul>

))}


      </div>
    </div>
  );
}


export default Sidebar;