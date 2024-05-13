import "./topbar.css"
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import "./topbar.css";
import { useContext } from "react";
import{AuthContext} from "../../Context/AuthContext"
import { Link,Navigate } from "react-router-dom";
// import { Search, Person, Chat, Notifications } from "@material-ui/icons";

function Topbar() {
  const {user ,dispatch} = useContext(AuthContext);
  async function logoutHandler(){
    dispatch({type : "LOGOUT"});
    navigateTo("/");
  }


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <Link to={"/"} style={{textDecoration:"none", color:"white"}}>
        <span className="logo">Facebook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={"/"} style={{textDecoration:"none", color:"white"}}>
          <span className="topbarLink">Homepage</span>
          </Link>
     
          <Link to={"/messenger"} style={{textDecoration : "none" , color:"white"}}>
          <span className="topbarLink">Messenger</span>
          </Link>
          <span onClick={logoutHandler} className="Logout">Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            {/* <PersonIcon /> */}
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div className="topbarIconItem">
            {/* <MessageIcon /> */}
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            {/* <NotificationsIcon /> */}
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={"/assets/person/"+user.profilePicture} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;