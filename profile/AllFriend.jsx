import { useState ,useEffect} from "react";
import axios from "axios";

const AllFriend = () => {
  const userId=localStorage.getItem("userId")

    const [userData,setUserData]=useState([])
    const fetchAllFriend = async () => {

        try {
          const response = await axios.get(
            `http://localhost:5000/allFriends/${userId}`
        
          );
          console.log(response.data);
          setUserData(response.data)

          
        } 
        catch (err) {
          console.log(err);
        }
      };
    useEffect(() => {
        fetchAllFriend();
      }, []);
  return (
    <>
  <div class="BoxForFriendCard">
    
  <div className="FriendReqBar">
      <div className="Request-title">
        <h5 className="LMSHeading">All Friends</h5>
      </div>
    </div>
    <div className="FriendCard-Container">
        {userData.map((item)=> (


<div class="FriendRequestCard">
        <div className="wrapper">
          <div className="circle-container">
            <img className="preview-Image" src={item.imageUrl} alt="Card Profile" />
          </div>
        </div>
        <h2 className="titleOfFriendReqCard">{item.name}</h2>

</div>


   
            ))
            
        }
      </div>
        </div>  
          
          
    </>
  );
};

export default AllFriend;
