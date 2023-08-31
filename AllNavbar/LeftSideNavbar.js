import wideScreen from "../Images/icons8-widescreen-24 (4).png";
import page from "../Images/page.png";
import group from "../Images/group.png";
import user from "../Images/user1.png";
import notificationBell from "../Images/notification-bell.png";
import messeges from "../Images/messages.png";
import friends from "../Images/friends.png";
import searching from "../Images/searching.png";
import library from "../Images/online-library.png";
import qMark from "../Images/icons8-question-mark-64.png";

import logout from "../Images/icons8-logout-96.png";

import Profile from "../profile/Profile";
import { Link } from "react-router-dom";
const LeftSideNavbar = () => {
  const logoutbtn = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfile")
    localStorage.removeItem("myData")
  };
  return (
    <>
      <div className="Dashboardleft-sidebar">
        <div className="LeftNavBar-imp-links">
          <Link to="timeline">
            <img src={wideScreen} />
            Timeline
          </Link>


          <Link to="pages">
            <img src={page} />
            Pages
            </Link>
          {/* <a href="#">
            <img src={group} />
            Groups
          </a> */}
          <Link to="profile">
            <img src={user} />
            Profile
          </Link>
          {/* <a href="#">
            <img src={notificationBell} />
            Notifications
          </a> */}
          {/* <a href="#">
            <img src={messeges} />
            Messages
          </a> */}
          <Link to="friends"> 
            <img src={friends} />
            Add Friends
            </Link>
          
          <Link to="friendRequests">
            <img src={searching} />
            Friend Requests
        </Link>
        <Link to="allfriends">
          
          <img src={qMark} />
          Your Friends
          </Link>
          <Link to="library">
          <img src={library} />
            E-Libray
          </Link>
           
        
         
         

          <Link to="/login" onClick={logoutbtn}>
            {" "}
            <img src={logout} />
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default LeftSideNavbar;
