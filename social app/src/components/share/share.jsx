import "./share.css";
// import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useRef, useState } from "react";
import{AuthContext} from "../../Context/AuthContext"
import axios from "axios";
// import { Await } from "react-router";
function Share() {
  const {user} = useContext(AuthContext);
  const desc = useRef();
const [file,setFile]  = useState(null);


const submitHandler = async (e) => {
  e.preventDefault();
  const newPost = {
    userId: user._id,
    desc: desc.current.value,
  };
  if (file) {
    const data = new FormData();
    const fileName = Date.now() + file.name;
    console.log(fileName);
    data.append("file", file, fileName);
    newPost.img = fileName;
    console.log(data);
    try {
      await axios.post("http://localhost:8000/api/upload", data);
    } catch (err) {
      console.log(err);
    }
  }
  try {
    await axios.post("http://localhost:8000/api/posts", newPost);
    window.location.reload();
  } catch (err) {}
};

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={"/assets/person/"+user.profilePicture} alt="" />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <InsertPhotoIcon htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo </span>
                    <input hidden type="file" name="" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                </label>
                <div className="shareOption">
                    {/* <LocalOfferIcon htmlColor="blue" className="shareIcon"/> */}
                    {/* <span className="shareOptionText">Tag</span> */}
                </div>
                <div className="shareOption">
                    {/* <LocationOnIcon htmlColor="green" className="shareIcon"/> */}
                    {/* <span className="shareOptionText">Location</span> */}
                </div>
                <div className="shareOption">
                    {/* <TagFacesIcon htmlColor="goldenrod" className="shareIcon"/> */}
                    {/* <span className="shareOptionText">Feelings</span> */}
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}


export default Share;