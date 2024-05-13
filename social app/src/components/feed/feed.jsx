import { useEffect, useState } from "react";
import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import axios from "axios";
import { useContext } from "react";
import{AuthContext} from "../../Context/AuthContext"


function Feed({username}) {
  const [Posts, SetPost] = useState([])
  const {user} = useContext(AuthContext);

useEffect(()=>{
const fetchPost= async()=>{
  const res =username? await axios.get(`http://localhost:8000/api/posts/profile/${username}`) :
                       await axios.get("http://localhost:8000/api/posts/timeline/"+user._id);
  // console.log(res.data);
  SetPost(res.data.sort((p1,p2)=>{
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  }));
  }
  fetchPost();
},[username,user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
       {(!username || username === user.username )&& <Share />}
        {Posts.map((P) => (
          <Post key={P._id} post={P}/>
         ))}
      </div>
    </div>
  );
}
export default Feed;