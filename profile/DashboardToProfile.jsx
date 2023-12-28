import axios from "axios";
import { useEffect, useState } from "react";
import CreateCommentModel from "../CreatePageModal/CreateCommentModel"

import { useParams } from "react-router-dom";
const DashboardToProfile = () => {
  const { userId } = useParams();
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);

  const fetchAllPosts = async () => {
    const response = await axios.get(
      `http://localhost:5000/userProfile/${userId}`
    );
    console.log(response.data)

    const {allData,userExist}=response.data;
    const updatedAllData=allData.map((item)=>(
      {
        ...item,
        profileImageUrl:userExist.imageUrl
      }))
    setPostData(updatedAllData);
    setUserData(userExist);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <>
      <div className="main-content">
        <div className="mainBox">
          <div className="upperBox">

            <div className="cover_Photo-prev-DashToPro">
              <img className="cover_image" src={userData.coverImageUrl} alt="Profile" />
            </div>

            <div className="lowerBox">
              <div className="MoveAbleDiv">
              <div className="ProfilePictureDiv">
                <div className="profilePhoto-Preview">
              
                  <img className="profile_image" src={userData.imageUrl} alt="Profile" />
                 
                </div>
              </div>
              
              </div>
              <div className="title">
                <h4>{userData.name}</h4>
              </div>
            </div>
          </div>
        </div>

        {postData.map((item) => (
          <div className="post-container">
            <div class="profile-postcard">
              <div class="postcard-header">
                <img src={item.profileImageUrl} alt="Profile Picture" class="profile-picture" />
                <div class="postcard-info">
                  <h2 class="name">{item.name}</h2>
                  <p class="date">28 May 2023</p>
                </div>
              </div>

              <div class="postcard-content">
                <p class="message">{item.mindThoughts}</p>
                <img src={item.imageUrl} alt="Photo" class="profileTimelinephoto" />
              </div>
              <div class="postcard-footer">
                <div class="likes">
                  <span class="like-icon">👍</span>
                  <span class="like-count">{item.like.length} Likes</span>
                </div>
                <div class="comments">
                  {/* <span class="comment-icon">💬</span> */}
                  <span class="comment-count"><CreateCommentModel postid={item._id}/></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardToProfile;
