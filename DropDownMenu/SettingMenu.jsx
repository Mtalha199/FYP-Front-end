import profilePic from "../Images/profile-pic.png"
import user11 from "../Images/user1.png"
// import { UserContext } from "../UserContext/UserContext";
// import { useContext } from "react";
const SettingMenu = () => {
  // const {user} =useContext(UserContext)

    return ( 
        <>
        <div class="subMenuParent" id="menuID">
            <div class="subMenu">
              <div class="userProfile">
                <img
                  src={profilePic}
                  alt="profile"
                  width="50px"
                />
                <h3>sdhjk</h3>
              </div>
              <hr />
              <a href="#" class="subMenu-link">
                <img src={user11} alt="added" />
                <p>Edit Profile</p>
                <span></span>
              </a>
    
              <a href="#" class="subMenu-link">
                <img src="DashboardImages/settings (1).png" alt="" />
                <p>Settings & Privacy</p>
                <span></span>
              </a>
    
              <a href="#" class="subMenu-link">
                <img src="DashboardImages/icons8-question-mark-64.png" alt="" />
                <p>Help & Support</p>
                <span></span>
              </a>
              <a href="#" class="subMenu-link">
                <img src="DashboardImages/logout.png" alt="" />
                <p>Logout</p>
                <span></span>
              </a>
            </div>
          </div>
        </>
     );
}
 
export default SettingMenu;