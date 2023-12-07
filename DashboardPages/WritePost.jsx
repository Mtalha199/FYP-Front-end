import profilePic from "../Images/profile-pic.png"
import feeling from"../Images/feeling.png"
import photo from "../Images/photo.png"
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";



const WritePost = () => {
  const {user} =useContext(UserContext)

    return ( 
        <>
<div class="write-post-container">
              <div class="user-profile">
                <img src={profilePic}/>
                <div>
                  <p>{user?.name}({user?.aridno})</p>
                  <small
                    >Public
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="8"
                      fill="currentColor"
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                      />
                    </svg>
                  </small>
                </div>
              </div>
              <div class="post-input-container">
                <textarea rows="4"placeholder="what's on on your mind" ></textarea>
    
                <div class="add-post-links">
                  <a href="#"><img src={photo} />Photo/Vedio</a>
                  <input type="file" accept="image/*" id="image" name="image"></input>
                  <a href="#"
                    ><img src={feeling} />Feeling/Activity</a
                  >
                </div>
              </div>
            </div>

        </>
     );
}
 
export default WritePost;