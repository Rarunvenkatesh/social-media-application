import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Followers from "../../components/followers/Followers";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import{AuthContext} from "../../Context/AuthContext"
import Fandf from "../../components/fandf/Fandf";
function Profile() {
  const Navigate = useNavigate()
  const {user, dispatch} = useContext(AuthContext);
  // const [user, SetUser] = useState({})
  // console.log(user);
const params = useParams()
// const usernam e = params.username;
// useEffect(()=>{
//  async function fetchUser(){
//   const res = await axios.get(`http://localhost:8000/api/Users?username=${username}`);
//   console.log(res.data);
//   SetUser(res.data);
//   console.log(user);
//   }
//   fetchUser();
  
// },[username])

// useEffect(() => {
//   const fetchUser= async ()=> {
//     try {
//       const res = await axios.get(`http://localhost:8000/api/Users?username=${username}`);
//       SetUser(res.data);
//       console.log(res.data); // Ensure you're getting data from the API
      
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   }
//   fetchUser();
  
// }, [username]);
const [clickedFollowers,setClickedFollowers] = useState(false);
const [clickedFollowings,setClickedFollowings] = useState(false);
const [User, setUser] = useState({});
  const username = useParams().username;
  
  const [follow, setFollow] = useState(user.followings.includes(User?.id));
 

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8000/api/Users?username=${username}`);
      setUser(res.data);
      setFollow(user.followings.includes(res.data._id));
      // console.log(res.data);
    };
    fetchUser();
  }, [username,follow]);



  // useEffect(()=>{
  //   setFollow(user.followings.includes(User._id));
  // },[user,User._id])

async function handleClick(){
  try{
    if(follow){
await axios.put("http://localhost:8000/api/users/"+User._id+"/unfollow",{userId : user._id,});
dispatch({ type :"UNFOLLOW" , payload : User._id});
    }else{
      axios.put("http://localhost:8000/api/users/"+User._id+"/follow",{userId : user._id,});
      dispatch({ type : "FOLLOW", payload : User._id});
    }
    setFollow(!follow);
  }catch(err){
    console.log(err);
  }
  
}

const [disabled, setDisabled] = useState(false);

function handleFollowersClick(){
  setClickedFollowers(true);
  setDisabled(true);
}
function handleFollowingClick(){
  setClickedFollowings(true);
  setDisabled(true);  
}

async function goTomessage(){
  const uSer = {
    senderId: user._id,
    receiverId: User._id
  }
  const res = await axios.get(`http://localhost:8000/api/conversations/find/${user._id}/${User._id}`);
  if(res.data === null){
    await axios.post("http://localhost:8000/api/conversations/", uSer);
    Navigate('/messenger');
  }
  Navigate('/messenger')
}

  return (
    <>
      <Topbar />
      <div className={disabled? "disabled":"profile"}>
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={User.coverPicture ?   "/assets/post/"+User.coverPicture:  "assets/ad"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={"/assets/person/"+User.profilePicture}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{User.username}</h4>
                <span className="profileInfoDesc">{User.desc}</span>
            </div>
            
            <div className="hi">
           <div className="followings">
           <span>{User.followings?.length}</span>
            <button className="folUFbutton1" onClick={handleFollowersClick}>followings</button>
           </div>
           <div className="followers">
            <span>{User.followers?.length}</span>
            <button className="folUFbutton1" onClick={handleFollowingClick } >followers</button>
            </div>
           {User._id != user._id && <button className="folUFbutton" onClick={handleClick}>{follow ? "unFollow" : "follow"}</button>}
           <button className="folUFbutton" onClick={goTomessage} > Message</button>
          </div>
          </div>
          <div className="profileRightBottom">
            <Feed username = {username}/>
            <Rightbar userr = {User}/>
          </div>
        </div>
      </div>
      <div>
      {
              clickedFollowers && <Fandf setClickedFollowers = {setClickedFollowers} user = {User} setDisabled={setDisabled}/>
            }
            {
              clickedFollowings && <Followers setClickedFollowings={setClickedFollowings} user = {User} setDisabled={setDisabled}/>
            }
      </div>
    </>
  );
}
export default Profile;