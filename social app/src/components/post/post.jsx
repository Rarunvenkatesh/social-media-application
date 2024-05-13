import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import axios from "axios";
// import {format} from "timeago.js"
import {Link}  from "react-router-dom";
import { format } from "timeago.js";
// import { useContext } from "react";
// import{AuthContext} from "../../Context/AuthContext"

import "./post.css";

function Posts({post}){
  // const {user} = useContext(AuthContext);
const [like, setLike ] = useState(post.likes.length);
const [isLiked , setIsLiked] = useState(false);
const [user, SetUser] = useState({})

useEffect(()=>{
 setIsLiked(post.likes.includes(user._id)) 
},[user._id,post.likes])

useEffect(()=>{
  const fetchPost = async () => {
  const res = await axios.get(`http://localhost:8000/api/Users?userId=${post.userId}`);
  // console.log(res.data);
  SetUser(res.data);
  }
  fetchPost();
},[post.userId])

const likeHandler =()=>{
  try{
    axios.put("http://localhost:8000/api/posts/"+post._id+"/like",{userId: user._id});

  }catch(err){
    
  }
  setLike(isLiked? like -1 : like +1);
  setIsLiked(!isLiked);
}

return (
  <div className="post">
    <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
          <Link to={`/profile/`+user.username}>
          <img
            className="postProfileImg"
            src={user.profilePicture? "/assets/person/"+user.profilePicture : "assets/heart.png"}
            alt=""
          />
          </Link>
          <span className="postUsername">
            {user.username}
          </span>
          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
          <MoreVertIcon />
        </div>
      </div>
      <div className="postCenter">
        <span className="postText">{post.desc}</span>
        <img className="postImg" src={"/assets/post/" + post.img } alt="" />
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          <ThumbUpIcon className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" style={ isLiked ? {color: "#1877F2"}:{color: "grey"}}  />
          {/* <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" /> */}
          <span className="postLikeCounter">{like} people like it</span>
        </div>
        <div className="postBottomRight">
          {/* <span className="postCommentText">{post.comments}comments</span> */}
        </div>
      </div>
    </div>
  </div>
);
}

export default Posts;

