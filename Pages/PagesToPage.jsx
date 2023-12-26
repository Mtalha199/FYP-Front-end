import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";
import CreatePostModel from "../CreatePageModal/CreatePostModel";

const PagesToPage = () => {
  const {data,setData}=useContext(UserContext)
const isAdmin=data?.aridnoExist?.isAdmin;
// console.log(isAdmin)



    const { pageId} = useParams();
    const [pageData,setPageData]=useState([])
  const [posts,setPosts]=useState([]);


    const fetchAllPosts = async () => {
        const response = await axios.get(
          `http://localhost:5000/page/${pageId}`
        );
        // console.log(response.data)
        setPageData(response.data)
        }    
    useEffect(() => {
        fetchAllPosts();
      }, []);
      const updatedPageId={
        id:pageId
      }


      const fetchPost = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/post/showPosts",
            updatedPageId
          );
          setPosts(response.data);
        } catch (e) {
          console.log(e.response);
        }
      };
      useEffect(() => {
        fetchPost();
      }, []);

      console.log(posts)
    return ( 
        <>
        <div className="main-content">
        <div className="mainBox">
          <div className="upperBox">

            <div className="cover_Photo-prev-DashToPro">
              <img className="cover_image" 
              src={pageData.coverImageUrl}
               alt="Profile" />
            </div>

            <div className="lowerBox">
              <div className="MoveAbleDiv">
              <div className="ProfilePictureDiv">
                <div className="profilePhoto-Preview">
              
                  <img className="profile_image"
                   src={pageData.profileImageUrl}
                
                    alt="Profile" />
                 
                </div>
              </div>
              
              </div>
              <div className="pages-titlee">
                <h4>
                {pageData.pagename}
                </h4>
              </div>
            </div>
          </div>
        </div>


        {
            isAdmin ==='TARAR' ? <CreatePostModel pageId={pageId} name={pageData.pagename} /> :null
        }
        {posts.map((item) => (
          <div className="post-container">
            <div class="profile-postcard">
              <div class="postcard-header">
                <img 
                src={pageData.profileImageUrl}
                 alt="Profile Picture" class="profile-picture" />
                <div class="postcard-info">
                  <h2 class="name">
                    {item.name}
                    </h2>
                  <p class="date">28 May 2023</p>
                </div>
              </div>

              <div class="postcard-content">
                <p class="message">
                    
                    {item.mindThoughts}
                    </p>
                <img 
                
                src={item.imageUrl}
                 alt="Photo" class="profileTimelinephoto" />
              </div>
              <div class="postcard-footer">
                <div class="likes">
                  <span class="like-icon">👍</span>
                  <span class="like-count">100 Likes</span>
                </div>
                <div class="comments">
                  <span class="comment-icon">💬</span>
                  <span class="comment-count">50 Comments</span>
                </div>
              </div>
            </div>
          </div>
         ))} 
      </div>
        </>
     );
}
 
export default PagesToPage;