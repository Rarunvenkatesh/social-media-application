import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversastion/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
// import { useEffect, useRef, useState } from "react";
import {io} from "socket.io-client"
import { Link } from "react-router-dom";
// import { text } from "stream/consumers";
// import { io } from "socket.io-client";
// import CurrentChat from "../../components/currentChat/currentChat";

export default function Messenger() {
  const {user} = useContext(AuthContext);
const [conversations, setCoversations] = useState([]); 
const [currentChat, setCurrentChat] = useState(null); 
const [messages , setMessages] = useState([]); 
const [newMessages , setNewMessages] = useState("");
const [arrivalmessages , setArrivalMessages] = useState(null);
const [onlineUsers , setOnlineUsers] = useState([]);
const [currentCommunicator , setCurrentCommunicator] = useState(null);
const scrollRef = useRef();

const socket = useRef();


useEffect(() => {
  socket.current = io("ws://localhost:4000");
  socket.current.on("getMessage", (data) => {
    setArrivalMessages({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
  socket.current.on("getUsers", (users) => {
    console.log(users);
  });
}, []); // Set up socket events only once on component mount

useEffect(() => {
  if (arrivalmessages && currentChat?.members.includes(arrivalmessages.sender)) {
    setMessages((prevMessages) => [...prevMessages, arrivalmessages]);
  }
}, [arrivalmessages, currentChat]);



useEffect(()=>{
  socket.current.emit("addUser" , user._id)
  socket.current.on("getUsers", users =>{
    setOnlineUsers(user.followings.filter((f) => users.some((u) =>u.userId === f )));
  })
},[user])








useEffect(()=>{
  const getMess = async () =>{
    try{
      if(currentChat){
      const res = await axios.get("http://localhost:8000/api/messages/"+ currentChat?._id)
      // console.log(res.data);
      setMessages(res.data);
      
    }
    }catch(err){
      console.log(err);
    }
   
  }
  getMess();
  // console.log(messages);
},[currentChat])



    useEffect(()=>{
      const getConv = async ()=>{
        try{
          const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
          setCoversations(res.data);
        }catch(err){
          console.log(err);
        }
        
      } 
      getConv();
    },[user._id])
    
    // const submitHandle =  async(e) =>{
    //   e.preventDefault();
    //   const message = {
    //     sender: user._id,
    //     text: newMessages,
    //     conversationId : currentChat._id,
    //   };
    //   const recieverId = currentChat.members.find((member) => member !== user._id);
    //   console.log(recieverId);
    //   try{
    //     await axios.post("http://localhost:8000/api/messages", message);
    //   socket.current.emit("sendMessage", {
    //     senderId: user?._id,
    //     recieverId,
    //     text: newMessages
    //   });
      
      
    //     setMessages((prevMessages) => [...prevMessages, message]); // Optimistically add the message
    //     setNewMessages("");
    //   }catch(err){
    //     console.log(err);
    //   }
    // }

    const submitHandle = async (e) => {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessages,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
  
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessages,
      });
  
      try {
        const res = await axios.post("http://localhost:8000/api/messages", message);
        setMessages([...messages, res.data]);
        setNewMessages("");
      } catch (err) {
        console.log(err);
      }
    };
   

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])



    useEffect(()=>{
      if(currentChat){
        const recieve = async ()=>{
        const receiver = currentChat.members.find(
          (member) => member !== user._id
        );
        const ress = await axios.get("http://localhost:8000/api/users?userId=" + receiver)
        console.log(ress.data);
        setCurrentCommunicator(ress.data)
      }
      recieve();
      }
    },[currentChat])


    return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInputt" /> */}
            {
  conversations.map((c) => (
    <div key={c._id} onClick={() => setCurrentChat(c)}>
      <Conversation key={c._id} conversation={c} currentUser={user}/>
    </div>
  ))
}   

          </div>
        </div>
{/* { currentChat?
          
          <>
          <div className="currentCoomunicator">
          <Link  to = {"/profile/" + currentCommunicator?.username} style={{textDecoration: "none", color: "black"}}>
              <img className="currentComm" src={"assets/person/" + currentCommunicator?.profilePicture} alt="" />
              <span>{currentCommunicator?.username}</span>
              </Link>
              </div>
              </>:<></>
              } */}

        <div className="chatBox">
          <div className="chatBoxWrapper">
          {
            currentChat?
          
              <>
              
              <Link  to = {"/profile/" + currentCommunicator?.username} style={{textDecoration: "none", color: "black"}}>
              <div className="currentCoomunicator">
                  <img className="currentComm" src={"assets/person/" + currentCommunicator?.profilePicture} alt="" />
                  <span>{currentCommunicator?.username}</span>
                  </div>
                  <hr className="hrforcurrentcomm"/>
                  </Link>
                  



                <div className="chatBoxTop">
                
                 {
                  messages?.map((m)=>(
                    <div key={m._id} ref={scrollRef}>
                  <Message message = {m} own = {m.sender === user._id} CurrentCommunicator ={currentCommunicator}/>
                  </div>
                  ))
                 }
                      
                      
                  
                  
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e)=>setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <button onClick={submitHandle} className="chatSubmitButton">
                    Send
                  </button>
                  
                </div>
              </> :  <h1>open a conversation to start a chat</h1> }
             
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
            onlineUsers = {onlineUsers}
            currentId = {user._id}
            setCurrentChat  =  {setCurrentChat} 
            />
          </div>
        </div>
      </div>
    </>
  );
}