import { useEffect, useState, useContext } from "react";
import AddFriend from "./AddFriend";
import profile from "../Images/add-friends.png";
import "../Friends/FriendCard.css"
import { UserContext } from "../UserContext/UserContext";
import { Link } from "react-router-dom";


import axios from "axios";
import ResponseRequest from "./ResponseRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Friends = () => {
  const { data, setData } = useContext(UserContext);

  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  console.log(userData);
  const [text, setText] = useState({});

  const fetchAllFriend = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/friends/${userId}`
      );
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllFriend();
  }, []);

  const sendRequest = async (recieverId) => {
    const updatedIds = {
      senderName: data?.aridnoExist?.name,
      senderProfile: data?.aridnoExist?.imageUrl,
      senderId: data?.aridnoExist?._id,
      recieverId: recieverId,
    };
    console.log(updatedIds);
    await axios
      .post("http://localhost:5000/friends/friendRequest", updatedIds)
      .then((res) => {
        toast.success(res?.data);
        console.log(res?.data);
        if (res?.data) {
          setText((prevState) => ({
            ...prevState,
            [recieverId]: "Request sent",
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div class="BoxForFriendCard">
      <div className="LMSBar">
      <div className="LMSTitle">
        <h5 className="LMSHeading">People You May Know</h5>
      </div>
    </div>
        <div className="FriendCard-Container">
          {userData.map((item) => (

           
<div class="FriendRequestCard">
        <div className="wrapper">
          <div className="circle-container">
            <img className="preview-Image" src={item.imageUrl} alt="Card Profile" />
          </div>
        </div>
        <h2 className="titleOfFriendReqCard">{item.name}</h2>
        <div className="buttons-container">
          <button className="AddFriendBtn"  onClick={() => sendRequest(item._id)}>{text[item._id] ? text[item._id] : "Add friend"}</button>
          <button className="DeleteBtn">Cancel</button>
        </div>
      </div>


          ))}

        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Friends;
