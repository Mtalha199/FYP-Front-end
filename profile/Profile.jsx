import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ProfileImageCard from "./ProfileImageCard";
import CoverImageCard from "./CoverImageCard";
import { UserContext } from "../UserContext/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCommentModel from "../CreatePageModal/CreateCommentModel"
const Profile = () => {
  const { data, setData } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const userId = localStorage.getItem("userId");
  const updatedUserId = {
    id: userId,
  };
  const fetchPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/post/showPosts",
        updatedUserId
      );
      setPosts(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const sortedPosts = [...posts].reverse();
  // console.log(sortedPosts)
  const deletePost = async (_id) => {
    const updatedDelPost = {
      id: _id,
    };
    console.log(updatedDelPost);
    await axios
      .post("http://localhost:5000/post/deletePost", updatedDelPost)
      .then((res) => {
        toast.success(res.data);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <div className="main-content">
        <div className="mainBox">
          <div className="upperBox">
            <CoverImageCard />
          </div>
          {/*------------------ lower Div--------------------------------------------------------*/}
          <div className="lowerBox">
            <div className="ProfileImageDiv">
              <ProfileImageCard />
            </div>
            <div className="profile-titleDiv">
              <h5>
                {data?.aridnoExist?.name}({data?.aridnoExist?.aridno})
              </h5>
            </div>
          </div>
        </div>
        <div>
          <div className="profileBar"></div>
        </div>

        {sortedPosts.map((item) => (
          <div className="post-container">
            <div class="profile-postcard">
              <div class="postcard-header">
                <img
                  src={data?.aridnoExist?.imageUrl}
                  alt="Profile Picture"
                  class="profile-picture"
                />
                <div class="postcard-info">
                  <h2 class="name">
                    {data?.aridnoExist?.name}({data?.aridnoExist.aridno})
                  </h2>
                  <p class="date">{item.timestamp}</p>
                </div>
              </div>
              <button className="del-btan" onClick={() => deletePost(item._id)}>
                x
              </button>
              <div class="postcard-content">
                <p class="message">{item.mindThoughts}</p>
                <img
                  src={item.imageUrl}
                  alt="Photo"
                  class="profileTimelinephoto"
                />
              </div>
              <div class="postcard-footer">
                <div class="likes">
                  <span class="like-icon">👍{item.like.length}</span>
                  <span class="like-count">Likes</span>
                </div>
                <div class="comments">
                      <span class="comment-icon" 
                      // onClick={()=>showCommentData(i._id)}
                      > <CreateCommentModel postid={item._id}
                      // comments={i.comment} postid={i._id}
                      /></span> 
                  {/* <span class="comment-icon">💬</span> */}
                  {/* <span class="comment-count">50 Comments</span> */}
                </div>
              </div>
                    
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
