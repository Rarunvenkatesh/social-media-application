import React, { useEffect } from "react";
import "./followers.css";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Followers({setClickedFollowings,user,setDisabled}) {
    const [follow , setFollowers] = useState([]); 
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8000/api/users/followers/" + user?._id);
                setFollowers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        }

        if (user) {
            fetchData();
        }
    }, [user]);
  return (
   
    <>
    <div className="overLay">
        <div className="closeIcon">
            <span>Followers</span>
        <CloseIcon className="wrong" onClick = {() => {setClickedFollowings(false),setDisabled(false)}}/>
       
        </div>
        {follow?.map((f) => (
  <React.Fragment >
    
    <div className="cards" key={f._id}>
        <Link to={"/profile/" + f?.username} onClick = {() => {setClickedFollowings(false),setDisabled(false)}} style={{color: "white" , textDecoration:"none"}}>
      <img className="cardImg" src={ f?.profilePicture ? "/assets/person/" + f?.profilePicture : "/assets/heart.png"}   alt="" />
      <span>{f?.username}</span>
      </Link>
      {/* <button className="follow">Follow</button> */}
    </div>
    <hr />
  </React.Fragment>
))}


    
      </div>
      </>
    
  );
}

export default Followers;