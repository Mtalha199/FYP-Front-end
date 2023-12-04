import "../Dashboard/Dashboard.css";
import { useEffect, useState } from "react";
// import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios, { all } from "axios";
import ChatModule from "../AllNavbar/ChatModule";
import CreateCommentModel from "../CreatePageModal/CreateCommentModel"

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const [showComment, setShowComment] = useState(false);


  const userId = localStorage.getItem("userId");

  const checkProfile = (userId) => {
    return navigate(`/dashboard/userprofile/${userId}`);
  };

  const fetchAllPosts = async () => {
    const response = await axios.get(
      `http://localhost:5000/allPosts/${userId}`
    );
    const allData = response.data.combinePosts;
    // console.log(allData);
    setPosts(allData);
  };
  const fetchPagesPosts = async () => {
    const response = await axios.get(
      `http://localhost:5000/allpages/${userId}`
    );
    // console.log(response.data.allPosts);
    setPages(response.data.allPosts);
  };
  useEffect(() => {
    fetchAllPosts();
    fetchPagesPosts();
  }, []);

  const checkLike=async(postId)=>{
    // console.log(userId)
    // console.log(postId)
    const updatedLikedData={
      postId:postId,
      likeUserId:userId
    }
    const response=await axios.put("http://localhost:5000/likeUser",updatedLikedData)
    const response1=await axios.get(`http://localhost:5000/allPosts/${userId}`);
    const allData = response1.data.combinePosts;
    console.log(allData)
    setPosts(allData)
  }
  const showCommentData=(postId)=>{
    // alert("Hlo")
    console.log(postId)
    setShowComment(true)
  }
console.log(posts)
// const closeCommentBar=()=>{
//   alert("hdj")
//   setShowComment(false)
// }
  return (
    <>
      <div class="DashboardMain-content">
        {posts.map((item) =>
          item.friendsPosts.map((i) =>
            item.friendprofile.map((ii) => (
              <div>
                <div class="postcard">
                  <div class="postcard-header">
                    <img
                      src={ii.imageUrl}
                      alt="Profile Picture"
                      class="profile-picture"
                      onClick={() => checkProfile(i.id)}
                    />
                    <div class="postcard-info">
                      <h2 class="name">{i.name} added a new Photo</h2>
                      <p class="date">28 May 2023</p>
                    </div>
                  </div>
                  <div class="postcard-content">
                    <p class="message">{i.mindThoughts}</p>
                    <img src={i.imageUrl} alt="Photo" class="photo" />
                  </div>
                  <div class="postcard-footer">
                    <div class="likes">
                      <span class="like-icon" onClick={()=>checkLike(i._id)}>👍</span>
                      <span class="like-count">{i.like.length} Likes</span>
                    </div>
                    <div class="comments">
                      <span class="comment-icon" 
                      // onClick={()=>showCommentData(i._id)}
                      > <CreateCommentModel postid={i._id}
                      // comments={i.comment} postid={i._id}
                      /></span> 
                       {/* {
                        showComment && (

                                         

                          <span class="comment-count">{i.comment.map((iteeem)=>(
                            <div> {iteeem.userComment}</div>
                           
                             ))}
                             </span> 
                        )
                      } */}
                     
                      
                      {/* {
                        showComment && (
                          <div>hlo</div>
                        )
                      } */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        )}
        {pages.map((item1) =>
          item1.allPost.map((i1) =>
            item1.pageProfile.map((ii1) => (
              <div>
                <div class="postcard">
                  <div class="postcard-header">
                    <img
                      src={ii1.profileImageUrl}
                      alt="Profile Picture"
                      class="profile-picture"
                      // onClick={()=>checkProfile(i.id)}
                    />
                    <div class="postcard-info">
                      <h2 class="name">
                        <span className="notification-span">
                          {ii1.pagename}
                        </span>{" "}
                        added a new{" "}
                        <span className="notification-span">Notification</span>
                      </h2>
                      <p class="date">28 May 2023</p>
                    </div>
                  </div>
                  <div class="postcard-content">
                    <p class="message">{i1.mindThoughts}</p>
                    <img src={i1.imageUrl} alt="Photo" class="photo" />
                  </div>
                  {/* <div class="postcard-footer">
                    <div class="likes">
                      <span class="like-icon" >👍</span>
                      <span class="like-count">100 Likes</span>
                    </div>
                    <div class="comments">
                      <span class="comment-icon">💬</span>
                      <span class="comment-count">50 Comments</span>
                    </div>
                  </div> */}
                </div>
              </div>
            ))
          )
        )}
      </div>
      <Outlet />
      {/* <div className="position-absolute chatbar"> */}
        {/* <ChatModule /> */}
      {/* </div> */}
    </>
  );
};
export default Dashboard;
