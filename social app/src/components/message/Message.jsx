import "./message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
export default function Message({message,own,CurrentCommunicator}) {
  const {user} = useContext(AuthContext);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? "assets/person/" + user?.profilePicture : "assets/person/" + CurrentCommunicator?.profilePicture}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}