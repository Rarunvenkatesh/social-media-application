import "./online.css";

function Online() {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src="assets/person/1.jpeg"alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">arun</span>
    </li>
  );
}

export default  Online;