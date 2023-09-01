import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MsgSendIcon from "../Images/send-message.png";
import close from "../Images/close.png";
import "./ChatStyle.css";

const RigtSideNavbar = () => {
  const [showChat, setShowChat] = useState(false);
  const [userData, setUserData] = useState([]);
  const [chaterName, setChaterName] = useState("");
  const [chaterProfile, setChaterProfile] = useState("");
  const loginUserId = localStorage.getItem("userId");
  const [textInput, setTextInput] = useState("");
  const [sender1, setSender1] = useState(loginUserId);
  const [senderId, setSenderId] = useState(loginUserId);
  const [recieverId, setRecieverId] = useState("");
  const [allChatData, setAllChatData] = useState([]);


  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleClick = async (recieverUserid, userName, userProfile) => {
    // alert("dghjhk")

    setRecieverId(recieverUserid);
    setChaterName(userName);
    setChaterProfile(userProfile);

    const checkChat = {
      senderId: loginUserId,
      recieverId: recieverUserid,
    };
    console.log(checkChat);
    const response1 = await axios.post(
      "http://localhost:5000/chat/messages",
      checkChat
    );
    // console.log(response1.data);
    const resp = response1.data;

    if (response1.data.length == 0) {
      console.log("Data ni aya ");
      const onceAgainCheckChat = {
        senderId: recieverUserid,
        recieverId: loginUserId,
      };
      const res = await axios.post(
        "http://localhost:5000/chat/messages",
        onceAgainCheckChat
      );
      console.log(res.data);
      if (res.data.length !== 0) {
        console.log("If wali statment me aya ha ");
        const ress = res.data;
        setAllChatData(ress);
        setSender1(ress[0].sender);
        setSenderId(ress[0].senderId);
        setRecieverId(ress[0].recieverId);

        setShowChat(true);
        return;
      } else {
        setAllChatData([]);
        setShowChat(true);
      }
    } else {
      console.log("data ha we ");

      setSender1(resp[0].sender);
      setSenderId(resp[0].senderId);
      setRecieverId(resp[0].recieverId);
      setAllChatData(response1.data);
    }

    setShowChat(true);
  };
  const fetchAllFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/allFriends/${loginUserId}`
      );
      setUserData(response?.data);

      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchAllFriends();
  }, []);
  // console.log(hisory)
  // console.log(textInput)
  const sendMessage = async() => {
    const updatedDataForSending = {
      senderId: senderId,
      recieverId: recieverId,
      message: textInput,
      sender: sender1,
    };
    console.log("updatedData", updatedDataForSending);
    // alert("Send message")
   await axios
      .post("http://localhost:5000/chat/message/send", updatedDataForSending)
      .then(async(res) => {
        console.log(res.data.message);
        // window.location.reload();


        // Now after sending message again fetching
        const checkChat1 = {
          senderId: senderId,
          recieverId: recieverId,
        };
        console.log(checkChat1);
        const response1 =await axios.post(
          "http://localhost:5000/chat/messages",
          checkChat1
        );
        console.log(response1.data)

        if(response1.data.length===0)
        {
          const checkAgainChat1={
            senderId:recieverId,
            recieverId:senderId
          }
          console.log(checkAgainChat1)
          const response2=await axios.post(
            "http://localhost:5000/chat/messages",
            checkAgainChat1
          );
          console.log(response2.data)
          setAllChatData(response2.data)
        }
        else
        {
          setAllChatData(response1.data)
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearForm=()=>{
setTextInput('')
  }
  return (
    <>
      <div class="right-sidebar">
        <div class="sidebar-title">
          <h4>Conversation</h4>
        </div>
        {userData.map((item) => (
          <div class="online-list">
            <div class="online">
              <img src={item.imageUrl} />
            </div>
            <p onClick={() => handleClick(item._id, item.name, item.imageUrl)}>
              {item.name}
            </p>
          </div>
        ))}
        {showChat && (
          <div className="MainChatContainer">
            <div className="ChatHeader">
              <div className="ChatLeftNav">
                <div className="profille-circle">
                  <img
                    className="profile_image"
                    src={chaterProfile}
                    alt="Profile"
                  />
                </div>
                <div>
                  <p className="ChatUserName">{chaterName}</p>
                </div>
              </div>
              <div className="ChatRightnav">
                <div onClick={() => setShowChat(false)}>
                  <img
                    className="closeIcon"
                    src={close}
                    alt="Close-Icon"
                    width={10}
                    height={10}
                  />
                </div>
              </div>
            </div>

            <div className="ChatBody">
              {allChatData.map((item, index) => (
                <div>
                  <div
                    key={item._id}
                    className={
                      index % 2 === 0
                        ? "  message my-message"
                        : "message frnd-message"
                    }
                  >
                    <p>{item.message}</p>
                  </div>
                  {/* <div className="message frnd-message">
                          <p>{item.message}</p>
                      </div>  */}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message"
                value={textInput}
                onChange={handleInputChange}
              />
              <button className="send-btn">
                <img
                  src={MsgSendIcon}
                  alt=""
                  width={25}
                  height={20}
                  onClick={()=>{sendMessage();
                    clearForm();
                  } }
                
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RigtSideNavbar;
